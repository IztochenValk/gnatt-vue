// src/stores/projects.store.ts
import { defineStore } from 'pinia'
import type { ID, Project } from '@/types/gantt'

type State = {
  items: Project[]
  currentId?: ID
}

export const useProjects = defineStore('projects', {
  state: (): State => ({ items: [], currentId: undefined }),
  getters: {
    all: (s) => s.items.filter(p => !p.archived),
    byId: (s) => (id: ID) => s.items.find(p => p.id === id),
    current: (s): Project | undefined =>
      s.currentId ? s.items.find(p => p.id === s.currentId) : undefined
  },
  actions: {
    setAll(list: Project[]) { this.items = [...list] },
    add(p: Project) { if (!this.items.some(x => x.id === p.id)) this.items.push(p) },
    upsert(p: Project) {
      const i = this.items.findIndex(x => x.id === p.id)
      if (i >= 0) this.items[i] = p; else this.items.push(p)
    },
    remove(id: ID) { this.items = this.items.filter(p => p.id !== id) },
    setCurrent(id?: ID) { this.currentId = id },

    create(name: string): Project {
      const id = crypto.randomUUID()
      const p: Project = { id, name, createdAt: new Date().toISOString() }
      this.items.push(p)
      this.currentId = id
      return p
    },
    archive(id: ID) {
      const p = this.byId(id)
      if (p) this.upsert({ ...p, archived: true })
    },
    updateHorizon(id: ID, start: string, end: string) {
    const p = this.byId(id)
    if (!p) return
    this.upsert({ ...p, start, end })
    }

  },
  persist: true
})
