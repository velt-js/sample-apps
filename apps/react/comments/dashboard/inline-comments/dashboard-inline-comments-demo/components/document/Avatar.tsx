interface AvatarProps {
  initials: string
  color: string
  size?: number
  hasIndicator?: boolean
}

export const Avatar = ({ initials, color, size = 24, hasIndicator = false }: AvatarProps) => (
  <div className="relative inline-flex">
    <div
      className="rounded-full flex items-center justify-center text-white font-medium"
      style={{ backgroundColor: color, width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
    {hasIndicator && (
      <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-background"></span>
    )}
  </div>
)
