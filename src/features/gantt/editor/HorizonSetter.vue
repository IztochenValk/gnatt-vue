<template>
  <div class="join join-vertical lg:join-horizontal gap-2">
    <!-- Saisie des dates -->
    <div class="join">
      <input
        class="input input-bordered join-item"
        type="date"
        :value="localStart"
        @input="onStart(($event.target as HTMLInputElement).value)"
        placeholder="Début"
      />
      <input
        class="input input-bordered join-item"
        type="date"
        :value="localEnd"
        @input="onEnd(($event.target as HTMLInputElement).value)"
        placeholder="Fin"
      />
      <button
        class="btn btn-primary join-item"
        :disabled="!canSave"
        @click="save()"
        title="Appliquer l’horizon"
      >
        Appliquer
      </button>
    </div>

    <!-- Raccourcis -->
    <div class="join">
      <button class="btn join-item" @click="setThisMonth">Ce mois</button>
      <button class="btn join-item" @click="setThisQuarter">Ce trimestre</button>
      <button class="btn btn-ghost join-item" @click="clearAll" title="Effacer l’horizon">
        Effacer
      </button>
    </div>

    <!-- Alerte validation -->
    <div v-if="!isRangeValid" class="text-xs text-error">
      La date de début doit être antérieure ou égale à la date de fin.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  start?: string | null, // ISO YYYY-MM-DD
  end?: string | null
}>()

const emit = defineEmits<{
  (e: 'save', payload: { start?: string|null, end?: string|null }): void
  (e: 'clear'): void
}>()

// État local contrôlé (pour ne pas modifier le parent tant qu’on n’appuie pas sur "Appliquer")
const localStart = ref<string | null>(props.start ?? null)
const localEnd   = ref<string | null>(props.end ?? null)

// Garder en phase si le parent change (navigation de projet, etc.)
watch(() => props.start, v => { localStart.value = v ?? null })
watch(() => props.end,   v => { localEnd.value  = v ?? null })

const isRangeValid = computed(() => {
  if (!localStart.value || !localEnd.value) return true // champ(s) vide(s) = pas d’erreur bloquante
  return localStart.value <= localEnd.value
})

const canSave = computed(() => isRangeValid.value)

// Handlers
function onStart(v: string) { localStart.value = v || null }
function onEnd(v: string)   { localEnd.value = v || null }

function save() {
  if (!canSave.value) return
  emit('save', { start: localStart.value, end: localEnd.value })
}

function clearAll() {
  localStart.value = null
  localEnd.value = null
  emit('clear')
}

// Raccourcis
function setThisMonth() {
  const now = new Date()
  const start = toISO(new Date(now.getFullYear(), now.getMonth(), 1))
  const end   = toISO(new Date(now.getFullYear(), now.getMonth() + 1, 0))
  localStart.value = start
  localEnd.value = end
  save()
}

function setThisQuarter() {
  const now = new Date()
  const q = Math.floor(now.getMonth() / 3) // 0..3
  const start = new Date(now.getFullYear(), q * 3, 1)
  const end   = new Date(now.getFullYear(), q * 3 + 3, 0)
  localStart.value = toISO(start)
  localEnd.value = toISO(end)
  save()
}

function toISO(d: Date) {
  // YYYY-MM-DD en local (sans fuseau)
  const dt = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return dt.toISOString().slice(0, 10)
}
</script>
