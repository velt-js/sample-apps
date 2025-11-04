import { VeltLogo } from '@/components/velt-logo';

export default function Header() {
  return (
    <div className="flex items-center gap-2 p-2 border-b bg-background">
      <VeltLogo />
      <h1 className="text-lg font-semibold">Velt BlockNote Demo</h1>
      {/* Add Velt components here: notifications, user presence, etc. */}
    </div>
  )
}
