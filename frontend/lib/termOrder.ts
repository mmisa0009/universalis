// Members' term_order used to just mean "insertion order" (new term = newest
// term, always). That breaks the moment an admin wants to add a term that's
// older than what's already there — e.g. adding "Fall 2019" after
// "Fall 2025" already exists would wrongly make Fall 2019 the new "current"
// board. Instead, terms written as "<Season> <Year>" get a term_order that
// encodes actual chronological position, so they always sort correctly
// (Fall 2021 < Spring 2022 < Fall 2022 < Spring 2023 < ...) no matter what
// order they're added in, and the current board is always whichever term is
// truly the most recent.
const SEASON_RANK: Record<string, number> = {
  spring: 0,
  summer: 1,
  fall: 2,
  autumn: 2,
  winter: 3,
};

const TERM_PATTERN = /^(spring|summer|fall|autumn|winter)\s+(\d{4})$/i;

// Returns a chronologically-sortable term_order for terms shaped like
// "Fall 2025", or null if `term` doesn't match that shape (e.g. a custom
// one-off name) — callers should fall back to their own default in that case.
export function parseChronologicalTermOrder(term: string): number | null {
  const match = term.trim().match(TERM_PATTERN);
  if (!match) return null;
  const season = match[1].toLowerCase();
  const year = parseInt(match[2], 10);
  return year * 10 + SEASON_RANK[season];
}
