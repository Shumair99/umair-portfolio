import Link from "next/link";
import Constellation from "@/components/Constellation";
import ChatWorkspace from "@/components/ChatWorkspace";

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
    href: "/blog",
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

const projects = [
  "RL Omelette Environment",
  "Shorty URL Shortener",
  "DocuQA RAG document summariser",
];

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#202123] text-[#ececf1]">
      <aside className="hidden w-64 flex-col border-r border-white/10 bg-[#171717] md:flex">
        <div className="flex items-center justify-between px-4 py-5">
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
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-1 text-white transition hover:bg-white/10"
            aria-label="Sidebar layout options"
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

        <nav className="flex-1 overflow-y-auto px-4 text-sm text-white/70">
          <div className="space-y-1 pb-5">
            {primaryNav.map((item) => {
              const content = (
                <>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                    {item.icon}
                  </span>
                  {item.label}
                </>
              );

              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-medium text-white transition hover:bg-white/10"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-medium text-white transition hover:bg-white/10"
                >
                  {content}
                </Link>
              );
            })}
          </div>

          <div className="space-y-2">
            <p className="px-3 text-xs uppercase tracking-wide text-white/35">Projects</p>
            <div className="space-y-1">
              {projects.map((title) => (
                <button
                  key={title}
                  className="w-full truncate rounded-lg px-3 py-2 text-left text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  {title}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="border-t border-white/10 px-4 py-4 text-sm text-white">
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

      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Idk what to put here
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/70">
            <button className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10 sm:flex">
              <span className="text-xs uppercase tracking-wide text-white/60">Status</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#10a37f]/20 px-2 py-0.5 text-xs font-medium text-[#10a37f]">
                <span className="h-2 w-2 rounded-full bg-[#10a37f]" />
                Looking for work
              </span>
            </button>
            <button className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-medium text-white hover:bg-white/10">
              Hire me
            </button>
          </div>
        </header>

        <div className="relative flex flex-1 items-center justify-center px-4 py-10">
          <Constellation className="pointer-events-none absolute inset-0 z-0" />
          <ChatWorkspace />
        </div>
      </main>
    </div>
  );
}
