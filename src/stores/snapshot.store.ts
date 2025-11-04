import { defineStore } from 'pinia'

type Snapshot<T = any> = { id: string; at: string; diff: T }

type State = {
  undoStack: Snapshot[]
  redoStack: Snapshot[]
  max: number
}

export const useSnapshotsStore = defineStore('snapshots', {
  state: (): State => ({ undoStack: [], redoStack: [], max: 50 }),
  actions: {
    push(s: Snapshot) {
      this.undoStack.push(s)
      if (this.undoStack.length > this.max) this.undoStack.shift()
      this.redoStack = []
    },
    undo(): Snapshot | undefined {
      const s = this.undoStack.pop()
      if (s) this.redoStack.push(s)
      return s
    },
    redo(): Snapshot | undefined {
      const s = this.redoStack.pop()
      if (s) this.undoStack.push(s)
      return s
    },
    clear() { this.undoStack = []; this.redoStack = [] }
  }
})
