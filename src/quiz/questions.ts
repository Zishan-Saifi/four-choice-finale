// Quiz question bank — stored as an array of objects (Rule 2 of the brief).
// `answer` is the index of the correct option inside `options`.
export type Question = {
  id: number;
  category: "React" | "JavaScript" | "HTML/CSS";
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  options: string[];
  answer: number;
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    category: "React",
    difficulty: "Easy",
    question: "Which hook manages state in React?",
    options: ["useState", "useFetch", "useStyle", "useRender"],
    answer: 0,
  },
  {
    id: 2,
    category: "React",
    difficulty: "Easy",
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JSON eXchange",
      "JavaScript eXtra",
    ],
    answer: 0,
  },
  {
    id: 3,
    category: "React",
    difficulty: "Easy",
    question: "Which hook runs side effects after a component renders?",
    options: ["useEffect", "useMemo", "useCallback", "useRef"],
    answer: 0,
  },
  {
    id: 4,
    category: "React",
    difficulty: "Medium",
    question: "How do you pass data from a parent component to a child component?",
    options: ["Props", "State", "Context", "Refs"],
    answer: 0,
  },
  {
    id: 5,
    category: "React",
    difficulty: "Hard",
    question:
      "What is the correct way to update state that depends on its previous value?",
    options: [
      "setCount(c => c + 1)",
      "setCount(count + 1)",
      "count = count + 1",
      "state.count++",
    ],
    answer: 0,
  },
  {
    id: 6,
    category: "JavaScript",
    difficulty: "Easy",
    question: "What does the === operator check in JavaScript?",
    options: ["Value and type", "Value only", "Reference only", "Type only"],
    answer: 0,
  },
  {
    id: 7,
    category: "JavaScript",
    difficulty: "Medium",
    question: "Which array method creates a new array with transformed values?",
    options: [".map()", ".forEach()", ".push()", ".splice()"],
    answer: 0,
  },
  {
    id: 8,
    category: "JavaScript",
    difficulty: "Easy",
    question: "Which method adds an item to the end of an array?",
    options: [".push()", ".pop()", ".shift()", ".unshift()"],
    answer: 0,
  },
  {
    id: 9,
    category: "JavaScript",
    difficulty: "Medium",
    question: "Which keyword declares a block-scoped variable that cannot be reassigned?",
    options: ["const", "var", "let", "static"],
    answer: 0,
  },
  {
    id: 10,
    category: "HTML/CSS",
    difficulty: "Easy",
    question: "Which HTML tag creates a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: 0,
  },
  {
    id: 11,
    category: "HTML/CSS",
    difficulty: "Easy",
    question: "Which CSS property controls the size of text?",
    options: ["font-size", "text-size", "font-style", "text-scale"],
    answer: 0,
  },
  {
    id: 12,
    category: "HTML/CSS",
    difficulty: "Medium",
    question: "Which CSS display value creates a flexible, responsive layout?",
    options: ["flex", "block", "inline", "table"],
    answer: 0,
  },
];
