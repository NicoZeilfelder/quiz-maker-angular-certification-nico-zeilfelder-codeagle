export type TriviaCategories = {
  trivia_categories: Category[];
}

export type Category = {
  id: number;
  name: string;
}

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export type Quiz = {
  response_code: number,
  results: Question[]
}

export type Question = {
  category: string;
  type: string;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export type CustomQuestion = {
  question: string;
  answers: string[];
  correct_answer: string;
  selected_answers: string[];
}
