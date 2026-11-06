"use client";

import { useEffect, useRef, useState } from "react";

const QUESTIONS = [
  "Where are we losing margin?",
  "Which customers are driving profitable growth?",
  "How can we unlock more value from enterprise data?",
  "Which business processes are ready for AI?",
  "Where is technology slowing the business down?",
] as const;

const TYPE_SPEED_MS = 46;
const DELETE_SPEED_MS = 26;
const COMPLETE_PAUSE_MS = 1400;
const NEXT_QUESTION_PAUSE_MS = 260;

export function BusinessQuestionRotator() {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (reducedMotion) {
      return;
    }

    const currentQuestion = QUESTIONS[questionIndex];

    if (!isDeleting && typedText.length < currentQuestion.length) {
      timerRef.current = window.setTimeout(() => {
        setTypedText(currentQuestion.slice(0, typedText.length + 1));
      }, TYPE_SPEED_MS);
      return;
    }

    if (!isDeleting && typedText === currentQuestion) {
      timerRef.current = window.setTimeout(() => {
        setIsDeleting(true);
      }, COMPLETE_PAUSE_MS);
      return;
    }

    if (isDeleting && typedText.length > 0) {
      timerRef.current = window.setTimeout(() => {
        setTypedText((previous) => previous.slice(0, -1));
      }, DELETE_SPEED_MS);
      return;
    }

    if (isDeleting && typedText.length === 0) {
      timerRef.current = window.setTimeout(() => {
        setIsDeleting(false);
        setQuestionIndex((previous) => (previous + 1) % QUESTIONS.length);
      }, NEXT_QUESTION_PAUSE_MS);
    }

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [questionIndex, typedText, isDeleting, reducedMotion]);

  const displayText = reducedMotion ? QUESTIONS[0] : typedText;

  return (
    <section className="rn-hero-question" aria-label="Questions worth asking">
      <p className="rn-hero-question-label">Questions worth asking</p>
      <p className="rn-hero-question-text" aria-live="off">
        <span>{displayText}</span>
        <span className="rn-hero-question-cursor" aria-hidden="true" />
      </p>
    </section>
  );
}