'use client';

import { useState } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import Constellation from "@/components/Constellation";
import ChatWorkspace from "@/components/ChatWorkspace";
import rlOmeletteImg from "@/assets/projects/omelette-rl.png";
import shortyImg from "@/assets/projects/shortyurl.png";
import docuqaImg from "@/assets/projects/docuqa.png";
import stockBotImg from "@/assets/projects/stock-bot.png";
import portfolioImg from "@/assets/projects/portfolio.png";

type ProjectStatus = "complete" | "incomplete";

type Project = {
  id: string;
  name: string;
  image: StaticImageData;
  imageWidth?: number;
  imageHeight?: number;
  description: string;
  subheading: string;
  subheadingLink?: string;
  status: ProjectStatus;
  tags?: string[];
};

const primaryNav = [
  {
    label: "Resume",
    href: "/resume.pdf",
    external: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 4.5A1.5 1.5 0 0 1 6.5 3h11A1.5 1.5 0 0 1 19 4.5V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6M9 12h6M9 16h6" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/Shumair99",
    external: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85V22"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/umair-ahmed01",
    external: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
        />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Blog",
    href: "/blog-coming-soon",
    external: false,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
        />
        <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
        <path d="M2 6h4" />
        <path d="M2 10h4" />
        <path d="M2 14h4" />
        <path d="M2 18h4" />
      </svg>
    ),
  },
];

const projects: Project[] = [
  {
    id: "rl-omelette",
    name: "RL Omelette Environment",
    image: rlOmeletteImg,
    imageWidth: 404,
    imageHeight: 294,
    description:
      `A custom reinforcement learning environment built in Python and PyBullet, where a Franka Panda robot learns to flip a rigid-body omelette through reward shaping, policy optimisation, and iterative testing using Stable Baselines3.`,
    subheading: "Teaching a robot arm to flip omelettes using RL",
    status: "complete",
    tags: [
      "Python",
      "PyTorch",
      "Gymnasium",
      "Stable Baselines3",
      "TensorFlow",
      "Reinforcement Learning",
      "Robotics",
      "PPO",
      "SAC",
    ],
  },
  {
    id: "shorty",
    name: "Shorty URL Shortener",
    image: shortyImg,
    description:
      "A production-ready link shortener with analytics, rate limiting, and shareable QR codes. Built with Spring Boot, PostgreSQL, and a sleek React dashboard.",
    subheading: "Live deployment on shortyurl.live",
    subheadingLink: "https://shortyurl.live",
    status: "complete",
    tags: ["Java", "Spring Boot", "PostgreSQL", "REST API", "Docker", "Caddy", "VPS Deployment", "CI/CD"],
  },
  {
    id: "docuqa",
    name: "DocuQA RAG Document Summariser",
    image: docuqaImg,
    description:
      "Retrieval Augmented Generation workflow that ingests technical docs and produces conversational summaries. Includes chunking pipelines, embedding search, and a simple Next.js UI.",
    subheading: "",
    status: "complete",
    tags: ["Python", "FastAPI", "React", "TypeScript", "Tailwind", "RAG", "LangChain", "OpenAI API"],
  },
  {
    id: "stockbot",
    name: "Trading Card Stock Alert Bot",
    image: stockBotImg,
    description:
      "An automated web scraping and monitoring system that tracks restocks for rare trading card products and instantly sends alerts via Discord webhooks. Built with Playwright for browser automation with built-in proxy rotation for anti-bot evasion",
    subheading: "Real-time stock monitor for limited trading card releases",
    status: "complete",
    tags: [
      "Python",
      "Playwright",
      "AsyncIO",
      "Discord Webhooks",
      "Web Scraping",
      "Proxy Rotation",
    ],
  },
  {
    id: "portfolio",
    name: "This Website",
    image: portfolioImg,
    description:
      "A ChatGPT-style portfolio that introduces me through conversation and showcases my projects and blog. Built with Next.js, Tailwind, and Framer Motion for smooth animations and a particles background for a modern feel. Deployed automatically using a CI/CD pipeline with Docker, Caddy, and GitHub Actions to a Hetzner VPS.",
    subheading: "Designing immersive storytelling for umairdot.dev",
    status: "complete",
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
      "CI/CD"
    ],
  },
];

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);
  const openMobileSidebar = () => setMobileSidebarOpen(true);
  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  const asideWidth = sidebarCollapsed ? "w-20" : "w-64";
  const navItemBaseClasses =
    "flex w-full items-center rounded-lg px-3 py-2 text-left font-medium text-white transition hover:bg-white/10";

  const renderPrimaryNav = (withLabels: boolean, onNavigate?: () => void) => (
    <div className="space-y-1 pb-5">
      {primaryNav.map((item) => {
        const linkClasses = `${navItemBaseClasses} ${withLabels ? "gap-3" : "justify-center gap-0"}`;
        const label = withLabels ? <span>{item.label}</span> : null;
        const icon = (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
            {item.icon}
          </span>
        );

        if (item.external) {
          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
              onClick={onNavigate}
            >
              {icon}
              {label}
            </a>
          );
        }

        return (
          <Link key={item.label} href={item.href} className={linkClasses} onClick={onNavigate}>
            {icon}
            {label}
          </Link>
        );
      })}
    </div>
  );

  const renderProjects = (onNavigate?: () => void) => (
    <div className="space-y-2">
      <p className="px-3 text-xs uppercase tracking-wide text-white/35">Projects</p>
      <div className="space-y-1">
        {projects.map((project) => {
          const isActive = project.id === activeProjectId;
          return (
            <button
              key={project.id}
              type="button"
              className={`w-full truncate rounded-lg px-3 py-2 text-left transition hover:bg-white/10 hover:text-white ${
                isActive ? "bg-white/15 text-white shadow-[0_0_14px_rgba(255,255,255,0.12)]" : "text-white/70"
              }`}
              onClick={() => {
                setActiveProjectId((prev) => (prev === project.id ? null : project.id));
                onNavigate?.();
              }}
              aria-pressed={isActive}
            >
              {project.name}
            </button>
          );
        })}
      </div>
    </div>
  );

  const activeProject = activeProjectId ? projects.find((project) => project.id === activeProjectId) ?? null : null;
  const activeProjectStatus: ProjectStatus | null = activeProject?.status ?? null;
  const isActiveProjectComplete = activeProjectStatus === "complete";
  const activeProjectImageWidth = activeProject
    ? activeProject.imageWidth ?? ("width" in activeProject.image ? activeProject.image.width : undefined)
    : undefined;
  const activeProjectImageHeight = activeProject
    ? activeProject.imageHeight ?? ("height" in activeProject.image ? activeProject.image.height : undefined)
    : undefined;

  const statusDotGlow = isActiveProjectComplete
    ? "before:bg-[#22c55e]/50 after:bg-[#22c55e]"
    : "before:bg-[#f87171]/50 after:bg-[#f87171]";
  const statusLabel = isActiveProjectComplete ? "Complete" : "Incomplete";

  return (
    <div className="flex h-screen overflow-hidden bg-[#202123] text-[#ececf1]">
      <aside
        className={`hidden ${asideWidth} flex-col border-r border-white/10 bg-[#171717] transition-all duration-300 md:flex`}
      >
        <div className={`flex items-center justify-between ${sidebarCollapsed ? "px-2" : "px-4"} py-5`}>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3 pl-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
              </span>
              <div className="text-sm font-medium text-white">Workspace</div>
            </div>
          )}
          <button
            type="button"
            className={`hidden items-center justify-center rounded-lg px-5 py-3 text-white transition hover:bg-white/10 md:inline-flex ${
              sidebarCollapsed ? "mx-auto" : ""
            }`}
            aria-label="Sidebar layout options"
            aria-expanded={!sidebarCollapsed}
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
            </svg>
          </button>
        </div>

        <nav
          className={`flex-1 overflow-y-auto text-sm text-white/70 ${sidebarCollapsed ? "px-2" : "px-4"}`}
        >
          {renderPrimaryNav(!sidebarCollapsed)}

          {!sidebarCollapsed && renderProjects()}
        </nav>

        <div
          className={`border-t border-white/10 text-sm text-white ${sidebarCollapsed ? "px-2 py-4" : "px-4 py-4"}`}
        >
          <div className={`flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"}`}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9157d3] text-xs font-semibold uppercase text-white">
              UA
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-medium">Umair Ahmed</span>
                <span className="text-xs text-white/50">Plus</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={closeMobileSidebar}
            aria-hidden="true"
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#171717] px-4 py-5 md:hidden">
            <div className="flex items-center justify-between pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                </span>
                <div className="text-sm font-medium text-white">Workspace</div>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                onClick={closeMobileSidebar}
                aria-label="Close sidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 6 12 12M6 18 18 6" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto text-sm text-white/70">
              {renderPrimaryNav(true, closeMobileSidebar)}
              {renderProjects(closeMobileSidebar)}
            </nav>

            <div className="border-t border-white/10 pt-4 text-sm text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9157d3] text-xs font-semibold uppercase text-white">
                  UA
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium">Umair Ahmed</span>
                  <span className="text-xs text-white/50">Plus</span>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}

      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div className="flex flex-1 flex-wrap items-center gap-2 sm:flex-none sm:gap-3">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-white/10 md:hidden"
              onClick={openMobileSidebar}
              aria-label="Open sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-5 w-5"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 3v18" />
              </svg>
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/70 sm:text-sm">
            <button className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 hover:bg-white/10 sm:px-4">
              <span className="uppercase tracking-wide text-[0.65rem] text-white/60 sm:text-xs">Status</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#22c55e]/20 px-2 py-0.5 text-[0.65rem] font-medium text-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.45)] sm:text-xs">
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e]/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
                </span>
                Looking for work
              </span>
            </button>
            <a
              href="mailto:umairahmed0121@hotmail.com"
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10 sm:px-4 sm:text-sm"
            >
              Contact me
            </a>
          </div>
        </header>

        <div className="relative flex flex-1 items-stretch justify-center overflow-hidden min-h-0 px-4 py-0">
          <Constellation className="pointer-events-none absolute inset-0 z-0 opacity-25 md:opacity-20" />
          <ChatWorkspace />

          {activeProject && (
            <>
              <div
                className="absolute inset-0 z-10 bg-black/70 backdrop-blur-md transition-opacity"
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4 py-10 sm:px-6">
                <div className="pointer-events-auto relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-[0_0_55px_rgba(0,0,0,0.65)]">
                  <div className="border-b border-white/10 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-1.5 text-xs uppercase tracking-wide text-white/60">
                        {statusLabel}
                        <span
                          className={`relative flex h-2.5 w-2.5 items-center justify-center before:absolute before:h-4 before:w-4 before:animate-ping before:rounded-full before:content-[''] after:h-2 after:w-2 after:rounded-full after:content-[''] ${statusDotGlow}`}
                          aria-hidden="true"
                        />
                      </span>
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                        onClick={() => setActiveProjectId(null)}
                        aria-label="Close project panel"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-5 w-5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m6 6 12 12M6 18 18 6" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-6 space-y-2 text-center">
                      <h1 className="text-2xl font-semibold text-white">{activeProject.name}</h1>
                      {activeProject.subheading && (
                        <h2 className="text-sm text-white/70">
                          {activeProject.subheadingLink ? (
                            <Link
                              href={activeProject.subheadingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white/80 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white/60"
                            >
                              {activeProject.subheading}
                            </Link>
                          ) : (
                            activeProject.subheading
                          )}
                        </h2>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6 text-center">
                    <div className="flex w-full justify-center">
                      <Image
                        src={activeProject.image}
                        alt={activeProject.name}
                        quality={80}
                        width={activeProjectImageWidth}
                        height={activeProjectImageHeight}
                        className="h-auto max-w-full rounded-2xl border border-white/10 bg-white/5 object-contain"
                        priority
                      />
                    </div>
                    <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/70 whitespace-pre-line">
                      {activeProject.description}
                    </p>
                    {activeProject.tags && activeProject.tags.length > 0 && (
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                        {activeProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 shadow-[0_0_12px_rgba(255,255,255,0.08)] backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}


