const primaryNav = [
  {
    label: "Blog",
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
          d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>
          <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/>
          <path d="M2 6h4"/>
          <path d="M2 10h4"/>
          <path d="M2 14h4"/>
          <path d="M2 18h4"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
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
          d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Resume",
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
];

const chatHistory = [
  "RL Omelette Environment",
  "Shorty URL Shortener",
  "DocuQA RAG document summariser",
];

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#202123] text-[#ececf1]">
      <aside className="hidden w-64 flex-col border-r border-white/10 bg-[#171717] md:flex">
        <div className="flex items-center justify-between px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10a37f] text-xs font-semibold uppercase text-black">
              UA
            </div>
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
            {primaryNav.map((item) => (
              <button
                key={item.label}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-medium text-white transition hover:bg-white/10"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <p className="px-3 text-xs uppercase tracking-wide text-white/35">
              Projects
            </p>
            <div className="space-y-1">
              {chatHistory.map((title) => (
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

      <main className="flex flex-1 flex-col">
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
              <span className="text-xs uppercase tracking-wide text-white/60">
                Status
              </span>
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

        <div className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-2xl space-y-8 text-center">
            <h1 className="text-3xl font-semibold text-white md:text-4xl">
              Umair&apos;s Portfolio (not ChatGPT...)
            </h1>

            <div className="rounded-full border border-white/10 bg-[#2a2b32] p-1 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-2 rounded-full bg-[#353640] px-3 py-2">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#3f4049] text-xl font-medium leading-none text-white hover:bg-[#4b4c56]"
                  aria-label="Start a new prompt"
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <span className="flex-1 text-left text-sm text-white/70">
                  Ask anything
                </span>
                <div className="flex items-center gap-1.5 text-white/60">
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
                    aria-label="Voice input"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4a3 3 0 0 0-3 3v3a3 3 0 1 0 6 0V7a3 3 0 0 0-3-3Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 10a7 7 0 0 1-14 0m7 7v3m-4 0h8"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
                    aria-label="Sound options"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        d="M6 9v6M10 7v10M14 10v4M18 8v8"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
