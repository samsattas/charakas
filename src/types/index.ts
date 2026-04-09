export type GameMode = 'HOME' | 'CHARADAS' | 'MIMICAS' | 'ENCADENADOS';

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

export type EncadenadosScreen = 'PLAYER_SETUP' | 'WORD_INPUT' | 'GUESSING' | 'GAME_OVER';

export interface ColorPalette {
  bg: string;
  border: string;
  text: string;
  memberBg: string;
}

export interface EncadenadoPlayer {
  id: string;
  name: string;
  word: string;
  colorIndex: number;
}

export interface EncadenadoGroup {
  leaderId: string;
  memberIds: string[];
}

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
