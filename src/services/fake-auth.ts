// src/services/fake-auth.ts
export type Credentials = { email: string; password: string }
export type FakeUser = { id: string; email: string; name: string; role?: 'viewer'|'editor'|'admin' }

const DEMO_USER: FakeUser = {
  id: 'u_1',
  email: 'demo@demo.dev',
  name: 'Demo User',
  role: 'editor'
}

export async function fakeLogin({ email, password }: Credentials) {
  await new Promise(r => setTimeout(r, 500)) // latence fictive
  // Règle: accepte le couple ci-dessous. Sinon erreur 401.
  if (email === 'demo@demo.dev' && password === 'demo123') {
    return { token: 'dev-token-xyz', user: DEMO_USER }
  }
  const err = new Error('Invalid credentials')
  // on met un code pour différencier si besoin
  // @ts-expect-error
  err.status = 401
  throw err
}

export async function fakeMe(token?: string) {
  await new Promise(r => setTimeout(r, 300))
  if (token === 'dev-token-xyz') return DEMO_USER
  const err = new Error('Unauthorized')
  // @ts-expect-error
  err.status = 401
  throw err
}
