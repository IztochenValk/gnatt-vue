import { defineStore } from 'pinia'

type PendingOp = { id: string; type: string; payload: any }

type State = {
  online: boolean
  queue: PendingOp[]
  syncing: boolean
  lastSyncAt?: string
  error?: string
}

export const useSyncStore = defineStore('sync', {
  state: (): State => ({ online: true, queue: [], syncing: false }),
  actions: {
    enqueue(op: PendingOp) { this.queue.push(op) },
    setOnline(v: boolean) { this.online = v },
    beginSync() { this.syncing = true; this.error = undefined },
    endSync(ok = true, msg?: string) {
      this.syncing = false
      if (ok) this.lastSyncAt = new Date().toISOString()
      else this.error = msg || 'sync failed'
    },
    flushQueue() { this.queue = [] }
  },
  persist: true
})
