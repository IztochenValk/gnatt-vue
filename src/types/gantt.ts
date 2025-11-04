export type ID = string
export type Scale = 'day' | 'week' | 'month'

export type Project = {
  id: ID
  name: string
  createdAt: string
  start?: string    // ISO – début de l’horizon
  end?: string      // ISO – fin de l’horizon
  archived?: boolean
}

export type Task = {
  id: ID
  projectId: ID
  title: string
  start: string    // ISO
  end: string      // ISO
  progress: number // 0..100
  parentId?: ID
  resources?: ID[]
  tags?: string[]
}

export type Link = {
  id: ID
  projectId: ID
  sourceId: ID
  targetId: ID
  type: 'FS' | 'SS' | 'FF' | 'SF'
  lagDays?: number
}

export type Resource = {
  id: ID
  name: string
  capacityPerDay: number
  calendarId?: ID
}

export type WorkCalendar = {
  id: ID
  name: string
  workingDays: number[] // 1..7, 1 = lundi
  exceptions: string[]  // ISO non ouvrées
  holidays: string[]    // ISO non ouvrées
}
