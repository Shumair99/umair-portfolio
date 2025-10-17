"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_PROMPT = "Tell me about Umair...";
const PLACEHOLDER_RESPONSE = `Umair is a software dev who specialises in Java and Python development.`;

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatWorkspace() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTypingPrompt, setIsTypingPrompt] = useState(true);

  const typewriterRef = useRef<number | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!isTypingPrompt) return;

    if (typewriterRef.current) {
      window.clearInterval(typewriterRef.current);
    }
    indexRef.current = 0;
    typewriterRef.current = window.setInterval(() => {
      const nextIndex = indexRef.current + 1;
      setInputValue(DEFAULT_PROMPT.slice(0, nextIndex));
      indexRef.current = nextIndex;

      if (nextIndex >= DEFAULT_PROMPT.length) {
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
  }, [isTypingPrompt]);

  const resetPrompt = () => {
    if (typewriterRef.current) {
      window.clearInterval(typewriterRef.current);
    }
    typewriterRef.current = null;
    setMessages([]);
    setInputValue("");
    indexRef.current = 0;
    setIsTypingPrompt(true);
  };

  const stopTypewriter = () => {
    if (typewriterRef.current) {
      window.clearInterval(typewriterRef.current);
      typewriterRef.current = null;
    }
    indexRef.current = DEFAULT_PROMPT.length;
    setIsTypingPrompt(false);
    setInputValue(DEFAULT_PROMPT);
  };

  const handleSend = () => {
    if (isTypingPrompt) {
      stopTypewriter();
    }

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: DEFAULT_PROMPT },
      { id: crypto.randomUUID(), role: "assistant", content: PLACEHOLDER_RESPONSE },
    ]);
  };

  const showConversation = messages.length > 0;

  const inputBar = (
    <div className="w-full rounded-full border border-white/10 bg-[#2a2b32] p-1 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-2 rounded-full bg-[#353640] px-4 py-2.5">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#3f4049] text-xl font-medium leading-none text-white hover:bg-[#4b4c56]"
          aria-label="Start a new prompt"
          onClick={resetPrompt}
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:bg-white/80"
            aria-label="Send message"
            onClick={handleSend}
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
    </div>
  );

  if (!showConversation) {
    return (
      <div className="relative z-10 flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-8 text-center">
        <h1 className="text-3xl font-semibold text-white md:text-4xl">
          Umair&apos;s Portfolio (not ChatGPT...)
        </h1>
        {inputBar}
      </div>
    );
  }

  return (
    <div className="relative z-10 flex min-h-[70vh] w-full max-w-3xl flex-1 flex-col justify-between gap-8">
      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === "user"
                ? "self-end inline-flex max-w-[90%] items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white shadow-lg"
                : "self-start max-w-[90%] space-y-3 rounded-3xl border border-white/10 bg-black/60 p-6 text-sm leading-relaxed text-white/80"
            }
          >
            <p className="whitespace-pre-line">{message.content}</p>
          </div>
        ))}
      </div>
      <div className="w-full">{inputBar}</div>
    </div>
  );
}
