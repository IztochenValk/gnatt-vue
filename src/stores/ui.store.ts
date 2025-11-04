// src/stores/useUi.ts
import { defineStore } from 'pinia'
import type { Scale, ID } from '@/types'

import {UiState} from '@/types/ui'

export const useUi = defineStore('ui', {
  state: (): UiState => ({
    scale: 'week',
    selectedTaskId: null
  }),
  actions: {
    setScale(scale: Scale) { this.scale = scale },
    selectTask(id: ID | null) { this.selectedTaskId = id }
  }
})
