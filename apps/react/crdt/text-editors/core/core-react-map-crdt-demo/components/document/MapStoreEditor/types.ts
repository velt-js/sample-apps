export interface StoreItem {
  id: string
  name: string
}

export interface StoreSection {
  header: string
  items: string[]
}

export interface FocusEntry {
  name: string
  color: string
  entryKey: string | null
  timestamp: number
}

export interface FocusMap {
  [userId: string]: FocusEntry
}
