<!-- EmptyState.vue -->
<template>
  <div class="text-center space-y-2">
    <div v-if="icon" class="text-3xl">★</div> <!-- ou ton SVG inline -->
    <h2 class="text-lg font-semibold">{{ title }}</h2>
    <p class="opacity-70">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ title: string; subtitle?: string; icon?: string }>()
</script>
