// src/stores/useCalendars.ts
import { defineStore } from 'pinia'
import type { WorkCalendar, ID } from '@/types'

type CalendarsState = {
  items: WorkCalendar[]
}

export const useCalendars = defineStore('calendars', {
  state: (): CalendarsState => ({
    items: []
  }),
  getters: {
    byId: (s) => (id: ID) => s.items.find(c => c.id === id),
    all: (s) => s.items
  },
  actions: {
    setAll(calendars: WorkCalendar[]) { this.items = [...calendars] },
    add(calendar: WorkCalendar) {
      if (this.items.some(c => c.id === calendar.id)) return
      this.items.push(calendar)
    },
    upsert(calendar: WorkCalendar) {
      const i = this.items.findIndex(c => c.id === calendar.id)
      if (i >= 0) this.items[i] = calendar
      else this.items.push(calendar)
    },
    remove(id: ID) { this.items = this.items.filter(c => c.id !== id) }
  }
})
