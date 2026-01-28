import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/admin/dashboard');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(username, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-accent bg-texture flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_hsl(var(--primary))]">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl text-accent mb-2">ADMIN PANEL</h1>
            <p className="text-muted-foreground">Tech Quiz 2026</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-display text-sm text-accent mb-1">USERNAME</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-2 border-accent bg-background"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block font-display text-sm text-accent mb-1">PASSWORD</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-accent bg-background"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="bg-destructive/20 border-2 border-destructive text-destructive p-3 text-center font-medium">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-display text-xl py-6 hover:bg-accent hover:text-accent-foreground"
            >
              LOGIN →
            </Button>
          </form>

          {/* Back Link */}
          <div className="text-center mt-6">
            <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
              ← Back to Quiz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
