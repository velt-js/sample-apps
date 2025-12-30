import { useVeltClient, VeltNotificationsPanel } from "@veltdev/react"

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
  onNotificationClick: (notification: any) => void
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
    }
  }

  return (
    <>
      {/* Invisible backdrop for click-outside-to-close */}
      <div 
        className="fixed inset-0 z-40"
        style={{ left: '240px' }}
        onClick={onClose}
      />
      {/* Panel overlay */}
      <div 
        className="fixed top-[45px] bottom-0 w-[392px] bg-white z-50 border-r border-gray-200"
        style={{ left: '240px' }}
      >
        <VeltNotificationsPanel shadowDom={false} readNotificationsOnForYouTab={true} onNotificationClick={onNotificationClick} />
      </div>
    </>
  )
}

