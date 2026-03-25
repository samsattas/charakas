import { useCharadasGame } from '../../hooks/useCharadasGame';
import { Podium } from '../../components/Podium';
import { PlayerSetup } from './PlayerSetup';
import { GameConfig } from './GameConfig';
import { ReadyScreen } from './ReadyScreen';
import { ActiveTurn } from './ActiveTurn';
import { TurnSummary } from './TurnSummary';

interface CharadasPageProps {
  onExit: () => void;
}

export function CharadasPage({ onExit }: CharadasPageProps) {
  const game = useCharadasGame();

  const handleExit = () => {
    game.reset();
    onExit();
  };

  switch (game.screen) {
    case 'PLAYER_SETUP':
      return (
        <PlayerSetup
          players={game.players}
          words={game.words}
          onAddPlayer={game.addPlayer}
          onRemovePlayer={game.removePlayer}
          onSetWords={game.setWords}
          onNext={() => game.setScreen('GAME_CONFIG')}
          onBack={handleExit}
        />
      );

    case 'GAME_CONFIG':
      return (
        <GameConfig
          turnTime={game.turnTime}
          numRounds={game.numRounds}
          onSetTurnTime={game.setTurnTime}
          onSetNumRounds={game.setNumRounds}
          onNext={() => game.setScreen('READY')}
          onBack={() => game.setScreen('PLAYER_SETUP')}
        />
      );

    case 'READY':
      return (
        <ReadyScreen
          playerName={game.players[game.currentPlayerIdx].name}
          round={game.currentRound}
          totalRounds={game.numRounds}
          onStart={game.startTurn}
          onBack={() => game.setScreen('GAME_CONFIG')}
        />
      );

    case 'ACTIVE_TURN':
      return (
        <ActiveTurn
          playerName={game.players[game.currentPlayerIdx].name}
          round={game.currentRound}
          totalRounds={game.numRounds}
          time={game.turnTime}
          words={game.shuffledWords}
          onBack={() => game.setScreen('READY')}
          onEnd={game.endTurn}
        />
      );

    case 'TURN_SUMMARY':
      return (
        <TurnSummary
          playerName={game.players[game.currentPlayerIdx].name}
          nextPlayerName={game.players[(game.currentPlayerIdx + 1) % game.players.length].name}
          points={game.turnPoints}
          guessedWords={game.turnGuessedWords}
          onNext={game.nextTurn}
          onBack={() => game.setScreen('READY')}
        />
      );

    case 'FINAL_PODIUM':
      return <Podium players={game.players} onRestart={handleExit} />;

    default:
      return null;
  }
}
