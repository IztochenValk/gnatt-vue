<script setup lang="ts">
const props = defineProps<{ count: number; rowHeight: number }>()
</script>

<template>
  <div class="absolute inset-0 pointer-events-none">
    <div v-for="r in props.count" :key="r"
         class="absolute left-0 right-0 border-b"
         :style="{ top: `${(r-1)*props.rowHeight}px`, height:`${props.rowHeight}px` }"/>
  </div>
</template>
