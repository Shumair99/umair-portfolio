'use client';

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROMPTS = [
  {
    question: "Tell me about Umair",
    answer:
      "Umair is a multidisciplinary creator with a passion for crafting thoughtful digital experiences. This placeholder response is where a richer story about Umair will eventually live.",
  },
  {
    question: "What are his skills and qualifications?",
    answer:
      "He's a graduate with a blend of software engineering skills, an eye for product storytelling, and hands-on experience shipping polished interfaces.",
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

  const inputBar = (
    <motion.div
      layout
      className="w-full rounded-full border border-white/10 bg-[#2a2b32] p-1 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
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

  const containerClasses = showConversation
    ? "relative z-10 flex min-h-[70vh] w-full max-w-3xl flex-1 flex-col justify-between gap-8"
    : "relative z-10 flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-8 text-center";

  return (
    <motion.div layout className={containerClasses}>
      <AnimatePresence mode="wait">
        {!showConversation && (
          <motion.h1
            key="title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-3xl font-semibold text-white md:text-4xl"
          >
            Umair&apos;s Portfolio (not ChatGPT...)
          </motion.h1>
        )}
      </AnimatePresence>

      {showConversation && (
        <motion.div layout className="flex w-full flex-col gap-4">
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
      )}

      {inputBar}
    </motion.div>
  );
}
