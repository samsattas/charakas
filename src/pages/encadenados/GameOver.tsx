import { motion } from 'motion/react';
import { Crown, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EncadenadoPlayer, EncadenadoGroup } from '../../types';
import { COLOR_PALETTES } from '../../hooks/useEncadenadosGame';

interface GameOverProps {
  players: EncadenadoPlayer[];
  groups: EncadenadoGroup[];
  winnerId: string;
  onRestart: () => void;
}

export function GameOver({ players, groups, winnerId, onRestart }: GameOverProps) {
  const winner = players.find((p) => p.id === winnerId)!;
  const winnerPalette = COLOR_PALETTES[winner.colorIndex];
  const winnerGroup = groups.find((g) => g.leaderId === winnerId)!;
  const members = winnerGroup.memberIds
    .filter((id) => id !== winnerId)
    .map((id) => players.find((p) => p.id === id)!);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-10">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="text-center space-y-2"
      >
        <div className="text-7xl mb-4">🏆</div>
        <p className="text-muted-foreground text-lg">¡Ganador!</p>
        <h1 className="text-5xl font-black tracking-tight">{winner.name}</h1>
        <p className="text-muted-foreground">
          se quedó con todos ({players.length} jugadores)
        </p>
      </motion.div>

      {/* Winner group card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`w-full max-w-xs rounded-2xl overflow-hidden shadow-xl ${winnerPalette.bg}`}
      >
        <div className={`px-4 py-3 flex items-center gap-2 ${winnerPalette.text}`}>
          <Crown className="w-5 h-5 shrink-0" />
          <span className="font-black text-lg">{winner.name}</span>
        </div>
        {members.length > 0 && (
          <div className={`${winnerPalette.memberBg} px-4 py-3 space-y-1.5`}>
            {members.map((m) => (
              <div key={m.id} className={`text-sm font-medium ${winnerPalette.text} opacity-80`}>
                {m.name}
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-xs"
      >
        <Button
          onClick={onRestart}
          className="w-full py-5 font-bold text-base gap-2"
          variant="outline"
        >
          <RotateCcw className="w-4 h-4" />
          Jugar de nuevo
        </Button>
      </motion.div>
    </div>
  );
}
