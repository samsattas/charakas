import { useState } from 'react';
import { EncadenadosScreen, EncadenadoPlayer, EncadenadoGroup } from '../types';
import { ENCADENADOS_CATEGORIES } from '../data/categories';
import { shuffleArray } from '../lib/game-utils';

export const COLOR_PALETTES = [
  { bg: 'bg-red-400',     border: 'border-red-500',     text: 'text-red-950',     memberBg: 'bg-red-300'     },
  { bg: 'bg-blue-400',    border: 'border-blue-500',    text: 'text-blue-950',    memberBg: 'bg-blue-300'    },
  { bg: 'bg-emerald-400', border: 'border-emerald-500', text: 'text-emerald-950', memberBg: 'bg-emerald-300' },
  { bg: 'bg-amber-400',   border: 'border-amber-500',   text: 'text-amber-950',   memberBg: 'bg-amber-300'   },
  { bg: 'bg-purple-400',  border: 'border-purple-500',  text: 'text-purple-950',  memberBg: 'bg-purple-300'  },
  { bg: 'bg-pink-400',    border: 'border-pink-500',    text: 'text-pink-950',    memberBg: 'bg-pink-300'    },
  { bg: 'bg-orange-400',  border: 'border-orange-500',  text: 'text-orange-950',  memberBg: 'bg-orange-300'  },
  { bg: 'bg-teal-400',    border: 'border-teal-500',    text: 'text-teal-950',    memberBg: 'bg-teal-300'    },
];

export const useEncadenadosGame = () => {
  const [screen, setScreen] = useState<EncadenadosScreen>('PLAYER_SETUP');
  const [players, setPlayers] = useState<EncadenadoPlayer[]>([]);
  const [groups, setGroups] = useState<EncadenadoGroup[]>([]);
  const [category, setCategory] = useState('');
  const [wordInputIdx, setWordInputIdx] = useState(0);
  const [currentGuesserId, setCurrentGuesserId] = useState('');
  const [winnerId, setWinnerId] = useState('');

  const addPlayer = (name: string) => {
    setPlayers((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: name.trim(),
        word: '',
        colorIndex: prev.length % COLOR_PALETTES.length,
      },
    ]);
  };

  const removePlayer = (id: string) => {
    setPlayers((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      return filtered.map((p, i) => ({ ...p, colorIndex: i % COLOR_PALETTES.length }));
    });
  };

  const startGame = () => {
    const shuffled = shuffleArray(ENCADENADOS_CATEGORIES);
    setCategory(shuffled[0]);
    setWordInputIdx(0);
    setScreen('WORD_INPUT');
  };

  const isWordDuplicate = (word: string): boolean => {
    const normalized = word.trim().toLowerCase();
    return players.some((p, i) => i < wordInputIdx && p.word === normalized);
  };

  const submitWord = (word: string) => {
    const normalized = word.trim().toLowerCase();
    const updatedPlayers = players.map((p, i) =>
      i === wordInputIdx ? { ...p, word: normalized } : p
    );
    setPlayers(updatedPlayers);

    if (wordInputIdx + 1 < updatedPlayers.length) {
      setWordInputIdx((prev) => prev + 1);
    } else {
      const initialGroups: EncadenadoGroup[] = updatedPlayers.map((p) => ({
        leaderId: p.id,
        memberIds: [p.id],
      }));
      setGroups(initialGroups);
      const randomPlayer = updatedPlayers[Math.floor(Math.random() * updatedPlayers.length)];
      setCurrentGuesserId(randomPlayer.id);
      setScreen('GUESSING');
    }
  };

  const makeGuess = (targetLeaderId: string, guessedWord: string): 'correct' | 'wrong' => {
    const target = players.find((p) => p.id === targetLeaderId)!;
    const isCorrect = guessedWord.trim().toLowerCase() === target.word;

    if (isCorrect) {
      const guessersGroup = groups.find((g) => g.memberIds.includes(currentGuesserId))!;
      const targetsGroup = groups.find((g) => g.leaderId === targetLeaderId)!;

      const newGroups = groups
        .filter((g) => g.leaderId !== guessersGroup.leaderId && g.leaderId !== targetsGroup.leaderId)
        .concat({
          leaderId: guessersGroup.leaderId,
          memberIds: [...guessersGroup.memberIds, ...targetsGroup.memberIds],
        });

      setGroups(newGroups);

      if (newGroups.length === 1) {
        setWinnerId(guessersGroup.leaderId);
        setScreen('GAME_OVER');
      }
    } else {
      setCurrentGuesserId(targetLeaderId);
    }

    return isCorrect ? 'correct' : 'wrong';
  };

  const reset = () => {
    setScreen('PLAYER_SETUP');
    setPlayers([]);
    setGroups([]);
    setCategory('');
    setWordInputIdx(0);
    setCurrentGuesserId('');
    setWinnerId('');
  };

  return {
    screen,
    players,
    groups,
    category,
    wordInputIdx,
    currentGuesserId,
    winnerId,
    addPlayer,
    removePlayer,
    startGame,
    isWordDuplicate,
    submitWord,
    makeGuess,
    reset,
  };
};
