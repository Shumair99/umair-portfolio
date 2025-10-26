"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type BlogSection = {
  heading?: string;
  body: string[];
};

type BlogPost = {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  sections: BlogSection[];
};

const blogPosts: BlogPost[] = [
  {
    id: "crafting-rl-env",
    title: "Designing a Reinforcement Learning Playground from Scratch",
    description:
      "Lessons learned while building a Gymnasium-compatible Franka Panda environment where a robot learns to flip the perfect omelette.",
    date: "October 2024",
    readTime: "2 min read",
    tags: ["Reinforcement Learning", "PyBullet", "Python", "Stable Baselines3"],
    sections: [
      {
        heading: "Why build a custom environment?",
        body: [
          "Most RL tutorials stop at classic control tasks. I wanted to push further and simulate something tangible: a Franka Panda wrist flicking a pan. Building my own environment forced me to think about reward design, state representation, and reproducibility at a much deeper level.",
        ],
      },
      {
        heading: "Reward shaping without falling into traps",
        body: [
          "The biggest challenge was balancing dense rewards with a sparse success signal. I started with a basic waypoint reward, layered in velocity constraints, and eventually introduced a shaped term for pan orientation. Every additional signal was validated with TensorBoard runs to ensure I wasn't encouraging reward-hacking behaviours.",
        ],
      },
      {
        heading: "Takeaways",
        body: [
          "- Simulator fidelity matters less than consistent resets.",
          "- Logging tactile metrics (pan angular velocity, wrist torque) prevented me from chasing ghosts.",
          "- PPO remained the most stable baseline, but SAC won once I dialled in entropy regularisation.",
        ],
      },
    ],
  },
];

export default function BlogPage() {
  const [activePostId, setActivePostId] = useState<string>(blogPosts[0]?.id ?? "");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const activePost = useMemo(() => {
    return blogPosts.find((post) => post.id === activePostId) ?? blogPosts[0];
  }, [activePostId]);

  const openMobileSidebar = () => setMobileSidebarOpen(true);
  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  return (
    <div className="relative flex min-h-screen bg-[#202123] text-[#ececf1]">
      <aside className="hidden w-full max-w-xs flex-col border-r border-white/10 bg-[#171717] px-5 py-8 md:flex">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold uppercase tracking-wide text-white/50">Umair&apos;s Blog</div>
          <Link
            href="/"
            className="hidden items-center justify-center rounded-lg px-5 py-3 text-white transition hover:bg-white/10 md:inline-flex"
            aria-label="Home"
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
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
          </Link>
        </div>

        <div className="mt-8 space-y-6 overflow-y-auto pr-1 text-sm">
          {blogPosts.map((post) => {
            const isActive = post.id === activePost.id;
            return (
              <button
                key={post.id}
                type="button"
                className={`w-full rounded-2xl border border-white/10 px-4 py-4 text-left transition ${
                  isActive
                    ? "bg-white/10"
                    : "bg-transparent text-white/70 hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => setActivePostId(post.id)}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-wide text-white/50">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-white">{post.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/60">{post.description}</p>
              </button>
            );
          })}
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
                <div className="text-sm font-medium text-white">Umair&apos;s Blog</div>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                onClick={closeMobileSidebar}
                aria-label="Close blog sidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 6 12 12M6 18 18 6" />
                </svg>
              </button>
            </div>

            <Link
              href="/"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              onClick={closeMobileSidebar}
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
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <span>Home</span>
            </Link>

            <div className="mt-6 space-y-4 overflow-y-auto pr-1 text-sm">
              <p className="px-1 text-xs uppercase tracking-wide text-white/40">Projects</p>
              {blogPosts.map((post) => {
                const isActive = post.id === activePost.id;
                return (
                  <button
                    key={`mobile-${post.id}`}
                    type="button"
                    className={`w-full rounded-2xl border border-white/10 px-4 py-4 text-left transition ${
                      isActive ? "bg-white/10" : "bg-transparent text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => {
                      setActivePostId(post.id);
                      closeMobileSidebar();
                    }}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-wide text-white/50">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-white">{post.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/60">{post.description}</p>
                  </button>
                );
              })}
            </div>
          </aside>
        </>
      )}

      <main className="flex flex-1 justify-center overflow-y-auto bg-[#202123] px-4 py-8 md:px-20 md:py-12">
        {!mobileSidebarOpen && (
          <button
            type="button"
            className="fixed left-4 top-2 z-40 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white shadow-md backdrop-blur hover:bg-white/20 md:hidden"
            onClick={openMobileSidebar}
            aria-label="Open blog sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
            </svg>
          </button>
        )}
        <div className="w-full max-w-4xl lg:max-w-5xl">
          <header className="space-y-4 pt-4 md:pt-0">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-white/50">
              <span>{activePost.date}</span>
              <span>/</span>
              <span>{activePost.readTime}</span>
            </div>
            <h1 className="text-3xl font-semibold text-white md:text-4xl">{activePost.title}</h1>
            <p className="text-sm leading-relaxed text-white/70">{activePost.description}</p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {activePost.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <article className="mt-10 space-y-10 text-sm leading-relaxed text-white/80">
            {activePost.sections.map((section, index) => (
              <section key={section.heading ? `${activePost.id}-${section.heading}` : `${activePost.id}-${index}`}>
                {section.heading && <h2 className="text-lg font-semibold text-white">{section.heading}</h2>}
                <div className="mt-3 space-y-3">
                  {section.body.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
            <span>Enjoyed the read? Share your thoughts with me on LinkedIn or drop an email.</span>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60 transition hover:border-white/30 hover:text-white"
              >
                Back to portfolio
              </Link>
              <Link
                href="mailto:umairahmed0121@hotmail.com"
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
              >
                Email Umair
              </Link>
            </div>
          </footer>
        </div>
      </main>

    </div>
  );
}
