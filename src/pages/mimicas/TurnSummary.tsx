import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MimicasTurnSummaryProps {
  teamName: string;
  turnPoints: number;
  totalScore: number;
  onNext: () => void;
  onBack: () => void;
}

export function MimicasTurnSummary({ teamName, turnPoints, totalScore, onNext, onBack }: MimicasTurnSummaryProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 text-center">
      <div className="flex justify-start">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={onBack}>
          <ChevronLeft className="w-7 h-7" />
        </Button>
      </div>
      <h2 className="text-4xl font-bold text-primary">Resumen del Turno</h2>
      <div className="bg-card p-8 rounded-2xl border-2 border-primary/20 space-y-4 shadow-xl">
        <p className="text-2xl font-bold text-foreground">{teamName}</p>
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Puntos Turno</p>
            <p className="text-4xl font-black text-amber-500">+{turnPoints}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Total</p>
            <p className="text-4xl font-black text-primary">{totalScore}</p>
          </div>
        </div>
      </div>
      <Button onClick={onNext} className="w-full py-8 text-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20">
        Siguiente Equipo
      </Button>
    </div>
  );
}
