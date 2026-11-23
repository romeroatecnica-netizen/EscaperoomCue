import React from 'react';
import type {TranslationDictionary} from '../i18n';
import type {
  ColorSymbolDialSpec,
  ColorToken,
  PuzzleStation,
  ShapeToken,
} from '../types/escape';

const COLOR_HEX: Record<ColorToken, {fill: string; stroke: string; bg: string}> = {
  indigo: {fill: '#4F46E5', stroke: '#312E81', bg: '#EEF2FF'},
  emerald: {fill: '#059669', stroke: '#064E3B', bg: '#ECFDF5'},
  amber: {fill: '#D97706', stroke: '#78350F', bg: '#FFFBEB'},
  rose: {fill: '#E11D48', stroke: '#881337', bg: '#FFF1F2'},
  sky: {fill: '#0284C7', stroke: '#0C4A6E', bg: '#F0F9FF'},
};

const ALL_COLORS: ColorToken[] = ['indigo', 'emerald', 'amber', 'rose', 'sky'];
const ALL_SHAPES: ShapeToken[] = ['circle', 'triangle', 'square', 'star', 'diamond'];

function ShapeSvg({shape, color, size = 34}: {shape: ShapeToken; color: ColorToken; size?: number}) {
  const palette = COLOR_HEX[color];
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      {shape === 'circle' && (
        <circle cx={20} cy={20} r={14} fill={palette.fill} stroke={palette.stroke} strokeWidth={2} />
      )}
      {shape === 'square' && (
        <rect x={7} y={7} width={26} height={26} rx={4} fill={palette.fill} stroke={palette.stroke} strokeWidth={2} />
      )}
      {shape === 'triangle' && (
        <polygon points="20,5 35,33 5,33" fill={palette.fill} stroke={palette.stroke} strokeWidth={2} strokeLinejoin="round" />
      )}
      {shape === 'diamond' && (
        <polygon points="20,4 35,20 20,36 5,20" fill={palette.fill} stroke={palette.stroke} strokeWidth={2} strokeLinejoin="round" />
      )}
      {shape === 'star' && (
        <polygon
          points="20,4 24.5,14.2 35.5,15.3 27.2,22.6 29.6,33.5 20,27.8 10.4,33.5 12.8,22.6 4.5,15.3 15.5,14.2"
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth={2}
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

interface PuzzleVisualSVGProps {
  station: PuzzleStation;
  dict: TranslationDictionary;
  dialValues: ColorSymbolDialSpec[];
  onDialChange: (next: ColorSymbolDialSpec[]) => void;
  selectedOrderIds: string[];
  onOrderSelect: (stepId: string) => void;
  onOrderReset: () => void;
  onQuickAnswerSubmit: (answer: string) => void;
}

export const PuzzleVisualSVG: React.FC<PuzzleVisualSVGProps> = ({
  station,
  dict,
  dialValues,
  onDialChange,
  selectedOrderIds,
  onOrderSelect,
  onOrderReset,
  onQuickAnswerSubmit,
}) => {
  const {visual} = station;

  if (visual.kind === 'color_symbol_lock') {
    const cycleDial = (idx: number, part: 'color' | 'shape') => {
      const updated = dialValues.map((d, i) => {
        if (i !== idx) return d;
        if (part === 'color') {
          const nextIdx = (ALL_COLORS.indexOf(d.color) + 1) % ALL_COLORS.length;
          return {...d, color: ALL_COLORS[nextIdx]};
        }
        const nextIdx = (ALL_SHAPES.indexOf(d.shape) + 1) % ALL_SHAPES.length;
        return {...d, shape: ALL_SHAPES[nextIdx]};
      });
      onDialChange(updated);
    };

    return (
      <div className="space-y-4">
        <ul className="space-y-1.5 text-sm text-[#334155] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3.5">
          {visual.ruleClues.map((clue, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="font-bold text-[#4F46E5] tabular-nums">{idx + 1}.</span>
              <span>{clue}</span>
            </li>
          ))}
        </ul>

        <p className="text-xs font-medium text-[#64748B]">{dict.station.tapDialsPrompt}</p>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {dialValues.map((dial, idx) => (
            <div
              key={idx}
              className="border border-[#E2E8F0] rounded-xl p-3 bg-white flex flex-col items-center gap-2"
            >
              <span className="text-[11px] font-semibold text-[#64748B] tabular-nums">
                #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => cycleDial(idx, 'shape')}
                className="w-14 h-14 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#4F46E5] flex items-center justify-center transition-colors cursor-pointer"
                title={dict.station.shapeLabels[dial.shape]}
              >
                <ShapeSvg shape={dial.shape} color={dial.color} size={38} />
              </button>
              <div className="flex flex-col w-full gap-1">
                <button
                  type="button"
                  onClick={() => cycleDial(idx, 'color')}
                  className="text-xs font-semibold px-2 py-1 rounded bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] cursor-pointer whitespace-nowrap"
                >
                  {dict.station.colorLabels[dial.color]}
                </button>
                <button
                  type="button"
                  onClick={() => cycleDial(idx, 'shape')}
                  className="text-[11px] font-medium px-2 py-0.5 rounded bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#475569] cursor-pointer whitespace-nowrap"
                >
                  {dict.station.shapeLabels[dial.shape]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visual.kind === 'visual_cipher') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3">
          {visual.keyTable.map((pair, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-2 flex items-center justify-between"
            >
              <span className="text-lg font-bold text-[#4F46E5]">{pair.symbol}</span>
              <span className="text-xs text-[#94A3B8]">=</span>
              <span className="text-sm font-bold text-[#0F172A] tabular-nums">{pair.letter}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-xl p-4 flex flex-wrap items-center justify-center gap-3">
          {visual.encodedTokens.map((sym, idx) => (
            <div
              key={idx}
              className="w-12 h-14 rounded-lg bg-white border border-[#A5B4FC] flex flex-col items-center justify-center"
            >
              <span className="text-2xl font-bold text-[#4F46E5]">{sym}</span>
              <span className="text-[10px] text-[#64748B] tabular-nums">{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visual.kind === 'number_balance') {
    return (
      <div className="space-y-4">
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-2.5">
          {visual.rows.map((row, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 flex-wrap">
                {row.left.map((item, itemIdx) =>
                  Array.from({length: item.count}, (_, cIdx) => (
                    <ShapeSvg
                      key={`${itemIdx}_${cIdx}`}
                      shape={item.icon}
                      color={item.color}
                      size={26}
                    />
                  )),
                )}
              </div>
              <span className="text-sm font-bold text-[#64748B]">=</span>
              <span className="px-3 py-1 rounded-md bg-[#EEF2FF] text-[#4F46E5] font-extrabold text-base tabular-nums">
                {row.rightValue}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap bg-white border border-[#E2E8F0] rounded-xl p-3">
          {visual.sequenceNumbers.map((num, idx) => (
            <React.Fragment key={idx}>
              <div
                className={`w-12 h-11 rounded-lg flex items-center justify-center font-bold text-base tabular-nums ${
                  num === '?'
                    ? 'bg-[#D97706] text-white'
                    : 'bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0]'
                }`}
              >
                {num}
              </div>
              {idx < visual.sequenceNumbers.length - 1 && (
                <span className="text-[#94A3B8] font-bold">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  if (visual.kind === 'floorplan_search') {
    return (
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-3">
        <svg viewBox="0 0 360 92" className="w-full h-24 rounded-lg bg-white border border-[#E2E8F0]">
          <rect x={12} y={14} width={96} height={64} rx={8} fill="#EEF2FF" stroke="#4F46E5" strokeWidth={1.6} />
          <text x={60} y={44} textAnchor="middle" fontSize={11} fontWeight={700} fill="#312E81">
            {dict.roomsAndSpots[visual.targetRoomKey] ?? visual.targetRoomKey}
          </text>
          <text x={60} y={62} textAnchor="middle" fontSize={9} fill="#64748B">
            {dict.station.stationLabel} {station.order}
          </text>

          <line x1={116} y1={46} x2={152} y2={46} stroke="#4F46E5" strokeWidth={2} strokeDasharray="4 3" />

          <rect x={160} y={14} width={186} height={64} rx={8} fill="#FFFBEB" stroke="#D97706" strokeWidth={1.6} />
          <text x={253} y={42} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="#92400E">
            {dict.roomsAndSpots[visual.targetSpotKey] ?? visual.targetSpotKey}
          </text>
          <text x={253} y={60} textAnchor="middle" fontSize={10} fontWeight={600} fill="#B45309">
            {Array.from({length: visual.codeLength}, () => '•').join(' ')}
          </text>
        </svg>

        <ul className="space-y-1.5 text-sm text-[#334155]">
          {visual.directionClues.map((clue, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="font-bold text-[#4F46E5] tabular-nums">{idx + 1}.</span>
              <span>{clue}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (visual.kind === 'chronology_order') {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-[#64748B]">{dict.station.orderStepsPrompt}</p>
          {selectedOrderIds.length > 0 && (
            <button
              type="button"
              onClick={onOrderReset}
              className="text-xs font-semibold text-[#4F46E5] hover:underline cursor-pointer whitespace-nowrap"
            >
              {dict.station.resetOrder}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {visual.steps.map((step) => {
            const pickedPos = selectedOrderIds.indexOf(step.id);
            const isPicked = pickedPos !== -1;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onOrderSelect(step.id)}
                className={`text-start p-3 rounded-xl border transition-colors flex items-center gap-3 cursor-pointer ${
                  isPicked
                    ? 'bg-[#EEF2FF] border-[#4F46E5] text-[#0F172A]'
                    : 'bg-white border-[#E2E8F0] hover:border-[#94A3B8] text-[#334155]'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-extrabold tabular-nums ${
                    isPicked ? 'bg-[#4F46E5] text-white' : 'bg-[#F1F5F9] text-[#64748B]'
                  }`}
                >
                  {isPicked ? pickedPos + 1 : '?'}
                </span>
                <span className="text-sm font-medium leading-snug">{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (visual.kind === 'deduction_grid') {
    return (
      <div className="space-y-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
        <div className="space-y-2">
          {visual.rows.map((row, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <span className="text-xs font-bold text-[#4F46E5] uppercase tracking-wide">
                {row.subject}
              </span>
              <span className="text-sm text-[#334155]">{row.clue}</span>
            </div>
          ))}
        </div>
        <p className="text-xs font-semibold text-[#475569]">{visual.finalQuestion}</p>
      </div>
    );
  }

  // pattern_odd_one
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-[#64748B]">{dict.station.clickTilePrompt}</p>
      <div className="grid grid-cols-3 gap-3">
        {visual.tiles.map((tile, idx) => (
          <button
            key={tile.id}
            type="button"
            onClick={() => onQuickAnswerSubmit(String(idx + 1))}
            className="bg-white border border-[#E2E8F0] hover:border-[#4F46E5] rounded-xl p-3 flex flex-col items-center gap-2 transition-colors cursor-pointer"
          >
            <span className="text-[11px] font-bold text-[#64748B] tabular-nums">#{idx + 1}</span>
            <ShapeSvg shape={tile.shape} color={tile.color} size={40} />
            <div className="flex items-center gap-1 min-h-3">
              {Array.from({length: tile.dots}, (_, dIdx) => (
                <span key={dIdx} className="w-2 h-2 rounded-full bg-[#334155]" />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
