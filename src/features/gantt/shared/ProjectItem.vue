<template>
  <li class="list-row items-center gap-3">
    <!-- Thumbnail / Icon -->
    <div>
      <img
        class="size-10 rounded-box"
        :src="project.thumbnail || 'https://img.daisyui.com/images/profile/demo/1@94.webp'"
        alt="Project thumbnail"
      />
    </div>

    <!-- Main content -->
    <div class="flex flex-col flex-1">
      <div class="font-medium">{{ project.name }}</div>
      <div class="text-xs uppercase font-semibold opacity-60">
        {{ project.startDate }} → {{ project.endDate }}
      </div>
      <div class="text-xs opacity-60 mt-1 line-clamp-2">
        {{ project.description }}
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1">
      <!-- Open button -->
      <button class="btn btn-square btn-ghost" @click="$emit('open', project.id)">
        <svg
          class="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            fill="none"
            stroke="currentColor"
          >
            <path d="M6 3L20 12 6 21 6 3z"></path>
          </g>
        </svg>
      </button>

      <!-- Favorite / Archive -->
      <button class="btn btn-square btn-ghost" @click="$emit('archive', project.id)">
        <svg
          class="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            />
          </g>
        </svg>
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  project: {
    id: string
    name: string
    description?: string
    startDate?: string
    endDate?: string
    thumbnail?: string
  }
}>()

defineEmits(['open', 'archive'])
</script>
