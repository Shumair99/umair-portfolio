"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Constellation from "@/components/Constellation";

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
    readTime: "9 min read",
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
          "The biggest challenge was balancing dense rewards with a sparse success signal. I started with a basic waypoint reward, layered in velocity constraints, and eventually introduced a shaped term for pan orientation. Every additional signal was validated with tensorboard runs to ensure I wasn’t encouraging reward hacking behaviours.",
        ],
      },
      {
        heading: "Takeaways",
        body: [
          "• Simulator fidelity matters less than consistent resets.",
          "• Logging tactile metrics (pan angular velocity, wrist torque) prevented me from chasing ghosts.",
          "• PPO remained the most stable baseline, but SAC won once I dialled in entropy regularisation.",
        ],
      },
    ],
  },
  {
    id: "bootstrapping-shorty",
    title: "Shipping Shorty: From CRUD Idea to Production Link Shortener",
    description:
      "How I iterated from a weekend prototype into a production-ready URL shortener with analytics, rate limiting, and CI/CD guardrails.",
    date: "August 2024",
    readTime: "7 min read",
    tags: ["Java", "Spring Boot", "PostgreSQL", "DevOps"],
    sections: [
      {
        heading: "Start with constraints",
        body: [
          "I scoped Shorty around three promises: links should resolve in <30ms, analytics must be near real-time, and the API should be boring to integrate. Those constraints drove tech choices—Spring Boot for ergonomics, PostgreSQL for transactional guarantees, and Redis for hot-path caching.",
        ],
      },
      {
        heading: "Operationalising a side project",
        body: [
          "Observability was non-negotiable. I wired structured logs with Logback, collected request traces, and exported Prometheus metrics for rate-limited requests. The deployment pipeline ships via GitHub Actions to a Dockerised VPS, running migrations automatically before rolling out application containers.",
        ],
      },
      {
        heading: "What I’d do next",
        body: [
          "• Introduce streaming analytics via ClickHouse.",
          "• Add bring-your-own-domain support with automated DNS verification.",
          "• Experiment with OpenTelemetry to unify tracing between the API and React dashboard.",
        ],
      },
    ],
  },
  {
    id: "rag-pitfalls",
    title: "RAG Without the Hype: What Actually Breaks First",
    description:
      "Three practical lessons from building DocuQA, a RAG pipeline that summarises technical documents into conversational answers.",
    date: "June 2024",
    readTime: "6 min read",
    tags: ["RAG", "Vector Search", "Next.js", "OpenAI"],
    sections: [
      {
        heading: "Chunking is product design",
        body: [
          "A naïve fixed-size chunker made answers sound robotic. Switching to recursive chunking with semantic boundaries (headings, bullet lists) drastically improved answer coherence and reduced hallucinations.",
        ],
      },
      {
        heading: "Embeddings aren’t point-and-shoot",
        body: [
          "I benchmarked multiple embedding models against a labelled dataset of relevant/irrelevant passages. Cohere’s v3 multilingual model outperformed open-source alternatives for noisy PDF text, but the latency trade-off meant aggressive caching and pre-computed semantic search results.",
        ],
      },
      {
        heading: "Tight feedback loop",
        body: [
          "A simple evaluator flagged responses that overused boilerplate or ignored the user question. Feeding those failures back into prompt engineering (and occasionally re-chunking) produced a measurable boost in user ratings.",
        ],
      },
    ],
  },
];

export default function BlogPage() {
  const [activePostId, setActivePostId] = useState<string>(blogPosts[0]?.id ?? "");

  const activePost = useMemo(() => {
    return blogPosts.find((post) => post.id === activePostId) ?? blogPosts[0];
  }, [activePostId]);

  return (
    <div className="relative flex min-h-screen bg-[#202123] text-[#ececf1]">
      <Constellation className="pointer-events-none absolute inset-0 z-0" />

      <aside className="relative z-10 hidden w-full max-w-xs flex-col border-r border-white/10 bg-[#151515]/90 px-5 py-8 backdrop-blur md:flex">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold uppercase tracking-wide text-white/50">Umair&apos;s Blog</div>
          <Link
            href="/"
            className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60 transition hover:border-white/30 hover:text-white"
          >
            Home
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
                    ? "bg-white/10 text-white shadow-[0_0_18px_rgba(255,255,255,0.12)]"
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

      <main className="relative z-10 flex flex-1 flex-col px-4 py-6 md:px-10 md:py-10">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
          <header className="rounded-3xl border border-white/10 bg-black/40 px-6 py-6 shadow-[0_0_35px_rgba(0,0,0,0.45)] backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-wide text-white/50">
              <span>{activePost.date}</span>
              <span>{activePost.readTime}</span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">{activePost.title}</h1>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{activePost.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {activePost.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 shadow-[0_0_12px_rgba(255,255,255,0.08)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <article className="rounded-3xl border border-white/10 bg-black/30 px-6 py-8 shadow-[0_0_35px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="space-y-10 text-sm leading-relaxed text-white/80">
              {activePost.sections.map((section, index) => (
                <section key={section.heading ? `${activePost.id}-${section.heading}` : `${activePost.id}-${index}`}>
                  {section.heading && (
                    <h2 className="text-lg font-semibold text-white">{section.heading}</h2>
                  )}
                  <div className="mt-3 space-y-3">
                    {section.body.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>

          <footer className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-black/20 px-6 py-4 text-xs text-white/60 backdrop-blur">
            <span>Enjoyed the read? Share your thoughts with me on LinkedIn or drop an email.</span>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60 transition hover:border-white/30 hover:text-white"
              >
                Back to portfolio
              </Link>
              <Link
                href="mailto:contact@umair.dev"
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
