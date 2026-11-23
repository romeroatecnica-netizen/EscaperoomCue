import React, {useEffect, useState} from 'react';
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Eye,
  HelpCircle,
  Lock,
  MapPin,
  Pencil,
  RefreshCw,
  RotateCcw,
  Trash2,
  Trophy,
  Unlock,
} from 'lucide-react';
import {normalizeAnswer} from '../engine/generator';
import {SPACES} from '../engine/spaces';
import type {TranslationDictionary} from '../i18n';
import type {
  ColorSymbolDialSpec,
  EscapeMission,
  PuzzleStation,
  ViewMode,
} from '../types/escape';
import {PuzzleVisualSVG} from './PuzzleVisualSVG';

interface ActivePuzzleCardProps {
  mission: EscapeMission;
  station: PuzzleStation;
  stationIndex: number;
  viewMode: ViewMode;
  dict: TranslationDictionary;
  onUnlockStation: (index: number) => void;
  onWrongAttempt: () => void;
  onRevealHint: (index: number, level: number) => void;
  onEditStation: (index: number) => void;
  onMoveStation: (index: number, dir: -1 | 1) => void;
  onDeleteStation: (index: number) => void;
  onRegenerateStation: (index: number) => void;
  onNextStation: () => void;
  onPlayAgain: () => void;
}

function formatClock(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export const ActivePuzzleCard: React.FC<ActivePuzzleCardProps> = ({
  mission,
  station,
  stationIndex,
  viewMode,
  dict,
  onUnlockStation,
  onWrongAttempt,
  onRevealHint,
  onEditStation,
  onMoveStation,
  onDeleteStation,
  onRegenerateStation,
  onNextStation,
  onPlayAgain,
}) => {
  const [textInput, setTextInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [dialValues, setDialValues] = useState<ColorSymbolDialSpec[]>([]);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  useEffect(() => {
    setTextInput('');
    setErrorMsg(null);
    setSelectedOrderIds([]);
    if (station.visual.kind === 'color_symbol_lock') {
      setDialValues(
        station.visual.sequence.map((_, idx) => ({
          color: idx % 2 === 0 ? 'sky' : 'amber',
          shape: 'circle',
        })),
      );
    } else {
      setDialValues([]);
    }
  }, [station.id, station.visual]);

  const allSolved = mission.stations.every((s) => s.solved);
  const space = SPACES[mission.spaceId];
  const spotObj = space.hidingSpots.find((sp) => sp.id === station.spotId);
  const roomLabel = spotObj ? dict.roomsAndSpots[spotObj.roomLabelKey] ?? spotObj.roomLabelKey : '';
  const spotLabel = spotObj ? dict.roomsAndSpots[spotObj.labelKey] ?? spotObj.labelKey : station.spotId;

  const validateCandidate = (candidateRaw: string) => {
    if (normalizeAnswer(candidateRaw) === normalizeAnswer(station.solution)) {
      setErrorMsg(null);
      onUnlockStation(stationIndex);
    } else {
      setErrorMsg(dict.station.wrongAttempt);
      onWrongAttempt();
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (station.visual.kind === 'color_symbol_lock') {
      const candidate = dialValues.map((d) => `${d.color}:${d.shape}`).join('|');
      validateCandidate(candidate);
      return;
    }
    if (station.visual.kind === 'chronology_order') {
      validateCandidate(selectedOrderIds.join('>'));
      return;
    }
    validateCandidate(textInput);
  };

  const handleOrderSelect = (stepId: string) => {
    setErrorMsg(null);
    if (selectedOrderIds.includes(stepId)) {
      setSelectedOrderIds((prev) => prev.filter((id) => id !== stepId));
      return;
    }
    const next = [...selectedOrderIds, stepId];
    setSelectedOrderIds(next);
    if (station.visual.kind === 'chronology_order' && next.length === station.visual.steps.length) {
      validateCandidate(next.join('>'));
    }
  };

  const showSubmitInput =
    station.visual.kind !== 'pattern_odd_one' && station.visual.kind !== 'chronology_order';

  return (
    <div className="space-y-4">
      {allSolved && (
        <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#059669] text-white flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#064E3B]">{dict.station.missionCompleteTitle}</h3>
              <p className="text-sm text-[#047857] mt-0.5">{mission.finaleMessage}</p>
              <p className="text-xs font-semibold text-[#065F46] mt-1 tabular-nums">
                {dict.station.missionCompleteDesc} · {formatClock(mission.elapsedSeconds)}
              </p>
              {mission.bonusChallenge && (
                <p className="text-xs font-medium text-[#064E3B] mt-2 bg-white/80 border border-[#A7F3D0] rounded-md px-2.5 py-1.5">
                  <strong className="font-bold">{dict.station.bonusChallengeLabel}:</strong> {mission.bonusChallenge}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onPlayAgain}
            className="px-4 py-2.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold inline-flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4" />
            {dict.station.playAgain}
          </button>
        </div>
      )}

      <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
        {/* Card Header */}
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] tabular-nums">
              <span>
                {dict.station.stationLabel} {stationIndex + 1} {dict.station.ofLabel} {mission.stations.length}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-[#4F46E5]">{dict.puzzleTypes[station.type].name}</span>
              <span aria-hidden="true">·</span>
              <span className={station.solved ? 'text-[#059669]' : 'text-[#4F46E5]'}>
                {station.solved ? dict.station.solvedLabel : dict.station.activeLabel}
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mt-1">{station.title}</h3>
          </div>

          {viewMode === 'gm' && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => onEditStation(stationIndex)}
                className="px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#94A3B8] text-xs font-semibold text-[#334155] inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <Pencil className="w-3.5 h-3.5" />
                {dict.station.editStation}
              </button>
              <button
                type="button"
                onClick={() => onRegenerateStation(stationIndex)}
                className="px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#94A3B8] text-xs font-semibold text-[#334155] inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {dict.station.regenPuzzle}
              </button>
              <button
                type="button"
                onClick={() => onMoveStation(stationIndex, -1)}
                disabled={stationIndex === 0}
                aria-label={dict.station.moveUp}
                className="p-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#94A3B8] disabled:opacity-40 text-[#334155] cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onMoveStation(stationIndex, 1)}
                disabled={stationIndex === mission.stations.length - 1}
                aria-label={dict.station.moveDown}
                className="p-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#94A3B8] disabled:opacity-40 text-[#334155] cursor-pointer"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDeleteStation(stationIndex)}
                disabled={mission.stations.length <= 2}
                aria-label={dict.station.deleteStation}
                className="p-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#E11D48] hover:text-[#E11D48] disabled:opacity-40 text-[#64748B] cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* GM Physical Hiding Info */}
          {viewMode === 'gm' && (
            <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-start gap-2 text-[#92400E]">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#D97706]" />
                <div>
                  <span className="font-bold">{dict.station.hidingSpotLabel}: </span>
                  <span>
                    {roomLabel} — {spotLabel}
                  </span>
                  <div className="text-[#B45309] mt-0.5">
                    <span className="font-semibold">{dict.station.gmNoteLabel}: </span>
                    {station.physicalSetupNote}
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#FCD34D] rounded-lg px-3 py-1.5 text-[#92400E] font-bold tabular-nums shrink-0">
                {dict.station.solutionLabel}: {station.solution}
              </div>
            </div>
          )}

          {/* Story & Prompt */}
          <div>
            <p className="text-sm text-[#475569] italic">{station.storySnippet}</p>
            <p className="text-sm font-semibold text-[#0F172A] mt-2">{station.prompt}</p>
          </div>

          {/* Visual Interactive Puzzle */}
          <PuzzleVisualSVG
            station={station}
            dict={dict}
            dialValues={dialValues}
            onDialChange={(next) => {
              setErrorMsg(null);
              setDialValues(next);
            }}
            selectedOrderIds={selectedOrderIds}
            onOrderSelect={handleOrderSelect}
            onOrderReset={() => {
              setSelectedOrderIds([]);
              setErrorMsg(null);
            }}
            onQuickAnswerSubmit={validateCandidate}
          />

          {/* Answer Validation Form */}
          {!station.solved ? (
            <form onSubmit={handleSubmitForm} className="space-y-2.5">
              {showSubmitInput && (
                <div className="flex flex-col sm:flex-row gap-2.5">
                  {station.visual.kind !== 'color_symbol_lock' && (
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => {
                        setTextInput(e.target.value);
                        setErrorMsg(null);
                      }}
                      placeholder={dict.station.enterCodePlaceholder}
                      className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-sm font-semibold tracking-wide tabular-nums"
                    />
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <Lock className="w-4 h-4" />
                    {dict.station.checkAnswer}
                  </button>
                </div>
              )}

              {station.visual.kind === 'chronology_order' && selectedOrderIds.length > 0 && (
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Lock className="w-4 h-4" />
                  {dict.station.checkAnswer}
                </button>
              )}

              {errorMsg && (
                <p className="text-xs font-semibold text-[#E11D48]" role="alert">
                  {errorMsg}
                </p>
              )}
            </form>
          ) : (
            <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-[#065F46]">
                <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
                <div>
                  <p className="text-sm font-bold">{dict.station.unlockedToast}</p>
                  <p className="text-xs text-[#047857] mt-0.5">{station.solutionExplanation}</p>
                </div>
              </div>
              {stationIndex < mission.stations.length - 1 && (
                <button
                  type="button"
                  onClick={onNextStation}
                  className="px-4 py-2 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  {dict.station.nextStation}
                </button>
              )}
            </div>
          )}

          {/* Graduated Hints */}
          <div className="pt-3 border-t border-[#E2E8F0] space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onRevealHint(stationIndex, Math.max(station.revealedHints, 1))}
                className="px-3 py-1.5 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] hover:bg-[#FEF3C7] text-xs font-semibold text-[#92400E] inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#D97706]" />
                {dict.station.hint1Btn}
              </button>
              <button
                type="button"
                onClick={() => onRevealHint(stationIndex, Math.max(station.revealedHints, 2))}
                className="px-3 py-1.5 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] hover:bg-[#FEF3C7] text-xs font-semibold text-[#92400E] inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#D97706]" />
                {dict.station.hint2Btn}
              </button>
              {viewMode === 'gm' && (
                <button
                  type="button"
                  onClick={() => onRevealHint(stationIndex, 3)}
                  className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-xs font-semibold text-[#334155] inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Eye className="w-3.5 h-3.5" />
                  {dict.station.revealSolutionBtn}
                </button>
              )}
            </div>

            {station.revealedHints >= 1 && (
              <div className="text-xs bg-[#FFFBEB] border border-[#FDE68A] rounded-lg px-3.5 py-2.5 text-[#78350F]">
                <strong className="font-bold">{dict.station.hint1Label}: </strong>
                {station.hint1}
              </div>
            )}
            {station.revealedHints >= 2 && (
              <div className="text-xs bg-[#FFFBEB] border border-[#FCD34D] rounded-lg px-3.5 py-2.5 text-[#78350F]">
                <strong className="font-bold">{dict.station.hint2Label}: </strong>
                {station.hint2}
              </div>
            )}
            {station.revealedHints >= 3 && (
              <div className="text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3.5 py-2.5 text-[#0F172A]">
                <strong className="font-bold">{dict.station.explanationLabel}: </strong>
                {station.solutionExplanation} ({station.solution})
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
