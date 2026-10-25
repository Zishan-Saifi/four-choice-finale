import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Question } from "../questions";
import { NO_ANSWER } from "../types";
import { OptionButton, type OptionState } from "./OptionButton";

const OPTION_LETTERS = ["A", "B", "C", "D"];

type QuizScreenProps = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedOption: number | null;
  secondsLeft: number;
  onSelectOption: (optionIndex: number) => void;
  onNextQuestion: () => void;
};

/** One question at a time: badge row, question text, four options, Next button. */
export function QuizScreen({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  secondsLeft,
  onSelectOption,
  onNextQuestion,
}: QuizScreenProps) {
  const hasAnswered = selectedOption !== null;
  const timedOut = selectedOption === NO_ANSWER;
  const isLastQuestion = questionNumber === totalQuestions;

  const getOptionState = (optionIndex: number): OptionState => {
    if (!hasAnswered) return "idle";
    if (optionIndex === question.answer) return "correct";
    if (optionIndex === selectedOption) return "wrong";
    return "muted";
  };

  return (
    <div key={question.id} className="animate-rise-in rounded-2xl border border-border bg-card/70 p-5 shadow-xl shadow-black/20 backdrop-blur sm:p-7">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="font-display">
          {question.category}
        </Badge>
        <Badge
          variant="outline"
          className={cn(
            "font-display",
            question.difficulty === "Hard" && "border-destructive/40 text-destructive",
            question.difficulty === "Medium" && "border-chart-4/50 text-chart-4",
            question.difficulty === "Easy" && "border-correct/40 text-correct",
          )}
        >
          {question.difficulty}
        </Badge>
      </div>

      <h2 className="font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">
        {question.question}
      </h2>

      <div className="mt-5 grid gap-2.5">
        {question.options.map((optionText, optionIndex) => (
          <OptionButton
            key={optionText}
            optionText={optionText}
            optionLetter={OPTION_LETTERS[optionIndex] ?? "?"}
            state={getOptionState(optionIndex)}
            disabled={hasAnswered}
            onSelect={() => onSelectOption(optionIndex)}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {!hasAnswered && "Pick an answer to lock it in."}
          {hasAnswered && !timedOut && selectedOption === question.answer && (
            <span className="font-medium text-correct">Correct! Well done.</span>
          )}
          {hasAnswered && !timedOut && selectedOption !== question.answer && (
            <span className="font-medium text-destructive">
              Not quite — the green one was correct.
            </span>
          )}
          {timedOut && (
            <span className="font-medium text-destructive">Time's up!</span>
          )}
        </p>
        <Button
          onClick={onNextQuestion}
          disabled={!hasAnswered}
          size="lg"
          className="font-display font-semibold"
        >
          {isLastQuestion ? "See Results" : "Next Question"}
        </Button>
      </div>

      {/* Keep the countdown visible in state even after it pauses. */}
      <span className="sr-only">{secondsLeft} seconds were on the clock.</span>
    </div>
  );
}
