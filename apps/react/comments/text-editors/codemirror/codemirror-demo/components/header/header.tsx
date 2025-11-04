'use client';
import VeltTools from '@/components/velt/VeltTools';

export default function Header() {
  return (
    <div className="flex items-center justify-between gap-4 p-4 border-b bg-gradient-to-r from-purple-600 to-purple-800 text-white">
      <h1 className="text-xl font-semibold">CodeMirror CRDT Demo</h1>
      <div className="flex items-center gap-2">
        <VeltTools />
      </div>
    </div>
  )
}
