import { VeltNotificationsPanelWireframe, VeltData } from "@veltdev/react";
import { MarkRead } from "./Icons";


const VeltNotificationListItemWf = () => {
    return (
        <VeltNotificationsPanelWireframe.Content.List.Item>
            <div className="oe-notifications-panel-list-item">
                <div className="oe-notifications-panel-list-item-content">
                    <VeltNotificationsPanelWireframe.Content.List.Item.Avatar />
                    <div className="oe-notifications-panel-list-item-content-headline">
                        <VeltNotificationsPanelWireframe.Content.List.Item.Headline />
                        <span>in</span>
                        <VeltData field="notification.notificationSourceData.context.jobId" />
                    </div>
                    <VeltNotificationsPanelWireframe.Content.List.Item.Time />
                    <VeltNotificationsPanelWireframe.Content.List.Item.Unread />

                </div>
                <div className="oe-comment--metadata oe-notification--metadata">
                    <MarkRead width={16} height={16} />
                    <span className="oe-comment--metadata-label">Field:</span>
                    <span className="oe-comment--metadata-label">Status</span>
                    <span className="oe-comment--metadata-separator">-</span>
                    <span className="oe-comment--metadata-label"><VeltData field="notification.notificationSourceData.context.jobStatus" /></span>
                </div>
                <VeltNotificationsPanelWireframe.Content.List.Item.Body />
            </div>
        </VeltNotificationsPanelWireframe.Content.List.Item>
    )
}

export default VeltNotificationListItemWf;