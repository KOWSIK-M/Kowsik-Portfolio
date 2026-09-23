const GITHUB_EVENTS =
  "https://api.github.com/users/KOWSIK-M/events/public?per_page=25";

function labelFor(event) {
  if (event.type === "PushEvent") return "Pushed code to";
  if (event.type === "PullRequestEvent" && event.payload?.action === "opened") {
    return "Opened a pull request in";
  }
  if (
    event.type === "CreateEvent" &&
    event.payload?.ref_type === "repository"
  ) {
    return "Created";
  }
  return null;
}

export default {
  async fetch(request) {
    if (request.method !== "GET") {
      return Response.json({ error: "Use GET." }, { status: 405 });
    }
    try {
      const response = await fetch(GITHUB_EVENTS, {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "kowsik-portfolio",
        },
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) throw new Error(`GitHub ${response.status}`);
      const events = (await response.json())
        .filter((event) => labelFor(event) && event.repo?.name)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 3)
        .map((event) => ({
          id: event.id,
          label: labelFor(event),
          repo: event.repo.name.replace(/^KOWSIK-M\//i, ""),
          url: `https://github.com/${event.repo.name}`,
          at: event.created_at,
        }));
      return Response.json(
        { events, checkedAt: new Date().toISOString() },
        {
          headers: {
            "Cache-Control":
              "public, max-age=120, s-maxage=900, stale-while-revalidate=1800",
          },
        },
      );
    } catch {
      return Response.json(
        { error: "GitHub activity is temporarily unavailable." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }
  },
};
