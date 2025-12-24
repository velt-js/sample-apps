import { VeltNotificationsPanel } from "@veltdev/react"

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
  if (!isOpen) return null

  return (
    <div className="h-full">
      <VeltNotificationsPanel shadowDom={false}/>
    </div>
  )
}

