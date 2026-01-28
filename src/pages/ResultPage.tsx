import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

interface ResultState {
  score: number;
  totalQuestions: number;
  categoryName: string;
}

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultState | null;

  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state) return null;

  const { score, totalQuestions, categoryName } = state;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getMessage = () => {
    if (percentage === 100) return { emoji: '🏆', text: 'PERFECT SCORE!' };
    if (percentage >= 80) return { emoji: '🔥', text: 'EXCELLENT!' };
    if (percentage >= 60) return { emoji: '👍', text: 'GOOD JOB!' };
    if (percentage >= 40) return { emoji: '💪', text: 'KEEP TRYING!' };
    return { emoji: '📚', text: 'STUDY MORE!' };
  };

  const result = getMessage();

  return (
    <div className="min-h-screen bg-background bg-texture flex flex-col">
      {/* Header */}
      <header className="bg-accent text-accent-foreground py-4">
        <div className="container">
          <Link to="/" className="font-display text-xl tracking-wide hover:text-primary transition-colors">
            ← HOME
          </Link>
        </div>
      </header>

      {/* Result Section */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-lg text-center">
          {/* Emoji */}
          <div className="text-8xl mb-6 animate-bounce-in">{result.emoji}</div>

          {/* Result Message */}
          <h1 className="font-display text-5xl md:text-6xl text-accent mb-4 animate-bounce-in">
            {result.text}
          </h1>

          {/* Category */}
          <p className="text-lg text-muted-foreground mb-8">
            {categoryName} Quiz Completed
          </p>

          {/* Score Card */}
          <div className="bg-card border-4 border-accent p-8 shadow-[6px_6px_0px_0px_hsl(var(--accent))] mb-8">
            <div className="font-display text-8xl text-primary mb-2 animate-score-pop">
              {score}/{totalQuestions}
            </div>
            <div className="text-2xl font-medium text-accent">
              {percentage}% CORRECT
            </div>
            
            {/* Score Bar */}
            <div className="mt-6 h-4 bg-muted overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-success/20 border-2 border-success p-4">
              <div className="font-display text-3xl text-success">{score}</div>
              <div className="text-sm text-success/80">CORRECT</div>
            </div>
            <div className="bg-destructive/20 border-2 border-destructive p-4">
              <div className="font-display text-3xl text-destructive">{totalQuestions - score}</div>
              <div className="text-sm text-destructive/80">WRONG</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`/quiz/${location.pathname.split('/')[2]}`}
              className="bg-primary text-primary-foreground px-8 py-4 font-display text-xl tracking-wide hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              TRY AGAIN
            </Link>
            <Link
              to="/"
              className="bg-accent text-accent-foreground px-8 py-4 font-display text-xl tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              NEW CATEGORY
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
