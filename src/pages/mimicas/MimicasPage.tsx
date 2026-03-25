import { useMimicasGame } from '../../hooks/useMimicasGame';
import { Podium } from '../../components/Podium';
import { TeamSetup } from './TeamSetup';
import { ContentType } from './ContentType';
import { JuryScreen } from './JuryScreen';
import { ActiveMimicaTurn } from './ActiveMimicaTurn';
import { MimicasTurnSummary } from './TurnSummary';

interface MimicasPageProps {
  onExit: () => void;
}

export function MimicasPage({ onExit }: MimicasPageProps) {
  const game = useMimicasGame();

  const handleExit = () => {
    game.reset();
    onExit();
  };

  switch (game.screen) {
    case 'TEAM_SETUP':
      return (
        <TeamSetup
          numRounds={game.numRounds}
          onSetNumRounds={game.setNumRounds}
          onNext={game.setupTeams}
          onBack={handleExit}
        />
      );

    case 'CONTENT_TYPE':
      return (
        <ContentType
          onSelect={game.selectContentType}
          onBack={() => game.setScreen('TEAM_SETUP')}
        />
      );

    case 'JURY':
      return (
        <JuryScreen
          teamName={game.teams[game.currentTeamIdx].name}
          onStart={game.startTurn}
          onBack={() => game.setScreen('CONTENT_TYPE')}
        />
      );

    case 'ACTIVE_TURN':
      return (
        <ActiveMimicaTurn
          teamName={game.teams[game.currentTeamIdx].name}
          round={game.currentRound}
          words={game.words}
          onBack={() => game.setScreen('JURY')}
          onEnd={game.endTurn}
        />
      );

    case 'TURN_SUMMARY':
      return (
        <MimicasTurnSummary
          teamName={game.teams[game.currentTeamIdx].name}
          turnPoints={game.turnPoints}
          totalScore={game.teams[game.currentTeamIdx].score}
          onNext={game.nextTurn}
          onBack={() => game.setScreen('JURY')}
        />
      );

    case 'FINAL_PODIUM':
      return <Podium players={game.teams} onRestart={handleExit} />;

    default:
      return null;
  }
}
