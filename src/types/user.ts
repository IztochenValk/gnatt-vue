// src/types/user.ts
export type UserRole = 'viewer' | 'editor' | 'admin'

export type User = {
  id: string
  email: string
  name?: string
  role?: UserRole
}
export type LoginPayload = { email: string; password: string };
export type LoginResponse = { token: string; user: User };
