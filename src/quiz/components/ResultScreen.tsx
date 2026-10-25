import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ChevronDown,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { NO_ANSWER, type AnswerRecord } from "../types";

type ResultScreenProps = {
  score: number;
  answers: AnswerRecord[];
  onRestartQuiz: () => void;
};

function getResultMessage(percentage: number): string {
  if (percentage >= 90) return "Quiz Champion! Outstanding work.";
  if (percentage >= 70) return "Great job — you really know your stuff.";
  if (percentage >= 50) return "Nice effort! A little more practice and you've got it.";
  return "Keep practicing — every attempt makes you better.";
}

/** Final score, correct vs incorrect count, message by score and answer review. */
export function ResultScreen({ score, answers, onRestartQuiz }: ResultScreenProps) {
  const [showReview, setShowReview] = useState(false);

  const totalQuestions = answers.length;
  const incorrectCount = totalQuestions - score;
  const percentage = Math.round((score / totalQuestions) * 100);
  const scoreRing = `conic-gradient(var(--color-primary) ${percentage}%, var(--color-muted) ${percentage}%)`;

  return (
    <div className="animate-rise-in space-y-4">
      <div className="rounded-2xl border border-border bg-card/70 p-6 text-center shadow-xl shadow-black/20 backdrop-blur sm:p-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <Trophy className="h-7 w-7" />
        </div>

        <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Quiz Complete!
        </h2>

        <div
          className="mx-auto mt-6 flex h-36 w-36 items-center justify-center rounded-full"
          style={{ background: scoreRing }}
          role="img"
          aria-label={`Score ${percentage} percent`}
        >
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-card">
            <span className="font-display text-3xl font-bold text-foreground">
              {score}/{totalQuestions}
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {percentage}%
            </span>
          </div>
        </div>

        <p className="mt-4 font-display text-lg font-semibold text-primary">
          {getResultMessage(percentage)}
        </p>

        <div className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-3 text-left">
          <div className="rounded-xl border border-correct/30 bg-correct/10 p-3">
            <p className="font-display text-2xl font-bold text-correct">{score}</p>
            <p className="text-xs font-medium text-correct/80">Correct</p>
          </div>
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3">
            <p className="font-display text-2xl font-bold text-destructive">
              {incorrectCount}
            </p>
            <p className="text-xs font-medium text-destructive/80">Incorrect</p>
          </div>
        </div>

        <Button
          onClick={onRestartQuiz}
          size="lg"
          className="mt-8 h-12 w-full max-w-xs font-display text-base font-semibold tracking-wide"
        >
          <RotateCcw className="h-4 w-4" />
          Restart Quiz
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur">
        <button
          type="button"
          onClick={() => setShowReview((open) => !open)}
          className="flex w-full items-center justify-between px-5 py-4 text-left font-display font-semibold text-foreground transition-colors hover:bg-accent/40"
        >
          Review your answers
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-300",
              showReview && "rotate-180",
            )}
          />
        </button>

        {showReview && (
          <ul className="animate-rise-in divide-y divide-border border-t border-border">
            {answers.map((record, index) => (
              <li key={record.question.id} className="px-5 py-4">
                <p className="flex items-start gap-2.5 text-sm font-medium text-foreground">
                  {record.isCorrect ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-correct" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  )}
                  <span>
                    {index + 1}. {record.question.question}
                  </span>
                </p>
                <div className="mt-2 space-y-1 pl-7 text-sm">
                  <p className={record.isCorrect ? "text-correct" : "text-destructive"}>
                    Your answer:{" "}
                    <span className="font-medium">
                      {record.chosenOption === NO_ANSWER
                        ? "Time's up — no answer"
                        : (record.question.options[record.chosenOption] ?? "")}
                    </span>
                  </p>
                  {!record.isCorrect && (
                    <p className="text-correct">
                      Correct answer:{" "}
                      <span className="font-medium">
                        {record.question.options[record.question.answer] ?? ""}
                      </span>
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
