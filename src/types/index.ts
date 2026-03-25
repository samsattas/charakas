export type GameMode = 'HOME' | 'CHARADAS' | 'MIMICAS';

export type CharadasScreen =
  | 'PLAYER_SETUP'
  | 'CATEGORY_SELECT'
  | 'GAME_CONFIG'
  | 'READY'
  | 'ACTIVE_TURN'
  | 'TURN_SUMMARY'
  | 'FINAL_PODIUM';

export type MimicasScreen =
  | 'TEAM_SETUP'
  | 'CONTENT_TYPE'
  | 'JURY'
  | 'ACTIVE_TURN'
  | 'TURN_SUMMARY'
  | 'FINAL_PODIUM';

export type ContentType = 'PALABRAS' | 'FRASES';

export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface Team {
  id: string;
  name: string;
  score: number;
}
