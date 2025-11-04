<template>
  <div class="flex items-center gap-2">
    <button class="btn btn-ghost" @click="$emit('set-horizon-this-month')">
      Horizon = ce mois
    </button>

    <div class="dropdown dropdown-end">
      <button class="btn btn-accent">Exporter</button>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-56 mt-2">
        <li><a @click="$emit('export', 'png')">PNG</a></li>
        <li><a @click="$emit('export', 'pdf')">PDF</a></li>
        <li><a @click="$emit('export', 'html')">HTML</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'set-horizon-this-month'): void
  (e: 'export', format: 'png'|'pdf'|'html'): void
}>()
</script>
