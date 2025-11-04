<script setup lang="ts">
import { computed } from 'vue';
import { useProjects } from '@/stores/projects.store';
import { useTasks } from '@/stores/tasks.store';
import { useUi } from '@/stores/ui.store';
import GanttCanvas from './canvas/GanttCanvas.vue';

import type { Task } from '@/types/gantt';
import type { Tick, TaskView } from './types';

import { buildTicks, startOfDay, addDays } from './utils/time';
import { tasksToViews } from './utils/adapters';

const projects = useProjects();
const tasksStore = useTasks();
const ui = useUi(); // ui.scale: 'day'|'week'|'month'

// 1) horizon projet (fallback: min/max des tâches si start/end absents)
const horizon = computed(() => {
  const p = projects.current;
  const all: Task[] = p ? tasksStore.byProject(p.id) : [];

  const minTask = all.length ? all.reduce((m, t) => m < t.start ? m : t.start, all[0].start) : undefined;
  const maxTask = all.length ? all.reduce((m, t) => m > t.end   ? m : t.end,   all[0].end)   : undefined;

  const startISO = p?.start ?? minTask ?? new Date().toISOString();
  const endISO   = p?.end   ?? maxTask ?? addDays(startOfDay(new Date(startISO)), 14).toISOString();

  return { startISO, endISO };
});

// 2) ticks (padding sympa selon scale)
const ticks = computed<Tick[]>(() => {
  const pad = ui.scale === 'day' ? 3 : ui.scale === 'week' ? 1 : 0;
  return buildTicks({
    scale: ui.scale,
    startISO: horizon.value.startISO,
    endISO: horizon.value.endISO,
    padBefore: pad,
    padAfter: pad
  });
});

// 3) TaskViews
const taskViews = computed<TaskView[]>(() => {
  const p = projects.current;
  const list = p ? tasksStore.byProject(p.id) : [];
  return tasksToViews({ tasks: list, ticks: ticks.value, order: 'byStart' });
});

// 4) paramètres d’affichage
const colWidth = computed(() => {
  switch (ui.scale) {
    case 'day': return 48;
    case 'week': return 96;
    case 'month': return 160;
  }
});
const rowHeight = 40;
</script>

<template>
  <GanttCanvas
    :ticks="ticks"
    :tasks="taskViews"
    :colWidth="colWidth"
    :rowHeight="rowHeight"
  />
</template>
