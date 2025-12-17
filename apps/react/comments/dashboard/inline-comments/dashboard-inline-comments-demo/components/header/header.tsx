'use client'

import VeltTools from '@/components/velt/VeltTools'

export default function Header() {
  return (
    <div className="flex items-center justify-between gap-2 p-2 px-4 border-b bg-background">
      <h1 className="text-lg font-semibold">OpenEnvoy</h1>
      <div className="flex items-center gap-3">
        <VeltTools />
      </div>
    </div>
  )
}
