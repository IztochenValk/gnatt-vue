<!-- src/features/gantt/projects/ProjectCreateForm.vue -->
<template>
  <form class="bg-base-200 p-4 rounded-lg shadow space-y-4" @submit.prevent="submit">
    <input
      v-model.trim="name"
      type="text"
      placeholder="Nom du projet"
      class="input input-bordered w-full"
      required
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <label class="form-control">
        <span class="label-text">Début (optionnel)</span>
        <input v-model="start" type="date" class="input input-bordered" />
      </label>
      <label class="form-control">
        <span class="label-text">Fin (optionnel)</span>
        <input v-model="end" type="date" class="input input-bordered" />
      </label>
    </div>

    <div class="flex justify-end gap-2">
      <button type="button" class="btn btn-ghost" @click="$emit('cancel')">Annuler</button>
      <button type="submit" class="btn btn-primary">Créer</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'submit', payload: { name: string; start?: string; end?: string }): void
  (e: 'cancel'): void
}>()

const name = ref('')
const start = ref<string | undefined>(undefined)
const end = ref<string | undefined>(undefined)

function submit() {
  emit('submit', { name: name.value, start: start.value, end: end.value })
  name.value = ''
  start.value = undefined
  end.value = undefined
}
</script>
