<!-- src/views/LoginView.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

async function submit() {
  error.value = null
  loading.value = true
  try {
    await auth.login(email.value.trim(), password.value)
    const redirect = (route.query.redirect as string) || '/app'
    router.replace(redirect)
  } catch (e: any) {
    error.value = e?.response?.data?.error || 'Identifiants invalides'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Connexion</h2>

        <form class="space-y-4" @submit.prevent="submit">
          <div class="form-control">
            <label class="label"><span class="label-text">Email</span></label>
            <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="form-control">
            <label class="label"><span class="label-text">Mot de passe</span></label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="input input-bordered w-full"
              required
              minlength="6"
            />
          </div>

          <div v-if="error" class="alert alert-error text-sm">
            <span>{{ error }}</span>
          </div>

          <div class="form-control mt-6">
            <button class="btn btn-primary" :disabled="loading">
              <span v-if="loading" class="loading loading-spinner loading-sm mr-2" />
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
