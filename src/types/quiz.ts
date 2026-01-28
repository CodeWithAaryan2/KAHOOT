export interface QuestionOption {
  text?: string;
  imageUrl?: string;
}

export interface Question {
  id: string;
  categoryId: string;
  text: string;
  options: {
    a: QuestionOption;
    b: QuestionOption;
    c: QuestionOption;
    d: QuestionOption;
  };
  correctAnswer: 'a' | 'b' | 'c' | 'd';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  selectedAnswer: string | null;
  isAnswerRevealed: boolean;
  quizCompleted: boolean;
}

export type OptionKey = 'a' | 'b' | 'c' | 'd';
