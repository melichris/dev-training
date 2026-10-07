// app/composables/useLocalDraft.ts
import type { NewBook } from "~~/types/book";

const DRAFT_KEY = "shelfie:draft";

export function useLocalDraft() {
  function saveDraft(data: NewBook): void {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  }

  function loadDraft(): NewBook | null {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as NewBook) : null;
  }

  function clearDraft(): void {
    localStorage.removeItem(DRAFT_KEY);
  }

  return { saveDraft, loadDraft, clearDraft };
}
