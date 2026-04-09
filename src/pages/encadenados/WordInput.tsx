import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { EncadenadoPlayer } from '../../types';
import { COLOR_PALETTES } from '../../hooks/useEncadenadosGame';
import { toast } from 'sonner';

interface WordInputProps {
  players: EncadenadoPlayer[];
  wordInputIdx: number;
  category: string;
  isWordDuplicate: (word: string) => boolean;
  onSubmitWord: (word: string) => void;
}

export function WordInput({ players, wordInputIdx, category, isWordDuplicate, onSubmitWord }: WordInputProps) {
  const [ready, setReady] = useState(false);
  const [word, setWord] = useState('');
  const [showWord, setShowWord] = useState(false);

  const currentPlayer = players[wordInputIdx];
  const palette = COLOR_PALETTES[currentPlayer.colorIndex];

  const handleReady = () => {
    setReady(true);
    setWord('');
    setShowWord(false);
  };

  const handleSubmit = () => {
    if (!word.trim()) return;
    if (isWordDuplicate(word)) {
      toast.error(`"${word.trim()}" ya fue elegida. Escoge otra.`);
      return;
    }
    onSubmitWord(word.trim());
    setReady(false);
    setWord('');
    setShowWord(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {!ready ? (
          <motion.div
            key={`pass-${wordInputIdx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm space-y-8 text-center"
          >
            <div className={`mx-auto w-24 h-24 ${palette.bg} rounded-full flex items-center justify-center shadow-lg`}>
              <span className={`text-3xl font-black ${palette.text}`}>
                {currentPlayer.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-muted-foreground text-lg">Pasa el teléfono a</p>
              <h2 className={`text-4xl font-black tracking-tight`}>{currentPlayer.name}</h2>
            </div>

            <Button
              onClick={handleReady}
              className={`w-full py-6 text-lg font-bold ${palette.bg} ${palette.text} hover:opacity-90 border-0 shadow-lg`}
            >
              Soy {currentPlayer.name}, estoy listo
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key={`input-${wordInputIdx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-sm space-y-6"
          >
            <div className="text-center space-y-3">
              <p className="text-muted-foreground">La categoría es</p>
              <Badge className="text-base px-4 py-1.5 gap-2 bg-primary/10 text-primary border-primary/20">
                <Tag className="w-4 h-4" />
                {category}
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground text-center">
                Escribe tu palabra secreta — ¡nadie más puede verla!
              </p>
              <div className="relative">
                <Input
                  type={showWord ? 'text' : 'password'}
                  placeholder="Tu palabra..."
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  className="bg-card/50 h-12 text-lg pr-12"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowWord((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showWord ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              disabled={!word.trim()}
              onClick={handleSubmit}
              className="w-full py-5 font-bold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Confirmar palabra
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Jugador {wordInputIdx + 1} de {players.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
