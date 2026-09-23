# M. Kowsik — portfolio

A React and Vite portfolio for Medam Kowsik. It presents verified project work, a keyboard-friendly project explorer, a tiny side-drawer Pong game, draggable hero nodes, recent public GitHub activity, and a Gemini-powered portfolio guide. The site is static apart from two Vercel Functions; it does not need a database.

## Run locally

```sh
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and add a Gemini API key to use the chat locally. The key stays server-side. The app can still be browsed when the key is missing; chat shows a clear unavailable message. For a working Vercel preview, add `GEMINI_API_KEY` to the **Preview** environment in Vercel and redeploy. `GEMINI_MODEL` is optional; the default is `gemini-2.5-flash`.

Build with `npm run build`. Run the browser checks with `npm run test:e2e` while the dev server is running. The browser check uses a local Chrome installation on Windows and mocks the chat answer to keep it deterministic. The Vite dev server routes `/api/chat` and `/api/activity` to the same handlers used by Vercel Functions.

## Content and sources

- Personal information, education, experience, and skills: `Medam_Kowsik.pdf`, provided in the local folder. The deployable copy is `public/Medam_Kowsik_Resume.pdf`.
- CityPulse: [frontend](https://github.com/KOWSIK-M/CityPulse), [backend](https://github.com/KOWSIK-M/CityPulseBackend), and the resume.
- React + Spring Boot CLI: [generator](https://github.com/KOWSIK-M/react-springboot-cli) and [frontend](https://github.com/KOWSIK-M/react-springboot-cli-frontend). The vector field, sparse sparkles, and violet text transition adapt its existing Hero and Stats styling patterns. The project panel and quick navigation also carry its terminal and configuration feel.
- LessRepeat: [public repository](https://github.com/KOWSIK-M/LessRepeat_VA), local source, and the resume. The public README describes its current MVP as optimized for local demos, so the portfolio does not claim a public live deployment.
- WorkSkillAI: [frontend](https://github.com/KOWSIK-M/Skill-Gap-Analysis), [backend](https://github.com/KOWSIK-M/WorkSkillAI-Backend), and the resume.
- Anjaneya Herbals: [repository](https://github.com/KOWSIK-M/ah---temp) and its [live storefront](https://anjaneya-herbals.vercel.app/). Local frontend and Spring Boot API source were also inspected.
- TempVault: local source project; no public source or demo link is claimed.
- BidX: [repository](https://github.com/KOWSIK-M/BidX) and its repository-linked live URL.

The student resources are recommendations, with direct links. They are not presented as tools personally used in every project.

## Activity and chat

`/api/activity` reads public GitHub events and caches the result at the edge. It labels these as recent public work, not live presence. GitHub events can appear later than the underlying work, and the UI offers a retry state when the API is unavailable.

`/api/chat` accepts short questions and recent conversation context, sends only verified portfolio facts to Gemini, and returns concise answers with source links. It rejects unsupported topics, cross-origin requests, and oversized input. A small in-memory request limit reduces accidental bursts; a production deployment should add a Vercel Firewall rate-limit rule if chat traffic grows. Do not put the Gemini key in a `VITE_` variable or commit it.

## Contact and privacy

“Email me” uses `mailto:` to open the visitor’s email application with Kowsik’s real address. The visitor sends the message from their own email account. The site does not collect contact messages, use analytics, or store chat transcripts. The Gemini key is read only by the server function.
