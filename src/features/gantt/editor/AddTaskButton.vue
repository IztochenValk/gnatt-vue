<template>
  <button
    class="btn btn-primary btn-sm"
    :disabled="disabled"
    @click="$emit('create')"
  >
    <slot>+ Tâche</slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{ disabled?: boolean }>()
defineEmits<{ (e:'create'): void }>()
</script>
