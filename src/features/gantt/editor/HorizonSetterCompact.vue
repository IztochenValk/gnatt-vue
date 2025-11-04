<script setup lang="ts">
import { ref, computed, watch } from 'vue'

type Props = {
  start: string | null | undefined
  end: string | null | undefined
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'save', payload: { start?: string | null; end?: string | null }): void
  (e: 'clear'): void
}>()

const localStart = ref<string | ''>(props.start ?? '')
const localEnd = ref<string | ''>(props.end ?? '')

watch(
  () => props.start,
  v => { localStart.value = v ?? '' }
)
watch(
  () => props.end,
  v => { localEnd.value = v ?? '' }
)

const formatted = computed(() => {
  const s = localStart.value || 'début'
  const e = localEnd.value || 'fin'
  return `${s} → ${e}`
})

function save() {
  emit('save', {
    start: localStart.value || null,
    end: localEnd.value || null
  })
}

function clearAll() {
  localStart.value = ''
  localEnd.value = ''
  emit('clear')
}
</script>

<template>
  <div class="dropdown dropdown-end">
    <!-- Trigger bouton icône -->
    <button
      class="btn btn-ghost btn-sm"
      tabindex="0"
      aria-label="Définir l'horizon"
      title="Définir l'horizon"
    >
      <!-- Icône calendrier minimaliste -->
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
           viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      <span class="hidden sm:inline text-xs opacity-70">{{ formatted }}</span>
    </button>

    <!-- Popover -->
    <div tabindex="0" class="dropdown-content z-[1] p-4 card bg-base-100 shadow w-80">
      <div class="card-body gap-3">
        <h3 class="card-title text-base">Horizon du projet</h3>

        <label class="form-control w-full">
          <span class="label-text">Début</span>
          <input
            type="date"
            class="input input-bordered input-sm w-full"
            v-model="localStart"
          />
        </label>

        <label class="form-control w-full">
          <span class="label-text">Fin</span>
          <input
            type="date"
            class="input input-bordered input-sm w-full"
            v-model="localEnd"
          />
        </label>

        <div class="flex flex-col items-center justify-center pt-1">
          <div class="text-xs opacity-70 text-nowrap pb-3">
            {{ formatted }}
          </div>          
          <div class="flex gap-2">
            <button class="btn btn-ghost btn-sm" @click="clearAll">Réinitialiser</button>
            <button class="btn btn-primary btn-sm" @click="save">Appliquer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
