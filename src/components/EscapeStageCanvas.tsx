import React from 'react';
import {SPACES} from '../engine/spaces';
import type {TranslationDictionary} from '../i18n';
import type {
  EscapeMission,
  FloorFurniture,
  HidingSpot,
  PuzzleStation,
  ViewMode,
} from '../types/escape';

interface EscapeStageCanvasProps {
  mission: EscapeMission;
  viewMode: ViewMode;
  dict: TranslationDictionary;
  onSelectStation: (index: number) => void;
  onReassignSpot?: (stationIndex: number, spotId: string) => void;
}

function renderFurnitureSvg(f: FloorFurniture) {
  const {x, y, w, h, kind} = f;
  switch (kind) {
    case 'sofa':
      return (
        <g key={f.id}>
          <rect x={x} y={y} width={w} height={h} rx={10} fill="#E0E7FF" stroke="#6366F1" strokeWidth={1.75} />
          <rect x={x + 6} y={y + 6} width={w - 12} height={14} rx={5} fill="#C7D2FE" />
          <line x1={x + w / 2} y1={y + 22} x2={x + w / 2} y2={y + h - 4} stroke="#818CF8" strokeWidth={1.2} />
        </g>
      );
    case 'table':
      return (
        <g key={f.id}>
          <circle cx={x + 18} cy={y + h / 2} r={10} fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1.2} />
          <circle cx={x + w - 18} cy={y + h / 2} r={10} fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1.2} />
          <circle cx={x + w / 2} cy={y + 14} r={10} fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1.2} />
          <circle cx={x + w / 2} cy={y + h - 14} r={10} fill="#E2E8F0" stroke="#94A3B8" strokeWidth={1.2} />
          <rect x={x + 22} y={y + 18} width={w - 44} height={h - 36} rx={8} fill="#FEF3C7" stroke="#D97706" strokeWidth={1.75} />
        </g>
      );
    case 'bookshelf':
      return (
        <g key={f.id}>
          <rect x={x} y={y} width={w} height={h} rx={6} fill="#FDE68A" stroke="#B45309" strokeWidth={1.75} />
          <line x1={x + 8} y1={y + h * 0.33} x2={x + w - 8} y2={y + h * 0.33} stroke="#B45309" strokeWidth={1.2} />
          <line x1={x + 8} y1={y + h * 0.66} x2={x + w - 8} y2={y + h * 0.66} stroke="#B45309" strokeWidth={1.2} />
          <rect x={x + 10} y={y + 8} width={10} height={18} rx={2} fill="#4F46E5" opacity={0.75} />
          <rect x={x + 23} y={y + 10} width={8} height={16} rx={2} fill="#059669" opacity={0.75} />
          <rect x={x + 34} y={y + 8} width={11} height={18} rx={2} fill="#E11D48" opacity={0.75} />
        </g>
      );
    case 'tv_console':
      return (
        <g key={f.id}>
          <rect x={x} y={y} width={w} height={h} rx={6} fill="#E2E8F0" stroke="#475569" strokeWidth={1.6} />
          <rect x={x + 16} y={y + h / 2 - 4} width={w - 32} height={8} rx={3} fill="#1E293B" />
        </g>
      );
    case 'lamp':
      return (
        <g key={f.id}>
          <circle cx={x + w / 2} cy={y + h / 2} r={Math.min(w, h) / 2 - 2} fill="#FEF3C7" stroke="#D97706" strokeWidth={1.6} />
          <circle cx={x + w / 2} cy={y + h / 2} r={8} fill="#F59E0B" />
        </g>
      );
    case 'fridge':
      return (
        <g key={f.id}>
          <rect x={x} y={y} width={w} height={h} rx={8} fill="#E0F2FE" stroke="#0284C7" strokeWidth={1.75} />
          <line x1={x + 10} y1={y + h * 0.45} x2={x + w - 10} y2={y + h * 0.45} stroke="#0284C7" strokeWidth={1.4} />
          <circle cx={x + w - 14} cy={y + 18} r={4} fill="#E11D48" />
          <circle cx={x + w - 24} cy={y + 24} r={4} fill="#059669" />
        </g>
      );
    case 'stove':
      return (
        <g key={f.id}>
          <rect x={x} y={y} width={w} height={h} rx={6} fill="#F1F5F9" stroke="#475569" strokeWidth={1.6} />
          <circle cx={x + w * 0.3} cy={y + h * 0.35} r={10} fill="#CBD5E1" stroke="#334155" strokeWidth={1.4} />
          <circle cx={x + w * 0.7} cy={y + h * 0.35} r={10} fill="#CBD5E1" stroke="#334155" strokeWidth={1.4} />
          <circle cx={x + w * 0.3} cy={y + h * 0.72} r={8} fill="#CBD5E1" stroke="#334155" strokeWidth={1.4} />
          <circle cx={x + w * 0.7} cy={y + h * 0.72} r={8} fill="#CBD5E1" stroke="#334155" strokeWidth={1.4} />
        </g>
      );
    case 'counter':
    case 'pantry':
      return (
        <g key={f.id}>
          <rect x={x} y={y} width={w} height={h} rx={6} fill="#D1FAE5" stroke="#059669" strokeWidth={1.6} />
          <rect x={x + 10} y={y + 10} width={w - 20} height={h - 20} rx={4} fill="#ECFDF5" stroke="#34D399" strokeWidth={1} />
        </g>
      );
    case 'bed':
      return (
        <g key={f.id}>
          <rect x={x} y={y} width={w} height={h} rx={10} fill="#E0E7FF" stroke="#4F46E5" strokeWidth={1.75} />
          <rect x={x + 10} y={y + 10} width={w * 0.4} height={24} rx={6} fill="#FFFFFF" stroke="#818CF8" strokeWidth={1.2} />
          <rect x={x + w * 0.5 + 4} y={y + 10} width={w * 0.4} height={24} rx={6} fill="#FFFFFF" stroke="#818CF8" strokeWidth={1.2} />
          <rect x={x + 8} y={y + 44} width={w - 16} height={h - 54} rx={6} fill="#C7D2FE" />
        </g>
      );
    case 'desk':
      return (
        <g key={f.id}>
          <rect x={x} y={y} width={w} height={h} rx={6} fill="#FEF3C7" stroke="#D97706" strokeWidth={1.6} />
          <rect x={x + w / 2 - 22} y={y + 10} width={44} height={20} rx={3} fill="#FFFFFF" stroke="#94A3B8" strokeWidth={1.2} />
        </g>
      );
    case 'wardrobe':
    case 'cabinet':
      return (
        <g key={f.id}>
          <rect x={x} y={y} width={w} height={h} rx={6} fill="#F1F5F9" stroke="#475569" strokeWidth={1.6} />
          <line x1={x + w / 2} y1={y + 4} x2={x + w / 2} y2={y + h - 4} stroke="#64748B" strokeWidth={1.4} />
          <circle cx={x + w / 2 - 8} cy={y + h / 2} r={3} fill="#475569" />
          <circle cx={x + w / 2 + 8} cy={y + h / 2} r={3} fill="#475569" />
        </g>
      );
    case 'chest':
      return (
        <g key={f.id}>
          <rect x={x} y={y} width={w} height={h} rx={7} fill="#FDE68A" stroke="#B45309" strokeWidth={1.75} />
          <rect x={x + w / 2 - 8} y={y + h / 2 - 6} width={16} height={12} rx={2} fill="#D97706" />
        </g>
      );
    case 'planter':
      return (
        <g key={f.id}>
          <rect x={x} y={y} width={w} height={h} rx={12} fill="#FED7AA" stroke="#C2410C" strokeWidth={1.6} />
          <circle cx={x + w * 0.35} cy={y + h * 0.5} r={16} fill="#34D399" stroke="#059669" strokeWidth={1.4} />
          <circle cx={x + w * 0.65} cy={y + h * 0.5} r={14} fill="#10B981" stroke="#047857" strokeWidth={1.4} />
        </g>
      );
    case 'bench':
      return (
        <g key={f.id}>
          <rect x={x} y={y} width={w} height={h} rx={8} fill="#FDE68A" stroke="#92400E" strokeWidth={1.6} />
          <line x1={x + 8} y1={y + h * 0.33} x2={x + w - 8} y2={y + h * 0.33} stroke="#B45309" strokeWidth={1.2} />
          <line x1={x + 8} y1={y + h * 0.66} x2={x + w - 8} y2={y + h * 0.66} stroke="#B45309" strokeWidth={1.2} />
        </g>
      );
    case 'steps':
      return (
        <g key={f.id}>
          <rect x={x} y={y} width={w} height={h} rx={4} fill="#E2E8F0" stroke="#64748B" strokeWidth={1.5} />
          <line x1={x} y1={y + h * 0.33} x2={x + w} y2={y + h * 0.33} stroke="#64748B" strokeWidth={1.4} />
          <line x1={x} y1={y + h * 0.66} x2={x + w} y2={y + h * 0.66} stroke="#64748B" strokeWidth={1.4} />
        </g>
      );
    case 'pergola':
      return (
        <g key={f.id}>
          <rect x={x} y={y} width={w} height={h} rx={8} fill="#FEF3C7" fillOpacity={0.6} stroke="#D97706" strokeWidth={1.6} strokeDasharray="6 4" />
          {[0.2, 0.4, 0.6, 0.8].map((r) => (
            <line key={r} x1={x + w * r} y1={y} x2={x + w * r} y2={y + h} stroke="#D97706" strokeWidth={2} strokeOpacity={0.45} />
          ))}
        </g>
      );
    case 'whiteboard':
      return (
        <g key={f.id}>
          <rect x={x} y={y} width={w} height={h} rx={4} fill="#FFFFFF" stroke="#4F46E5" strokeWidth={1.8} />
          <line x1={x + 18} y1={y + 18} x2={x + w - 40} y2={y + 18} stroke="#CBD5E1" strokeWidth={2.5} strokeLinecap="round" />
          <line x1={x + 18} y1={y + 30} x2={x + w - 90} y2={y + 30} stroke="#A5B4FC" strokeWidth={2.5} strokeLinecap="round" />
        </g>
      );
    case 'coat_rack':
    default:
      return (
        <g key={f.id}>
          <rect x={x} y={y} width={w} height={h} rx={6} fill="#E2E8F0" stroke="#64748B" strokeWidth={1.5} />
          <circle cx={x + w * 0.25} cy={y + h / 2} r={5} fill="#4F46E5" />
          <circle cx={x + w * 0.5} cy={y + h / 2} r={5} fill="#059669" />
          <circle cx={x + w * 0.75} cy={y + h / 2} r={5} fill="#D97706" />
        </g>
      );
  }
}

export const EscapeStageCanvas: React.FC<EscapeStageCanvasProps> = ({
  mission,
  viewMode,
  dict,
  onSelectStation,
  onReassignSpot,
}) => {
  const space = SPACES[mission.spaceId];
  const spotMap = new Map<string, HidingSpot>(space.hidingSpots.map((sp) => [sp.id, sp]));

  const stationPositions = mission.stations.map((st, idx) => {
    const sp = spotMap.get(st.spotId) ?? space.hidingSpots[idx % space.hidingSpots.length];
    return {station: st, index: idx, x: sp.x, y: sp.y, spot: sp};
  });

  const occupiedSpotIds = new Set(mission.stations.map((s) => s.spotId));
  const activeStation = mission.stations[mission.activeStationIndex];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-[#0F172A]">
            {viewMode === 'gm' ? dict.floorplan.titleGm : dict.floorplan.titlePlayer}
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            {viewMode === 'gm' ? dict.floorplan.subtitleGm : dict.floorplan.subtitlePlayer}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#475569]">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#4F46E5] inline-block" />
            {dict.floorplan.legendActive}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#059669] inline-block" />
            {dict.floorplan.legendSolved}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#94A3B8] inline-block" />
            {dict.floorplan.legendLocked}
          </span>
          {viewMode === 'gm' && (
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border-2 border-dashed border-[#D97706] bg-[#FEF3C7] inline-block" />
              {dict.floorplan.legendSpot}
            </span>
          )}
        </div>
      </div>

      <div className="p-4 bg-[#F8FAFC]">
        <svg
          viewBox="0 0 900 540"
          className="w-full h-auto max-h-[540px] rounded-lg border border-[#E2E8F0] bg-white select-none"
          role="img"
          aria-label={viewMode === 'gm' ? dict.floorplan.titleGm : dict.floorplan.titlePlayer}
        >
          <defs>
            <pattern id="pat-tile" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
            </pattern>
            <pattern id="pat-wood" width="32" height="12" patternUnits="userSpaceOnUse">
              <line x1="0" y1="6" x2="32" y2="6" stroke="#FDE68A" strokeWidth="0.9" />
            </pattern>
            <pattern id="pat-grass" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="#A7F3D0" />
              <circle cx="15" cy="14" r="1" fill="#6EE7B7" />
            </pattern>
            <pattern id="pat-stone" width="28" height="28" patternUnits="userSpaceOnUse">
              <rect x="2" y="2" width="12" height="10" rx="2" fill="none" stroke="#FDE68A" strokeWidth="0.8" />
              <rect x="16" y="14" width="10" height="12" rx="2" fill="none" stroke="#FDE68A" strokeWidth="0.8" />
            </pattern>
            <pattern id="pat-carpet" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="7" cy="7" r="0.8" fill="#C7D2FE" />
            </pattern>
            <marker
              id="route-arrow"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#4F46E5" opacity="0.65" />
            </marker>
          </defs>

          {/* Rooms */}
          {space.rooms.map((room) => (
            <g key={room.id}>
              <rect
                x={room.x}
                y={room.y}
                width={room.w}
                height={room.h}
                fill={room.fill}
                stroke="#334155"
                strokeWidth={3}
              />
              <rect
                x={room.x}
                y={room.y}
                width={room.w}
                height={room.h}
                fill={`url(#pat-${room.floorPattern})`}
                pointerEvents="none"
              />
              <text
                x={room.x + 14}
                y={room.y + 24}
                fontSize={13}
                fontWeight={700}
                fill="#334155"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                {dict.roomsAndSpots[room.labelKey] ?? room.labelKey}
              </text>
            </g>
          ))}

          {/* Doors */}
          {space.doors.map((d, idx) =>
            d.orientation === 'v' ? (
              <g key={`door_${idx}`}>
                <line x1={d.x} y1={d.y} x2={d.x} y2={d.y + d.width} stroke="#FFFFFF" strokeWidth={5} />
                <path
                  d={`M ${d.x} ${d.y} A ${d.width * 0.7} ${d.width * 0.7} 0 0 1 ${d.x + d.width * 0.65} ${d.y + d.width * 0.55}`}
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth={1.4}
                  strokeDasharray="3 3"
                />
              </g>
            ) : (
              <g key={`door_${idx}`}>
                <line x1={d.x} y1={d.y} x2={d.x + d.width} y2={d.y} stroke="#FFFFFF" strokeWidth={5} />
                <path
                  d={`M ${d.x} ${d.y} A ${d.width * 0.7} ${d.width * 0.7} 0 0 0 ${d.x + d.width * 0.55} ${d.y + d.width * 0.65}`}
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth={1.4}
                  strokeDasharray="3 3"
                />
              </g>
            ),
          )}

          {/* Furniture */}
          {space.furniture.map((item) => renderFurnitureSvg(item))}

          {/* Compass Rose */}
          <g transform="translate(848, 52)">
            <circle cx={0} cy={0} r={16} fill="#FFFFFF" stroke="#CBD5E1" strokeWidth={1.2} />
            <polygon points="0,-11 4,2 0,-1 -4,2" fill="#4F46E5" />
            <text x={0} y={12} textAnchor="middle" fontSize={8} fontWeight={700} fill="#64748B">
              {space.compassDirection}
            </text>
          </g>

          {/* Route Connections */}
          {stationPositions.map((pos, idx) => {
            if (idx === stationPositions.length - 1) return null;
            const next = stationPositions[idx + 1];
            const isRevealed = viewMode === 'gm' || pos.station.solved;
            return (
              <line
                key={`route_${pos.station.id}`}
                x1={pos.x}
                y1={pos.y}
                x2={next.x}
                y2={next.y}
                stroke={isRevealed ? '#4F46E5' : '#CBD5E1'}
                strokeWidth={2.5}
                strokeDasharray="7 5"
                strokeOpacity={isRevealed ? 0.65 : 0.55}
                markerEnd={isRevealed ? 'url(#route-arrow)' : undefined}
              />
            );
          })}

          {/* Unassigned Hiding Spots in GM Mode */}
          {viewMode === 'gm' &&
            space.hidingSpots
              .filter((sp) => !occupiedSpotIds.has(sp.id))
              .map((sp) => (
                <g
                  key={`free_${sp.id}`}
                  className="cursor-pointer"
                  onClick={() => {
                    if (onReassignSpot && activeStation) {
                      onReassignSpot(mission.activeStationIndex, sp.id);
                    }
                  }}
                >
                  <title>
                    {`${dict.floorplan.reassignSpot}: ${dict.roomsAndSpots[sp.labelKey] ?? sp.labelKey}`}
                  </title>
                  <circle
                    cx={sp.x}
                    cy={sp.y}
                    r={12}
                    fill="#FEF3C7"
                    stroke="#D97706"
                    strokeWidth={1.8}
                    strokeDasharray="3 2"
                  />
                  <text x={sp.x} y={sp.y + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="#B45309">
                    +
                  </text>
                </g>
              ))}

          {/* Station Markers */}
          {stationPositions.map(({station, index, x, y, spot}) => {
            const isActive = index === mission.activeStationIndex;
            const isSolved = station.solved;
            const pinColor = isSolved ? '#059669' : isActive ? '#4F46E5' : '#94A3B8';
            const labelText = dict.roomsAndSpots[spot.labelKey] ?? spot.labelKey;
            const showDetailLabel = viewMode === 'gm' || isActive || isSolved;

            return (
              <g
                key={station.id}
                className="cursor-pointer"
                onClick={() => onSelectStation(index)}
                role="button"
                tabIndex={0}
                aria-label={`${dict.station.stationLabel} ${index + 1}: ${station.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectStation(index);
                  }
                }}
              >
                {isActive && (
                  <circle
                    cx={x}
                    cy={y}
                    r={24}
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    strokeOpacity={0.35}
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={17}
                  fill={pinColor}
                  stroke="#FFFFFF"
                  strokeWidth={2.8}
                />
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={800}
                  fill="#FFFFFF"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  style={{fontVariantNumeric: 'tabular-nums'}}
                >
                  {isSolved ? '✓' : index + 1}
                </text>

                {showDetailLabel && (
                  <g transform={`translate(${Math.min(Math.max(x, 95), 795)}, ${y > 460 ? y - 34 : y + 29})`}>
                    <rect
                      x={-84}
                      y={-12}
                      width={168}
                      height={viewMode === 'gm' ? 30 : 20}
                      rx={5}
                      fill="#FFFFFF"
                      fillOpacity={0.95}
                      stroke={isActive ? '#4F46E5' : '#CBD5E1'}
                      strokeWidth={1.2}
                    />
                    <text
                      x={0}
                      y={1}
                      textAnchor="middle"
                      fontSize={9.5}
                      fontWeight={700}
                      fill="#0F172A"
                    >
                      {labelText.length > 26 ? `${labelText.slice(0, 25)}…` : labelText}
                    </text>
                    {viewMode === 'gm' && (
                      <text
                        x={0}
                        y={13}
                        textAnchor="middle"
                        fontSize={8.5}
                        fontWeight={700}
                        fill="#D97706"
                      >
                        {`${dict.station.solutionLabel}: ${station.solution.length > 18 ? `${station.solution.slice(0, 17)}…` : station.solution}`}
                      </text>
                    )}
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Station quick selector bar under floorplan */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#64748B]">
          <span>{dict.floorplan.clickPinHint}</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {mission.stations.map((st: PuzzleStation, idx: number) => {
              const isActive = idx === mission.activeStationIndex;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => onSelectStation(idx)}
                  className={`px-2.5 py-1 rounded-md font-semibold tabular-nums transition-colors cursor-pointer whitespace-nowrap ${
                    st.solved
                      ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]'
                      : isActive
                        ? 'bg-[#4F46E5] text-white'
                        : 'bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#94A3B8]'
                  }`}
                >
                  {`${idx + 1}. ${st.solved ? '✓' : st.title.slice(0, 14)}${!st.solved && st.title.length > 14 ? '…' : ''}`}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
