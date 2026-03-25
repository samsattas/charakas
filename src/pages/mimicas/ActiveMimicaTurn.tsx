import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { XCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCountdownTimer } from '../../hooks/useCountdownTimer';

interface ActiveMimicaTurnProps {
  teamName: string;
  round: number;
  words: string[];
  onBack: () => void;
  onEnd: (points: number) => void;
}

export function ActiveMimicaTurn({ teamName, round, words, onBack, onEnd }: ActiveMimicaTurnProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [points, setPoints] = useState(0);

  const timeLeft = useCountdownTimer(60);

  useEffect(() => {
    if (timeLeft === 0) {
      onEnd(points);
    }
  }, [timeLeft, points, onEnd]);

  const handleGuess = () => {
    setPoints((prev) => prev + 1);
    setCurrentIdx((prev) => prev + 1);
  };

  const handleSkip = () => {
    setPoints((prev) => Math.max(0, prev - 1));
    setCurrentIdx((prev) => prev + 1);
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col p-6 overflow-hidden">
      <div className="flex justify-between items-start bg-card/30 p-4 rounded-xl backdrop-blur">
        <div className="flex items-start gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={onBack}>
            <XCircle className="w-7 h-7" />
          </Button>
          <div className="space-y-1">
            <p className="text-xl font-bold text-amber-500">{teamName}</p>
            <div className="flex gap-4">
              <Badge variant="outline" className="px-4 py-1.5 border-2 font-bold">Ronda {round}</Badge>
              <Badge className="bg-primary px-5 py-2 font-black shadow-md shadow-primary/20">Puntos: {points}</Badge>
            </div>
          </div>
        </div>
        <div className="text-4xl font-black text-primary tabular-nums">{timeLeft}s</div>
      </div>

      <div className="flex-1 flex items-center justify-center text-center p-4">
        <AnimatePresence mode="wait">
          <motion.h3
            key={currentIdx}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase"
          >
            {words[currentIdx]}
          </motion.h3>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-6 pb-8">
        <Button
          onClick={handleSkip}
          className="h-24 text-2xl font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg shadow-secondary/20"
        >
          <XCircle className="mr-2 w-8 h-8" /> Pasar (-1)
        </Button>
        <Button
          onClick={handleGuess}
          className="h-24 text-2xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <CheckCircle2 className="mr-2 w-8 h-8" /> ¡Adivinó! (+1)
        </Button>
      </div>
    </div>
  );
}
