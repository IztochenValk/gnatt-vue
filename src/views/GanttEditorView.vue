<!-- src/features/gantt/editor/GanttEditor.vue -->
<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useProjects } from '@/stores/projects.store'
import { useTasks } from '@/stores/tasks.store'
import { useUi } from '@/stores/ui.store'
import type { ID } from '@/types/gantt'

// Sub-components
import ScaleSwitcher from '@/features/gantt/editor/ScaleSwitcher.vue'
import ExportControls from '@/features/gantt/editor/ExportControls.vue'
import AddTaskMenu from '@/features/gantt/editor/AddTaskMenu.vue'
import HorizonSetterCompact from '@/features/gantt/editor/HorizonSetterCompact.vue'

const route = useRoute()
const router = useRouter()

const projectsStore = useProjects()
const tasksStore = useTasks()
const uiStore = useUi()

const projectId = computed(() => route.params.id as string)
watchEffect(() => {
  if (projectId.value) projectsStore.setCurrent(projectId.value)
})

const project = computed(() => projectsStore.byId(projectId.value))
const tasks = computed(() => tasksStore.byProject(projectId.value))

const scale = computed({
  get: () => uiStore.scale,
  set: (s) => uiStore.setScale(s)
})

function goBack() {
  router.push({ name: 'projects' })
}

// Horizon handlers (now driven by <HorizonSetter/>)
function saveHorizon(p: { start?: string | null; end?: string | null }) {
  if (!project.value) return
  projectsStore.updateHorizon(project.value.id, p.start ?? '', p.end ?? '')
}

function clearHorizon() {
  if (!project.value) return
  projectsStore.updateHorizon(project.value.id, '', '')
}

// Export controls
function handleExport(fmt: 'png' | 'pdf' | 'html') {
  // TODO: brancher useExportStore + pipeline d’export
  console.log('export', fmt)
}

// Task helpers
function addTask(days = 7) {
  if (!project.value) return
  const id = crypto.randomUUID()
  const now = new Date()
  const start = toISO(now)
  const end = toISO(new Date(now.getFullYear(), now.getMonth(), now.getDate() + days))
  tasksStore.add({
    id,
    projectId: project.value.id,
    title: 'Nouvelle tâche',
    start,
    end,
    progress: 0
  })
}

function selectTask(id: ID) {
  uiStore.selectTask(id)
}

// Utils
function toISO(d: Date) {
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}
function short(iso: string) {
  return iso
}
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap items-center gap-3 justify-between">
      <div class="flex items-center gap-3">
        <button class="btn" @click="goBack">← Projets</button>
        <h1 class="text-xl font-semibold" v-if="project">{{ project.name }}</h1>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <!-- Scale switcher (isolé) -->
        <ScaleSwitcher v-model="scale" />

        <!-- Horizon setter (isolé) -->
        <HorizonSetterCompact
          v-if="project"
          :start="project.start ?? null"
          :end="project.end ?? null"
          @save="saveHorizon"
          @clear="clearHorizon"
        />

        <!-- Export controls (isolé) -->
        <ExportControls @export="handleExport" />
      </div>
    </div>

    <!-- Corps -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Liste / panneau latéral -->
      <section class="lg:col-span-1">
        <div class="card bg-base-100 shadow">
          <div class="card-body space-y-3">
            <div class="flex items-center justify-between">
              <h2 class="card-title">Tâches</h2>
              <!-- AddTask micro-component -->
              <AddTaskMenu @create="({ days }) => addTask(days)" />
            </div>

            <div v-if="tasks.length === 0" class="text-sm opacity-70">Aucune tâche</div>

            <ul class="menu bg-base-100 rounded-box">
              <li v-for="t in tasks" :key="t.id">
                <a @click="selectTask(t.id)">
                  <span class="font-medium">{{ t.title }}</span>
                  <span class="opacity-60 text-xs">{{ short(t.start) }} → {{ short(t.end) }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Zone Gantt -->
      <section class="lg:col-span-2">
        <div class="card bg-base-100 shadow min-h-[400px]">
          <div class="card-body">
            <h2 class="card-title">Diagramme</h2>
            <div class="border rounded h-[320px] flex items-center justify-center opacity-60">
              Le canvas du Gantt viendra ici.
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
