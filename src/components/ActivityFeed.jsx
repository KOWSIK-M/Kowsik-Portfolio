import { useEffect, useState } from "react";
import { ArrowUpRight, RefreshCw } from "lucide-react";

function timeAgo(value) {
  const days = Math.max(
    0,
    Math.floor((Date.now() - new Date(value).getTime()) / 86400000),
  );
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
}

export default function ActivityFeed() {
  const [state, setState] = useState({
    loading: true,
    events: [],
    error: false,
  });
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/activity", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Activity unavailable");
        return response.json();
      })
      .then((data) =>
        setState({ loading: false, events: data.events || [], error: false }),
      )
      .catch((error) => {
        if (error.name !== "AbortError")
          setState({ loading: false, events: [], error: true });
      });
    return () => controller.abort();
  }, [refresh]);

  return (
    <aside className="activity-panel" aria-labelledby="activity-title">
      <div className="activity-top">
        <span id="activity-title">RECENT PUBLIC WORK</span>
        <a
          href="https://github.com/KOWSIK-M"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <ArrowUpRight size={13} />
        </a>
      </div>
      {state.loading && <p role="status">Checking public GitHub activity…</p>}
      {state.error && (
        <div className="activity-fallback">
          <p>Activity is unavailable right now.</p>
          <button
            type="button"
            onClick={() => {
              setState({ loading: true, events: [], error: false });
              setRefresh((n) => n + 1);
            }}
          >
            <RefreshCw size={13} /> Retry
          </button>
        </div>
      )}
      {!state.loading && !state.error && state.events.length === 0 && (
        <p>
          No recent public events to show. Explore the repositories on GitHub.
        </p>
      )}
      {!state.loading && !state.error && state.events.length > 0 && (
        <ul>
          {state.events.map((event) => (
            <li key={event.id}>
              <span className="activity-marker" aria-hidden="true" />
              <div>
                <a href={event.url} target="_blank" rel="noopener noreferrer">
                  {event.label} <strong>{event.repo}</strong>{" "}
                  <ArrowUpRight size={13} />
                </a>
                <time dateTime={event.at}>{timeAgo(event.at)}</time>
              </div>
            </li>
          ))}
        </ul>
      )}
      <small>Public GitHub events may appear later than the work itself.</small>
    </aside>
  );
}
