<template>
  <div class="join">
    <button
      class="btn join-item"
      :class="{ 'btn-active': modelValue === 'day' }"
      @click="$emit('update:modelValue', 'day')"
    >Jour</button>

    <button
      class="btn join-item"
      :class="{ 'btn-active': modelValue === 'week' }"
      @click="$emit('update:modelValue', 'week')"
    >Semaine</button>

    <button
      class="btn join-item"
      :class="{ 'btn-active': modelValue === 'month' }"
      @click="$emit('update:modelValue', 'month')"
    >Mois</button>
  </div>
</template>

<script setup lang="ts">
import type { Scale } from '@/types/gantt'

type Props = { modelValue: Scale }
defineProps<Props>()
defineEmits<{ (e: 'update:modelValue', v: Scale): void }>()
</script>
