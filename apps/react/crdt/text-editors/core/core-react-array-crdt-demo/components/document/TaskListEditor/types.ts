export type TaskStatus = 'open' | 'in-progress' | 'resolved'

export interface Task {
  id: string
  title: string
  status: TaskStatus
  description: string
  createdAt: number
  commentCount: number
}

export interface TeamList {
  id: string
  name: string
}

export interface TeamSection {
  header: string
  items: string[]
}

export interface FocusEntry {
  name: string
  color: string
  taskId: string | null
  timestamp: number
}

export interface FocusMap {
  [userId: string]: FocusEntry
}
