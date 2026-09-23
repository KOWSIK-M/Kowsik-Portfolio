import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import chat from "./api/chat.js";
import activity from "./api/activity.js";

function localApi() {
  const routes = { "/chat": chat, "/activity": activity };
  return {
    name: "local-portfolio-api",
    configureServer(server) {
      server.middlewares.use("/api", async (request, response, next) => {
        const path = new URL(request.url, "http://localhost").pathname.replace(
          /^\/api/,
          "",
        );
        const route = routes[path];
        if (!route) return next();
        try {
          const origin = `http://${request.headers.host}`;
          const chunks = [];
          for await (const chunk of request) chunks.push(chunk);
          const webRequest = new Request(`${origin}/api${path}`, {
            method: request.method,
            headers: request.headers,
            ...(chunks.length ? { body: Buffer.concat(chunks) } : {}),
          });
          const result = await route.fetch(webRequest);
          response.statusCode = result.status;
          result.headers.forEach((value, name) =>
            response.setHeader(name, value),
          );
          response.end(Buffer.from(await result.arrayBuffer()));
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const localEnv = loadEnv(mode, process.cwd(), "");
  if (!process.env.GEMINI_API_KEY && localEnv.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = localEnv.GEMINI_API_KEY;
  }
  return { plugins: [react(), localApi()] };
});
