import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2, Timer, Trophy, Shuffle } from "lucide-react";
import { QUESTION_TIME_LIMIT } from "../types";

type StartScreenProps = {
  totalQuestions: number;
  categories: string[];
  onStartQuiz: () => void;
};

/** Home screen: title, short description and the Start Quiz button. */
export function StartScreen({
  totalQuestions,
  categories,
  onStartQuiz,
}: StartScreenProps) {
  return (
    <div className="animate-rise-in rounded-2xl border border-border bg-card/70 p-6 text-center shadow-xl shadow-black/20 backdrop-blur sm:p-10">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
        <Code2 className="h-8 w-8" />
      </div>

      <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Dev<span className="text-primary">Quiz</span>
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        A quick-fire web development quiz. One question at a time,{" "}
        {QUESTION_TIME_LIMIT} seconds on the clock — see how high you can score.
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {categories.map((category) => (
          <Badge key={category} variant="secondary" className="font-display">
            {category}
          </Badge>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Trophy className="h-4 w-4" /> {totalQuestions} questions
        </span>
        <span className="flex items-center gap-1.5">
          <Timer className="h-4 w-4" /> {QUESTION_TIME_LIMIT}s per question
        </span>
        <span className="flex items-center gap-1.5">
          <Shuffle className="h-4 w-4" /> Fresh order every attempt
        </span>
      </div>

      <Button
        onClick={onStartQuiz}
        size="lg"
        className="mt-8 h-12 w-full max-w-xs font-display text-base font-semibold tracking-wide"
      >
        Start Quiz
      </Button>
    </div>
  );
}
