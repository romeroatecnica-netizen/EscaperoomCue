import React, {useEffect, useRef, useState} from 'react';
import {
  BookmarkPlus,
  Download,
  Eye,
  FolderOpen,
  Globe,
  Pause,
  Play,
  Plus,
  Printer,
  RefreshCw,
  RotateCcw,
  Shield,
  Upload,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {ActivePuzzleCard} from './components/ActivePuzzleCard';
import {AdSlot} from './components/AdSlot';
import {AffiliateGearStrip} from './components/AffiliateGearStrip';
import {EscapeStageCanvas} from './components/EscapeStageCanvas';
import {PrintKitView} from './components/PrintKitView';
import {SavedMissionsModal} from './components/SavedMissionsModal';
import {SeoEditorialGuide} from './components/SeoEditorialGuide';
import {StationEditorModal} from './components/StationEditorModal';
import {LANGUAGE_META, SUPPORTED_LANGUAGES, type LanguageCode} from './constants/seo';
import {buildSinglePuzzle, generateEscapeMission} from './engine/generator';
import {SPACES} from './engine/spaces';
import {DICTIONARIES, detectInitialLanguage} from './i18n';
import type {
  DifficultyId,
  EscapeMission,
  PuzzleStation,
  PuzzleType,
  SavedMissionMeta,
  SpaceId,
  ThemeId,
  ViewMode,
} from './types/escape';
import {syncHeadSeo} from './utils/seoManager';
import {playFeedbackTone} from './utils/sound';
import {
  loadActiveMission,
  loadSavedMissions,
  saveActiveMission,
  saveLanguagePreference,
  saveSavedMissions,
  validateImportedMission,
} from './utils/storage';

const SPACE_IDS: SpaceId[] = [
  'full_house',
  'living_room',
  'kitchen',
  'bedroom',
  'garden',
  'other_space',
];
const DIFFICULTIES: DifficultyId[] = ['easy', 'medium', 'hard'];
const THEMES: ThemeId[] = [
  'lost_key',
  'lab_rescue',
  'treasure_map',
  'space_alert',
  'chronometer_chest',
];
const PUZZLE_POOL: PuzzleType[] = [
  'color_symbol_lock',
  'visual_cipher',
  'number_balance',
  'floorplan_search',
  'chronology_order',
  'deduction_grid',
  'pattern_odd_one',
];

function formatTimer(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function App() {
  const [lang, setLang] = useState<LanguageCode>(() => detectInitialLanguage());
  const dict = DICTIONARIES[lang];

  const [mission, setMission] = useState<EscapeMission>(() => {
    const existing = loadActiveMission();
    if (existing) return existing;
    return generateEscapeMission('full_house', 'medium', 'lost_key', 4281, DICTIONARIES[detectInitialLanguage()]);
  });

  const [savedMissions, setSavedMissions] = useState<SavedMissionMeta[]>(() => loadSavedMissions());
  const [viewMode, setViewMode] = useState<ViewMode>('gm');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showPrintKit, setShowPrintKit] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const importInputRef = useRef<HTMLInputElement | null>(null);

  // Sync <head> SEO tags & HTML lang/dir whenever language changes
  useEffect(() => {
    syncHeadSeo(lang, dict);
    saveLanguagePreference(lang);
  }, [lang, dict]);

  // Persist active mission automatically
  useEffect(() => {
    saveActiveMission(mission);
  }, [mission]);

  // Live Play Timer
  useEffect(() => {
    if (!mission.timerRunning) return;
    const timer = window.setInterval(() => {
      setMission((prev) => ({
        ...prev,
        elapsedSeconds: prev.elapsedSeconds + 1,
      }));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [mission.timerRunning]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => {
      setToastMsg((cur) => (cur === msg ? null : cur));
    }, 3200);
  };

  const handleLanguageChange = (nextLang: LanguageCode) => {
    setLang(nextLang);
    const nextDict = DICTIONARIES[nextLang];
    // Regenerate mission copy cleanly in new language preserving current space, difficulty, theme & seed
    setMission((prev) => {
      const fresh = generateEscapeMission(prev.spaceId, prev.difficulty, prev.themeId, prev.seed, nextDict);
      return {
        ...fresh,
        activeStationIndex: Math.min(prev.activeStationIndex, fresh.stations.length - 1),
        elapsedSeconds: prev.elapsedSeconds,
        timerRunning: prev.timerRunning,
      };
    });
  };

  const rebuildMission = (
    spaceId: SpaceId,
    difficulty: DifficultyId,
    themeId: ThemeId,
    seed: number,
  ) => {
    playFeedbackTone('click', soundEnabled);
    setMission(generateEscapeMission(spaceId, difficulty, themeId, seed, dict));
  };

  const handleNewRandomMission = () => {
    const nextSeed = Math.floor(1000 + Math.random() * 89999);
    rebuildMission(mission.spaceId, mission.difficulty, mission.themeId, nextSeed);
  };

  const handleUnlockStation = (index: number) => {
    setMission((prev) => {
      const updatedStations = prev.stations.map((st, idx) =>
        idx === index ? {...st, solved: true} : st,
      );
      const allNowSolved = updatedStations.every((s) => s.solved);
      playFeedbackTone(allNowSolved ? 'victory' : 'unlock', soundEnabled);
      return {
        ...prev,
        stations: updatedStations,
        timerRunning: allNowSolved ? false : prev.timerRunning,
      };
    });
  };

  const handleRevealHint = (index: number, level: number) => {
    playFeedbackTone('click', soundEnabled);
    setMission((prev) => ({
      ...prev,
      stations: prev.stations.map((st, idx) =>
        idx === index ? {...st, revealedHints: level} : st,
      ),
    }));
  };

  const handleMoveStation = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= mission.stations.length) return;
    setMission((prev) => {
      const next = [...prev.stations];
      [next[index], next[target]] = [next[target], next[index]];
      const reordered = next.map((st, i) => ({...st, order: i + 1}));
      return {
        ...prev,
        stations: reordered,
        activeStationIndex: target,
      };
    });
  };

  const handleDeleteStation = (index: number) => {
    if (mission.stations.length <= 2) return;
    setMission((prev) => {
      const filtered = prev.stations
        .filter((_, idx) => idx !== index)
        .map((st, i) => ({...st, order: i + 1}));
      return {
        ...prev,
        stations: filtered,
        activeStationIndex: Math.min(prev.activeStationIndex, filtered.length - 1),
      };
    });
  };

  const handleRegenerateStation = (index: number) => {
    playFeedbackTone('click', soundEnabled);
    const space = SPACES[mission.spaceId];
    const current = mission.stations[index];
    const spot = space.hidingSpots.find((sp) => sp.id === current.spotId) ?? space.hidingSpots[0];
    const currentTypeIdx = PUZZLE_POOL.indexOf(current.type);
    const nextType = PUZZLE_POOL[(currentTypeIdx + 1) % PUZZLE_POOL.length];
    const newSeed = Math.floor(100 + Math.random() * 9000);
    const fresh = buildSinglePuzzle(nextType, index + 1, spot, mission.difficulty, newSeed, dict);

    setMission((prev) => ({
      ...prev,
      stations: prev.stations.map((st, idx) => (idx === index ? fresh : st)),
    }));
  };

  const handleAddStation = () => {
    const space = SPACES[mission.spaceId];
    const usedSpots = new Set(mission.stations.map((s) => s.spotId));
    const freeSpot =
      space.hidingSpots.find((sp) => !usedSpots.has(sp.id)) ??
      space.hidingSpots[mission.stations.length % space.hidingSpots.length];
    const nextIdx = mission.stations.length;
    const nextType = PUZZLE_POOL[nextIdx % PUZZLE_POOL.length];
    const newStation = buildSinglePuzzle(
      nextType,
      nextIdx + 1,
      freeSpot,
      mission.difficulty,
      mission.seed + nextIdx * 313 + Date.now() % 1000,
      dict,
    );

    playFeedbackTone('click', soundEnabled);
    setMission((prev) => ({
      ...prev,
      stations: [...prev.stations, newStation],
      activeStationIndex: nextIdx,
    }));
  };

  const handleReassignSpot = (stationIndex: number, spotId: string) => {
    const space = SPACES[mission.spaceId];
    const spot = space.hidingSpots.find((sp) => sp.id === spotId);
    if (!spot) return;
    const roomName = dict.roomsAndSpots[spot.roomLabelKey] ?? spot.roomLabelKey;
    const spotName = dict.roomsAndSpots[spot.labelKey] ?? spot.labelKey;

    playFeedbackTone('click', soundEnabled);
    setMission((prev) => ({
      ...prev,
      stations: prev.stations.map((st, idx) =>
        idx === stationIndex
          ? {
              ...st,
              spotId,
              physicalSetupNote: `${roomName} → ${spotName}`,
            }
          : st,
      ),
    }));
  };

  const handleSaveEditorStation = (updated: PuzzleStation) => {
    if (editingIndex === null) return;
    setMission((prev) => ({
      ...prev,
      stations: prev.stations.map((st, idx) => (idx === editingIndex ? updated : st)),
    }));
    setEditingIndex(null);
  };

  const handlePlayAgain = () => {
    playFeedbackTone('click', soundEnabled);
    setMission((prev) => ({
      ...prev,
      activeStationIndex: 0,
      elapsedSeconds: 0,
      timerRunning: false,
      stations: prev.stations.map((st) => ({...st, solved: false, revealedHints: 0})),
    }));
  };

  const handleSaveCurrentSetup = () => {
    const meta: SavedMissionMeta = {
      id: `${mission.id}_${Date.now()}`,
      title: mission.title,
      spaceId: mission.spaceId,
      difficulty: mission.difficulty,
      themeId: mission.themeId,
      stationCount: mission.stations.length,
      updatedAt: new Date().toISOString(),
      mission: {...mission, timerRunning: false},
    };
    const nextList = [meta, ...savedMissions].slice(0, 20);
    setSavedMissions(nextList);
    saveSavedMissions(nextList);
    showToast(dict.controls.saveSuccess);
  };

  const handleDeleteSavedSetup = (id: string) => {
    const nextList = savedMissions.filter((m) => m.id !== id);
    setSavedMissions(nextList);
    saveSavedMissions(nextList);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(mission, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `escapecue-${mission.spaceId}-${mission.difficulty}-${mission.seed}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const validated = validateImportedMission(parsed);
        if (!validated) {
          showToast(dict.controls.importError);
          return;
        }
        setMission(validated);
        showToast(dict.controls.importSuccess);
      } catch {
        showToast(dict.controls.importError);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const activeStation = mission.stations[mission.activeStationIndex] ?? mission.stations[0];
  const solvedCount = mission.stations.filter((s) => s.solved).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="no-print bg-white border-b border-[#E2E8F0] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          <a
            href="#studio"
            onClick={() => setShowPrintKit(false)}
            className="text-xl font-extrabold tracking-tight text-[#4F46E5] whitespace-nowrap shrink-0 font-display"
          >
            {dict.brand}
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#475569]">
            <a
              href="#studio"
              onClick={() => setShowPrintKit(false)}
              className="hover:text-[#0F172A] transition-colors whitespace-nowrap shrink-0"
            >
              {dict.nav.generator}
            </a>
            <a
              href="#floorplan-section"
              onClick={() => setShowPrintKit(false)}
              className="hover:text-[#0F172A] transition-colors whitespace-nowrap shrink-0"
            >
              {dict.nav.floorplan}
            </a>
            <button
              type="button"
              onClick={() => setShowPrintKit(true)}
              className="hover:text-[#0F172A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {dict.nav.printKit}
            </button>
            <a
              href="#gm-guide"
              onClick={() => setShowPrintKit(false)}
              className="hover:text-[#0F172A] transition-colors whitespace-nowrap shrink-0"
            >
              {dict.nav.guide}
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <label className="inline-flex items-center gap-1.5 text-xs font-medium text-[#475569]">
              <Globe className="w-4 h-4 text-[#64748B]" aria-hidden="true" />
              <select
                aria-label="Language"
                value={lang}
                onChange={(e) => handleLanguageChange(e.target.value as LanguageCode)}
                className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2 py-1.5 text-xs font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((code) => (
                  <option key={code} value={code}>
                    {LANGUAGE_META[code].nativeName}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={() => {
                setShowPrintKit(false);
                handleNewRandomMission();
              }}
              className="px-4 py-2 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {dict.nav.newMission}
            </button>
          </div>
        </div>
      </header>

      {/* Toast Feedback */}
      {toastMsg && (
        <div
          role="status"
          className="no-print fixed bottom-5 right-5 z-50 bg-[#0F172A] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-lg"
        >
          {toastMsg}
        </div>
      )}

      {showPrintKit ? (
        <main className="flex-1">
          <PrintKitView
            mission={mission}
            dict={dict}
            onBackToStudio={() => setShowPrintKit(false)}
          />
        </main>
      ) : (
        <main id="studio" className="flex-1">
          {/* Hero Intro */}
          <section className="no-print max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6">
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-semibold text-[#4F46E5]">{dict.hero.kicker}</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight text-balance">
                {dict.hero.title}
              </h1>
              <p className="text-base text-[#475569] leading-relaxed">{dict.hero.subtitle}</p>
            </div>
          </section>

          {/* Game Master Configuration Toolbar */}
          <section className="no-print max-w-7xl mx-auto px-4 sm:px-6 pb-6">
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 space-y-4">
              {/* Primary Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                    {dict.controls.spaceLabel}
                  </label>
                  <select
                    value={mission.spaceId}
                    onChange={(e) =>
                      rebuildMission(
                        e.target.value as SpaceId,
                        mission.difficulty,
                        mission.themeId,
                        mission.seed,
                      )
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-[#CBD5E1] bg-white text-sm font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  >
                    {SPACE_IDS.map((spId) => (
                      <option key={spId} value={spId}>
                        {dict.spaces[spId].name}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-[#64748B] mt-1">
                    {dict.spaces[mission.spaceId].shortDesc}
                  </p>
                </div>

                <div className="md:col-span-4">
                  <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                    {dict.controls.difficultyLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F1F5F9] rounded-lg">
                    {DIFFICULTIES.map((diffId) => {
                      const active = mission.difficulty === diffId;
                      return (
                        <button
                          key={diffId}
                          type="button"
                          onClick={() =>
                            rebuildMission(
                              mission.spaceId,
                              diffId,
                              mission.themeId,
                              mission.seed,
                            )
                          }
                          className={`py-2 px-2 rounded-md text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                            active
                              ? 'bg-[#4F46E5] text-white'
                              : 'text-[#475569] hover:text-[#0F172A]'
                          }`}
                        >
                          {dict.difficulties[diffId].name}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-1">
                    {dict.difficulties[mission.difficulty].ageHint} ·{' '}
                    {dict.difficulties[mission.difficulty].summary}
                  </p>
                </div>

                <div className="md:col-span-4">
                  <label className="block text-xs font-semibold text-[#475569] mb-1.5">
                    {dict.controls.themeLabel}
                  </label>
                  <select
                    value={mission.themeId}
                    onChange={(e) =>
                      rebuildMission(
                        mission.spaceId,
                        mission.difficulty,
                        e.target.value as ThemeId,
                        mission.seed,
                      )
                    }
                    className="w-full px-3 py-2.5 rounded-lg border border-[#CBD5E1] bg-white text-sm font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                  >
                    {THEMES.map((thId) => (
                      <option key={thId} value={thId}>
                        {dict.themes[thId].name}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-[#64748B] mt-1 tabular-nums">
                    {dict.controls.seedLabel}: #{mission.seed} · {dict.controls.targetDuration}:{' '}
                    {mission.durationMinutes} {dict.controls.minutesUnit}
                  </p>
                </div>
              </div>

              {/* GM Action Strip */}
              <div className="pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                {/* Left: GM vs Player Toggle + Timer */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center p-1 bg-[#F1F5F9] rounded-lg">
                    <button
                      type="button"
                      onClick={() => setViewMode('gm')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                        viewMode === 'gm'
                          ? 'bg-white text-[#0F172A] shadow-xs'
                          : 'text-[#475569] hover:text-[#0F172A]'
                      }`}
                    >
                      <Shield className="w-3.5 h-3.5 text-[#D97706]" />
                      {dict.controls.gmView}
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('player')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                        viewMode === 'player'
                          ? 'bg-white text-[#0F172A] shadow-xs'
                          : 'text-[#475569] hover:text-[#0F172A]'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5 text-[#4F46E5]" />
                      {dict.controls.playerView}
                    </button>
                  </div>

                  {/* Live Stopwatch */}
                  <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-1.5">
                    <span className="text-sm font-extrabold text-[#0F172A] tabular-nums">
                      {formatTimer(mission.elapsedSeconds)}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setMission((prev) => ({...prev, timerRunning: !prev.timerRunning}))
                      }
                      className="text-xs font-semibold text-[#4F46E5] hover:underline inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                    >
                      {mission.timerRunning ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          {dict.controls.timerPause}
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          {dict.controls.timerStart}
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setMission((prev) => ({...prev, elapsedSeconds: 0, timerRunning: false}))
                      }
                      aria-label={dict.controls.timerReset}
                      className="text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSoundEnabled((s) => !s)}
                    className="px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:text-[#0F172A] inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    {soundEnabled ? (
                      <Volume2 className="w-3.5 h-3.5 text-[#059669]" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5 text-[#94A3B8]" />
                    )}
                    {soundEnabled ? dict.controls.soundOn : dict.controls.soundOff}
                  </button>
                </div>

                {/* Right: Add, Save, Load, Export, Import, Print */}
                <div className="flex flex-wrap items-center gap-2">
                  {viewMode === 'gm' && (
                    <button
                      type="button"
                      onClick={handleAddStation}
                      className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#4F46E5] text-xs font-semibold text-[#334155] inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {dict.controls.addStation}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleSaveCurrentSetup}
                    className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#4F46E5] text-xs font-semibold text-[#334155] inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5" />
                    {dict.controls.saveSetup}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowSavedModal(true)}
                    className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#4F46E5] text-xs font-semibold text-[#334155] inline-flex items-center gap-1 cursor-pointer whitespace-nowrap tabular-nums"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    {dict.controls.savedList} ({savedMissions.length})
                  </button>

                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#4F46E5] text-xs font-semibold text-[#334155] inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {dict.controls.exportJson}
                  </button>

                  <button
                    type="button"
                    onClick={() => importInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#4F46E5] text-xs font-semibold text-[#334155] inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {dict.controls.importJson}
                  </button>
                  <input
                    ref={importInputRef}
                    type="file"
                    accept="application/json,.json"
                    onChange={handleImportFile}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPrintKit(true)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    {dict.controls.printPhysicalKit}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Story & Progress Strip */}
          <section className="no-print max-w-7xl mx-auto px-4 sm:px-6 pb-5">
            <div className="bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-base font-bold text-[#0F172A]">{mission.title}</h2>
                <p className="text-sm text-[#475569]">{mission.introStory}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-end">
                  <div className="text-xs font-semibold text-[#64748B]">
                    {dict.station.solvedLabel}
                  </div>
                  <div className="text-lg font-extrabold text-[#059669] tabular-nums">
                    {solvedCount} / {mission.stations.length}
                  </div>
                </div>
                <div className="w-28 h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#059669] transition-all duration-200"
                    style={{
                      width: `${Math.round((solvedCount / Math.max(1, mission.stations.length)) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Main Interactive Workspace: Floorplan SVG + Active Station Puzzle */}
          <section
            id="floorplan-section"
            className="no-print max-w-7xl mx-auto px-4 sm:px-6 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            <div className="lg:col-span-7">
              <EscapeStageCanvas
                mission={mission}
                viewMode={viewMode}
                dict={dict}
                onSelectStation={(idx) => {
                  playFeedbackTone('click', soundEnabled);
                  setMission((prev) => ({...prev, activeStationIndex: idx}));
                }}
                onReassignSpot={handleReassignSpot}
              />
            </div>

            <div className="lg:col-span-5">
              {activeStation && (
                <ActivePuzzleCard
                  mission={mission}
                  station={activeStation}
                  stationIndex={mission.activeStationIndex}
                  viewMode={viewMode}
                  dict={dict}
                  onUnlockStation={handleUnlockStation}
                  onWrongAttempt={() => playFeedbackTone('error', soundEnabled)}
                  onRevealHint={handleRevealHint}
                  onEditStation={(idx) => setEditingIndex(idx)}
                  onMoveStation={handleMoveStation}
                  onDeleteStation={handleDeleteStation}
                  onRegenerateStation={handleRegenerateStation}
                  onNextStation={() =>
                    setMission((prev) => ({
                      ...prev,
                      activeStationIndex: Math.min(
                        prev.stations.length - 1,
                        prev.activeStationIndex + 1,
                      ),
                    }))
                  }
                  onPlayAgain={handlePlayAgain}
                />
              )}
            </div>
          </section>

          {/* Media.net Ad Slot 1 (Between Interactive Studio and Editorial Guide) */}
          <AdSlot slotId="medianet-escapecue-top" variant="leaderboard" dict={dict} />

          {/* Contextual Physical Props Affiliate Strip */}
          <AffiliateGearStrip dict={dict} />

          {/* Useful Editorial SEO Guide & FAQ */}
          <SeoEditorialGuide dict={dict} />

          {/* Media.net Ad Slot 2 (End of Page) */}
          <AdSlot slotId="medianet-escapecue-bottom" variant="rectangle" dict={dict} />
        </main>
      )}

      {/* Footer */}
      <footer className="no-print bg-white border-t border-[#E2E8F0] mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#64748B]">
          <div className="space-y-1 max-w-2xl">
            <p className="font-semibold text-[#334155]">{dict.footer.privacyStatement}</p>
            <p>{dict.footer.canonicalNote}</p>
          </div>
          <p className="shrink-0 font-medium">{dict.footer.copyright}</p>
        </div>
      </footer>

      {/* Modals */}
      {editingIndex !== null && mission.stations[editingIndex] && (
        <StationEditorModal
          station={mission.stations[editingIndex]}
          spaceId={mission.spaceId}
          dict={dict}
          onSave={handleSaveEditorStation}
          onClose={() => setEditingIndex(null)}
        />
      )}

      {showSavedModal && (
        <SavedMissionsModal
          savedMissions={savedMissions}
          dict={dict}
          onLoad={(loaded) => {
            setMission(loaded);
            setShowSavedModal(false);
          }}
          onDelete={handleDeleteSavedSetup}
          onClose={() => setShowSavedModal(false)}
        />
      )}
    </div>
  );
}
