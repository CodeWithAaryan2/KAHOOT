import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, Plus, X, Check } from 'lucide-react';

export default function AdminCategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useQuiz();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '📚',
  });

  const resetForm = () => {
    setFormData({ name: '', description: '', icon: '📚' });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleAdd = () => {
    if (formData.name.trim()) {
      addCategory(formData);
      resetForm();
    }
  };

  const handleUpdate = () => {
    if (editingId && formData.name.trim()) {
      updateCategory(editingId, formData);
      resetForm();
    }
  };

  const startEditing = (category: typeof categories[0]) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
    });
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this category and all its questions?')) {
      deleteCategory(id);
    }
  };

  const emojiOptions = ['📚', '🌐', '🤖', '💻', '🔧', '📊', '🎮', '🔐', '📱', '☁️'];

  return (
    <div className="min-h-screen bg-background bg-texture">
      {/* Header */}
      <header className="bg-accent text-accent-foreground py-4">
        <div className="container flex justify-between items-center">
          <Link to="/admin/dashboard" className="font-display text-xl tracking-wide hover:text-primary transition-colors">
            ← DASHBOARD
          </Link>
          <h1 className="font-display text-xl tracking-wide">MANAGE CATEGORIES</h1>
        </div>
      </header>

      <main className="py-12">
        <div className="container max-w-2xl">
          {/* Add Button */}
          {!isAdding && !editingId && (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full admin-card flex items-center justify-center gap-3 mb-6 hover:border-primary transition-colors group"
            >
              <Plus className="w-6 h-6 text-primary" />
              <span className="font-display text-xl text-accent group-hover:text-primary transition-colors">
                ADD NEW CATEGORY
              </span>
            </button>
          )}

          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <div className="admin-card mb-6 border-primary">
              <h3 className="font-display text-xl text-accent mb-4">
                {editingId ? 'EDIT CATEGORY' : 'NEW CATEGORY'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-display text-sm text-muted-foreground mb-1">ICON</label>
                  <div className="flex gap-2 flex-wrap">
                    {emojiOptions.map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: emoji })}
                        className={`w-12 h-12 text-2xl border-2 ${formData.icon === emoji ? 'border-primary bg-primary/10' : 'border-border hover:border-primary'}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-display text-sm text-muted-foreground mb-1">NAME</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-2 border-accent"
                    placeholder="e.g., Web Development"
                  />
                </div>

                <div>
                  <label className="block font-display text-sm text-muted-foreground mb-1">DESCRIPTION</label>
                  <Input
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="border-2 border-accent"
                    placeholder="e.g., HTML, CSS, JavaScript"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={editingId ? handleUpdate : handleAdd}
                    className="flex-1 bg-primary text-primary-foreground font-display"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    {editingId ? 'UPDATE' : 'ADD'}
                  </Button>
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="border-2 border-accent font-display"
                  >
                    <X className="w-4 h-4 mr-2" />
                    CANCEL
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Categories List */}
          <div className="space-y-4">
            {categories.map(category => (
              <div
                key={category.id}
                className="admin-card flex items-center gap-4"
              >
                <div className="text-4xl">{category.icon}</div>
                <div className="flex-1">
                  <h3 className="font-display text-xl text-accent">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(category)}
                    className="p-2 border-2 border-border hover:border-primary hover:text-primary transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 border-2 border-border hover:border-destructive hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {categories.length === 0 && (
              <div className="admin-card text-center py-12">
                <p className="text-muted-foreground">No categories yet. Add one above!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
