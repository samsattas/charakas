import { useState } from 'react';
import { ChevronLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EncadenadoPlayer } from '../../types';
import { COLOR_PALETTES } from '../../hooks/useEncadenadosGame';

interface PlayerSetupProps {
  players: EncadenadoPlayer[];
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PlayerSetup({ players, onAddPlayer, onRemovePlayer, onNext, onBack }: PlayerSetupProps) {
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (name.trim()) {
      onAddPlayer(name.trim());
      setName('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={onBack}>
          <ChevronLeft className="w-7 h-7" />
        </Button>
        <h2 className="text-2xl font-bold text-primary">Jugadores</h2>
        <div className="w-9" />
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Nombre del jugador"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            className="bg-card/50 h-10"
          />
          <Button size="sm" onClick={handleAdd} className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 h-10 shrink-0">
            <Plus className="w-4 h-4 mr-1.5" /> Agregar
          </Button>
        </div>

        <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
          {players.map((p) => {
            const palette = COLOR_PALETTES[p.colorIndex];
            return (
              <div key={p.id} className={`flex items-center justify-between px-3 py-2 ${palette.bg} rounded-lg`}>
                <span className={`text-sm font-bold ${palette.text}`}>{p.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemovePlayer(p.id)}
                  className={`h-7 w-7 ${palette.text} hover:bg-black/10`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        disabled={players.length < 3}
        onClick={onNext}
        className="w-full py-5 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
      >
        {players.length < 3 ? `Mínimo 3 jugadores (faltan ${3 - players.length})` : 'Siguiente'}
      </Button>
    </div>
  );
}
