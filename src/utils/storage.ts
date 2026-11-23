import type {LanguageCode} from '../constants/seo';
import type {EscapeMission, SavedMissionMeta} from '../types/escape';

const LANG_KEY = 'escapecue_lang_v1';
const ACTIVE_MISSION_KEY = 'escapecue_active_mission_v1';
const SAVED_MISSIONS_KEY = 'escapecue_saved_missions_v1';

export function saveLanguagePreference(lang: LanguageCode): void {
  try {
    window.localStorage.setItem(LANG_KEY, lang);
  } catch {
    // ignore
  }
}

export function loadActiveMission(): EscapeMission | null {
  try {
    const raw = window.localStorage.getItem(ACTIVE_MISSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as EscapeMission;
    if (parsed && parsed.version === 1 && Array.isArray(parsed.stations) && parsed.stations.length > 0) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveActiveMission(mission: EscapeMission): void {
  try {
    window.localStorage.setItem(ACTIVE_MISSION_KEY, JSON.stringify(mission));
  } catch {
    // ignore
  }
}

export function loadSavedMissions(): SavedMissionMeta[] {
  try {
    const raw = window.localStorage.getItem(SAVED_MISSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSavedMissions(list: SavedMissionMeta[]): void {
  try {
    window.localStorage.setItem(SAVED_MISSIONS_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function validateImportedMission(data: unknown): EscapeMission | null {
  if (!data || typeof data !== 'object') return null;
  const candidate = data as Partial<EscapeMission>;
  if (
    candidate.version !== 1 ||
    typeof candidate.title !== 'string' ||
    typeof candidate.spaceId !== 'string' ||
    typeof candidate.difficulty !== 'string' ||
    !Array.isArray(candidate.stations) ||
    candidate.stations.length === 0
  ) {
    return null;
  }
  const hasValidStations = candidate.stations.every(
    (s) =>
      s &&
      typeof s.id === 'string' &&
      typeof s.title === 'string' &&
      typeof s.solution === 'string' &&
      s.visual &&
      typeof s.visual.kind === 'string',
  );
  if (!hasValidStations) return null;

  return {
    ...(candidate as EscapeMission),
    timerRunning: false,
  };
}
