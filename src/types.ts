export interface WordBreakdown {
  word: string;
  meaning: string;
  pronunciation: string;
}

export interface TranslationResult {
  originalText: string;
  sourceLanguage: string;
  fullTranslation: string;
  words: WordBreakdown[];
}

export interface IslamicPhrase {
  id: string;
  arabic: string;
  transliteration: string;
  bengaliTranslation: string;
  bengaliPronunciation: string;
  words: WordBreakdown[];
}
