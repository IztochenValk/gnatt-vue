<template>
  <div class="dropdown dropdown-end">
    <button class="btn btn-primary btn-sm">+ Tâche</button>
    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44 mt-2">
      <li><a @click="$emit('create', { days: 3 })">+ 3 jours</a></li>
      <li><a @click="$emit('create', { days: 7 })">+ 1 semaine</a></li>
      <li><a @click="$emit('create', { days: 14 })">+ 2 semaines</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ (e:'create', payload: { days: number }): void }>()
</script>
