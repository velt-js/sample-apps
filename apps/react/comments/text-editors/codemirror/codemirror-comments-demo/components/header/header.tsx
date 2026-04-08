import { ThemeToggle } from '../theme/ThemeToggle'
import VeltTools from '../velt/VeltTools'

export default function Header() {
  return (
    <div className="absolute top-[6.5px] right-[8.22px] flex items-center gap-[6px] z-50">
      <ThemeToggle />
      <VeltTools />
    </div>
  )
}
