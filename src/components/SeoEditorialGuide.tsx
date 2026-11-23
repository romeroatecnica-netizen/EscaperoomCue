import React, {useState} from 'react';
import {ChevronDown, ShieldCheck} from 'lucide-react';
import type {TranslationDictionary} from '../i18n';
import type {PuzzleType} from '../types/escape';

interface SeoEditorialGuideProps {
  dict: TranslationDictionary;
}

const PUZZLE_TYPE_ORDER: PuzzleType[] = [
  'color_symbol_lock',
  'visual_cipher',
  'number_balance',
  'floorplan_search',
  'chronology_order',
  'deduction_grid',
  'pattern_odd_one',
];

export const SeoEditorialGuide: React.FC<SeoEditorialGuideProps> = ({dict}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section
      id="gm-guide"
      className="no-print max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10"
      aria-labelledby="editorial-heading"
    >
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-2">
        <h2 id="editorial-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
          {dict.editorial.heading}
        </h2>
        <p className="text-base text-[#475569] leading-relaxed">{dict.editorial.subheading}</p>
      </div>

      {/* 5-Step Home Setup Guide */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-[#0F172A]">{dict.editorial.stepsTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {dict.editorial.steps.map((step, idx) => (
            <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4 space-y-1.5">
              <h4 className="text-sm font-bold text-[#4F46E5]">{step.title}</h4>
              <p className="text-xs text-[#475569] leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Adaptation Table & Safe Clues */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#0F172A]">{dict.editorial.difficultyGuideTitle}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-xs text-[#64748B]">
                  <th className="py-2.5 pr-4 font-semibold text-start">{dict.controls.difficultyLabel}</th>
                  <th className="py-2.5 pr-4 font-semibold text-start">Age</th>
                  <th className="py-2.5 pr-4 font-semibold text-start">Mechanics</th>
                  <th className="py-2.5 font-semibold text-start">Pacing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs">
                {dict.editorial.difficultyRows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-3 pr-4 font-bold text-[#0F172A]">{row.level}</td>
                    <td className="py-3 pr-4 text-[#475569] tabular-nums">{row.age}</td>
                    <td className="py-3 pr-4 text-[#334155]">{row.mechanics}</td>
                    <td className="py-3 text-[#4F46E5] font-semibold tabular-nums">{row.pacing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#0F172A]">{dict.editorial.safeCluesTitle}</h3>
          <ul className="space-y-2.5 text-sm text-[#334155]">
            {dict.editorial.safeClues.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="font-bold text-[#059669] tabular-nums">{idx + 1}.</span>
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Puzzle Types Overview */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-[#0F172A]">{dict.editorial.puzzleGuideTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PUZZLE_TYPE_ORDER.map((type, idx) => (
            <div key={type} className="border border-[#E2E8F0] rounded-lg p-3.5 bg-[#F8FAFC]">
              <span className="text-xs font-semibold text-[#64748B] tabular-nums">
                0{idx + 1} · {dict.puzzleTypes[type].badge}
              </span>
              <p className="text-sm font-bold text-[#0F172A] mt-1">{dict.puzzleTypes[type].name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Expandable FAQ */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-[#0F172A]">{dict.editorial.faqTitle}</h3>
        <div className="divide-y divide-[#E2E8F0]">
          {dict.editorial.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-3 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-start py-1.5 font-semibold text-sm text-[#0F172A] hover:text-[#4F46E5] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-[#64748B] transition-transform ${
                      isOpen ? 'rotate-180 text-[#4F46E5]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="text-sm text-[#475569] leading-relaxed pt-1.5 pb-1">{faq.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Transparent Local Privacy Banner */}
      <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-xl px-5 py-4 flex items-start gap-3 text-sm text-[#312E81]">
        <ShieldCheck className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" />
        <p className="font-medium leading-relaxed">{dict.hero.privacyBanner}</p>
      </div>
    </section>
  );
};
