import React from 'react';
import {ArrowLeft, Printer, Scissors} from 'lucide-react';
import {SPACES} from '../engine/spaces';
import type {TranslationDictionary} from '../i18n';
import type {EscapeMission} from '../types/escape';

interface PrintKitViewProps {
  mission: EscapeMission;
  dict: TranslationDictionary;
  onBackToStudio: () => void;
}

export const PrintKitView: React.FC<PrintKitViewProps> = ({
  mission,
  dict,
  onBackToStudio,
}) => {
  const space = SPACES[mission.spaceId];

  return (
    <section id="print-kit" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Action Bar (Hidden in Print) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 bg-white border border-[#E2E8F0] rounded-xl p-4">
        <button
          type="button"
          onClick={onBackToStudio}
          className="px-3.5 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] text-sm font-semibold text-[#334155] inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft className="w-4 h-4" />
          {dict.printKit.backToStudio}
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="px-5 py-2.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <Printer className="w-4 h-4" />
          {dict.printKit.printNow}
        </button>
      </div>

      {/* Page 1: Game Master Setup Sheet */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-5">
        <div className="border-b border-[#E2E8F0] pb-4">
          <p className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider">EscapeCue</p>
          <h2 className="text-2xl font-extrabold text-[#0F172A] mt-1">{dict.printKit.gmSheetTitle}</h2>
          <p className="text-sm text-[#475569] mt-1">
            {mission.title} · {dict.difficulties[mission.difficulty].name} ({mission.durationMinutes}{' '}
            {dict.controls.minutesUnit})
          </p>
          <p className="text-xs text-[#64748B] mt-1">{dict.printKit.gmSheetSubtitle}</p>
        </div>

        <p className="text-sm text-[#334155] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3.5">
          {mission.introStory}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b-2 border-[#CBD5E1] text-[#475569]">
                <th className="py-2 pr-3 font-bold">#</th>
                <th className="py-2 pr-3 font-bold">{dict.station.stationLabel}</th>
                <th className="py-2 pr-3 font-bold">{dict.station.hidingSpotLabel}</th>
                <th className="py-2 pr-3 font-bold">{dict.station.solutionLabel}</th>
                <th className="py-2 font-bold">{dict.station.hint1Label} / {dict.station.hint2Label}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {mission.stations.map((st, idx) => {
                const sp = space.hidingSpots.find((s) => s.id === st.spotId);
                const spotLabel = sp
                  ? `${dict.roomsAndSpots[sp.roomLabelKey] ?? sp.roomLabelKey} — ${dict.roomsAndSpots[sp.labelKey] ?? sp.labelKey}`
                  : st.physicalSetupNote;
                return (
                  <tr key={st.id} className="align-top">
                    <td className="py-3 pr-3 font-bold tabular-nums">{idx + 1}</td>
                    <td className="py-3 pr-3 font-semibold text-[#0F172A]">{st.title}</td>
                    <td className="py-3 pr-3 text-[#334155]">{spotLabel}</td>
                    <td className="py-3 pr-3 font-bold text-[#4F46E5] tabular-nums">{st.solution}</td>
                    <td className="py-3 text-[#475569] space-y-1">
                      <div>1: {st.hint1}</div>
                      <div>2: {st.hint2}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Page 2: Cut-out Player Clue Cards */}
      <div className="print-break-before space-y-4">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5">
          <h2 className="text-xl font-extrabold text-[#0F172A]">{dict.printKit.playerCardsTitle}</h2>
          <p className="text-xs text-[#64748B] mt-1">{dict.printKit.playerCardsSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mission.stations.map((st, idx) => {
            const sp = space.hidingSpots.find((s) => s.id === st.spotId);
            const spotLabel = sp
              ? `${dict.roomsAndSpots[sp.roomLabelKey] ?? sp.roomLabelKey} — ${dict.roomsAndSpots[sp.labelKey] ?? sp.labelKey}`
              : st.physicalSetupNote;

            return (
              <div
                key={st.id}
                className="print-avoid-break bg-white border-2 border-dashed border-[#94A3B8] rounded-xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-[#64748B] border-b border-[#E2E8F0] pb-2">
                  <span className="font-bold text-[#4F46E5] tabular-nums">
                    {dict.station.stationLabel} {idx + 1} · {st.title}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Scissors className="w-3 h-3" />
                    {dict.printKit.cutLineLabel}
                  </span>
                </div>

                <p className="text-xs italic text-[#475569]">{st.storySnippet}</p>
                <p className="text-sm font-semibold text-[#0F172A]">{st.prompt}</p>

                {st.visual.kind === 'color_symbol_lock' && (
                  <ul className="text-xs text-[#334155] space-y-1 bg-[#F8FAFC] p-2.5 rounded-lg">
                    {st.visual.ruleClues.map((c, cIdx) => (
                      <li key={cIdx}>• {c}</li>
                    ))}
                  </ul>
                )}

                {st.visual.kind === 'visual_cipher' && (
                  <div className="text-xs bg-[#F8FAFC] p-2.5 rounded-lg space-y-1.5">
                    <div className="font-bold text-[#4F46E5] tracking-widest">
                      {st.visual.encodedTokens.join('  ')}
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px] text-[#334155]">
                      {st.visual.keyTable.map((k, kIdx) => (
                        <span key={kIdx}>
                          {k.symbol}={k.letter}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {st.visual.kind === 'floorplan_search' && (
                  <div className="text-xs bg-[#FFFBEB] border border-[#FDE68A] p-2.5 rounded-lg text-[#92400E] font-semibold">
                    {dict.printKit.codeToEnterLabel}: {st.solution}
                  </div>
                )}

                {st.visual.kind === 'deduction_grid' && (
                  <ul className="text-xs text-[#334155] space-y-1 bg-[#F8FAFC] p-2.5 rounded-lg">
                    {st.visual.rows.map((r, rIdx) => (
                      <li key={rIdx}>
                        <strong>{r.subject}:</strong> {r.clue}
                      </li>
                    ))}
                  </ul>
                )}

                {st.visual.kind === 'chronology_order' && (
                  <ul className="text-xs text-[#334155] space-y-1 bg-[#F8FAFC] p-2.5 rounded-lg">
                    {st.visual.steps.map((s) => (
                      <li key={s.id}>[ ] {s.label}</li>
                    ))}
                  </ul>
                )}

                {st.visual.kind === 'number_balance' && (
                  <div className="text-xs bg-[#F8FAFC] p-2.5 rounded-lg text-[#334155] tabular-nums">
                    {st.visual.sequenceNumbers.join(' → ')} ({st.visual.equationHint})
                  </div>
                )}

                <div className="pt-2 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
                  <span>
                    {dict.printKit.placeAtLabel}: <strong className="text-[#0F172A]">{spotLabel}</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
