import React from 'react';
import type {TranslationDictionary} from '../i18n';

interface AdSlotProps {
  slotId: string;
  variant: 'leaderboard' | 'rectangle';
  dict: TranslationDictionary;
}

/**
 * Media.net Display Ad Slot Container
 * Integration instructions:
 * 1. Load your Media.net contextual script in index.html using your publisher cid.
 * 2. Bind `window._mNHandle.queue.push(() => window._mNDetails.loadTag(slotId, size, ...))`
 *    targeting the container ID below.
 * 3. Reserved min-height prevents Cumulative Layout Shift (CLS = 0) and is hidden in @media print.
 */
export const AdSlot: React.FC<AdSlotProps> = ({slotId, variant, dict}) => {
  const heightClass = variant === 'leaderboard' ? 'min-h-[100px]' : 'min-h-[250px]';

  return (
    <aside
      className="no-print max-w-7xl mx-auto px-4 sm:px-6 my-6"
      aria-label={dict.monetization.adSlotLabel}
    >
      <div
        id={slotId}
        data-ad-provider="media.net"
        data-ad-variant={variant}
        className={`w-full ${heightClass} bg-white border border-dashed border-[#CBD5E1] rounded-xl flex flex-col items-center justify-center px-4 py-3 text-center`}
      >
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
          {dict.monetization.adSlotLabel}
        </span>
        <span className="text-xs text-[#64748B] mt-1">{dict.monetization.adNotice}</span>
      </div>
    </aside>
  );
};
