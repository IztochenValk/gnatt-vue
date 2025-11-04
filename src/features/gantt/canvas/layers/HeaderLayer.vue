<script setup lang="ts">
const props = defineProps<{ ticks: Tick[]; gridTemplateColumns: string }>()
</script>

<template>
  <div class="min-w-max grid select-none" :style="{ gridTemplateColumns }">
    <div v-for="t in ticks" :key="t.index" class="px-2 py-2 text-xs text-base-content/70 border-l first:border-l-0">
      {{ t.label }}
    </div>
  </div>
</template>
