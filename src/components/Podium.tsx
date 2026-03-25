import { RotateCcw, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Player, Team } from '../types';

interface PodiumProps {
  players: Player[] | Team[];
  onRestart: () => void;
}

export function Podium({ players, onRestart }: PodiumProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  const podiumOrder = [top3[1] || null, top3[0] || null, top3[2] || null];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <div className="flex justify-start">
        <Button variant="ghost" className="text-muted-foreground hover:text-primary gap-1" onClick={onRestart}>
          <ChevronLeft className="w-5 h-5" /> Inicio
        </Button>
      </div>
      <h2 className="text-5xl font-black text-center text-primary tracking-tighter">¡FIN DEL JUEGO!</h2>

      <div className="flex items-end justify-center gap-2 sm:gap-4 h-64 sm:h-80">
        {podiumOrder.map((p, i) => {
          if (!p) return <div key={i} className="flex-1" />;
          const height = i === 1 ? 'h-full' : i === 0 ? 'h-3/4' : 'h-1/2';
          const color = i === 1 ? 'bg-primary' : i === 0 ? 'bg-slate-400' : 'bg-amber-700';
          const medal = i === 1 ? '🥇' : i === 0 ? '🥈' : '🥉';
          return (
            <div key={p.id} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-2xl sm:text-4xl">{medal}</span>
              <div className={`w-full ${height} ${color} rounded-t-xl flex flex-col items-center justify-start p-2 sm:p-4 text-center shadow-xl`}>
                <p className="font-bold text-xs sm:text-base truncate w-full">{p.name}</p>
                <p className="font-black text-lg sm:text-3xl">{p.score}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold border-b-2 border-muted pb-2">Tabla de Posiciones</h3>
        <div className="space-y-2">
          {sorted.map((p, i) => (
            <div key={p.id} className="flex items-center justify-between p-4 bg-card/50 rounded-xl border border-muted">
              <div className="flex items-center gap-4">
                <span className="font-black text-muted-foreground w-6">{i + 1}.</span>
                <span className="font-bold">{p.name}</span>
              </div>
              <span className="font-black text-primary">{p.score} pts</span>
            </div>
          ))}
        </div>
        {rest.length > 0 && rest.map((p, i) => (
          <div key={p.id} className="flex items-center justify-between p-4 bg-card/50 rounded-xl border border-muted">
            <div className="flex items-center gap-4">
              <span className="font-black text-muted-foreground w-6">{i + 4}.</span>
              <span className="font-bold">{p.name}</span>
            </div>
            <span className="font-black text-primary">{p.score} pts</span>
          </div>
        ))}
      </div>

      <Button onClick={onRestart} className="w-full py-8 text-2xl font-black bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20">
        <RotateCcw className="mr-2" /> Jugar de nuevo
      </Button>
    </div>
  );
}
