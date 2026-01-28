import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import { OptionKey, QuestionOption } from '@/types/quiz';

const optionStyles: Record<OptionKey, string> = {
  a: 'quiz-option-a',
  b: 'quiz-option-b',
  c: 'quiz-option-c',
  d: 'quiz-option-d',
};

const optionLabels: Record<OptionKey, string> = {
  a: 'A',
  b: 'B',
  c: 'C',
  d: 'D',
};

const OptionContent = ({ option }: { option: QuestionOption }) => {
  if (option.imageUrl) {
    return (
      <img 
        src={option.imageUrl} 
        alt="Option" 
        className="w-full h-24 md:h-32 object-contain rounded"
      />
    );
  }
  return <span className="font-body">{option.text}</span>;
};

export default function QuizPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { categories, getQuestionsByCategory } = useQuiz();

  const category = categories.find(c => c.id === categoryId);
  const questions = categoryId ? getQuestionsByCategory(categoryId) : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<OptionKey | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  useEffect(() => {
    if (!category || questions.length === 0) {
      navigate('/');
    }
  }, [category, questions, navigate]);

  const handleSelectAnswer = (option: OptionKey) => {
    if (isRevealed) return;
    
    setSelectedAnswer(option);
    setIsRevealed(true);

    if (option === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      navigate(`/result/${categoryId}`, { 
        state: { 
          score, 
          totalQuestions: questions.length,
          categoryName: category?.name 
        } 
      });
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsRevealed(false);
      setAnimationKey(prev => prev + 1);
    }
  };

  if (!currentQuestion) return null;

  const getOptionClass = (option: OptionKey) => {
    let baseClass = `quiz-option ${optionStyles[option]} w-full p-4 md:p-6 text-left`;
    
    if (!isRevealed) return baseClass;
    
    if (option === currentQuestion.correctAnswer) {
      return `${baseClass} option-correct`;
    }
    
    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
      return `${baseClass} option-wrong animate-shake`;
    }
    
    return `${baseClass} option-disabled`;
  };

  return (
    <div className="min-h-screen bg-background bg-texture flex flex-col">
      {/* Header */}
      <header className="bg-accent text-accent-foreground py-4">
        <div className="container flex justify-between items-center">
          <Link to="/" className="font-display text-xl tracking-wide hover:text-primary transition-colors">
            ← EXIT
          </Link>
          <div className="font-display text-xl tracking-wide">
            {category?.icon} {category?.name}
          </div>
          <div className="score-display">
            <span className="text-primary">{score}</span>
            <span className="text-sm opacity-70">/{questions.length}</span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-2 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Section */}
      <main className="flex-1 flex flex-col justify-center py-8">
        <div className="container max-w-3xl">
          {/* Question Counter */}
          <div className="text-center mb-6">
            <span className="inline-block bg-accent text-accent-foreground px-4 py-1 font-display text-lg">
              QUESTION {currentIndex + 1} OF {questions.length}
            </span>
          </div>

          {/* Question Text */}
          <div 
            key={animationKey}
            className="bg-card border-4 border-accent p-6 md:p-8 mb-8 shadow-[6px_6px_0px_0px_hsl(var(--accent))] animate-bounce-in"
          >
            <h2 className="font-display text-2xl md:text-4xl text-accent text-center">
              {currentQuestion.text}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {(Object.keys(currentQuestion.options) as OptionKey[]).map((option, idx) => (
              <button
                key={option}
                onClick={() => handleSelectAnswer(option)}
                disabled={isRevealed}
                className={getOptionClass(option)}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <span className="font-display text-2xl mr-3">{optionLabels[option]}</span>
                <OptionContent option={currentQuestion.options[option]} />
              </button>
            ))}
          </div>

          {/* Next Button */}
          {isRevealed && (
            <div className="text-center mt-8">
              <button
                onClick={handleNextQuestion}
                className="bg-accent text-accent-foreground px-8 py-4 font-display text-2xl tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors animate-bounce-in"
              >
                {isLastQuestion ? 'VIEW RESULTS →' : 'NEXT QUESTION →'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
