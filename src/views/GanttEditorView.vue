<template>
  <div class="p-6 space-y-6">
    <!-- En-tête -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">
        {{ project ? project.name : 'Éditeur de diagramme Gantt' }}
      </h1>

      <button class="btn btn-outline btn-sm" @click="goBack">
        ← Retour à la liste
      </button>
    </div>

    <!-- Cas 1 : aucun projet sélectionné -->
    <div v-if="!project" class="text-center text-base-content/70 mt-12">
      <p>Aucun projet sélectionné.</p>
      <router-link class="link link-primary mt-2 inline-block" :to="{ name: 'editor' }">
        Revenir à la liste des projets
      </router-link>
    </div>

    <!-- Cas 2 : projet trouvé -->
    <div v-else class="space-y-4">
      <div class="bg-base-200 p-4 rounded-lg shadow-sm">
        <p class="text-sm opacity-70">
          Créé le : {{ formatDate(project.createdAt) }}
        </p>
        <p v-if="project.start && project.end" class="mt-1 text-sm">
          Horizon : du <strong>{{ formatDate(project.start) }}</strong>
          au <strong>{{ formatDate(project.end) }}</strong>
        </p>
      </div>

      <!-- Future zone du diagramme Gantt -->
      <div class="border border-base-300 rounded-lg p-6 bg-base-100 shadow-inner min-h-[300px] flex items-center justify-center text-base-content/60">
        <p>Ici viendra le diagramme Gantt du projet <strong>{{ project.name }}</strong>.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjects } from '@/stores/projects.store'

const route = useRoute()
const router = useRouter()
const store = useProjects()

// Lecture de l'ID optionnel
const projectId = computed(() => route.params.id as string | undefined)
const project = computed(() => projectId.value ? store.byId(projectId.value) : undefined)

// Si le projet change (ou est supprimé)
watch(projectId, (newId) => {
  if (newId && !store.byId(newId)) {
    console.warn('Projet introuvable:', newId)
  }
})

function goBack() {
  router.push({ name: 'editor' })
}

function formatDate(iso?: string) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString()
}
</script>
