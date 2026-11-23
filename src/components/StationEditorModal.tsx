import React, {useState} from 'react';
import {X} from 'lucide-react';
import {SPACES} from '../engine/spaces';
import type {TranslationDictionary} from '../i18n';
import type {PuzzleStation, SpaceId} from '../types/escape';

interface StationEditorModalProps {
  station: PuzzleStation;
  spaceId: SpaceId;
  dict: TranslationDictionary;
  onSave: (updated: PuzzleStation) => void;
  onClose: () => void;
}

export const StationEditorModal: React.FC<StationEditorModalProps> = ({
  station,
  spaceId,
  dict,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState(station.title);
  const [spotId, setSpotId] = useState(station.spotId);
  const [storySnippet, setStorySnippet] = useState(station.storySnippet);
  const [prompt, setPrompt] = useState(station.prompt);
  const [physicalSetupNote, setPhysicalSetupNote] = useState(station.physicalSetupNote);
  const [solution, setSolution] = useState(station.solution);
  const [hint1, setHint1] = useState(station.hint1);
  const [hint2, setHint2] = useState(station.hint2);

  const space = SPACES[spaceId];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...station,
      title: title.trim() || station.title,
      spotId,
      storySnippet: storySnippet.trim(),
      prompt: prompt.trim(),
      physicalSetupNote: physicalSetupNote.trim(),
      solution: solution.trim() || station.solution,
      hint1: hint1.trim(),
      hint2: hint2.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0F172A]/45 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={dict.editor.modalTitle}
    >
      <div className="bg-white border border-[#E2E8F0] rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0F172A]">{dict.editor.modalTitle}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.editor.cancel}
            className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F1F5F9] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1">
              {dict.editor.titleField}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1">
              {dict.editor.spotField}
            </label>
            <select
              value={spotId}
              onChange={(e) => setSpotId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {space.hidingSpots.map((sp) => (
                <option key={sp.id} value={sp.id}>
                  {(dict.roomsAndSpots[sp.roomLabelKey] ?? sp.roomLabelKey) +
                    ' — ' +
                    (dict.roomsAndSpots[sp.labelKey] ?? sp.labelKey)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1">
              {dict.editor.storyField}
            </label>
            <textarea
              rows={2}
              value={storySnippet}
              onChange={(e) => setStorySnippet(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#475569] mb-1">
              {dict.editor.promptField}
            </label>
            <textarea
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">
                {dict.editor.setupNoteField}
              </label>
              <input
                type="text"
                value={physicalSetupNote}
                onChange={(e) => setPhysicalSetupNote(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">
                {dict.editor.solutionField}
              </label>
              <input
                type="text"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] font-semibold tabular-nums focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">
                {dict.editor.hint1Field}
              </label>
              <input
                type="text"
                value={hint1}
                onChange={(e) => setHint1(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#475569] mb-1">
                {dict.editor.hint2Field}
              </label>
              <input
                type="text"
                value={hint2}
                onChange={(e) => setHint2(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#475569] hover:bg-[#F8FAFC] cursor-pointer"
            >
              {dict.editor.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold cursor-pointer"
            >
              {dict.editor.saveChanges}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
