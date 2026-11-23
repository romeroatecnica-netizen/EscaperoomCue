import type {LanguageCode} from '../constants/seo';

export type SpaceId =
  | 'full_house'
  | 'living_room'
  | 'kitchen'
  | 'bedroom'
  | 'garden'
  | 'other_space';

export type DifficultyId = 'easy' | 'medium' | 'hard';

export type ThemeId =
  | 'lost_key'
  | 'lab_rescue'
  | 'treasure_map'
  | 'space_alert'
  | 'chronometer_chest';

export type PuzzleType =
  | 'color_symbol_lock'
  | 'visual_cipher'
  | 'number_balance'
  | 'floorplan_search'
  | 'chronology_order'
  | 'deduction_grid'
  | 'pattern_odd_one';

export type ViewMode = 'gm' | 'player';

export type FurnitureKind =
  | 'sofa'
  | 'table'
  | 'bookshelf'
  | 'tv_console'
  | 'lamp'
  | 'fridge'
  | 'counter'
  | 'stove'
  | 'pantry'
  | 'bed'
  | 'desk'
  | 'wardrobe'
  | 'chest'
  | 'planter'
  | 'bench'
  | 'steps'
  | 'pergola'
  | 'whiteboard'
  | 'cabinet'
  | 'coat_rack';

export interface FloorRoom {
  id: string;
  labelKey: string;
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  floorPattern: 'wood' | 'tile' | 'grass' | 'stone' | 'carpet';
}

export interface FloorDoor {
  x: number;
  y: number;
  orientation: 'h' | 'v';
  width: number;
}

export interface FloorFurniture {
  id: string;
  kind: FurnitureKind;
  labelKey: string;
  x: number;
  y: number;
  w: number;
  h: number;
  roomId: string;
}

export interface HidingSpot {
  id: string;
  labelKey: string;
  roomId: string;
  roomLabelKey: string;
  furnitureId: string;
  x: number;
  y: number;
}

export interface SpaceDefinition {
  id: SpaceId;
  rooms: FloorRoom[];
  doors: FloorDoor[];
  furniture: FloorFurniture[];
  hidingSpots: HidingSpot[];
  compassDirection: string;
}

export type ColorToken = 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky';
export type ShapeToken = 'circle' | 'triangle' | 'square' | 'star' | 'diamond';

export interface ColorSymbolDialSpec {
  color: ColorToken;
  shape: ShapeToken;
}

export interface VisualCipherPair {
  symbol: string;
  letter: string;
  digit: string;
}

export interface BalanceRow {
  left: {icon: ShapeToken; color: ColorToken; count: number}[];
  rightValue: number | '?';
}

export interface ChronologyStep {
  id: string;
  label: string;
  orderIndex: number;
  icon: 'key' | 'map' | 'clock' | 'compass';
}

export interface DeductionRow {
  subject: string;
  clue: string;
  digit: string;
}

export interface PatternTile {
  id: number;
  shape: ShapeToken;
  color: ColorToken;
  dots: number;
  isOddOne: boolean;
}

export type PuzzleVisualPayload =
  | {
      kind: 'color_symbol_lock';
      sequence: ColorSymbolDialSpec[];
      ruleClues: string[];
    }
  | {
      kind: 'visual_cipher';
      keyTable: VisualCipherPair[];
      encodedTokens: string[];
      inputMode: 'digits' | 'word';
    }
  | {
      kind: 'number_balance';
      rows: BalanceRow[];
      sequenceNumbers: (number | '?')[];
      equationHint: string;
    }
  | {
      kind: 'floorplan_search';
      targetSpotId: string;
      targetRoomKey: string;
      targetSpotKey: string;
      directionClues: string[];
      codeLength: number;
    }
  | {
      kind: 'chronology_order';
      steps: ChronologyStep[];
      expectedOrderIds: string[];
    }
  | {
      kind: 'deduction_grid';
      rows: DeductionRow[];
      finalQuestion: string;
    }
  | {
      kind: 'pattern_odd_one';
      tiles: PatternTile[];
      oddTileIndex: number;
      ruleLabel: string;
    };

export interface PuzzleStation {
  id: string;
  order: number;
  type: PuzzleType;
  title: string;
  storySnippet: string;
  prompt: string;
  spotId: string;
  physicalSetupNote: string;
  solution: string;
  hint1: string;
  hint2: string;
  solutionExplanation: string;
  visual: PuzzleVisualPayload;
  solved: boolean;
  revealedHints: number;
}

export interface EscapeMission {
  version: 1;
  id: string;
  title: string;
  introStory: string;
  finaleMessage: string;
  spaceId: SpaceId;
  difficulty: DifficultyId;
  themeId: ThemeId;
  seed: number;
  durationMinutes: number;
  createdAt: string;
  stations: PuzzleStation[];
  activeStationIndex: number;
  elapsedSeconds: number;
  timerRunning: boolean;
  bonusChallenge?: string;
}

export interface SavedMissionMeta {
  id: string;
  title: string;
  spaceId: SpaceId;
  difficulty: DifficultyId;
  themeId: ThemeId;
  stationCount: number;
  updatedAt: string;
  mission: EscapeMission;
}

export interface AppPersistedState {
  language: LanguageCode;
  activeMission: EscapeMission;
  savedMissions: SavedMissionMeta[];
}
