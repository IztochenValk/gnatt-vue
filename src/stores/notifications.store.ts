import { defineStore } from 'pinia'

import { Toast } from '@/types/notifications'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({ toasts: [] as Toast[] }),
  actions: {
    push(t: Toast) { this.toasts.push(t) },
    remove(id: string) { this.toasts = this.toasts.filter(x => x.id !== id) },
    clear() { this.toasts = [] }
  }
})
