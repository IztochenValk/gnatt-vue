import type { Scale, ID } from '@/types/gantt'

export type UiState = {
  scale: Scale
  selectedTaskId: ID | null
}

export type Theme = 'light' | 'dark' | 'system'

export type ModalState = {
  id: string
  isOpen: boolean
  payload?: unknown
}
