import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

export type OptionState = "idle" | "correct" | "wrong" | "muted";

type OptionButtonProps = {
  optionText: string;
  optionLetter: string;
  state: OptionState;
  disabled: boolean;
  onSelect: () => void;
};

const stateClasses: Record<OptionState, string> = {
  idle: "border-border bg-card text-foreground hover:border-primary/70 hover:bg-accent/50",
  correct: "border-correct bg-correct/15 text-correct",
  wrong: "border-destructive bg-destructive/15 text-destructive",
  muted: "border-border bg-card/40 text-muted-foreground opacity-55",
};

const letterClasses: Record<OptionState, string> = {
  idle: "border-border bg-muted text-muted-foreground group-hover:border-primary/50 group-hover:text-primary",
  correct: "border-correct/40 bg-correct/20 text-correct",
  wrong: "border-destructive/40 bg-destructive/20 text-destructive",
  muted: "border-border bg-muted/50 text-muted-foreground",
};

/**
 * Reusable answer option — the same component renders every question's
 * four choices, only the props change.
 */
export function OptionButton({
  optionText,
  optionLetter,
  state,
  disabled,
  onSelect,
}: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "disabled:cursor-default",
        stateClasses[state],
      )}
    >
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-display text-sm font-semibold transition-colors",
          letterClasses[state],
        )}
      >
        {optionLetter}
      </span>
      <span className="flex-1 text-sm font-medium sm:text-base">{optionText}</span>
      {state === "correct" && <Check className="h-5 w-5 shrink-0" />}
      {state === "wrong" && <X className="h-5 w-5 shrink-0" />}
    </button>
  );
}
