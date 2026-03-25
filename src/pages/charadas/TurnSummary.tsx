import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TurnSummaryProps {
  playerName: string;
  nextPlayerName: string;
  points: number;
  guessedWords: string[];
  onNext: () => void;
  onBack: () => void;
}

export function TurnSummary({ playerName, nextPlayerName, points, guessedWords, onNext, onBack }: TurnSummaryProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 text-center">
      <div className="flex justify-start">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={onBack}>
          <ChevronLeft className="w-7 h-7" />
        </Button>
      </div>
      <h2 className="text-4xl font-bold text-primary">Resumen del Turno</h2>
      <div className="bg-card p-8 rounded-2xl border-2 border-primary/20 space-y-4">
        <p className="text-2xl font-bold">{playerName}</p>
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <p className="text-muted-foreground text-sm uppercase tracking-widest">Adivinadas</p>
            <p className="text-4xl font-black text-accent">{guessedWords.length}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground text-sm uppercase tracking-widest">Puntos</p>
            <p className="text-4xl font-black text-primary">{points}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xl text-muted-foreground italic">
          Pasar el celular a <span className="text-foreground font-bold">{nextPlayerName}</span>
        </p>
        <Button onClick={onNext} className="w-full py-8 text-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20">
          Continuar
        </Button>
      </div>
    </div>
  );
}
