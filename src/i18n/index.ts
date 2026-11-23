import {SUPPORTED_LANGUAGES, type LanguageCode} from '../constants/seo';
import {ar} from './ar';
import {de} from './de';
import {en} from './en';
import {es} from './es';
import {fr} from './fr';
import {hi} from './hi';
import {ja} from './ja';
import {pt} from './pt';
import {ru} from './ru';
import type {TranslationDictionary} from './types';
import {zh} from './zh';

export const DICTIONARIES: Record<LanguageCode, TranslationDictionary> = {
  en,
  es,
  fr,
  de,
  pt,
  ar,
  hi,
  ru,
  zh,
  ja,
};

export function isSupportedLanguage(value: string | null | undefined): value is LanguageCode {
  if (!value) return false;
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

export function detectInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') return 'en';

  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get('lang')?.toLowerCase();
  if (isSupportedLanguage(queryLang)) {
    return queryLang;
  }

  try {
    const stored = window.localStorage.getItem('escapecue_lang_v1');
    if (isSupportedLanguage(stored)) {
      return stored;
    }
  } catch {
    // ignore storage errors
  }

  const navLangs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of navLangs) {
    const base = raw?.toLowerCase().split('-')[0];
    if (isSupportedLanguage(base)) {
      return base;
    }
  }

  return 'en';
}

export function formatTemplate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] !== undefined ? String(vars[key]) : `{${key}}`,
  );
}

export type {TranslationDictionary};
