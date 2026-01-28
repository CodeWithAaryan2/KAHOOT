import { Link } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';

export default function HomePage() {
  const { categories } = useQuiz();

  return (
    <div className="min-h-screen bg-background bg-texture">
      {/* Header */}
      <header className="bg-accent text-accent-foreground py-4">
        <div className="container flex justify-between items-center">
          <div className="font-display text-2xl tracking-wide">TECH QUIZ 2026</div>
          <Link 
            to="/admin" 
            className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
          >
            Admin
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-accent leading-none mb-4">
            TECH QUIZ
            <span className="block text-primary">2026</span>
          </h1>
          <p className="font-display text-2xl md:text-3xl text-accent tracking-wider mb-2">
            KAHOOT STYLE
          </p>
          <div className="w-32 h-1 bg-primary mx-auto mb-8" />
          <p className="text-xl md:text-2xl font-medium text-muted-foreground">
            Choose your battlefield
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-16 md:pb-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/quiz/${category.id}`}
                className="quiz-card bg-card p-8 text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-6xl mb-4">{category.icon}</div>
                <h2 className="font-display text-3xl text-accent mb-2">
                  {category.name}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {category.description}
                </p>
                <div className="mt-6 inline-block bg-primary text-primary-foreground px-6 py-2 font-display text-xl tracking-wide group-hover:bg-accent transition-colors">
                  START →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent text-accent-foreground py-6">
        <div className="container text-center">
          <p className="font-display text-lg tracking-wide opacity-70">
            COLLEGE TECH FEST 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
