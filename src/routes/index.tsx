import { createFileRoute } from "@tanstack/react-router";
import { QuizApp } from "@/quiz/QuizApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DevQuiz — Interactive Web Development Quiz" },
      {
        name: "description",
        content:
          "A React quiz app with 12 web development questions, a per-question timer, instant feedback, progress bar and a full answer review screen.",
      },
      { property: "og:title", content: "DevQuiz — Interactive Web Development Quiz" },
      {
        property: "og:description",
        content:
          "Test your HTML, CSS, JavaScript and React knowledge — 12 questions, 30 seconds each, instant feedback and a final score review.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  return <QuizApp />;
}
