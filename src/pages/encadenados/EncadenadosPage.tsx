import { useEncadenadosGame } from '../../hooks/useEncadenadosGame';
import { PlayerSetup } from './PlayerSetup';
import { WordInput } from './WordInput';
import { GameBoard } from './GameBoard';
import { GameOver } from './GameOver';

interface EncadenadosPageProps {
  onExit: () => void;
}

export function EncadenadosPage({ onExit }: EncadenadosPageProps) {
  const game = useEncadenadosGame();

  const handleExit = () => {
    game.reset();
    onExit();
  };

  switch (game.screen) {
    case 'PLAYER_SETUP':
      return (
        <PlayerSetup
          players={game.players}
          onAddPlayer={game.addPlayer}
          onRemovePlayer={game.removePlayer}
          onNext={game.startGame}
          onBack={handleExit}
        />
      );

    case 'WORD_INPUT':
      return (
        <WordInput
          players={game.players}
          wordInputIdx={game.wordInputIdx}
          category={game.category}
          isWordDuplicate={game.isWordDuplicate}
          onSubmitWord={game.submitWord}
        />
      );

    case 'GUESSING':
      return (
        <GameBoard
          players={game.players}
          groups={game.groups}
          category={game.category}
          currentGuesserId={game.currentGuesserId}
          onGuess={game.makeGuess}
          onExit={handleExit}
        />
      );

    case 'GAME_OVER':
      return (
        <GameOver
          players={game.players}
          groups={game.groups}
          winnerId={game.winnerId}
          onRestart={handleExit}
        />
      );

    default:
      return null;
  }
}
