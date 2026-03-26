export interface MindMapNode {
  id: string
  text: string
  children: MindMapNode[]
}

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
  nodeId: string | null
  timestamp: number
}

export interface FocusMap {
  [userId: string]: FocusEntry
}
