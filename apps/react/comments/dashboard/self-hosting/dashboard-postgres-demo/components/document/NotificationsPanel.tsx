import { useVeltClient, VeltNotificationsPanel } from "@veltdev/react"
import { useEffect } from "react"

interface NotificationsPanelProps {
    isOpen: boolean
    onClose: () => void
}

export const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
    // All hooks must be called unconditionally - before any early returns
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

    useEffect(() => {
        if (client) {
            const notificationElement = client?.getNotificationElement();
            if (notificationElement) {
                notificationElement.setSettingsInitialConfig([
                    {
                        name: 'In-app',
                        id: 'in-app',
                        default: 'MINE',
                        enable: true,
                        values: [
                            {
                                name: 'Replies & @mentions',
                                id: 'MINE',
                            },
                            {
                                name: 'All comments',
                                id: 'ALL',
                            },
                            {
                                name: 'All job notifications',
                                id: 'ALL_JOB_NOTIFICATIONS',
                            }
                        ]
                    },
                    {
                        name: 'Email',
                        id: 'email',
                        default: 'ONLY_REQUIRED_WORKSPACE_EMAILS',
                        enable: true,
                        values: [
                            {
                                name: 'Replies & @mentions',
                                id: 'MINE',
                            },
                            {
                                name: 'All comments',
                                id: 'ALL',
                            },
                            {
                                name: 'All job notifications',
                                id: 'ALL_JOB_NOTIFICATIONS',
                            },
                            {
                                name: 'Only required workspace emails',
                                id: 'ONLY_REQUIRED_WORKSPACE_EMAILS',
                            }
                        ]
                    },
                ]);
            }
        }
    }, [client])

    // Conditionally render JSX, but hooks are always called
    if (!isOpen) return null

    return (
        <>
            {/* Invisible backdrop for click-outside-to-close */}
            <div
                className="oe-notifications-backdrop"
                onClick={onClose}
            />
            {/* Panel overlay */}
            <div className="oe-notifications-panel-container">
                <VeltNotificationsPanel
                    shadowDom={false}
                    readNotificationsOnForYouTab={true}
                    onNotificationClick={onNotificationClick}
                    settings={true}
                    tabConfig={{
                        forYou: {
                            enable: true,
                            name: 'For you',
                        },
                        documents: {
                            enable: true,
                            name: 'Jobs',
                        },
                        all: {
                            enable: true,
                            name: 'All',
                        },
                    }}
                />
            </div>
        </>
    )
}
