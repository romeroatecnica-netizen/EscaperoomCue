import React from 'react';
import {Trash2, Upload, X} from 'lucide-react';
import type {TranslationDictionary} from '../i18n';
import type {EscapeMission, SavedMissionMeta} from '../types/escape';

interface SavedMissionsModalProps {
  savedMissions: SavedMissionMeta[];
  dict: TranslationDictionary;
  onLoad: (mission: EscapeMission) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export const SavedMissionsModal: React.FC<SavedMissionsModalProps> = ({
  savedMissions,
  dict,
  onLoad,
  onDelete,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-[#0F172A]/45 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={dict.savedModal.title}
    >
      <div className="bg-white border border-[#E2E8F0] rounded-xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0F172A]">{dict.savedModal.title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.savedModal.closeBtn}
            className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F1F5F9] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          {savedMissions.length === 0 ? (
            <p className="text-sm text-[#64748B] text-center py-8">{dict.savedModal.empty}</p>
          ) : (
            <div className="space-y-3">
              {savedMissions.map((item) => (
                <div
                  key={item.id}
                  className="border border-[#E2E8F0] rounded-xl p-3.5 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#0F172A] truncate">{item.title}</p>
                    <p className="text-xs text-[#64748B] mt-0.5 tabular-nums">
                      {dict.spaces[item.spaceId]?.name} · {dict.difficulties[item.difficulty]?.name} ·{' '}
                      {item.stationCount} {dict.savedModal.stationsCount}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => onLoad(item.mission)}
                      className="px-3 py-1.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      {dict.savedModal.loadBtn}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      aria-label={dict.savedModal.deleteBtn}
                      className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#E11D48] hover:border-[#E11D48] cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
