import { RouteData, routesData } from "./routesData";

// Local route search, no dependencies. The index is built once at load;
// a query is a few thousand string compares, well under a millisecond.
//
// Each term scores its single best match: field weight × match factor.
// Term scores add up, then × coverage² (share of terms matched), so a page
// matching every word wins but one typo'd word doesn't empty the results.

const STOP_WORDS = new Set(["and", "or", "the", "a", "an", "in", "on", "at", "with", "by", "for", "to", "of"]);

const WEIGHT = {
  tag: 10,
  tagDecay: 0.1, // per tag position: earlier tags count slightly more
  title: 8,
  description: 3,
};

const FACTOR = {
  exact: 1,
  typingPrefix: 0.85, // last term while still typing ("butt" → button)
  prefix: 0.7,
  typo: 0.5,
  substring: 0.3,
};

const MIN_PREFIX_LENGTH = 2;
const MIN_TYPO_LENGTH = 4;
const MIN_SUBSTRING_LENGTH = 3;

// ─── Normalizing ─────────────────────────────────────────────────────────────

/** Plural → singular, applied the same way to data and query. */
function stem(word: string): string {
  if (word.length < 4) return word;
  if (word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (/(s|x|ch|sh)es$/.test(word)) return word.slice(0, -2);
  if (word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w !== "" && !STOP_WORDS.has(w));
}

const normalize = (text: string) => tokenize(text).map(stem);

/** True when a and b differ by at most one insert, delete, substitute or adjacent swap. */
function withinOneEdit(a: string, b: string): boolean {
  if (a === b) return true;
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > 1) return false;

  let i = 0;
  while (i < la && i < lb && a[i] === b[i]) i++;

  if (la === lb) {
    if (a.slice(i + 1) === b.slice(i + 1)) return true; // substitution
    return a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2); // swap
  }
  return la > lb ? a.slice(i + 1) === b.slice(i) : a.slice(i) === b.slice(i + 1);
}

// ─── Index (built once) ──────────────────────────────────────────────────────

interface IndexedRoute {
  route: RouteData;
  words: Map<string, number>; // word → best field weight it appears with
  title: string[];
}

function addWords(map: Map<string, number>, words: string[], weight: number) {
  for (const w of words) {
    if ((map.get(w) ?? 0) < weight) map.set(w, weight);
  }
}

const index: IndexedRoute[] = routesData.map((route) => {
  const words = new Map<string, number>();
  route.tags.forEach((tag, pos) =>
    addWords(words, normalize(tag), Math.max(WEIGHT.tag - pos * WEIGHT.tagDecay, WEIGHT.title)),
  );
  const title = normalize(route.title);
  addWords(words, title, WEIGHT.title);
  addWords(words, normalize(route.description), WEIGHT.description);
  return { route, words, title };
});

// ─── Query ───────────────────────────────────────────────────────────────────

interface Term {
  raw: string;
  stem: string;
  typing: boolean;
}

function matchFactor(term: Term, word: string): number {
  if (word === term.stem) return FACTOR.exact;
  if (
    term.raw.length >= MIN_PREFIX_LENGTH &&
    (word.startsWith(term.stem) || word.startsWith(term.raw))
  ) {
    return term.typing ? FACTOR.typingPrefix : FACTOR.prefix;
  }
  if (
    term.stem.length >= MIN_TYPO_LENGTH &&
    word.length >= MIN_TYPO_LENGTH &&
    withinOneEdit(term.stem, word)
  ) {
    return FACTOR.typo;
  }
  if (term.stem.length >= MIN_SUBSTRING_LENGTH && word.includes(term.stem)) return FACTOR.substring;
  return 0;
}

function parseQuery(query: string): Term[] {
  const raws = tokenize(query);
  const stillTyping = !/\s$/.test(query);
  const seen = new Set<string>();
  const terms: Term[] = [];

  raws.forEach((raw, i) => {
    const s = stem(raw);
    if (seen.has(s)) return;
    seen.add(s);
    terms.push({ raw, stem: s, typing: stillTyping && i === raws.length - 1 });
  });
  return terms;
}

export function searchRoutes(query: string): RouteData[] {
  const terms = parseQuery(query);
  if (terms.length === 0) return [];

  // Long queries must match at least half their words
  const minCoverage = terms.length >= 3 ? 0.5 : 0;

  const scored: { route: RouteData; score: number; titleHits: number; titleLength: number }[] = [];

  for (const entry of index) {
    let sum = 0;
    let matched = 0;
    let titleHits = 0;

    for (const term of terms) {
      let best = 0;
      entry.words.forEach((weight, word) => {
        const value = weight * matchFactor(term, word);
        if (value > best) best = value;
      });
      if (best > 0) {
        sum += best;
        matched++;
      }
      if (entry.title.some((w) => matchFactor(term, w) >= FACTOR.prefix)) titleHits++;
    }

    const coverage = matched / terms.length;
    if (matched === 0 || coverage < minCoverage) continue;

    scored.push({
      route: entry.route,
      score: sum * coverage * coverage,
      titleHits,
      titleLength: entry.title.length,
    });
  }

  // Ties: stronger title match, then the more specific (shorter) title, then A–Z
  return scored
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.titleHits - a.titleHits ||
        a.titleLength - b.titleLength ||
        a.route.title.localeCompare(b.route.title),
    )
    .map(({ route }) => route);
}
