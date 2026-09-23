export const portfolioFacts = [
  {
    id: "identity",
    title: "About M. Kowsik",
    url: "https://github.com/KOWSIK-M",
    fact: "M. Kowsik is Medam Kowsik, a computer science graduate based in Vijayawada, Andhra Pradesh. He focuses on Java, Spring Boot, backend development, React, databases, cloud deployment, and practical full-stack products.",
  },
  {
    id: "education",
    title: "Resume · Education",
    url: "/Medam_Kowsik_Resume.pdf",
    fact: "Kowsik completed a B.Tech in Computer Science and Engineering at KL University, Guntur, from 2022 to 2026. His resume reports a 9.55/10 CGPA. His specialization is Data Science and Big Data Analytics.",
  },
  {
    id: "experience",
    title: "Resume · Experience",
    url: "/Medam_Kowsik_Resume.pdf",
    fact: "Kowsik was a Program Analyst Intern at Cognizant Technology Solutions from February to May 2026. He received Java full-stack and Angular training and worked with a team on a Subscription Billing System in an agile environment.",
  },
  {
    id: "citypulse",
    title: "CityPulse source",
    url: "https://github.com/KOWSIK-M/CityPulse",
    fact: "CityPulse is a smart-city application built with React and Spring Boot. It combines maps, live location, weather, AQI, places, news, and community forums. Kowsik implemented Spring Security with JWT authentication and BCrypt password hashing. Its frontend has a live demo at https://citypulse-kowsik.vercel.app/.",
  },
  {
    id: "cli",
    title: "React + Spring Boot CLI source",
    url: "https://github.com/KOWSIK-M/react-springboot-cli",
    fact: "Kowsik built a React + Spring Boot project generator CLI and an interactive frontend. The CLI offers React setup with choices such as Vite, Java/Kotlin/Groovy backend languages, Maven/Gradle, and project packaging. The public website is https://react-springboot-cli-frontend.vercel.app/.",
  },
  {
    id: "lessrepeat",
    title: "LessRepeat source",
    url: "https://github.com/KOWSIK-M/LessRepeat_VA",
    fact: "LessRepeat is a self-hosted AI voice automation local MVP. It has a multi-tenant dashboard, Dograh voice workflows, browser WebRTC calling, telephony integration, and call history. Its repository describes the MVP as optimized for local demonstrations; there is no verified public live demo.",
  },
  {
    id: "workskill",
    title: "WorkSkillAI source",
    url: "https://github.com/KOWSIK-M/Skill-Gap-Analysis",
    fact: "WorkSkillAI is a skill-gap application using React, Spring Boot, MongoDB, and Gemini API. It analyzes resumes, shows skill dashboards, and recommends training. Source is public; no live demo has been verified.",
  },
  {
    id: "anjaneya",
    title: "Anjaneya Herbals source",
    url: "https://github.com/KOWSIK-M/ah---temp",
    fact: "Anjaneya Herbals is an Ayurvedic storefront with a dedicated frontend and Spring Boot product API. Its live storefront is https://anjaneya-herbals.vercel.app/.",
  },
  {
    id: "contact",
    title: "Contact",
    url: "mailto:medamkowsik2004@gmail.com",
    fact: "Visitors can contact Kowsik at medamkowsik2004@gmail.com, find his work at https://github.com/KOWSIK-M, and connect on LinkedIn at https://www.linkedin.com/in/medam-kowsik-975479282/. His actual resume PDF is available at /Medam_Kowsik_Resume.pdf.",
  },
];

export const factById = Object.fromEntries(
  portfolioFacts.map((fact) => [fact.id, fact]),
);
