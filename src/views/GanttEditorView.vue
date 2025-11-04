<template>
  <div class="p-6 space-y-6">
    <!-- Barre d’en-tête -->
    <div class="flex flex-wrap items-center gap-3 justify-between">
      <div class="flex items-center gap-3">
        <button class="btn" @click="goBack">← Projets</button>
        <h1 class="text-xl font-semibold" v-if="project">
          {{ project.name }}
        </h1>
      </div>

      <div class="flex items-center gap-2">
        <div class="join">
          <button
            class="btn join-item"
            :class="{ 'btn-active': scale === 'day' }"
            @click="setScale('day')"
          >Jour</button>
          <button
            class="btn join-item"
            :class="{ 'btn-active': scale === 'week' }"
            @click="setScale('week')"
          >Semaine</button>
          <button
            class="btn join-item"
            :class="{ 'btn-active': scale === 'month' }"
            @click="setScale('month')"
          >Mois</button>
        </div>

        <button class="btn btn-ghost" @click="setHorizonThisMonth">Horizon = ce mois</button>
        <button class="btn btn-accent">Exporter</button>
      </div>
    </div>

    <!-- Zone d’édition: 2 colonnes -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Colonne gauche: liste tâches -->
      <section class="lg:col-span-1">
        <div class="card bg-base-100 shadow">
          <div class="card-body space-y-3">
            <div class="flex items-center justify-between">
              <h2 class="card-title">Tâches</h2>
              <button class="btn btn-primary btn-sm" @click="addTask">+ Tâche</button>
            </div>

            <div v-if="tasks.length === 0" class="text-sm opacity-70">Aucune tâche</div>

            <ul class="menu bg-base-100 rounded-box">
              <li v-for="t in tasks" :key="t.id">
                <a @click="selectTask(t.id)">
                  <span class="font-medium">{{ t.title }}</span>
                  <span class="opacity-60 text-xs">
                    {{ short(t.start) }} → {{ short(t.end) }}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Colonne droite: zone du diagramme -->
      <section class="lg:col-span-2">
        <div class="card bg-base-100 shadow min-h-[400px]">
          <div class="card-body">
            <h2 class="card-title">Diagramme</h2>
            <!-- Placeholder du canvas Gantt -->
            <div class="border rounded h-[320px] flex items-center justify-center opacity-60">
              Le canvas du Gantt viendra ici.
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjects } from '@/stores/projects.store'
import { useTasks } from '@/stores/tasks.store'
import { useUi } from '@/stores/ui.store'
import type { ID } from '@/types/gantt'

const route = useRoute()
const router = useRouter()
const projectsStore = useProjects()
const tasksStore = useTasks()
const uiStore = useUi()

// Id projet depuis l’URL
const projectId = computed(() => route.params.id as string)

// Marquer courant si on change d’URL
watchEffect(() => {
  if (projectId.value) projectsStore.setCurrent(projectId.value)
})

const project = computed(() => projectsStore.byId(projectId.value))
const tasks = computed(() => tasksStore.byProject(projectId.value))
const scale = computed(() => uiStore.scale)

function goBack() {
  router.push({ name: 'projects' })
}

function setScale(s: 'day' | 'week' | 'month') {
  uiStore.setScale(s)
}

function setHorizonThisMonth() {
  if (!project.value) return
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  projectsStore.updateHorizon(project.value.id, toISO(start), toISO(end))
}

function addTask() {
  if (!project.value) return
  const id = crypto.randomUUID()
  const now = new Date()
  const start = toISO(now)
  const end = toISO(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7))
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
  // plus tard: uiStore.selectTask(id)
  // pour l’instant, pas d’état visuel
}

function toISO(d: Date) {
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

function short(iso: string) {
  return iso
}
</script>
