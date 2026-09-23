import { chromium } from 'playwright-core'
import { mkdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

const base = process.env.PORTFOLIO_URL || 'http://localhost:5173/'
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true })
const output = join(process.cwd(), '.qa')
await mkdir(output, { recursive: true })
const errors = []
const check = (condition, message) => { if (!condition) throw new Error(message); console.log(`PASS ${message}`) }

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true, reducedMotion: 'reduce' })
  await context.addInitScript(() => { if (!localStorage.getItem('kowsik-theme')) localStorage.setItem('kowsik-theme', 'dark') })
  const page = await context.newPage()
  page.on('pageerror', error => errors.push(error.message))
  const response = await page.goto(base, { waitUntil: 'networkidle' })
  check(response?.status() === 200, 'desktop page loads')
  check(await page.getByRole('heading', { level: 1 }).isVisible(), 'hero heading visible')
  check(await page.getByRole('link', { name: /View projects/i }).isVisible(), 'projects CTA visible')
  check(await page.getByRole('link', { name: /Download resume/i }).first().isVisible(), 'resume CTA visible')
  check(await page.getByRole('link', { name: /GitHub/i }).first().isVisible(), 'GitHub visible')
  await page.screenshot({ path: join(output, 'desktop-dark.png'), fullPage: true })

  await page.getByRole('button', { name: /Switch to light theme/i }).click()
  check(await page.locator('html').getAttribute('data-theme') === 'light', 'light theme toggles')
  await page.reload({ waitUntil: 'networkidle' })
  check(await page.locator('html').getAttribute('data-theme') === 'light', 'theme persists after reload')
  await page.screenshot({ path: join(output, 'desktop-light.png'), fullPage: true })

  await page.getByRole('tab', { name: /React \+ Spring Boot CLI/i }).click()
  check(await page.getByRole('tabpanel').getByRole('heading', { name: 'React + Spring Boot CLI' }).isVisible(), 'project selection updates case study')
  await page.getByRole('button', { name: 'Frontend', exact: true }).click()
  check(await page.getByRole('heading', { name: 'TempVault' }).isVisible(), 'gallery filter includes frontend project')
  check(await page.getByRole('heading', { name: 'BidX' }).count() === 0, 'gallery filter hides other categories')

  await page.getByRole('button', { name: /Send the access token/i }).click()
  check(await page.getByText('Nice catch.').isVisible(), 'API challenge gives feedback')
  await page.getByRole('button', { name: /Next scenario/i }).click()
  check(await page.getByText('SCENARIO 02 / METHOD').isVisible(), 'API challenge advances')

  await page.keyboard.press('Control+k')
  check(await page.getByRole('dialog', { name: 'Jump somewhere' }).isVisible(), 'quick navigation opens with keyboard')
  await page.keyboard.press('Escape')
  check(await page.getByRole('dialog').count() === 0, 'quick navigation closes with Escape')

  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('link', { name: /Download resume/i }).first().click()
  const download = await downloadPromise
  check(download.suggestedFilename() === 'Medam_Kowsik_Resume.pdf', 'resume downloads with correct filename')
  const file = await download.path()
  check((await stat(file)).size > 90000, 'download contains actual PDF bytes')
  check((await page.locator('a[href^="mailto:"]').first().getAttribute('href')).includes('medamkowsik2004@gmail.com'), 'email action addresses real mailbox')

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 1, reducedMotion: 'reduce' })
  await mobile.addInitScript(() => { if (!localStorage.getItem('kowsik-theme')) localStorage.setItem('kowsik-theme', 'dark') })
  const small = await mobile.newPage()
  small.on('pageerror', error => errors.push(error.message))
  await small.goto(base, { waitUntil: 'networkidle' })
  check(await small.getByRole('heading', { level: 1 }).isVisible(), 'mobile hero visible')
  check(await small.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), 'mobile layout has no horizontal overflow')
  await small.getByRole('button', { name: 'Open menu' }).click()
  check(await small.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact' }).isVisible(), 'mobile navigation opens')
  await small.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact' }).click()
  check((await small.evaluate(() => location.hash)) === '#contact', 'mobile navigation reaches contact')
  await small.screenshot({ path: join(output, 'mobile-dark.png'), fullPage: true })
  await small.setViewportSize({ width: 320, height: 740 })
  check(await small.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), 'small phone layout has no horizontal overflow')
  await small.setViewportSize({ width: 768, height: 900 })
  check(await small.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), 'tablet layout has no horizontal overflow')
  check(errors.length === 0, `no JavaScript page errors${errors.length ? ': ' + errors.join(', ') : ''}`)
  await mobile.close()
  await context.close()
} finally {
  await browser.close()
}
