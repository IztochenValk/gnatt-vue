<template>
  <div class="p-8 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Mes projets</h1>
      <button class="btn btn-primary" @click="createAndOpen">Nouveau projet</button>
    </div>

    <div v-if="projects.length === 0" class="text-base-content/70">
      Aucun projet. Crée ton premier projet.
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="p in projects"
        :key="p.id"
        class="card bg-base-100 shadow-md cursor-pointer hover:shadow-lg transition"
        @click="open(p.id)"
      >
        <div class="card-body">
          <h2 class="card-title">{{ p.name }}</h2>
          <p class="text-sm opacity-70">créé le {{ formatDate(p.createdAt) }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useProjects } from '@/stores/projects.store'

const router = useRouter()
const projectsStore = useProjects()

const projects = computed(() => projectsStore.all)

function formatDate(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString()
}

async function createAndOpen() {
  const p = projectsStore.create('Nouveau projet')
  await router.push({ name: 'gantt-editor', params: { id: p.id } })
}

async function open(id: string) {
  projectsStore.setCurrent(id)
  await router.push({ name: 'gantt-editor', params: { id } })
}
</script>
