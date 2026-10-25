import type { Question } from "./questions";

/** Seconds the player gets per question (bonus challenge: timer). */
export const QUESTION_TIME_LIMIT = 30;

/** Sentinel used when the timer runs out before the player answers. */
export const NO_ANSWER = -1;

/** The three screens of the app, switched by conditional rendering. */
export type QuizStage = "start" | "quiz" | "result";

/** One entry in the review list on the results screen. */
export type AnswerRecord = {
  question: Question;
  chosenOption: number; // index into question.options, or NO_ANSWER
  isCorrect: boolean;
};
