<script setup lang="ts">
import { ref } from 'vue'
import HeaderLayer from './layers/HeaderLayer.vue'
import GridLayer from './layers/GridLayer.vue'
import RowsLayer from './layers/RowsLayer.vue'
import BarsLayer from './layers/BarsLayer.vue'
import TodayMarkerLayer from './layers/TodayMarkerLayer.vue'

const props = defineProps<{
  ticks: Tick[]
  tasks: TaskView[]
  colWidth: number
  rowHeight?: number
}>()

const rowH = props.rowHeight ?? 40
const gridTemplateColumns = `repeat(${props.ticks.length}, ${props.colWidth}px)`

const headerRef = ref<HTMLDivElement|null>(null)
const bodyRef   = ref<HTMLDivElement|null>(null)

function onScroll() {
  if (headerRef.value && bodyRef.value) {
    headerRef.value.scrollLeft = bodyRef.value.scrollLeft
  }
}
</script>

<template>
  <div class="w-full border rounded-xl bg-base-100 overflow-hidden">
    <!-- Header sticky -->
    <div class="border-b bg-base-200">
      <div ref="headerRef" class="overflow-x-hidden">
        <HeaderLayer :ticks="ticks" :gridTemplateColumns="gridTemplateColumns"/>
      </div>
    </div>

    <!-- Body scrollable -->
    <div ref="bodyRef" class="relative overflow-auto h-[480px]" @scroll="onScroll">
      <div class="min-w-max relative">
        <GridLayer :ticks="ticks" :gridTemplateColumns="gridTemplateColumns"/>
        <RowsLayer :count="tasks.length" :rowHeight="rowH"/>
        <BarsLayer :ticks="ticks" :tasks="tasks" :colWidth="colWidth" :rowHeight="rowH"/>
        <TodayMarkerLayer :ticks="ticks" :colWidth="colWidth"/>
        <div :style="{ height: `${Math.max(tasks.length,1)*rowH}px` }"></div>
      </div>
    </div>
  </div>
</template>
