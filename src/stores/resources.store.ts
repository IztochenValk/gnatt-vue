// src/stores/useResources.ts
import { defineStore } from 'pinia'
import type { Resource, ID } from '@/types'

type ResourcesState = {
  items: Resource[]
}

export const useResources = defineStore('resources', {
  state: (): ResourcesState => ({
    items: []
  }),
  getters: {
    byId: (s) => (id: ID) => s.items.find(r => r.id === id),
    all: (s) => s.items
  },
  actions: {
    setAll(resources: Resource[]) { this.items = [...resources] },
    add(resource: Resource) {
      if (this.items.some(r => r.id === resource.id)) return
      this.items.push(resource)
    },
    upsert(resource: Resource) {
      const i = this.items.findIndex(r => r.id === resource.id)
      if (i >= 0) this.items[i] = resource
      else this.items.push(resource)
    },
    remove(id: ID) { this.items = this.items.filter(r => r.id !== id) }
  }
})
