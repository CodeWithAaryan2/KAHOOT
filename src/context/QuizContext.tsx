import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Category, Question } from '@/types/quiz';
import { initialCategories, initialQuestions } from '@/data/quizData';

interface QuizContextType {
  categories: Category[];
  questions: Question[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addQuestion: (question: Omit<Question, 'id'>) => void;
  updateQuestion: (id: string, question: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  getQuestionsByCategory: (categoryId: string) => Question[];
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('quiz-categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('quiz-questions');
    return saved ? JSON.parse(saved) : initialQuestions;
  });

  const saveCategories = (cats: Category[]) => {
    setCategories(cats);
    localStorage.setItem('quiz-categories', JSON.stringify(cats));
  };

  const saveQuestions = (qs: Question[]) => {
    setQuestions(qs);
    localStorage.setItem('quiz-questions', JSON.stringify(qs));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { ...category, id: `cat-${Date.now()}` };
    saveCategories([...categories, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    saveCategories(categories.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCategory = (id: string) => {
    saveCategories(categories.filter(c => c.id !== id));
    saveQuestions(questions.filter(q => q.categoryId !== id));
  };

  const addQuestion = (question: Omit<Question, 'id'>) => {
    const newQuestion = { ...question, id: `q-${Date.now()}` };
    saveQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    saveQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (id: string) => {
    saveQuestions(questions.filter(q => q.id !== id));
  };

  const getQuestionsByCategory = (categoryId: string) => {
    return questions.filter(q => q.categoryId === categoryId);
  };

  return (
    <QuizContext.Provider
      value={{
        categories,
        questions,
        addCategory,
        updateCategory,
        deleteCategory,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        getQuestionsByCategory,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
