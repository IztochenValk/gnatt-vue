<script setup lang="ts">
const props = defineProps<{ ticks: Tick[]; tasks: TaskView[]; colWidth: number; rowHeight: number }>()
const dateToIndex = (d: Date) => {
  // naïf: on cherche le premier tick >= d
  const i = props.ticks.findIndex(t => t.date.getTime() >= d.getTime())
  return i < 0 ? props.ticks.length - 1 : i
}
</script>

<template>
  <div class="absolute inset-0">
    <div v-for="t in tasks" :key="t.id"
         class="absolute rounded bg-primary/70 hover:bg-primary"
         :style="{
            left: `${dateToIndex(t.start) * colWidth}px`,
            width: `${(dateToIndex(t.end) - dateToIndex(t.start) + 1) * colWidth}px`,
            top: `${t.row * rowHeight}px`,
            height: `${rowHeight - 8}px`
         }"/>
  </div>
</template>
