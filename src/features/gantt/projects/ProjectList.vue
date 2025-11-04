<template>
  <div class="space-y-6 flex flex-col justify-center align-centers">

      <!-- Bouton + au-dessus de la liste -->
      <div class="pt-4 flex justify-center">
        <PlusCircleButton label="Nouveau projet" @click="openForm" />
      </div>

      <transition name="fade">
        <div class="pt-4 flex justify-center">
            <ProjectCreateForm v-if="formVisible"
            class="mt-4 max-w-xl"
            @cancel="cancelForm"
            @submit="handleCreate"
            />
        </div>
      </transition>

    <!-- 1) Etat vide -->
    <div v-if="items.length === 0" class="py-12">
      <EmptyState
        title="Aucun projet"
        subtitle="Crée ton premier projet pour commencer."
        icon="plus-circle"
      />
      <div class="mt-6 flex justify-center">
        <PlusCircleButton label="Nouveau projet" @click="openForm" />
      </div>

      <transition name="fade">
        <ProjectCreateForm v-if="formVisible"
          class="mt-6 max-w-xl mx-auto"
          @cancel="cancelForm"
          @submit="handleCreate"
        />
      </transition>
    </div>

    <!-- 2) Liste des projets -->
    <div v-else class="space-y-4 flex justify-center w-full xs:w-full">
      <ul class="list bg-base-100 rounded-box shadow-md w-full sm:w-full md:w-3/4 lg-w:1/3">
        <ProjectItem
          v-for="p in items"
          :key="p.id"
          :project="p"
          @click="openProject(p.id)"
          :class="projectItemClass"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProjects } from '@/stores/projects.store'
import EmptyState from '@/features/gantt/shared/EmptyState.vue'
import ProjectItem from '@/features/gantt/shared/ProjectItem.vue'
import PlusCircleButton from '@/features/gantt/shared/PlusCircleButton.vue'
import ProjectCreateForm from '@/features/gantt/projects/ProjectCreateForm.vue'

const router = useRouter()
const projects = useProjects()
const items = computed(() => projects.all)  // ← toujours un tableau
const formVisible = ref(false)
const projectItemClass = ref('project-item');
function openForm() { formVisible.value = true }
function cancelForm() { formVisible.value = false }

function handleCreate(payload: { name: string; start?: string; end?: string }) {
  const p = projects.create(payload.name) // crée l’id + createdAt
  // Optionnel: enregistrer l’horizon si fourni
  if (payload.start && payload.end) projects.updateHorizon(p.id, payload.start, payload.end)
  formVisible.value = false
  // Navigue vers l’éditeur du projet
  router.push({ name: 'projects', params: { id: p.id } })
}

function openProject(id: string) {
  router.push({ name: 'projects', params: { id } })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }
.project-item:hover{
  cursor: pointer;
  filter: brightness(0.92)
}
</style>
