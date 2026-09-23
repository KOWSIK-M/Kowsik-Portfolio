import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Command,
  Download,
  Mail,
  Menu,
  Moon,
  RotateCcw,
  Send,
  Sun,
  Terminal,
  X,
} from "lucide-react";

const GITHUB = "https://github.com/KOWSIK-M";
const LINKEDIN = "https://www.linkedin.com/in/medam-kowsik-975479282/";
const EMAIL = "medamkowsik2004@gmail.com";
const RESUME = "/Medam_Kowsik_Resume.pdf";

const projects = [
  {
    id: "citypulse",
    number: "01",
    title: "CityPulse",
    kicker: "A city, in one view",
    category: "Full stack",
    status: "Live demo",
    short:
      "A smart city app that brings maps, weather, air quality, news, and community features together.",
    problem:
      "City information is scattered across separate tools. CityPulse gives people one place to explore what is happening around them.",
    contribution:
      "Built React views and a Spring Boot backend; added Spring Security with JWT authentication and BCrypt password hashing.",
    features: [
      "Maps and live location",
      "Weather, AQI, places, and news",
      "Community forums",
    ],
    challenge:
      "Connecting several city data sources while keeping authenticated user areas protected.",
    stack: ["React", "Spring Boot", "Spring Security", "REST APIs"],
    code: "https://github.com/KOWSIK-M/CityPulse",
    demo: "https://citypulse-kowsik.vercel.app/",
    visual: "city",
  },
  {
    id: "cli",
    number: "02",
    title: "React + Spring Boot CLI",
    kicker: "From idea to scaffold",
    category: "Developer tool",
    status: "Live website",
    short:
      "A command line generator for a React frontend and Spring Boot backend, with choices for language and build setup.",
    problem:
      "Starting a full-stack project involves repetitive setup before the first feature can be built.",
    contribution:
      "Built the generator and an interactive website for exploring configuration options and the generated project structure.",
    features: [
      "Vite or React setup",
      "Java, Kotlin, or Groovy backend",
      "Maven or Gradle wrappers",
    ],
    challenge:
      "Keeping many frontend and backend configuration paths understandable in one setup flow.",
    stack: ["Node.js", "React", "Spring Boot templates", "Vite"],
    code: "https://github.com/KOWSIK-M/react-springboot-cli",
    demo: "https://react-springboot-cli-frontend.vercel.app/",
    visual: "cli",
  },
  {
    id: "lessrepeat",
    number: "03",
    title: "LessRepeat",
    kicker: "Voice workflows with control",
    category: "AI / data",
    status: "Local MVP",
    short:
      "A self-hosted voice automation workspace for configuring agents, testing calls, and reviewing outcomes.",
    problem:
      "A voice agent needs more than a prompt: it needs calling, tenant boundaries, workflows, and reviewable outcomes.",
    contribution:
      "Built a multi-tenant dashboard and connected Dograh voice workflows with browser calling, telephony, and call review.",
    features: [
      "Browser WebRTC calls",
      "Tenant-scoped workspaces",
      "Call history and outcomes",
    ],
    challenge:
      "Keeping agent sessions and workspace data isolated while coordinating the speech, reasoning, and calling pipeline.",
    stack: ["Node.js", "Dograh", "PostgreSQL", "Redis", "Docker"],
    code: "https://github.com/KOWSIK-M/LessRepeat_VA",
    visual: "voice",
  },
  {
    id: "workskill",
    number: "04",
    title: "WorkSkillAI",
    kicker: "Make a learning gap visible",
    category: "AI / data",
    status: "Source available",
    short:
      "A skill gap application that analyzes a resume and suggests training based on proficiency.",
    problem:
      "A list of skills rarely tells a learner which gaps matter for a target role.",
    contribution:
      "Connected Gemini-powered resume analysis with React dashboards, course recommendations, and a Spring Boot and MongoDB application.",
    features: [
      "Resume analysis",
      "Interactive skill dashboards",
      "Training recommendations",
    ],
    challenge:
      "Turning resume information into a visual, actionable view of skill proficiency.",
    stack: ["React", "Spring Boot", "MongoDB", "Gemini API"],
    code: "https://github.com/KOWSIK-M/Skill-Gap-Analysis",
    visual: "skills",
  },
];

const gallery = [
  {
    title: "Anjaneya Herbals",
    category: "Full stack",
    status: "Live site",
    description:
      "An Ayurvedic storefront with a Spring Boot product API and a dedicated frontend.",
    code: "https://github.com/KOWSIK-M/ah---temp",
    demo: "https://anjaneya-herbals.vercel.app/",
    tone: "gold",
  },
  {
    title: "TempVault",
    category: "Frontend",
    status: "Local project",
    description:
      "A React interface exploring temporary file sharing and upload flows. Source is currently local.",
    tone: "lavender",
  },
  {
    title: "BidX",
    category: "Full stack",
    status: "Live demo",
    description:
      "An online bidding platform with a public repository and deployed site.",
    code: "https://github.com/KOWSIK-M/BidX",
    demo: "https://bid-x.vercel.app/",
    tone: "blue",
  },
];

const skillGroups = [
  {
    number: "01",
    title: "Backend",
    intro: "Design the routes and business logic.",
    items: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "Spring Security",
      "Microservices",
    ],
  },
  {
    number: "02",
    title: "Frontend",
    intro: "Make complex flows easy to use.",
    items: ["React", "Angular", "HTML & CSS", "JavaScript"],
  },
  {
    number: "03",
    title: "Data & storage",
    intro: "Store, query, and shape useful data.",
    items: ["MySQL", "MongoDB", "PostgreSQL", "Redis", "SQL"],
  },
  {
    number: "04",
    title: "Cloud & delivery",
    intro: "Get a project running beyond my laptop.",
    items: ["AWS", "Docker", "Git", "Maven", "Vercel"],
  },
  {
    number: "05",
    title: "AI & data",
    intro: "Connect analysis to an actual product.",
    items: [
      "Gemini API",
      "Resume analysis",
      "Data visualization",
      "Voice workflows",
    ],
  },
];

const resources = [
  {
    title: "MDN Web Docs",
    kind: "Reference",
    description:
      "Look up HTTP behavior, JavaScript, and browser APIs when building or debugging web apps.",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
  },
  {
    title: "Postman",
    kind: "API testing",
    description:
      "Send requests to your backend and inspect responses before connecting a frontend.",
    href: "https://www.postman.com/",
  },
  {
    title: "Open-Meteo",
    kind: "Free API",
    description:
      "Add forecast data to a student project without needing an API key for non-commercial use.",
    href: "https://open-meteo.com/",
  },
  {
    title: "JSONPlaceholder",
    kind: "Practice API",
    description:
      "Prototype fetching, loading, and error states using sample REST data.",
    href: "https://jsonplaceholder.typicode.com/",
  },
];

const challenges = [
  {
    label: "SCENARIO 01 / AUTH",
    request: "GET /api/profile",
    response: "401 Unauthorized",
    prompt:
      "The API works in Postman, but the signed-in web app gets 401. What should you check first?",
    choices: [
      "Send the access token in the Authorization header",
      "Change the request to POST",
      "Retry the request every second",
    ],
    answer: 0,
    why: "A protected endpoint needs a valid bearer token on the request. Check the header and token expiry before changing the route.",
  },
  {
    label: "SCENARIO 02 / METHOD",
    request: "POST /api/products/42",
    response: "405 Method Not Allowed",
    prompt: "The route exists for reading product 42. What is the likely fix?",
    choices: [
      "Add a larger request body",
      "Use GET for the read request",
      "Clear the browser cache",
    ],
    answer: 1,
    why: "405 means the path exists but does not accept that HTTP method. A read endpoint usually expects GET.",
  },
  {
    label: "SCENARIO 03 / VALIDATION",
    request: "POST /api/register",
    response: "400 Bad Request",
    prompt:
      "A valid endpoint rejects a new signup payload. What is the best next step?",
    choices: [
      "Turn off all server validation",
      "Treat 400 as success",
      "Inspect validation errors and the request body",
    ],
    answer: 2,
    why: "A 400 often means the server could not accept the payload. The response details and submitted fields show what needs fixing.",
  },
];

function ExternalLinkButton({ href, children, className = "" }) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}

function ProjectVisual({ type }) {
  if (type === "city")
    return (
      <div className="visual visual-city" aria-hidden="true">
        <div className="mock-top">
          <span>● ● ●</span>
          <span>citypulse / explore</span>
        </div>
        <div className="city-layout">
          <div className="city-map">
            <i className="map-road road-a" />
            <i className="map-road road-b" />
            <i className="map-road road-c" />
            <span className="map-pin pin-a">●</span>
            <span className="map-pin pin-b">●</span>
            <span className="map-pin pin-c">●</span>
          </div>
          <div className="city-widgets">
            <div>
              <small>LOCAL WEATHER</small>
              <strong>28°</strong>
              <span>Clear skies ↗</span>
            </div>
            <div>
              <small>AIR QUALITY</small>
              <strong>
                72 <em>AQI</em>
              </strong>
              <span>Moderate today</span>
            </div>
          </div>
        </div>
      </div>
    );
  if (type === "cli")
    return (
      <div className="visual visual-cli" aria-hidden="true">
        <div className="mock-top">
          <span>● ● ●</span>
          <span>create-react-spring / terminal</span>
        </div>
        <div className="terminal-lines">
          <span className="terminal-green">
            $ npx react-springboot-cli my-app
          </span>
          <span>
            ◇ Choose your frontend <b>Vite + React</b>
          </span>
          <span>
            ◇ Choose your backend <b>Java + Spring Boot</b>
          </span>
          <span>
            ◇ Build tool <b>Maven</b>
          </span>
          <span className="terminal-green">✓ Project structure ready_</span>
        </div>
        <div className="cli-chip">
          client/ <i>+</i> server/
        </div>
      </div>
    );
  if (type === "voice")
    return (
      <div className="visual visual-voice" aria-hidden="true">
        <div className="mock-top">
          <span>● ● ●</span>
          <span>lessrepeat / studio</span>
        </div>
        <div className="voice-orb">
          <div className="voice-rings" />
          <div className="wave">▂▆▃█▅▂▇▄▆▂</div>
        </div>
        <div className="voice-bottom">
          <span>● Agent ready</span>
          <span>Browser call · Voice workflow</span>
        </div>
      </div>
    );
  return (
    <div className="visual visual-skills" aria-hidden="true">
      <div className="mock-top">
        <span>● ● ●</span>
        <span>workskillai / insights</span>
      </div>
      <div className="skill-chart">
        <div className="chart-heading">
          Skill picture <span>↗</span>
        </div>
        <div className="chart-row">
          <span>Backend</span>
          <i style={{ width: "84%" }} />
        </div>
        <div className="chart-row">
          <span>Cloud</span>
          <i style={{ width: "57%" }} />
        </div>
        <div className="chart-row">
          <span>Data</span>
          <i style={{ width: "70%" }} />
        </div>
        <div className="chart-note">Explore a learning path →</div>
      </div>
    </div>
  );
}

function DebugChallenge() {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const challenge = challenges[index];
  const chooseNext = () => {
    setIndex((index + 1) % challenges.length);
    setChoice(null);
  };
  return (
    <section id="challenge" className="section challenge-section">
      <div className="container challenge-grid">
        <div className="challenge-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> OPTIONAL SIDE QUEST
          </div>
          <h2>
            Debug the <em>API.</em>
          </h2>
          <p>
            Three quick situations from everyday web development. Pick the fix,
            get feedback, and carry on exploring.
          </p>
          <div className="challenge-meta">
            <Terminal size={18} />
            <span>No account. No timer. Just one good decision.</span>
          </div>
        </div>
        <div className="challenge-card">
          <div className="challenge-head">
            <span>{challenge.label}</span>
            <span>0{index + 1} / 03</span>
          </div>
          <div className="request-line">
            <span>{challenge.request}</span>
            <strong>{challenge.response}</strong>
          </div>
          <h3>{challenge.prompt}</h3>
          <div className="choice-list">
            {challenge.choices.map((item, i) => (
              <button
                key={item}
                type="button"
                className={`choice ${choice === i ? (i === challenge.answer ? "correct" : "incorrect") : ""}`}
                onClick={() => setChoice(i)}
                disabled={choice !== null}
              >
                <span className="choice-key">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{item}</span>
                {choice === i &&
                  (i === challenge.answer ? (
                    <Check size={18} />
                  ) : (
                    <X size={18} />
                  ))}
              </button>
            ))}
          </div>
          {choice !== null && (
            <div className="feedback" role="status">
              <strong>
                {choice === challenge.answer
                  ? "Nice catch."
                  : "Close — try this path."}
              </strong>
              <p>{challenge.why}</p>
              <button type="button" onClick={chooseNext}>
                Next scenario <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return (
        localStorage.getItem("kowsik-theme") ||
        (window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark")
      );
    } catch {
      return "dark";
    }
  });
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("kowsik-theme", theme);
  }, [theme]);
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setPaletteOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = paletteOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [paletteOpen]);
  const current = projects[selected];
  const nav = [
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];
  const go = (href) => {
    setPaletteOpen(false);
    setMenuOpen(false);
    document
      .querySelector(href)
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container nav-inner">
          <a href="#top" className="brand" aria-label="M. Kowsik, back to top">
            <span className="brand-mark">
              K<span>•</span>
            </span>
            <span className="brand-name">
              M. KOWSIK<span className="brand-slash">/</span>DEV
            </span>
          </a>
          <nav
            className={`main-nav ${menuOpen ? "open" : ""}`}
            aria-label="Main navigation"
          >
            {nav.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={14} />
            </a>
            <a href={RESUME} download="Medam_Kowsik_Resume.pdf">
              Resume <Download size={14} />
            </a>
          </nav>
          <div className="nav-tools">
            <button
              className="icon-button command-button"
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open quick navigation"
            >
              <Command size={17} />
              <span>⌘ K</span>
            </button>
            <button
              className="icon-button"
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button
              className="icon-button menu-button"
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section id="top" className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" /> VIJAYAWADA, INDIA{" "}
                <span className="eyebrow-divider">/</span> OPEN TO OPPORTUNITIES
              </div>
              <h1>
                Building the
                <br />
                <span className="hero-line">
                  logic <em>behind</em>
                </span>
                <br />
                the experience<span className="hero-period">.</span>
              </h1>
              <p className="hero-intro">
                I’m <strong>M. Kowsik</strong> — a computer science graduate who
                builds full-stack products with Java, Spring Boot, React, and
                data. I like the part where a useful idea becomes a working
                system.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  View projects <ArrowRight size={18} />
                </a>
                <a
                  className="button button-secondary"
                  href={RESUME}
                  download="Medam_Kowsik_Resume.pdf"
                >
                  Download resume <Download size={17} />
                </a>
              </div>
              <div className="hero-social">
                <span>FIND ME ON</span>
                <ExternalLinkButton href={GITHUB}>GitHub</ExternalLinkButton>
                <ExternalLinkButton href={LINKEDIN}>
                  LinkedIn
                </ExternalLinkButton>
              </div>
            </div>
            <div
              className="hero-world"
              aria-label="Illustration of connected ideas becoming working software"
            >
              <div className="world-rail">
                <span>WORLD / 001</span>
                <span>SCROLL TO EXPLORE ↓</span>
              </div>
              <div className="world-main">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="world-core">
                  <span className="core-code">&lt;/&gt;</span>
                  <span className="core-caption">IDEA → SYSTEM</span>
                </div>
                <div className="world-node node-react">
                  <span>◈</span> React
                </div>
                <div className="world-node node-java">
                  <span>☕</span> Java
                </div>
                <div className="world-node node-data">
                  <span>▥</span> Data
                </div>
                <div className="world-star star-one">✦</div>
                <div className="world-star star-two">✳</div>
                <div className="world-star star-three">✦</div>
              </div>
              <div className="world-footer">
                <span className="world-indicator">
                  <i /> SYSTEMS ONLINE
                </span>
                <span>BUILD / LEARN / REPEAT</span>
              </div>
            </div>
          </div>
          <a className="hero-scroll" href="#projects">
            <ArrowDown size={15} /> SCROLL TO WORK
          </a>
        </section>
        <section id="projects" className="section projects-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="eyebrow section-label">
                  <span className="eyebrow-dot" /> SELECTED WORK / 01—04
                </div>
                <h2>
                  Proof in the <em>projects.</em>
                </h2>
              </div>
              <p>
                Different problems, same approach: understand the system, build
                the useful parts, then make them pleasant to use.
              </p>
            </div>
            <div className="project-explorer">
              <div
                className="project-list"
                role="tablist"
                aria-label="Featured projects"
              >
                {projects.map((project, i) => (
                  <button
                    className={`project-tab ${selected === i ? "active" : ""}`}
                    id={`tab-${project.id}`}
                    role="tab"
                    aria-selected={selected === i}
                    aria-controls="project-panel"
                    tabIndex={selected === i ? 0 : -1}
                    key={project.id}
                    onClick={() => setSelected(i)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                        e.preventDefault();
                        const n = (i + 1) % projects.length;
                        setSelected(n);
                        document
                          .getElementById(`tab-${projects[n].id}`)
                          ?.focus();
                      }
                      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                        e.preventDefault();
                        const n = (i - 1 + projects.length) % projects.length;
                        setSelected(n);
                        document
                          .getElementById(`tab-${projects[n].id}`)
                          ?.focus();
                      }
                    }}
                  >
                    <span className="project-tab-number">{project.number}</span>
                    <span className="project-tab-main">
                      <strong>{project.title}</strong>
                      <small>
                        {project.category} <span>·</span> {project.status}
                      </small>
                    </span>
                    <ChevronRight size={20} />
                  </button>
                ))}
              </div>
              <div
                className="project-panel"
                id="project-panel"
                role="tabpanel"
                aria-labelledby={`tab-${current.id}`}
                key={current.id}
              >
                <ProjectVisual type={current.visual} />
                <div className="project-details">
                  <div className="project-detail-top">
                    <span className="project-kicker">{current.kicker}</span>
                    <span className="status-pill">
                      <i />
                      {current.status}
                    </span>
                  </div>
                  <h3>{current.title}</h3>
                  <p className="project-short">{current.short}</p>
                  <div className="case-grid">
                    <div>
                      <span>THE PROBLEM</span>
                      <p>{current.problem}</p>
                    </div>
                    <div>
                      <span>MY PART</span>
                      <p>{current.contribution}</p>
                    </div>
                    <div>
                      <span>THE CHALLENGE</span>
                      <p>{current.challenge}</p>
                    </div>
                    <div>
                      <span>KEY FEATURES</span>
                      <ul>
                        {current.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="project-bottom">
                    <div className="tags">
                      {current.stack.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      <ExternalLinkButton href={current.code}>
                        View code
                      </ExternalLinkButton>
                      {current.demo && (
                        <ExternalLinkButton href={current.demo}>
                          Live site
                        </ExternalLinkButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gallery-intro">
              <div>
                <div className="eyebrow section-label">
                  MORE FROM THE WORKBENCH
                </div>
                <h3>Other explorations</h3>
              </div>
              <div className="filter-list" aria-label="Filter projects">
                {["All", "Full stack", "Frontend"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={filter === f ? "active" : ""}
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="gallery-grid">
              {gallery
                .filter((p) => filter === "All" || p.category === filter)
                .map((p) => (
                  <article
                    className={`gallery-card tone-${p.tone}`}
                    key={p.title}
                  >
                    <div className="gallery-card-top">
                      <span>↗</span>
                      <span>{p.status}</span>
                    </div>
                    <div>
                      <span className="gallery-category">{p.category}</span>
                      <h4>{p.title}</h4>
                      <p>{p.description}</p>
                    </div>
                    <div className="gallery-links">
                      {p.code ? (
                        <ExternalLinkButton href={p.code}>
                          Source
                        </ExternalLinkButton>
                      ) : (
                        <span>Source currently local</span>
                      )}
                      {p.demo && (
                        <ExternalLinkButton href={p.demo}>
                          Live site
                        </ExternalLinkButton>
                      )}
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>
        <DebugChallenge />
        <section id="skills" className="section skills-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="eyebrow section-label">
                  <span className="eyebrow-dot" /> TOOLKIT / 05 AREAS
                </div>
                <h2>
                  What I can <em>build with.</em>
                </h2>
              </div>
              <p>
                Skills grouped by what they help me do, grounded in the resume
                and the projects above.
              </p>
            </div>
            <div className="skills-grid">
              {skillGroups.map((g) => (
                <article className="skill-card" key={g.title}>
                  <span className="skill-number">{g.number} / 05</span>
                  <h3>{g.title}</h3>
                  <p>{g.intro}</p>
                  <div className="skill-items">
                    {g.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div className="about-left">
              <div className="eyebrow section-label">
                <span className="eyebrow-dot" /> BEYOND THE CODE
              </div>
              <h2>
                Curious about the <em>whole system.</em>
              </h2>
              <p>
                I enjoy the stretch from a backend rule to the screen where
                someone actually uses it. That is why my work moves between Java
                APIs, React interfaces, databases, and deployment.
              </p>
              <p>
                I’m based in Vijayawada, Andhra Pradesh. Outside building
                software, I enjoy drawing and learning new things.
              </p>
              <a
                className="text-link"
                href={`mailto:${EMAIL}?subject=Hello%20Kowsik`}
              >
                Start a conversation <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <span className="timeline-icon">
                  <Code2 size={18} />
                </span>
                <div>
                  <span className="timeline-date">FEB–MAY 2026</span>
                  <h3>Program Analyst Intern</h3>
                  <strong>Cognizant Technology Solutions</strong>
                  <p>
                    Hands-on Java full-stack and Angular training. Worked with a
                    team on a Subscription Billing System in an agile
                    environment.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-icon">
                  <BookOpen size={18} />
                </span>
                <div>
                  <span className="timeline-date">2022–2026</span>
                  <h3>B.Tech, Computer Science & Engineering</h3>
                  <strong>KL University · Guntur</strong>
                  <p>
                    Specialized in Data Science and Big Data Analytics. Resume
                    records a 9.55/10 CGPA.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-icon">
                  <RotateCcw size={18} />
                </span>
                <div>
                  <span className="timeline-date">HOW I WORK</span>
                  <h3>Make it useful. Then make it clear.</h3>
                  <p>
                    I like practical projects that connect technical decisions
                    to a real user flow, with room to refine both the behavior
                    and the interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="resources" className="section resources-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="eyebrow section-label">
                  <span className="eyebrow-dot" /> FOR STUDENTS
                </div>
                <h2>
                  Useful starting <em>points.</em>
                </h2>
              </div>
              <p>
                A few links I recommend for building and debugging student
                projects. This is a resource list, not a claim that I used every
                tool here.
              </p>
            </div>
            <div className="resources-grid">
              {resources.map((r, i) => (
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-card"
                  key={r.title}
                >
                  <div className="resource-top">
                    <span>
                      0{i + 1} / {r.kind}
                    </span>
                    <ArrowUpRight size={19} />
                  </div>
                  <h3>{r.title}</h3>
                  <p>{r.description}</p>
                  <span className="resource-visit">
                    Visit resource <ArrowRight size={16} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="container contact-inner">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" /> NEXT CONNECTION
              </div>
              <h2>
                Have something
                <br />
                <em>worth building?</em>
              </h2>
              <p>
                I’m interested in full-stack and backend opportunities,
                thoughtful products, and conversations with other builders.
              </p>
              <div className="contact-actions">
                <a
                  className="button button-primary"
                  href={`mailto:${EMAIL}?subject=Hello%20Kowsik`}
                >
                  Email me <Send size={17} />
                </a>
                <a
                  className="button button-outline"
                  href={RESUME}
                  download="Medam_Kowsik_Resume.pdf"
                >
                  Download resume <Download size={17} />
                </a>
              </div>
              <span className="contact-email">{EMAIL}</span>
            </div>
            <div className="contact-art" aria-hidden="true">
              <div className="contact-orbit">
                <div className="contact-center">@</div>
                <span className="contact-spark spark-a">✳</span>
                <span className="contact-spark spark-b">✦</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <a href="#top" className="footer-brand">
            K<span>•</span> <small>M. KOWSIK</small>
          </a>
          <span>Built with intent in Vijayawada, India.</span>
          <div>
            <ExternalLinkButton href={GITHUB}>GitHub</ExternalLinkButton>
            <ExternalLinkButton href={LINKEDIN}>LinkedIn</ExternalLinkButton>
            <a href={`mailto:${EMAIL}`}>
              Email <Mail size={15} />
            </a>
          </div>
        </div>
      </footer>
      {paletteOpen && (
        <div
          className="palette-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setPaletteOpen(false);
          }}
        >
          <div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-labelledby="palette-title"
          >
            <div className="palette-title">
              <Command size={18} />
              <strong id="palette-title">Jump somewhere</strong>
              <button
                type="button"
                onClick={() => setPaletteOpen(false)}
                aria-label="Close quick navigation"
              >
                <X size={18} />
              </button>
            </div>
            <div className="palette-options">
              {[
                ...nav,
                { name: "Debug challenge", href: "#challenge" },
                { name: "Student resources", href: "#resources" },
              ].map((n) => (
                <button key={n.name} onClick={() => go(n.href)}>
                  <span>{n.name}</span>
                  <ArrowRight size={17} />
                </button>
              ))}
              <a
                href={RESUME}
                download="Medam_Kowsik_Resume.pdf"
                onClick={() => setPaletteOpen(false)}
              >
                Download resume <Download size={17} />
              </a>
            </div>
            <p>TIP: press Esc to close · Ctrl/⌘ K to open</p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
