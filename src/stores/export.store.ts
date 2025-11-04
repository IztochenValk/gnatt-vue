import { defineStore } from 'pinia'
import type { Scale } from '@/types/gantt'

type State = {
  filenameBase: string
  includeGrid: boolean
  includeLinks: boolean
  theme: 'light' | 'dark'
  scale: Scale
  dpi: number
  marginPx: number
}

export const useExportStore = defineStore('export', {
  state: (): State => ({
    filenameBase: 'gantt',
    includeGrid: true,
    includeLinks: true,
    theme: 'light',
    scale: 'week',
    dpi: 192,
    marginPx: 24
  }),
  actions: {
    set<K extends keyof State>(k: K, v: State[K]) { this[k] = v }
  },
  persist: true
})
