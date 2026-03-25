import { useState } from 'react';
import { MimicasScreen, Team, ContentType } from '../types';
import { MIMICAS_PALABRAS, MIMICAS_FRASES } from '../data/words';
import { shuffleArray } from '../lib/game-utils';

export const useMimicasGame = () => {
  const [screen, setScreen] = useState<MimicasScreen>('TEAM_SETUP');
  const [teams, setTeams] = useState<Team[]>([]);
  const [numRounds, setNumRounds] = useState(3);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentTeamIdx, setCurrentTeamIdx] = useState(0);
  const [contentType, setContentType] = useState<ContentType>('PALABRAS');
  const [words, setWords] = useState<string[]>([]);
  const [turnPoints, setTurnPoints] = useState(0);

  const setupTeams = (newTeams: Team[]) => {
    setTeams(newTeams);
    setScreen('CONTENT_TYPE');
  };

  const selectContentType = (type: ContentType) => {
    setContentType(type);
    setScreen('JURY');
  };

  const startTurn = () => {
    const library = contentType === 'PALABRAS' ? MIMICAS_PALABRAS : MIMICAS_FRASES;
    setWords(shuffleArray(library));
    setTurnPoints(0);
    setScreen('ACTIVE_TURN');
  };

  const endTurn = (points: number) => {
    setTurnPoints(points);
    setTeams((prev) => {
      const updated = [...prev];
      updated[currentTeamIdx] = {
        ...updated[currentTeamIdx],
        score: updated[currentTeamIdx].score + points,
      };
      return updated;
    });
    setScreen('TURN_SUMMARY');
  };

  const nextTurn = () => {
    if (currentTeamIdx < teams.length - 1) {
      setCurrentTeamIdx((prev) => prev + 1);
      setScreen('JURY');
    } else if (currentRound < numRounds) {
      setCurrentRound((prev) => prev + 1);
      setCurrentTeamIdx(0);
      setScreen('JURY');
    } else {
      setScreen('FINAL_PODIUM');
    }
  };

  const reset = () => {
    setScreen('TEAM_SETUP');
    setTeams([]);
    setNumRounds(3);
    setCurrentRound(1);
    setCurrentTeamIdx(0);
  };

  return {
    screen, setScreen,
    teams,
    numRounds, setNumRounds,
    currentRound,
    currentTeamIdx,
    contentType,
    words,
    turnPoints,
    setupTeams,
    selectContentType,
    startTurn,
    endTurn,
    nextTurn,
    reset,
  };
};
