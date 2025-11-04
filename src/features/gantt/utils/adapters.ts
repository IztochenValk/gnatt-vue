import type { Task } from '@/types/gantt';
import type { TaskView, Tick } from '../types';
import { clampDate } from './time';

export type ToViewsArgs = {
  tasks: Task[];
  ticks: Tick[];        // sert à projeter et surtout à borner (horizon)
  order?: 'keep' | 'byStart' | 'byTitle';
};

/**
 * Transforme tes Task (ISO) en TaskView (Dates + rang de ligne simple).
 * - Convertit start/end ISO → Date
 * - Borne aux extrémités de l’horizon (premier et dernier tick)
 * - Ordonne les lignes selon `order`
 */
export function tasksToViews({ tasks, ticks, order = 'keep' }: ToViewsArgs): TaskView[] {
  if (!ticks.length) return [];

  const min = ticks[0].date;
  const max = ticks[ticks.length - 1].date;

  const parsed = tasks.map(t => {
    const s = new Date(t.start);
    const e = new Date(t.end);
    const start = clampDate(s, min, max);
    const end   = clampDate(e, min, max);
    return { id: t.id, title: t.title, start, end };
  });

  if (order === 'byStart') {
    parsed.sort((a, b) => a.start.getTime() - b.start.getTime() || a.title.localeCompare(b.title));
  } else if (order === 'byTitle') {
    parsed.sort((a, b) => a.title.localeCompare(b.title));
  }
  // 'keep' : garde l’ordre d’entrée (utile si tu affiches déjà trié par section)

  // Assigne un row index linéaire; tu mettras un vrai “row” calculé par groupe plus tard
  return parsed.map((t, i) => ({ ...t, row: i }));
}
