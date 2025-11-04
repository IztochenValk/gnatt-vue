<template>
  <div class="p-8 space-y-8">
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-2xl font-semibold">Mes diagrammes Gantt</h1>
    </div>
    <ProjectList />
  </div>
</template>

<script setup lang="ts">
import ProjectList from '@/features/gantt/projects/ProjectList.vue'
</script>
