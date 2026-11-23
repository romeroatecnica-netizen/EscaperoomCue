import React from 'react';
import {ExternalLink, Package} from 'lucide-react';
import type {TranslationDictionary} from '../i18n';

interface AffiliateGearStripProps {
  dict: TranslationDictionary;
}

export const AffiliateGearStrip: React.FC<AffiliateGearStripProps> = ({dict}) => {
  return (
    <section
      className="no-print max-w-7xl mx-auto px-4 sm:px-6 py-6"
      aria-labelledby="affiliate-gear-heading"
    >
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E2E8F0] pb-4">
          <div>
            <h2
              id="affiliate-gear-heading"
              className="text-lg font-bold text-[#0F172A] flex items-center gap-2"
            >
              <Package className="w-5 h-5 text-[#4F46E5]" />
              {dict.monetization.gearHeading}
            </h2>
            <p className="text-sm text-[#475569] mt-1">{dict.monetization.gearSubheading}</p>
          </div>
          <p className="text-xs text-[#64748B]">{dict.monetization.disclosure}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dict.monetization.gearItems.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="group border border-[#E2E8F0] hover:border-[#4F46E5] rounded-xl p-4 bg-[#F8FAFC] hover:bg-white transition-colors flex flex-col justify-between gap-3"
            >
              <div>
                <span className="text-xs font-semibold text-[#4F46E5]">{item.tag}</span>
                <h3 className="text-sm font-bold text-[#0F172A] mt-1 group-hover:text-[#4F46E5] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">{item.subtitle}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#334155] group-hover:text-[#4F46E5]">
                <ExternalLink className="w-3.5 h-3.5" />
                {item.tag}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
