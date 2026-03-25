import { ChevronLeft, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategorySelectProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onNext: () => void;
  onBack: () => void;
}

const CATEGORIES: { name: string; color: string; emoji: string }[] = [
  { name: 'Animales',           color: 'bg-amber-400   border-amber-500   text-amber-900',  emoji: '🐾' },
  { name: 'Comida',  color: 'bg-red-400     border-red-500     text-red-900',    emoji: '🍽️' },
  { name: 'Lugares',            color: 'bg-yellow-400  border-yellow-500  text-yellow-900', emoji: '📍' },
  { name: 'Deportes',           color: 'bg-blue-400    border-blue-500    text-blue-900',   emoji: '⚽' },
  { name: 'Objetos cotidianos', color: 'bg-slate-400   border-slate-500   text-slate-900',  emoji: '🏠' },
  { name: 'Oficios',            color: 'bg-purple-400  border-purple-500  text-purple-900', emoji: '🔧' },
  { name: 'Entretenimiento',    color: 'bg-pink-400    border-pink-500    text-pink-900',   emoji: '🎉' },
  { name: 'Naturaleza',         color: 'bg-green-400   border-green-500   text-green-900',  emoji: '🌿' },
  { name: 'Tecnología',         color: 'bg-cyan-400    border-cyan-500    text-cyan-900',   emoji: '💻' },
  { name: 'Famosos',            color: 'bg-violet-400  border-violet-500  text-violet-900', emoji: '⭐' },
];

export function CategorySelect({ selectedCategory, onSelectCategory, onNext, onBack }: CategorySelectProps) {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={onBack}>
          <ChevronLeft className="w-7 h-7" />
        </Button>
        <h2 className="text-3xl font-black text-primary tracking-tighter uppercase">Categoría</h2>
        <div className="w-10" />
      </div>

      <button
        onClick={() => onSelectCategory(null)}
        className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl border-2 font-bold text-lg transition-all ${
          selectedCategory === null
            ? 'bg-primary text-primary-foreground border-primary scale-[1.02] shadow-lg shadow-primary/30'
            : 'bg-card border-muted text-foreground hover:border-primary/50'
        }`}
      >
        <Shuffle className="w-6 h-6 shrink-0" />
        Todo random
      </button>

      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map(({ name, color, emoji }) => {
          const isSelected = selectedCategory === name;
          return (
            <button
              key={name}
              onClick={() => onSelectCategory(name)}
              className={`flex flex-col items-start gap-1 px-4 py-4 rounded-2xl border-2 font-bold transition-all text-left ${color} ${
                isSelected ? 'scale-[1.04] shadow-lg ring-2 ring-offset-2 ring-offset-background ring-current' : 'opacity-80 hover:opacity-100'
              }`}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-sm leading-tight">{name}</span>
            </button>
          );
        })}
      </div>

      <Button
        onClick={onNext}
        className="w-full py-8 text-xl font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20"
      >
        Continuar
      </Button>
    </div>
  );
}
