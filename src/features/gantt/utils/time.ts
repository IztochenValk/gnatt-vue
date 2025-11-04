import type { Tick } from '@features/gantt/types';
import type { Scale } from '@features/gantt/types';

// --- helpers dates sans dépendance externe ---
export function startOfDay(d: Date) { const x = new Date(d); x.setHours(0,0,0,0); return x; }
export function addDays(d: Date, n: number) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
export function isSameDay(a: Date, b: Date) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }

export function startOfISOWeek(d: Date) {
  const x = startOfDay(d);
  const day = (x.getDay() + 6) % 7; // 0=lundi
  return addDays(x, -day);
}
export function endOfISOWeek(d: Date) { return addDays(startOfISOWeek(d), 6); }

export function startOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth(), 1); }
export function endOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth() + 1, 0); }

export function clampDate(d: Date, min: Date, max: Date) {
  return d < min ? min : d > max ? max : d;
}

function fmtDay(d: Date) {
  // ex: "Lun 03" en fr-FR, sinon "Mon 03"
  try { return d.toLocaleDateString(undefined, { weekday: 'short', day: '2-digit' }); }
  catch { return `${d.toDateString().slice(0,3)} ${String(d.getDate()).padStart(2,'0')}`; }
}
function fmtWeek(d: Date) {
  const so = startOfISOWeek(d);
  const eo = endOfISOWeek(d);
  // "Semaine 2025-11-03→09" compact
  return `${so.getFullYear()}-${String(so.getMonth()+1).padStart(2,'0')}-${String(so.getDate()).padStart(2,'0')}→${String(eo.getDate()).padStart(2,'0')}`;
}
function fmtMonth(d: Date) {
  try { return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }); }
  catch { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; }
}

export type BuildTicksArgs = {
  scale: Scale;                 // 'day' | 'week' | 'month'
  startISO: string;             // horizon inclus
  endISO: string;               // horizon inclus
  padBefore?: number;           // nb d’unités à ajouter avant l’horizon
  padAfter?: number;            // nb d’unités à ajouter après l’horizon
};

/**
 * Construit les ticks (colonnes temps) pour le canvas.
 * L’horizon [startISO..endISO] est inclusif, on peut le “padder”.
 */
export function buildTicks(args: BuildTicksArgs): Tick[] {
  const { scale, startISO, endISO } = args;
  const padBefore = args.padBefore ?? 0;
  const padAfter  = args.padAfter ?? 0;

  const s0 = startOfDay(new Date(startISO));
  const e0 = startOfDay(new Date(endISO));

  if (e0 < s0) return [];

  const ticks: Tick[] = [];

  if (scale === 'day') {
    const start = addDays(s0, -padBefore);
    const end   = addDays(e0, +padAfter);
    let i = 0;
    for (let d = start; d <= end; d = addDays(d, 1), i++) {
      const date = new Date(d);
      ticks.push({ index: i, date, label: fmtDay(date) });
    }
    return ticks;
  }

  if (scale === 'week') {
    // on aligne sur semaines ISO (lundi→dimanche)
    const start = addDays(startOfISOWeek(s0), -7 * padBefore);
    const end   = addDays(endOfISOWeek(e0),    +7 * padAfter);
    let i = 0;
    for (let d = start; d <= end; d = addDays(d, 7), i++) {
      const date = new Date(d);
      ticks.push({ index: i, date, label: fmtWeek(date) });
    }
    return ticks;
  }

  // month
  {
    // aligne sur mois civils
    const s = startOfMonth(s0);
    s.setMonth(s.getMonth() - (padBefore ?? 0));
    const e = endOfMonth(e0);
    e.setMonth(e.getMonth() + (padAfter ?? 0));

    let i = 0;
    for (let d = new Date(s); d <= e; ) {
      const date = new Date(d);
      ticks.push({ index: i++, date, label: fmtMonth(date) });
      d = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    }
    return ticks;
  }
}
