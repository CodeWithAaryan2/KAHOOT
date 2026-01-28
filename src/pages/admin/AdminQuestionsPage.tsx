import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit2, Plus, X, Check, Image, Type } from 'lucide-react';
import { OptionKey, Question, QuestionOption } from '@/types/quiz';

interface OptionFormData {
  text: string;
  imageUrl: string;
  useImage: boolean;
}

interface FormData {
  categoryId: string;
  text: string;
  options: Record<OptionKey, OptionFormData>;
  correctAnswer: OptionKey;
}

const emptyOption: OptionFormData = { text: '', imageUrl: '', useImage: false };

const emptyForm: FormData = {
  categoryId: '',
  text: '',
  options: { 
    a: { ...emptyOption }, 
    b: { ...emptyOption }, 
    c: { ...emptyOption }, 
    d: { ...emptyOption } 
  },
  correctAnswer: 'a' as OptionKey,
};

export default function AdminQuestionsPage() {
  const { categories, questions, addQuestion, updateQuestion, deleteQuestion } = useQuiz();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);

  const filteredQuestions = selectedCategory === 'all' 
    ? questions 
    : questions.filter(q => q.categoryId === selectedCategory);

  const resetForm = () => {
    setFormData(emptyForm);
    setIsAdding(false);
    setEditingId(null);
  };

  const formToQuestion = (): Omit<Question, 'id'> => {
    const options: Record<OptionKey, QuestionOption> = {
      a: formData.options.a.useImage 
        ? { imageUrl: formData.options.a.imageUrl }
        : { text: formData.options.a.text },
      b: formData.options.b.useImage 
        ? { imageUrl: formData.options.b.imageUrl }
        : { text: formData.options.b.text },
      c: formData.options.c.useImage 
        ? { imageUrl: formData.options.c.imageUrl }
        : { text: formData.options.c.text },
      d: formData.options.d.useImage 
        ? { imageUrl: formData.options.d.imageUrl }
        : { text: formData.options.d.text },
    };
    return {
      categoryId: formData.categoryId,
      text: formData.text,
      options,
      correctAnswer: formData.correctAnswer,
    };
  };

  const handleAdd = () => {
    if (formData.categoryId && formData.text.trim()) {
      addQuestion(formToQuestion());
      resetForm();
    }
  };

  const handleUpdate = () => {
    if (editingId) {
      updateQuestion(editingId, formToQuestion());
      resetForm();
    }
  };

  const startEditing = (question: Question) => {
    setEditingId(question.id);
    const options: Record<OptionKey, OptionFormData> = {
      a: { 
        text: question.options.a.text || '', 
        imageUrl: question.options.a.imageUrl || '',
        useImage: !!question.options.a.imageUrl 
      },
      b: { 
        text: question.options.b.text || '', 
        imageUrl: question.options.b.imageUrl || '',
        useImage: !!question.options.b.imageUrl 
      },
      c: { 
        text: question.options.c.text || '', 
        imageUrl: question.options.c.imageUrl || '',
        useImage: !!question.options.c.imageUrl 
      },
      d: { 
        text: question.options.d.text || '', 
        imageUrl: question.options.d.imageUrl || '',
        useImage: !!question.options.d.imageUrl 
      },
    };
    setFormData({
      categoryId: question.categoryId,
      text: question.text,
      options,
      correctAnswer: question.correctAnswer,
    });
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this question?')) {
      deleteQuestion(id);
    }
  };

  const getCategoryName = (id: string) => {
    return categories.find(c => c.id === id)?.name || 'Unknown';
  };

  const toggleOptionType = (key: OptionKey) => {
    setFormData({
      ...formData,
      options: {
        ...formData.options,
        [key]: {
          ...formData.options[key],
          useImage: !formData.options[key].useImage,
        },
      },
    });
  };

  const updateOptionText = (key: OptionKey, value: string) => {
    setFormData({
      ...formData,
      options: {
        ...formData.options,
        [key]: { ...formData.options[key], text: value },
      },
    });
  };

  const updateOptionImage = (key: OptionKey, value: string) => {
    setFormData({
      ...formData,
      options: {
        ...formData.options,
        [key]: { ...formData.options[key], imageUrl: value },
      },
    });
  };

  const optionLabels: Record<OptionKey, string> = { a: 'A', b: 'B', c: 'C', d: 'D' };

  const getOptionDisplay = (option: QuestionOption) => {
    if (option.imageUrl) {
      return (
        <img 
          src={option.imageUrl} 
          alt="Option" 
          className="w-12 h-12 object-contain rounded inline-block"
        />
      );
    }
    return option.text || '';
  };

  return (
    <div className="min-h-screen bg-background bg-texture">
      {/* Header */}
      <header className="bg-accent text-accent-foreground py-4">
        <div className="container flex justify-between items-center">
          <Link to="/admin/dashboard" className="font-display text-xl tracking-wide hover:text-primary transition-colors">
            ← DASHBOARD
          </Link>
          <h1 className="font-display text-xl tracking-wide">MANAGE QUESTIONS</h1>
        </div>
      </header>

      <main className="py-12">
        <div className="container max-w-3xl">
          {/* Filter */}
          <div className="admin-card mb-6">
            <label className="block font-display text-sm text-muted-foreground mb-2">FILTER BY CATEGORY</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-2 border-accent bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-2 border-accent">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Add Button */}
          {!isAdding && !editingId && (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full admin-card flex items-center justify-center gap-3 mb-6 hover:border-primary transition-colors group"
            >
              <Plus className="w-6 h-6 text-primary" />
              <span className="font-display text-xl text-accent group-hover:text-primary transition-colors">
                ADD NEW QUESTION
              </span>
            </button>
          )}

          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <div className="admin-card mb-6 border-primary">
              <h3 className="font-display text-xl text-accent mb-4">
                {editingId ? 'EDIT QUESTION' : 'NEW QUESTION'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-display text-sm text-muted-foreground mb-1">CATEGORY</label>
                  <Select 
                    value={formData.categoryId} 
                    onValueChange={(v) => setFormData({ ...formData, categoryId: v })}
                  >
                    <SelectTrigger className="border-2 border-accent bg-background">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-2 border-accent">
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block font-display text-sm text-muted-foreground mb-1">QUESTION TEXT</label>
                  <Input
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="border-2 border-accent"
                    placeholder="Enter the question"
                  />
                </div>

                {(Object.keys(formData.options) as OptionKey[]).map(key => (
                  <div key={key} className="space-y-2">
                    <div className="flex gap-3 items-center">
                      <div className={`w-10 h-10 flex items-center justify-center font-display text-xl ${
                        formData.correctAnswer === key 
                          ? 'bg-success text-success-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {optionLabels[key]}
                      </div>
                      
                      {/* Toggle between text and image */}
                      <button
                        type="button"
                        onClick={() => toggleOptionType(key)}
                        className={`p-2 border-2 transition-colors ${
                          formData.options[key].useImage 
                            ? 'border-primary bg-primary/10 text-primary' 
                            : 'border-border hover:border-primary'
                        }`}
                        title={formData.options[key].useImage ? 'Using Image' : 'Using Text'}
                      >
                        {formData.options[key].useImage ? <Image className="w-5 h-5" /> : <Type className="w-5 h-5" />}
                      </button>

                      {formData.options[key].useImage ? (
                        <Input
                          value={formData.options[key].imageUrl}
                          onChange={(e) => updateOptionImage(key, e.target.value)}
                          className="flex-1 border-2 border-accent"
                          placeholder="Image URL (e.g., https://...)"
                        />
                      ) : (
                        <Input
                          value={formData.options[key].text}
                          onChange={(e) => updateOptionText(key, e.target.value)}
                          className="flex-1 border-2 border-accent"
                          placeholder={`Option ${optionLabels[key]}`}
                        />
                      )}
                      
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, correctAnswer: key })}
                        className={`px-3 py-2 font-display text-sm border-2 transition-colors ${
                          formData.correctAnswer === key
                            ? 'bg-success text-success-foreground border-success'
                            : 'border-border hover:border-success hover:text-success'
                        }`}
                      >
                        {formData.correctAnswer === key ? '✓ CORRECT' : 'SET CORRECT'}
                      </button>
                    </div>
                    
                    {/* Image preview */}
                    {formData.options[key].useImage && formData.options[key].imageUrl && (
                      <div className="ml-[52px] p-2 border-2 border-dashed border-muted rounded">
                        <img 
                          src={formData.options[key].imageUrl} 
                          alt={`Preview ${optionLabels[key]}`}
                          className="h-20 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={editingId ? handleUpdate : handleAdd}
                    className="flex-1 bg-primary text-primary-foreground font-display"
                    disabled={!formData.categoryId || !formData.text.trim()}
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

          {/* Questions List */}
          <div className="space-y-4">
            {filteredQuestions.map((question, index) => (
              <div key={question.id} className="admin-card">
                <div className="flex items-start gap-4 mb-3">
                  <span className="bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center font-display">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">
                      {getCategoryName(question.categoryId)}
                    </p>
                    <p className="font-medium text-accent">{question.text}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(question)}
                      className="p-2 border-2 border-border hover:border-primary hover:text-primary transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(question.id)}
                      className="p-2 border-2 border-border hover:border-destructive hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pl-12">
                  {(Object.keys(question.options) as OptionKey[]).map(key => (
                    <div
                      key={key}
                      className={`p-2 text-sm border-2 flex items-center gap-2 ${
                        key === question.correctAnswer
                          ? 'border-success bg-success/10 text-success'
                          : 'border-border text-muted-foreground'
                      }`}
                    >
                      <span className="font-display">{optionLabels[key]}</span>
                      {getOptionDisplay(question.options[key])}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {filteredQuestions.length === 0 && (
              <div className="admin-card text-center py-12">
                <p className="text-muted-foreground">
                  {selectedCategory === 'all' 
                    ? 'No questions yet. Add one above!' 
                    : 'No questions in this category.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}