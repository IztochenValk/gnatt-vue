<script setup lang="ts">
const props = defineProps<{ ticks: Tick[]; colWidth: number }>()
const todayIdx = (() => {
  const now = new Date(); now.setHours(0,0,0,0)
  return props.ticks.findIndex(t => t.date.getTime() === now.getTime())
})()
</script>

<template>
  <div v-if="todayIdx >= 0" class="absolute inset-y-0">
    <div class="w-px bg-error absolute"
         :style="{ left: `${todayIdx * colWidth}px` }"/>
  </div>
</template>
