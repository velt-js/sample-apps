import { StoreItem, StoreSection } from './types'

export const STORE_ID = 'core-crdt-map-store-1'

export const CURSOR_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2']

export const storeItems: StoreItem[] = [
  { id: 'image-store', name: 'Image Store' },
  { id: 'design-tasks', name: 'Design Tasks' },
  { id: 'agency-tasks', name: 'Agency Tasks' },
  { id: 'devshop-tasks', name: 'Dev Shop Tasks' },
]

export const storeSections: StoreSection[] = [
  { header: 'Your Stores', items: ['image-store', 'design-tasks'] },
  { header: 'External', items: ['agency-tasks', 'devshop-tasks'] },
]

export const initialMapData: Record<string, string> = {
  'Main Logo': 'logo.png',
  'Hero Banner': 'hero-banner.jpg',
  'App Icon': 'app-icon.svg',
}
