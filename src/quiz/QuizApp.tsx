import { useEffect, useState } from "react";
import { QUESTIONS, type Question } from "./questions";
import {
  NO_ANSWER,
  QUESTION_TIME_LIMIT,
  type AnswerRecord,
  type QuizStage,
} from "./types";
import { StartScreen } from "./components/StartScreen";
import { QuizProgress } from "./components/QuizProgress";
import { QuizScreen } from "./components/QuizScreen";
import { ResultScreen } from "./components/ResultScreen";

/** Fisher–Yates shuffle — returns a new array, never mutates the original. */
function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const swapped = copy[j] as T;
    copy[j] = copy[i] as T;
    copy[i] = swapped;
  }
  return copy;
}

/** Bonus: shuffle the question order AND each question's options every attempt. */
function buildShuffledQuiz(): Question[] {
  return shuffle(QUESTIONS).map((question) => {
    const correctOptionText = question.options[question.answer] ?? "";
    const options = shuffle(question.options);
    return {
      ...question,
      options,
      answer: Math.max(0, options.indexOf(correctOptionText)),
    };
  });
}

/**
 * QuizApp owns all quiz state and switches between the three screens
 * (start / quiz / result) with conditional rendering.
 */
export function QuizApp() {
  const [stage, setStage] = useState<QuizStage>("start");
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_TIME_LIMIT);

  const currentQuestion = quizQuestions[currentIndex];
  const totalQuestions = quizQuestions.length;
  const categories = [...new Set(QUESTIONS.map((q) => q.category))];

  function handleStartQuiz() {
    setQuizQuestions(buildShuffledQuiz());
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setAnswers([]);
    setSecondsLeft(QUESTION_TIME_LIMIT);
    setStage("quiz");
  }

  function handleSelectOption(optionIndex: number) {
    if (selectedOption !== null) return; // answer already locked
    setSelectedOption(optionIndex);
  }

  function handleNextQuestion() {
    if (selectedOption === null || !currentQuestion) return;

    const isCorrect = selectedOption === currentQuestion.answer;
    setAnswers((previous) => [
      ...previous,
      {
        question: currentQuestion,
        chosenOption: selectedOption,
        isCorrect,
      },
    ]);
    if (isCorrect) setScore((previous) => previous + 1);

    if (currentIndex + 1 === totalQuestions) {
      setStage("result");
      return;
    }
    setCurrentIndex((previous) => previous + 1);
    setSelectedOption(null);
    setSecondsLeft(QUESTION_TIME_LIMIT);
  }

  // Countdown: ticks only while the quiz screen is open and unanswered.
  useEffect(() => {
    if (stage !== "quiz" || selectedOption !== null || secondsLeft <= 0) return;
    const timeoutId = setTimeout(() => {
      setSecondsLeft((seconds) => seconds - 1);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [stage, selectedOption, secondsLeft]);

  // When the clock hits zero, lock the question as unanswered.
  useEffect(() => {
    if (stage === "quiz" && selectedOption === null && secondsLeft === 0) {
      setSelectedOption(NO_ANSWER);
    }
  }, [stage, selectedOption, secondsLeft]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-10 sm:py-16">
      {/* Decorative background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-chart-2/10 blur-3xl"
      />

      <div className="relative z-10 w-full max-w-xl">
        {stage === "start" && (
          <StartScreen
            totalQuestions={QUESTIONS.length}
            categories={categories}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {stage === "quiz" && currentQuestion && (
          <div className="space-y-4">
            <QuizProgress
              questionNumber={currentIndex + 1}
              totalQuestions={totalQuestions}
              secondsLeft={secondsLeft}
            />
            <QuizScreen
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              totalQuestions={totalQuestions}
              selectedOption={selectedOption}
              secondsLeft={secondsLeft}
              onSelectOption={handleSelectOption}
              onNextQuestion={handleNextQuestion}
            />
          </div>
        )}

        {stage === "result" && (
          <ResultScreen
            score={score}
            answers={answers}
            onRestartQuiz={handleStartQuiz}
          />
        )}
      </div>

      <p className="relative z-10 mt-8 text-center text-xs text-muted-foreground">
        DevCamp 2.0 · Task 2 — Interactive Quiz Web App · Built with React
      </p>
    </main>
  );
}
