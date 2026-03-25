import { useState } from 'react';
import { ChevronLeft, Plus, Trash2, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Player } from '../../types';
import { Word } from '../../data/words';
import { parseWordsCSV, downloadCSV } from '../../lib/game-utils';

interface PlayerSetupProps {
  players: Player[];
  words: Word[];
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (id: string) => void;
  onSetWords: (words: Word[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PlayerSetup({
  players, words, onAddPlayer, onRemovePlayer, onSetWords, onNext, onBack,
}: PlayerSetupProps) {
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (name.trim()) {
      onAddPlayer(name.trim());
      setName('');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const newWords = await parseWordsCSV(file);
      onSetWords(newWords);
      toast.success(`${newWords.length} palabras cargadas con éxito`);
    } catch {
      toast.error('El archivo CSV no tiene el formato correcto');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={onBack}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-primary">Jugadores</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => document.getElementById('csv-upload')?.click()}>
              <Upload className="w-4 h-4 mr-2" /> Subir CSV
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => downloadCSV(words, 'palabras_charadas.csv')}>
              <Download className="w-4 h-4 mr-2" /> Descargar Base
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" id="csv-upload" />
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

        <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
          {players.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-3 py-2 bg-card rounded-lg border border-muted">
              <span className="text-sm font-medium">{p.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemovePlayer(p.id)}
                className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Button
        disabled={players.length < 2}
        onClick={onNext}
        className="w-full py-3 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
      >
        Siguiente
      </Button>
    </div>
  );
}
