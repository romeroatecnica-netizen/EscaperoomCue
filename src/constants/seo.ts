export const CANONICAL_ORIGIN = 'https://escapecue.bastelar.com';

export const SUPPORTED_LANGUAGES = [
  'en',
  'es',
  'fr',
  'de',
  'pt',
  'ar',
  'hi',
  'ru',
  'zh',
  'ja',
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

export interface LanguageMeta {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGE_META: Record<LanguageCode, LanguageMeta> = {
  en: {code: 'en', nativeName: 'English', englishName: 'English', dir: 'ltr'},
  es: {code: 'es', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr'},
  fr: {code: 'fr', nativeName: 'Français', englishName: 'French', dir: 'ltr'},
  de: {code: 'de', nativeName: 'Deutsch', englishName: 'German', dir: 'ltr'},
  pt: {code: 'pt', nativeName: 'Português', englishName: 'Portuguese', dir: 'ltr'},
  ar: {code: 'ar', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl'},
  hi: {code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi', dir: 'ltr'},
  ru: {code: 'ru', nativeName: 'Русский', englishName: 'Russian', dir: 'ltr'},
  zh: {code: 'zh', nativeName: '中文', englishName: 'Chinese', dir: 'ltr'},
  ja: {code: 'ja', nativeName: '日本語', englishName: 'Japanese', dir: 'ltr'},
};

export function getCanonicalUrlForLang(lang: LanguageCode): string {
  return lang === 'en' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}/?lang=${lang}`;
}
