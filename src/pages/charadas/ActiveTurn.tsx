import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CircularTimer } from '../../components/CircularTimer';
import { useCountdownTimer } from '../../hooks/useCountdownTimer';
import { Word } from '../../data/words';

interface ActiveTurnProps {
  playerName: string;
  round: number;
  totalRounds: number;
  time: number;
  words: Word[];
  onBack: () => void;
  onEnd: (points: number, guessed: string[]) => void;
}

export function ActiveTurn({ playerName, round, totalRounds, time, words, onBack, onEnd }: ActiveTurnProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const lastTapRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const timeLeft = useCountdownTimer(time);

  useEffect(() => {
    if (timeLeft === 0) {
      onEnd(points, guessed);
    }
  }, [timeLeft, points, guessed, onEnd]);

  const handleGuess = () => {
    setPoints((prev) => prev + timeLeft);
    setGuessed((prev) => [...prev, words[currentIdx].palabra]);
    setCurrentIdx((prev) => prev + 1);
  };

  const handleSkip = () => {
    setCurrentIdx((prev) => prev + 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      handleSkip();
      return;
    }
    if (Math.abs(dx) < 15 && Math.abs(dy) < 15) {
      const now = Date.now();
      if (now - lastTapRef.current < 350) {
        handleGuess();
        lastTapRef.current = 0;
      } else {
        lastTapRef.current = now;
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col p-6 overflow-hidden select-none">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={onBack}>
            <XCircle className="w-7 h-7" />
          </Button>
          <div className="space-y-1">
            <p className="text-xl font-bold text-primary">{playerName}</p>
            <Badge variant="outline" className="text-xs uppercase tracking-widest px-4 py-1.5 border-2">
              Ronda {round} de {totalRounds}
            </Badge>
          </div>
        </div>
        <CircularTimer timeLeft={timeLeft} totalTime={time} />
      </div>

      <div
        className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="space-y-4"
          >
            <Badge className="bg-indigo-500 text-white px-8 py-3 text-xl shadow-lg shadow-indigo-500/20 font-black uppercase tracking-widest">
              {words[currentIdx].categoria}
            </Badge>
            <h3
              className="font-black tracking-tighter uppercase px-4 leading-tight"
              style={{ fontSize: `clamp(1.5rem, ${120 / Math.max(words[currentIdx].palabra.length, 1)}vw, 4.5rem)` }}
            >
              {words[currentIdx].palabra}
            </h3>
            <Badge variant="outline" className="text-muted-foreground px-4 py-1.5 border-2 font-medium">
              {words[currentIdx].dificultad}
            </Badge>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            onClick={(e) => { e.stopPropagation(); handleSkip(); }}
            className="h-16 px-8 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold shadow-lg shadow-secondary/20"
          >
            Pasar
          </Button>
          <Button
            size="lg"
            onClick={(e) => { e.stopPropagation(); handleGuess(); }}
            className="h-16 px-8 text-lg bg-primary text-primary-foreground font-bold"
          >
            ¡Adivinó!
          </Button>
        </div>
        <p className="text-center text-muted-foreground text-sm animate-pulse">
          Toca 2 veces si adivinaron • Desliza para pasar
        </p>
      </div>
    </div>
  );
}
