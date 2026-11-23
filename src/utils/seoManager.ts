import {
  CANONICAL_ORIGIN,
  getCanonicalUrlForLang,
  LANGUAGE_META,
  SUPPORTED_LANGUAGES,
  type LanguageCode,
} from '../constants/seo';
import type {TranslationDictionary} from '../i18n';

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, hreflang?: string): void {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) {
      el.setAttribute('hreflang', hreflang);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function syncHeadSeo(lang: LanguageCode, dict: TranslationDictionary): void {
  const meta = LANGUAGE_META[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = meta.dir;

  const canonicalUrl = getCanonicalUrlForLang(lang);

  document.title = dict.seo.title;
  upsertMeta('name', 'description', dict.seo.description);
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('property', 'og:title', dict.seo.ogTitle);
  upsertMeta('property', 'og:description', dict.seo.ogDescription);
  upsertMeta('name', 'twitter:title', dict.seo.ogTitle);
  upsertMeta('name', 'twitter:description', dict.seo.ogDescription);

  upsertLink('canonical', canonicalUrl);
  upsertLink('alternate', `${CANONICAL_ORIGIN}/`, 'x-default');
  for (const code of SUPPORTED_LANGUAGES) {
    upsertLink('alternate', getCanonicalUrlForLang(code), code);
  }

  const jsonLdPayload = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'EscapeCue',
        url: canonicalUrl,
        inLanguage: lang,
        applicationCategory: dict.seo.appCategory,
        operatingSystem: 'All',
        description: dict.seo.description,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Bastelar',
          url: CANONICAL_ORIGIN,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: dict.editorial.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  };

  let scriptEl = document.head.querySelector<HTMLScriptElement>('script#escapecue-jsonld');
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'escapecue-jsonld';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(jsonLdPayload);
}
