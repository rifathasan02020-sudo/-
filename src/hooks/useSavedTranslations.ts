import { useState, useEffect } from "react";
import { TranslationResult } from "../types";

const SAVED_TRANSLATIONS_KEY = "saved_translations";

export function useSavedTranslations() {
  const [savedTranslations, setSavedTranslations] = useState<TranslationResult[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(SAVED_TRANSLATIONS_KEY);
    if (stored) {
      try {
        setSavedTranslations(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved translations", e);
      }
    }
  }, []);

  const saveTranslation = (translation: TranslationResult) => {
    setSavedTranslations((prev) => {
      // Check if already saved
      if (prev.some((t) => t.originalText === translation.originalText)) {
        return prev;
      }
      const updated = [translation, ...prev];
      localStorage.setItem(SAVED_TRANSLATIONS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeTranslation = (originalText: string) => {
    setSavedTranslations((prev) => {
      const updated = prev.filter((t) => t.originalText !== originalText);
      localStorage.setItem(SAVED_TRANSLATIONS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isSaved = (originalText: string) => {
    return savedTranslations.some((t) => t.originalText === originalText);
  };

  return { savedTranslations, saveTranslation, removeTranslation, isSaved };
}
