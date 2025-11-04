// src/stores/useTasks.ts
import { defineStore } from 'pinia'
import type { Task, ID } from '@/types'

type TasksState = {
  items: Task[]
}

export const useTasks = defineStore('tasks', {
  state: (): TasksState => ({
    items: []
  }),
  getters: {
    byId: (s) => (id: ID) => s.items.find(t => t.id === id),
    byProject: (s) => (projectId: ID) => s.items.filter(t => t.projectId === projectId),
    childrenOf: (s) => (parentId: ID) => s.items.filter(t => t.parentId === parentId)
  },
  actions: {
    setAll(tasks: Task[]) { this.items = [...tasks] },
    add(task: Task) {
      if (this.items.some(t => t.id === task.id)) return
      this.items.push(task)
    },
    upsert(task: Task) {
      const i = this.items.findIndex(t => t.id === task.id)
      if (i >= 0) this.items[i] = task
      else this.items.push(task)
    },
    patch(id: ID, patch: Partial<Task>) {
      const i = this.items.findIndex(t => t.id === id)
      if (i >= 0) this.items[i] = { ...this.items[i], ...patch }
    },
    remove(id: ID) { this.items = this.items.filter(t => t.id !== id) },
    removeByProject(projectId: ID) { this.items = this.items.filter(t => t.projectId !== projectId) }
  }
})
