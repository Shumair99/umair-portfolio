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

  const activePost = useMemo(() => {
    return blogPosts.find((post) => post.id === activePostId) ?? blogPosts[0];
  }, [activePostId]);

  return (
    <div className="relative flex min-h-screen bg-[#18191c] text-[#ececf1]">
      <aside className="hidden w-full max-w-xs flex-col border-r border-white/10 bg-[#121316] px-5 py-8 md:flex">
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

      <main className="flex flex-1 justify-center overflow-y-auto px-4 py-8 md:px-20 md:py-12">
        <div className="w-full max-w-4xl lg:max-w-5xl">
          <header className="space-y-4">
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
