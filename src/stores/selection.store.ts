import { defineStore } from 'pinia'
import type { ID } from '@/types/gantt'

type State = { taskIds: ID[]; anchorTaskId?: ID }

export const useSelectionStore = defineStore('selection', {
  state: (): State => ({ taskIds: [] }),
  getters: {
    isSelected: (s) => (id: ID) => s.taskIds.includes(id)
  },
  actions: {
    selectOne(id: ID) { this.taskIds = [id] },
    toggle(id: ID) {
      this.taskIds = this.taskIds.includes(id)
        ? this.taskIds.filter(x => x !== id)
        : [...this.taskIds, id]
    },
    selectMany(ids: ID[]) { this.taskIds = Array.from(new Set(ids)) },
    clear() { this.taskIds = [] }
  }
})
