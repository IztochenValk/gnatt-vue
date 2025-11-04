<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useUi } from '@/stores/ui.store'
import { useProjects } from '@/stores/projects.store'
import { useTasks } from '@/stores/tasks.store'
import type { ID, Project } from '@/types/gantt'

// helpers dates minimalistes
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const addDays = (d: Date, n: number) => new Date(d.getTime() + n*86400000)
const fmtDay = (d: Date) => d.toISOString().slice(0,10)

// stores
const ui = useUi()
const projects = useProjects()
const tasksStore = useTasks()

// projet courant + horizon par défaut
const currentProject = computed<Project|undefined>(() => projects.current)
const horizon = computed(() => {
  const today = startOfDay(new Date())
  const start = currentProject.value?.start ? new Date(currentProject.value.start) : addDays(today, -42)
  const end   = currentProject.value?.end   ? new Date(currentProject.value.end)   : addDays(today, 56)
  return { start: startOfDay(start), end: startOfDay(end) }
})

// ticks de temps selon scale
const ticks = computed<Date[]>(() => {
  const out: Date[] = []
  const { start, end } = horizon.value
  const scale = ui.scale
  if (scale === 'month') {
    const d = new Date(start.getFullYear(), start.getMonth(), 1)
    while (d <= end) {
      out.push(new Date(d))
      d.setMonth(d.getMonth()+1, 1)
    }
    return out
  }
  if (scale === 'week') {
    // aligne au lundi
    const d = new Date(start)
    const day = (d.getDay()+6)%7 // 0=lundi
    d.setDate(d.getDate()-day)
    while (d <= end) {
      out.push(new Date(d))
      d.setDate(d.getDate()+7)
    }
    return out
  }
  // day
  const d = new Date(start)
  while (d <= end) {
    out.push(new Date(d))
    d.setDate(d.getDate()+1)
  }
  return out
})

// colonnes CSS dynamiques
const colWidthPx = computed(() => ui.scale === 'day' ? 32 : ui.scale === 'week' ? 64 : 120)
const gridTemplateColumns = computed(() => `repeat(${ticks.value.length}, ${colWidthPx.value}px)`)

// tâches du projet
const tasks = computed(() => currentProject.value ? tasksStore.byProject(currentProject.value.id) : [])

// scroll sync
const bodyRef = ref<HTMLDivElement|null>(null)
const headerRef = ref<HTMLDivElement|null>(null)
onMounted(() => {
  if (!bodyRef.value || !headerRef.value) return
  bodyRef.value.addEventListener('scroll', () => {
    if (headerRef.value) headerRef.value.scrollLeft = bodyRef.value!.scrollLeft
  })
})
</script>

<script setup lang="ts">
const props = defineProps<{ ticks: Tick[]; gridTemplateColumns: string }>()
</script>

<template>
  <div class="grid pointer-events-none absolute inset-0" :style="{ gridTemplateColumns }">
    <div v-for="(t,i) in ticks" :key="i"
         class="border-l first:border-l-0"
         :class="i % 2 === 0 ? 'bg-base-100' : 'bg-base-200/30'"/>
  </div>
</template>

