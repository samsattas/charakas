import { motion } from 'motion/react';
import { ChevronLeft, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReadyScreenProps {
  playerName: string;
  round: number;
  totalRounds: number;
  onStart: () => void;
  onBack: () => void;
}

export function ReadyScreen({ playerName, round, totalRounds, onStart, onBack }: ReadyScreenProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-6">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={onBack}>
          <ChevronLeft className="w-7 h-7" />
        </Button>
      </div>
      <div
        className="flex-1 flex flex-col items-center justify-center p-6 text-center cursor-pointer space-y-8"
        onClick={onStart}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-4"
        >
          <p className="text-lg text-muted-foreground uppercase tracking-widest font-bold">Ronda {round} de {totalRounds}</p>
          <h2 className="text-5xl font-extrabold text-primary">¿Listo, {playerName}?</h2>
          <p className="text-2xl text-muted-foreground">Toca la pantalla para comenzar</p>
        </motion.div>
        <div className="bg-primary/10 p-8 rounded-full animate-pulse">
          <Play className="w-24 h-24 text-primary fill-primary" />
        </div>
      </div>
    </div>
  );
}
