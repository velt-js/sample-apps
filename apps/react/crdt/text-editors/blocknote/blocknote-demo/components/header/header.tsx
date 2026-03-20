import { VeltLogo } from '@/components/velt-logo';
import VeltTools from '@/components/velt/VeltTools';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export default function Header() {
  return (
    <div className="flex items-center justify-between gap-2 p-2 border-b bg-background">
      <div className="flex items-center gap-2">
        <VeltLogo />
        <h1 className="text-lg font-semibold">Velt BlockNote Demo</h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <VeltTools />
      </div>
    </div>
  )
}
