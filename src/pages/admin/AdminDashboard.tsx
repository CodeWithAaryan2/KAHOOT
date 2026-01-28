import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import { useQuiz } from '@/context/QuizContext';

export default function AdminDashboard() {
  const { logout } = useAdmin();
  const { categories, questions } = useQuiz();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-background bg-texture">
      {/* Header */}
      <header className="bg-accent text-accent-foreground py-4">
        <div className="container flex justify-between items-center">
          <h1 className="font-display text-2xl tracking-wide">ADMIN DASHBOARD</h1>
          <button
            onClick={handleLogout}
            className="font-display text-lg hover:text-primary transition-colors"
          >
            LOGOUT →
          </button>
        </div>
      </header>

      <main className="py-12">
        <div className="container max-w-4xl">
          {/* Stats */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="admin-card text-center">
              <div className="font-display text-6xl text-primary mb-2">
                {categories.length}
              </div>
              <div className="font-display text-xl text-accent">
                TOTAL CATEGORIES
              </div>
            </div>
            <div className="admin-card text-center">
              <div className="font-display text-6xl text-primary mb-2">
                {questions.length}
              </div>
              <div className="font-display text-xl text-accent">
                TOTAL QUESTIONS
              </div>
            </div>
          </div>

          {/* Quick Stats per Category */}
          <div className="admin-card mb-8">
            <h2 className="font-display text-2xl text-accent mb-4">QUESTIONS BY CATEGORY</h2>
            <div className="space-y-3">
              {categories.map(cat => {
                const count = questions.filter(q => q.categoryId === cat.id).length;
                const percentage = questions.length > 0 ? (count / questions.length) * 100 : 0;
                return (
                  <div key={cat.id} className="flex items-center gap-4">
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="font-medium flex-1">{cat.name}</span>
                    <div className="w-32 h-3 bg-muted overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="font-display text-xl w-12 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              to="/admin/categories"
              className="admin-card group hover:border-primary transition-colors"
            >
              <div className="text-4xl mb-4">📁</div>
              <h3 className="font-display text-2xl text-accent mb-2">MANAGE CATEGORIES</h3>
              <p className="text-muted-foreground">Add, edit, or delete quiz categories</p>
              <div className="mt-4 inline-block bg-primary text-primary-foreground px-4 py-2 font-display group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                OPEN →
              </div>
            </Link>

            <Link
              to="/admin/questions"
              className="admin-card group hover:border-primary transition-colors"
            >
              <div className="text-4xl mb-4">❓</div>
              <h3 className="font-display text-2xl text-accent mb-2">MANAGE QUESTIONS</h3>
              <p className="text-muted-foreground">Add, edit, or delete quiz questions</p>
              <div className="mt-4 inline-block bg-primary text-primary-foreground px-4 py-2 font-display group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                OPEN →
              </div>
            </Link>
          </div>

          {/* Back to Quiz Link */}
          <div className="text-center mt-12">
            <Link 
              to="/" 
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              ← View Live Quiz
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
