import { useState } from 'react';
import { CharadasScreen, Player } from '../types';
import { Word, CHARADAS_WORDS } from '../data/words';
import { shuffleArray } from '../lib/game-utils';

export const useCharadasGame = () => {
  const [screen, setScreen] = useState<CharadasScreen>('PLAYER_SETUP');
  const [players, setPlayers] = useState<Player[]>([]);
  const [words, setWords] = useState<Word[]>(CHARADAS_WORDS);
  const [turnTime, setTurnTime] = useState(60);
  const [numRounds, setNumRounds] = useState(3);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [turnPoints, setTurnPoints] = useState(0);
  const [turnGuessedWords, setTurnGuessedWords] = useState<string[]>([]);
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);

  const addPlayer = (name: string) => {
    setPlayers((prev) => [
      ...prev,
      { id: Math.random().toString(36).substr(2, 9), name: name.trim(), score: 0 },
    ]);
  };

  const removePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const startTurn = () => {
    setShuffledWords(shuffleArray(words));
    setTurnPoints(0);
    setTurnGuessedWords([]);
    setScreen('ACTIVE_TURN');
  };

  const endTurn = (points: number, guessed: string[]) => {
    setTurnPoints(points);
    setTurnGuessedWords(guessed);
    setPlayers((prev) => {
      const updated = [...prev];
      updated[currentPlayerIdx] = {
        ...updated[currentPlayerIdx],
        score: updated[currentPlayerIdx].score + points,
      };
      return updated;
    });
    setScreen('TURN_SUMMARY');
  };

  const nextTurn = () => {
    if (currentPlayerIdx < players.length - 1) {
      setCurrentPlayerIdx((prev) => prev + 1);
      setScreen('READY');
    } else if (currentRound < numRounds) {
      setCurrentRound((prev) => prev + 1);
      setCurrentPlayerIdx(0);
      setScreen('READY');
    } else {
      setScreen('FINAL_PODIUM');
    }
  };

  const reset = () => {
    setScreen('PLAYER_SETUP');
    setPlayers([]);
    setWords(CHARADAS_WORDS);
    setTurnTime(60);
    setNumRounds(3);
    setCurrentRound(1);
    setCurrentPlayerIdx(0);
  };

  return {
    screen, setScreen,
    players,
    words, setWords,
    turnTime, setTurnTime,
    numRounds, setNumRounds,
    currentRound,
    currentPlayerIdx,
    turnPoints,
    turnGuessedWords,
    shuffledWords,
    addPlayer,
    removePlayer,
    startTurn,
    endTurn,
    nextTurn,
    reset,
  };
};
