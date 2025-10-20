'use client';

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROMPTS = [
  {
    question: "Tell me about yourself...",
    answer:
      `I'm Umair - a software developer with a passion for creating full-scale, useful software. I've got about 5 years of practical programming experience, including a 3 year Computer Science degree at Aston University. For the most part, I focus on backend development, but I've recently been working on building full-stack applications and applying effective DevOps practices and principles during development. I've also been really enjoying getting into the AI space, recently working on a reinforcement learning project as well as exploring other ML concepts. You can find more info about what I've been exploring recently on my blog.\n 
      In terms of my personal life, for fun I like going on walks, going to the gym, looking after my chickens, and occasionally watching anime/shows. I'm also a huge gaming fan despite not playing too often nowadays. However, I think the most important fact of all about me is that I love dr pepper.`,
  },
  {
    question: "What are your skills and qualifications?",
    answer:
      `I'm a recent BSc CompSci graduate from Aston Uni, where I learnt many essential theoretical concepts that have aided me on my dev journey. This, alongside my various practical solo and group projects, has allowed me to develop an extremely strong problem solving mindset and programming skillset. A more comprehensive list of skills can be found in the "skills" section but some of my core skills and technologies I work with include:
      
      • Backend Development: Java (incl. Spring Boot), Python (incl. FastAPI), PostgreSQL, Docker
      • AI & ML: Reinforcement Learning, PyTorch, Gymnasium, Stable Baselines3
      • Frontend: React, TypeScript, Tailwind
      • DevOps: Linux, Caddy, VPS deployment, CI/CD`,
  },
  {
    question: "",
    answer: ""
  },
  {
    question: "",
    answer: ""
  },
];

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatWorkspace() {
  const [stage, setStage] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTypingPrompt, setIsTypingPrompt] = useState(true);

  const typewriterRef = useRef<number | null>(null);
  const indexRef = useRef(0);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const currentPrompt = PROMPTS[Math.min(stage, PROMPTS.length - 1)];

  useEffect(() => {
    if (!isTypingPrompt) return;

    if (typewriterRef.current) {
      window.clearInterval(typewriterRef.current);
    }
    indexRef.current = 0;
    typewriterRef.current = window.setInterval(() => {
      const nextIndex = indexRef.current + 1;
      setInputValue(currentPrompt.question.slice(0, nextIndex));
      indexRef.current = nextIndex;

      if (nextIndex >= currentPrompt.question.length) {
        if (typewriterRef.current) {
          window.clearInterval(typewriterRef.current);
        }
        typewriterRef.current = null;
        setIsTypingPrompt(false);
      }
    }, 70);

    return () => {
      if (typewriterRef.current) {
        window.clearInterval(typewriterRef.current);
      }
      typewriterRef.current = null;
    };
  }, [currentPrompt.question, isTypingPrompt]);

  const beginTyping = () => {
    if (typewriterRef.current) {
      window.clearInterval(typewriterRef.current);
    }
    typewriterRef.current = null;
    indexRef.current = 0;
    setIsTypingPrompt(true);
  };

  const handleReset = () => {
    setStage(0);
    setMessages([]);
    setInputValue("");
    beginTyping();
  };

  const stopTypewriter = () => {
    if (typewriterRef.current) {
      window.clearInterval(typewriterRef.current);
      typewriterRef.current = null;
    }
    indexRef.current = currentPrompt.question.length;
    setIsTypingPrompt(false);
    setInputValue(currentPrompt.question);
  };

  const handleSend = () => {
    if (stage >= PROMPTS.length) {
      return;
    }

    if (isTypingPrompt) {
      stopTypewriter();
    }

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: currentPrompt.question },
      { id: crypto.randomUUID(), role: "assistant", content: currentPrompt.answer },
    ]);

    if (stage + 1 < PROMPTS.length) {
      const nextStage = stage + 1;
      setStage(nextStage);
      setInputValue("");
      beginTyping();
    } else {
      setStage(stage + 1);
    }
  };

  const showConversation = messages.length > 0;
  const sendDisabled = stage >= PROMPTS.length;

  useEffect(() => {
    if (!showConversation) {
      return;
    }

    const container = messagesContainerRef.current;
    if (!container) {
      return;
    }

    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, showConversation]);

  const inputBar = (
    <motion.div
      className="w-full rounded-full border border-white/10 bg-[#2a2b32] p-1 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 rounded-full bg-[#353640] px-4 py-3">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#3f4049] text-xl font-medium leading-none text-white hover:bg-[#4b4c56]"
          aria-label="Start a new prompt"
          onClick={handleReset}
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

        <input
          value={inputValue}
          readOnly
          className="flex-1 bg-transparent text-left text-sm text-white placeholder:text-white/40 focus:outline-none"
        />

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
              <path strokeLinecap="round" d="M6 9v6M10 7v10M14 10v4M18 8v8" />
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:bg-white/80 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send message"
            onClick={handleSend}
            disabled={sendDisabled}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 7-7 7 7m-7-7v14" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );

  const baseContainerClasses =
    "relative z-10 flex h-full w-full max-w-3xl flex-1 flex-col overflow-hidden min-h-0 pb-16";
  const containerClasses = showConversation
    ? baseContainerClasses
    : `${baseContainerClasses} items-center justify-center gap-8 text-center`;

  return (
    <motion.div className={containerClasses}>
      <div className="flex w-full flex-1 flex-col overflow-hidden min-h-0">
        <AnimatePresence mode="wait">
          {!showConversation ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-1 flex-col items-center justify-center gap-8 text-center"
            >
              <motion.h1 className="text-3xl font-semibold text-white md:text-4xl">
                Umair&apos;s Portfolio (not ChatGPT...)
              </motion.h1>
            </motion.div>
          ) : (
            <motion.div
              key="conversation"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-1 flex-col overflow-hidden min-h-0"
            >
              <motion.div
                layout
                ref={messagesContainerRef}
                className="flex flex-1 flex-col gap-4 overflow-y-auto pr-2 pt-4 pb-6"
              >
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      layout
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.95 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className={
                        message.role === "user"
                          ? "self-end inline-flex max-w-[90%] items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white shadow-lg"
                          : "self-start max-w-[90%] space-y-3 rounded-3xl border border-white/10 bg-black/40 p-6 text-sm leading-relaxed text-white/80"
                      }
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full pt-4">{inputBar}</div>
    </motion.div>
  );
}
