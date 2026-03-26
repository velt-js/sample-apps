'use client'

import { useState } from 'react'
import { storeItems, storeSections } from './constants'
import { SearchIcon, SchemaIcon, CollapseIcon } from './icons'

interface MindMapSidebarProps {
  selectedStoreId: string
  onSelectStore: (storeId: string) => void
  userName: string
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export default function MindMapSidebar({
  selectedStoreId,
  onSelectStore,
  userName,
  isCollapsed,
  onToggleCollapse,
}: MindMapSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const userInitial = userName.charAt(0).toUpperCase()

  if (isCollapsed) {
    return (
      <div className="h-full flex flex-col items-center py-3" style={{ width: 48, backgroundColor: 'var(--task-sidebar-bg)' }}>
        <button onClick={onToggleCollapse} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" style={{ transform: 'rotate(180deg)' }}>
          <CollapseIcon size={16} color="var(--task-text)" />
        </button>
      </div>
    )
  }

  const filteredSections = storeSections.map(s => ({
    ...s,
    items: s.items.filter(id => {
      const item = storeItems.find(si => si.id === id)
      return item?.name.toLowerCase().includes(searchQuery.toLowerCase())
    }),
  })).filter(s => s.items.length > 0)

  return (
    <div className="h-full flex flex-col justify-between shrink-0" style={{ width: 251, backgroundColor: 'var(--task-sidebar-bg)' }}>
      <div className="flex flex-col gap-2 p-3">
        <div className="flex items-center gap-2 px-2 h-8 rounded-lg" style={{ border: '1px solid var(--task-border)' }}>
          <SearchIcon size={16} color="var(--task-text)" />
          <input className="flex-1 bg-transparent border-none outline-none text-xs" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-text)' }} placeholder="Search Lists" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        {filteredSections.map(section => (
          <div key={section.header} className="flex flex-col gap-0.5">
            <div className="px-2 py-2 text-xs rounded-lg" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--task-text)' }}>{section.header}</div>
            {section.items.map(itemId => {
              const item = storeItems.find(s => s.id === itemId)!
              const isSelected = itemId === selectedStoreId
              return (
                <button key={itemId} className="flex items-center gap-2 px-2 h-8 rounded-lg text-left transition-colors" style={{ backgroundColor: isSelected ? 'rgb(1,108,221)' : 'transparent' }} onClick={() => onSelectStore(itemId)}>
                  <SchemaIcon size={16} color={isSelected ? 'rgb(254,255,255)' : 'var(--task-text)'} />
                  <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: isSelected ? 'rgb(254,255,255)' : 'var(--task-text)' }}>{item.name}</span>
                </button>
              )
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-4 py-3" style={{ height: 48 }}>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded" style={{ width: 16, height: 16, backgroundColor: 'rgb(245,93,103)' }}>
            <span className="text-center font-bold" style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 11, color: 'var(--task-text)' }}>{userInitial}</span>
          </div>
          <span style={{ fontFamily: 'Urbanist, sans-serif', fontSize: 14, color: 'var(--task-text)' }}>Todo</span>
        </div>
        <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition-colors" onClick={onToggleCollapse}>
          <CollapseIcon size={16} color="var(--task-text)" />
        </button>
      </div>
    </div>
  )
}
