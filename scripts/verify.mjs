import { chromium } from "playwright-core";
import { mkdir, stat } from "node:fs/promises";
import { join } from "node:path";

const base = process.env.PORTFOLIO_URL || "http://localhost:5173/";
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const output = join(process.cwd(), ".qa");
await mkdir(output, { recursive: true });
const errors = [];
const check = (condition, message) => {
  if (!condition) throw new Error(message);
  console.log(`PASS ${message}`);
};

try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    acceptDownloads: true,
    reducedMotion: "reduce",
  });
  await context.addInitScript(() => {
    if (!localStorage.getItem("kowsik-theme"))
      localStorage.setItem("kowsik-theme", "dark");
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto(base, { waitUntil: "networkidle" });
  check(response?.status() === 200, "desktop page loads");
  check(
    await page.getByRole("heading", { level: 1 }).isVisible(),
    "hero heading visible",
  );
  check(
    await page.getByRole("link", { name: /View projects/i }).isVisible(),
    "projects CTA visible",
  );
  check(
    await page
      .getByRole("link", { name: /Download resume/i })
      .first()
      .isVisible(),
    "resume CTA visible",
  );
  check(
    await page
      .getByRole("link", { name: /GitHub/i })
      .first()
      .isVisible(),
    "GitHub visible",
  );
  await page.screenshot({
    path: join(output, "desktop-dark.png"),
    fullPage: true,
  });
  await page.screenshot({ path: join(output, "hero-dark.png") });
  await page
    .locator("#projects")
    .screenshot({ path: join(output, "projects-dark.png") });
  await page
    .locator("#about")
    .screenshot({ path: join(output, "about-dark.png") });
  await page
    .locator("#contact")
    .screenshot({ path: join(output, "contact-dark.png") });

  await page.getByRole("button", { name: /Switch to light theme/i }).click();
  check(
    (await page.locator("html").getAttribute("data-theme")) === "light",
    "light theme toggles",
  );
  await page.reload({ waitUntil: "networkidle" });
  check(
    (await page.locator("html").getAttribute("data-theme")) === "light",
    "theme persists after reload",
  );
  await page.screenshot({
    path: join(output, "desktop-light.png"),
    fullPage: true,
  });
  await page.screenshot({ path: join(output, "hero-light.png") });

  await page.getByRole("tab", { name: /React \+ Spring Boot CLI/i }).click();
  check(
    await page
      .getByRole("tabpanel")
      .getByRole("heading", { name: "React + Spring Boot CLI" })
      .isVisible(),
    "project selection updates case study",
  );
  await page.getByRole("button", { name: "Frontend", exact: true }).click();
  check(
    await page.getByRole("heading", { name: "TempVault" }).isVisible(),
    "gallery filter includes frontend project",
  );
  check(
    (await page.getByRole("heading", { name: "BidX" }).count()) === 0,
    "gallery filter hides other categories",
  );

  check(
    (await page.getByText("Debug the API.").count()) === 0,
    "quiz is removed",
  );
  const reactNode = page.getByRole("button", { name: /Move React node/i });
  const originalPosition = await reactNode.getAttribute("style");
  await reactNode.focus();
  await page.keyboard.press("ArrowRight");
  check(
    (await reactNode.getAttribute("style")) !== originalPosition,
    "hero node moves with keyboard",
  );
  await page.getByRole("button", { name: "Reset draggable nodes" }).click();
  check(
    (await reactNode.getAttribute("style")) === originalPosition,
    "hero nodes reset",
  );

  const handle = page.getByRole("button", { name: "Open mini game" });
  const handleBox = await handle.boundingBox();
  await page.mouse.move(handleBox.x + 14, handleBox.y + 20);
  await page.mouse.down();
  await page.mouse.move(handleBox.x + 120, handleBox.y + 20, { steps: 5 });
  await page.mouse.up();
  check(
    await page.getByText("Mini Pong").isVisible(),
    "side handle pulls open",
  );
  await page.getByRole("button", { name: "Close mini game" }).first().click();
  await page.getByRole("button", { name: "Open mini game" }).click();
  check(await page.getByText("Mini Pong").isVisible(), "side game opens");
  await page.getByRole("button", { name: "Play", exact: true }).click();
  check(
    await page.getByRole("button", { name: "Pause" }).isVisible(),
    "Pong starts",
  );
  await page.getByRole("button", { name: "Pause" }).click();
  await page.getByRole("button", { name: "Close mini game" }).first().click();

  await page.route("**/api/chat", async (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        answer: "Kowsik builds Java and React products.",
        sources: [
          {
            id: "identity",
            title: "About Kowsik",
            url: "https://github.com/KOWSIK-M",
          },
        ],
      }),
    }),
  );
  await page.getByRole("button", { name: "Open portfolio guide" }).click();
  await page.getByRole("button", { name: "What has Kowsik built?" }).click();
  await page
    .getByText("Kowsik builds Java and React products.")
    .waitFor({ state: "visible" });
  check(
    await page.getByText("Kowsik builds Java and React products.").isVisible(),
    "chat answer renders",
  );
  check(
    await page.getByRole("link", { name: /About Kowsik/ }).isVisible(),
    "chat shows its source",
  );
  await page
    .getByRole("button", { name: "Close portfolio guide" })
    .first()
    .click();

  await page.keyboard.press("Control+k");
  check(
    await page.getByRole("dialog", { name: "Jump somewhere" }).isVisible(),
    "quick navigation opens with keyboard",
  );
  await page.keyboard.press("Escape");
  check(
    (await page.getByRole("dialog").count()) === 0,
    "quick navigation closes with Escape",
  );

  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("link", { name: /Download resume/i })
    .first()
    .click();
  const download = await downloadPromise;
  check(
    download.suggestedFilename() === "Medam_Kowsik_Resume.pdf",
    "resume downloads with correct filename",
  );
  const file = await download.path();
  check((await stat(file)).size > 90000, "download contains actual PDF bytes");
  check(
    (
      await page.locator('a[href^="mailto:"]').first().getAttribute("href")
    ).includes("medamkowsik2004@gmail.com"),
    "email action addresses real mailbox",
  );

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  await mobile.addInitScript(() => {
    if (!localStorage.getItem("kowsik-theme"))
      localStorage.setItem("kowsik-theme", "dark");
  });
  const small = await mobile.newPage();
  small.on("pageerror", (error) => errors.push(error.message));
  await small.goto(base, { waitUntil: "networkidle" });
  check(
    await small.getByRole("heading", { level: 1 }).isVisible(),
    "mobile hero visible",
  );
  check(
    await small.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
    "mobile layout has no horizontal overflow",
  );
  await small.getByRole("button", { name: "Open menu" }).click();
  check(
    await small
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Contact" })
      .isVisible(),
    "mobile navigation opens",
  );
  await small
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Contact" })
    .click();
  check(
    (await small.evaluate(() => location.hash)) === "#contact",
    "mobile navigation reaches contact",
  );
  await small.getByRole("button", { name: "Open mini game" }).click();
  check(
    await small.getByText("Mini Pong").isVisible(),
    "Pong drawer fits mobile",
  );
  await small.getByRole("button", { name: "Close mini game" }).first().click();
  await small.screenshot({
    path: join(output, "mobile-dark.png"),
    fullPage: true,
  });
  await small.setViewportSize({ width: 320, height: 740 });
  check(
    await small.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
    "small phone layout has no horizontal overflow",
  );
  await small.setViewportSize({ width: 768, height: 900 });
  check(
    await small.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
    "tablet layout has no horizontal overflow",
  );
  check(
    errors.length === 0,
    `no JavaScript page errors${errors.length ? ": " + errors.join(", ") : ""}`,
  );
  await mobile.close();
  await context.close();
} finally {
  await browser.close();
}
