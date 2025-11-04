// src/stores/auth.store.ts
import { defineStore } from 'pinia'
import type { User } from '@/types/user'
import { fakeLogin, fakeMe } from '@/services/fake-auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: '', user: null as User | null }),
  getters: { isAuthenticated: (s) => !!s.token },
  actions: {
    async login(email: string, password: string) {
      const { token, user } = await fakeLogin({ email, password })
      this.token = token
      this.user = user
    },
    async fetchMe() {
      if (!this.token) return
      this.user = await fakeMe(this.token)
    },
    logout() { this.token = ''; this.user = null }
  },
  persist: true
})
