import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Tag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { shuffleArray } from '../../lib/game-utils';
import { EncadenadoPlayer, EncadenadoGroup } from '../../types';
import { COLOR_PALETTES } from '../../hooks/useEncadenadosGame';

interface GuessResult {
  type: 'correct' | 'wrong';
  targetName: string;
  newGuesserName: string;
}

interface GameBoardProps {
  players: EncadenadoPlayer[];
  groups: EncadenadoGroup[];
  category: string;
  currentGuesserId: string;
  onGuess: (targetLeaderId: string, word: string) => 'correct' | 'wrong';
  onExit: () => void;
}

function GroupCard({
  group,
  players,
  isGuesser,
  isSelectable,
  isSelected,
  onSelect,
}: {
  group: EncadenadoGroup;
  players: EncadenadoPlayer[];
  isGuesser: boolean;
  isSelectable: boolean;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const leader = players.find((p) => p.id === group.leaderId)!;
  const members = group.memberIds
    .filter((id) => id !== group.leaderId)
    .map((id) => players.find((p) => p.id === id)!);
  const palette = COLOR_PALETTES[leader.colorIndex];

  return (
    <motion.div
      layout
      whileTap={isSelectable ? { scale: 0.97 } : {}}
      onClick={isSelectable ? onSelect : undefined}
      className={`
        rounded-2xl overflow-hidden shadow-md transition-all
        ${palette.bg}
        ${isSelectable ? 'cursor-pointer active:opacity-90' : ''}
        ${isSelected ? `ring-4 ring-offset-2 ring-white shadow-xl scale-[1.02]` : ''}
        ${isGuesser ? 'ring-4 ring-offset-2 ring-primary/60 shadow-xl' : ''}
      `}
    >
      {/* Leader */}
      <div className={`px-4 py-3 flex items-center gap-2 ${palette.text}`}>
        <Crown className="w-4 h-4 shrink-0" />
        <span className="font-black text-base leading-tight">{leader.name}</span>
        {isGuesser && (
          <Badge className="ml-auto text-xs bg-black/20 text-white border-0 shrink-0">
            adivina
          </Badge>
        )}
      </div>

      {/* Members */}
      {members.length > 0 && (
        <div className={`${palette.memberBg} px-4 py-2 space-y-1`}>
          {members.map((m) => (
            <div key={m.id} className={`text-sm font-medium ${palette.text} opacity-80`}>
              {m.name}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function GameBoard({ players, groups, category, currentGuesserId, onGuess, onExit }: GameBoardProps) {
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);
  const [guessResult, setGuessResult] = useState<GuessResult | null>(null);

  const guesser = players.find((p) => p.id === currentGuesserId)!;
  const guessersGroup = groups.find((g) => g.memberIds.includes(currentGuesserId))!;

  // Palabras disponibles para elegir (todas excepto la del propio grupo del guesser), mezcladas
  const wordOptions = useMemo(() => {
    const otherWords = groups
      .filter((g) => g.leaderId !== guessersGroup?.leaderId)
      .map((g) => players.find((p) => p.id === g.leaderId)!.word);
    return shuffleArray(otherWords);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLeaderId]);

  // Reset selection when guesser changes
  useEffect(() => {
    setSelectedLeaderId(null);
    setGuessResult(null);
  }, [currentGuesserId]);

  const handleSelectTarget = (leaderId: string) => {
    setSelectedLeaderId(leaderId);
  };

  const handlePickWord = (word: string) => {
    if (!selectedLeaderId) return;

    const targetLeader = players.find((p) => p.id === selectedLeaderId)!;
    const result = onGuess(selectedLeaderId, word);

    setGuessResult({
      type: result,
      targetName: targetLeader.name,
      newGuesserName: result === 'wrong' ? targetLeader.name : guesser.name,
    });
    setSelectedLeaderId(null);
  };

  const handleContinue = () => {
    setGuessResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/40">
        <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={onExit}>
          <X className="w-6 h-6" />
        </Button>
        <Badge className="text-sm px-3 py-1 gap-1.5 bg-primary/10 text-primary border-primary/20">
          <Tag className="w-3.5 h-3.5" />
          {category}
        </Badge>
        <div className="w-9" />
      </div>

      {/* Turn indicator */}
      <div className="px-4 py-3 text-center">
        <p className="text-sm text-muted-foreground">Le toca adivinar a</p>
        <p className="text-2xl font-black tracking-tight">{guesser.name}</p>
      </div>

      {/* Groups grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
          {groups.map((group) => {
            const isGuesser = guessersGroup.leaderId === group.leaderId;
            const isSelectable = !isGuesser && !guessResult;
            const isSelected = selectedLeaderId === group.leaderId;
            return (
              <GroupCard
                key={group.leaderId}
                group={group}
                players={players}
                isGuesser={isGuesser}
                isSelectable={isSelectable}
                isSelected={isSelected}
                onSelect={() => handleSelectTarget(group.leaderId)}
              />
            );
          })}
        </div>
      </div>

      {/* Word picker panel */}
      <AnimatePresence>
        {selectedLeaderId && !guessResult && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="p-4 border-t border-border/40 bg-card space-y-3 max-h-[55vh] overflow-y-auto"
          >
            <p className="text-sm text-muted-foreground text-center">
              ¿Cuál fue la palabra de{' '}
              <span className="font-bold text-foreground">
                {players.find((p) => p.id === selectedLeaderId)?.name}
              </span>?
            </p>
            <div className="grid grid-cols-2 gap-2">
              {wordOptions.map((word) => (
                <button
                  key={word}
                  onClick={() => handlePickWord(word)}
                  className="px-3 py-3 rounded-xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 active:scale-95 transition-all text-sm font-semibold text-left capitalize"
                >
                  {word}
                </button>
              ))}
            </div>
            <button
              onClick={() => setSelectedLeaderId(null)}
              className="w-full text-xs text-muted-foreground underline-offset-2 hover:underline pt-1"
            >
              Cancelar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result overlay */}
      <AnimatePresence>
        {guessResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-end justify-center p-6 bg-black/50 z-50"
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              className={`w-full max-w-sm rounded-3xl p-6 text-center space-y-4 shadow-2xl ${
                guessResult.type === 'correct'
                  ? 'bg-emerald-400 text-emerald-950'
                  : 'bg-red-400 text-red-950'
              }`}
            >
              <div className="text-5xl">
                {guessResult.type === 'correct' ? '🎉' : '😬'}
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-black">
                  {guessResult.type === 'correct' ? '¡Correcto!' : '¡Incorrecto!'}
                </p>
                <p className="text-base font-medium opacity-80">
                  {guessResult.type === 'correct'
                    ? `${guessResult.targetName} se une al grupo de ${guesser.name}`
                    : `Ahora le toca adivinar a ${guessResult.newGuesserName}`}
                </p>
              </div>
              <Button
                onClick={handleContinue}
                className="w-full py-4 font-bold bg-black/20 hover:bg-black/30 text-inherit border-0"
              >
                Continuar
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
