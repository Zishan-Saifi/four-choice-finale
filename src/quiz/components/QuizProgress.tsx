import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

type QuizProgressProps = {
  questionNumber: number;
  totalQuestions: number;
  secondsLeft: number;
};

/** Question counter, countdown chip and the animated progress bar. */
export function QuizProgress({
  questionNumber,
  totalQuestions,
  secondsLeft,
}: QuizProgressProps) {
  const progressPercent = (questionNumber / totalQuestions) * 100;
  const isRunningOut = secondsLeft <= 5;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-display font-semibold text-foreground">
          Question {questionNumber} / {totalQuestions}
        </span>
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-full border px-3 py-1 font-display text-sm font-semibold",
            isRunningOut
              ? "border-destructive/40 bg-destructive/10 text-destructive"
              : "border-border bg-card text-muted-foreground",
          )}
        >
          <Clock className="h-4 w-4" />
          {secondsLeft}s
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
