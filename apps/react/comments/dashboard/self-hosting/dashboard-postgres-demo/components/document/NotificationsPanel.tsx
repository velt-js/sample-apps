import { useVeltClient, VeltNotificationsPanel } from "@veltdev/react"

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
  if (!isOpen) return null

  const { client } = useVeltClient();

  const onNotificationClick = (notification: any) => {
    console.log(notification)
    const commentElement = client?.getCommentElement();
    if (commentElement) {
      commentElement.openCommentSidebar();
      commentElement.selectCommentByAnnotationId(notification.targetAnnotationId);
      onClose();
    }
  }

  return (
    <>
      {/* Invisible backdrop for click-outside-to-close */}
      <div 
        className="oe-notifications-backdrop"
        onClick={onClose}
      />
      {/* Panel overlay */}
      <div className="oe-notifications-panel-container">
        <VeltNotificationsPanel shadowDom={false} readNotificationsOnForYouTab={true} onNotificationClick={onNotificationClick} />
      </div>
    </>
  )
}
