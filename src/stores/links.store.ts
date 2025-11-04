// src/stores/useLinks.ts
import { defineStore } from 'pinia'
import type { Link, ID } from '@/types'

type LinksState = {
  items: Link[]
}

export const useLinks = defineStore('links', {
  state: (): LinksState => ({
    items: []
  }),
  getters: {
    byProject: (s) => (projectId: ID) => s.items.filter(l => l.projectId === projectId),
    predecessorsOf: (s) => (taskId: ID) => s.items.filter(l => l.targetId === taskId),
    successorsOf: (s) => (taskId: ID) => s.items.filter(l => l.sourceId === taskId)
  },
  actions: {
    setAll(links: Link[]) { this.items = [...links] },
    add(link: Link) {
      if (this.items.some(l => l.id === link.id)) return
      this.items.push(link)
    },
    upsert(link: Link) {
      const i = this.items.findIndex(l => l.id === link.id)
      if (i >= 0) this.items[i] = link
      else this.items.push(link)
    },
    remove(id: ID) { this.items = this.items.filter(l => l.id !== id) },
    removeByProject(projectId: ID) { this.items = this.items.filter(l => l.projectId !== projectId) },
    removeAroundTask(taskId: ID) {
      this.items = this.items.filter(l => l.sourceId !== taskId && l.targetId !== taskId)
    }
  }
})
