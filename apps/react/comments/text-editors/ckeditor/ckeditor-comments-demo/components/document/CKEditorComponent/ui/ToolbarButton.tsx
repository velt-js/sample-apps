import type { ToolbarButtonProps } from '../types'

export function ToolbarButton({ icon, alt, onMouseDown, active }: ToolbarButtonProps) {
  return (
    <button
      aria-label={alt}
      className="box-border content-stretch flex items-center p-[8px] relative rounded-[12px] shrink-0 cursor-pointer transition-all"
      onMouseDown={onMouseDown}
      style={{
        backgroundColor: active ? 'var(--app-text-primary)' : undefined,
      }}
      title={alt}
      type="button"
    >
      <span className="relative shrink-0 size-[20px] transition-all">
        <img
          alt=""
          className="block max-w-none size-full"
          src={icon}
          style={{
            filter: active ? 'var(--app-icon-invert)' : 'var(--app-icon-active-invert)',
            opacity: active ? 1 : 0.7,
          }}
        />
      </span>
    </button>
  )
}
