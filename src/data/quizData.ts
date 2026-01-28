import { Category, Question } from '@/types/quiz';

export const initialCategories: Category[] = [
  {
    id: 'web-dev',
    name: 'Web Development',
    description: 'HTML, CSS, JavaScript & Frameworks',
    icon: '🌐',
  },
  {
    id: 'ai-ml',
    name: 'Artificial Intelligence',
    description: 'Machine Learning, Neural Networks & AI',
    icon: '🤖',
  },
  {
    id: 'cs-basics',
    name: 'CS Basics',
    description: 'Data Structures, Algorithms & Fundamentals',
    icon: '💻',
  },
];

export const initialQuestions: Question[] = [
  // Web Development
  {
    id: 'web-1',
    categoryId: 'web-dev',
    text: 'What does HTML stand for?',
    options: {
      a: { text: 'Hyper Text Markup Language' },
      b: { text: 'High Tech Modern Language' },
      c: { text: 'Home Tool Markup Language' },
      d: { text: 'Hyperlinks Text Mark Language' },
    },
    correctAnswer: 'a',
  },
  {
    id: 'web-2',
    categoryId: 'web-dev',
    text: 'Which CSS property is used to change text color?',
    options: {
      a: { text: 'text-color' },
      b: { text: 'font-color' },
      c: { text: 'color' },
      d: { text: 'text-style' },
    },
    correctAnswer: 'c',
  },
  {
    id: 'web-3',
    categoryId: 'web-dev',
    text: 'What is the correct way to declare a JavaScript variable?',
    options: {
      a: { text: 'variable x = 5' },
      b: { text: 'let x = 5' },
      c: { text: 'v x = 5' },
      d: { text: 'declare x = 5' },
    },
    correctAnswer: 'b',
  },
  {
    id: 'web-4',
    categoryId: 'web-dev',
    text: 'Which framework is developed by Facebook?',
    options: {
      a: { text: 'Angular' },
      b: { text: 'Vue.js' },
      c: { text: 'React' },
      d: { text: 'Svelte' },
    },
    correctAnswer: 'c',
  },
  {
    id: 'web-5',
    categoryId: 'web-dev',
    text: 'What does CSS stand for?',
    options: {
      a: { text: 'Computer Style Sheets' },
      b: { text: 'Creative Style Sheets' },
      c: { text: 'Cascading Style Sheets' },
      d: { text: 'Colorful Style Sheets' },
    },
    correctAnswer: 'c',
  },
  // AI/ML
  {
    id: 'ai-1',
    categoryId: 'ai-ml',
    text: 'What is the primary goal of supervised learning?',
    options: {
      a: { text: 'Clustering data' },
      b: { text: 'Learning from labeled data' },
      c: { text: 'Generating random outputs' },
      d: { text: 'Reducing data size' },
    },
    correctAnswer: 'b',
  },
  {
    id: 'ai-2',
    categoryId: 'ai-ml',
    text: 'Which algorithm is used for classification problems?',
    options: {
      a: { text: 'K-Means' },
      b: { text: 'Linear Regression' },
      c: { text: 'Decision Tree' },
      d: { text: 'PCA' },
    },
    correctAnswer: 'c',
  },
  {
    id: 'ai-3',
    categoryId: 'ai-ml',
    text: 'What does CNN stand for in deep learning?',
    options: {
      a: { text: 'Computer Neural Network' },
      b: { text: 'Convolutional Neural Network' },
      c: { text: 'Connected Node Network' },
      d: { text: 'Central Nervous Network' },
    },
    correctAnswer: 'b',
  },
  {
    id: 'ai-4',
    categoryId: 'ai-ml',
    text: 'Which language is most popular for AI/ML development?',
    options: {
      a: { text: 'Java' },
      b: { text: 'C++' },
      c: { text: 'Python' },
      d: { text: 'Ruby' },
    },
    correctAnswer: 'c',
  },
  {
    id: 'ai-5',
    categoryId: 'ai-ml',
    text: 'What is overfitting in machine learning?',
    options: {
      a: { text: 'Model is too simple' },
      b: { text: 'Model performs well on training but poorly on new data' },
      c: { text: 'Model has too few parameters' },
      d: { text: 'Model trains too slowly' },
    },
    correctAnswer: 'b',
  },
  // CS Basics
  {
    id: 'cs-1',
    categoryId: 'cs-basics',
    text: 'What is the time complexity of binary search?',
    options: {
      a: { text: 'O(n)' },
      b: { text: 'O(n²)' },
      c: { text: 'O(log n)' },
      d: { text: 'O(1)' },
    },
    correctAnswer: 'c',
  },
  {
    id: 'cs-2',
    categoryId: 'cs-basics',
    text: 'Which data structure uses LIFO principle?',
    options: {
      a: { text: 'Queue' },
      b: { text: 'Stack' },
      c: { text: 'Array' },
      d: { text: 'Linked List' },
    },
    correctAnswer: 'b',
  },
  {
    id: 'cs-3',
    categoryId: 'cs-basics',
    text: 'What does RAM stand for?',
    options: {
      a: { text: 'Read Access Memory' },
      b: { text: 'Random Access Memory' },
      c: { text: 'Run Application Memory' },
      d: { text: 'Rapid Action Memory' },
    },
    correctAnswer: 'b',
  },
  {
    id: 'cs-4',
    categoryId: 'cs-basics',
    text: 'Which sorting algorithm has the best average case?',
    options: {
      a: { text: 'Bubble Sort' },
      b: { text: 'Selection Sort' },
      c: { text: 'Quick Sort' },
      d: { text: 'Insertion Sort' },
    },
    correctAnswer: 'c',
  },
  {
    id: 'cs-5',
    categoryId: 'cs-basics',
    text: 'What is the base of the binary number system?',
    options: {
      a: { text: '8' },
      b: { text: '10' },
      c: { text: '2' },
      d: { text: '16' },
    },
    correctAnswer: 'c',
  },
];
