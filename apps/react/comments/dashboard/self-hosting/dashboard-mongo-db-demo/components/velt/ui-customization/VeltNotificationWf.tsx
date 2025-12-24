import { VeltData, VeltNotificationsPanelWireframe } from "@veltdev/react";
import { Funnel, MoreHorizontal } from "./Icons";

const VeltNotificationWf = () => {
    return (
        <VeltNotificationsPanelWireframe>
            <div className="oe-notifications-panel">
                <div className="oe-notifications-panel-header">
                    <div className="oe-notifications-panel-header-info">
                        <div className="oe-notifications-panel-header-info-title">
                            Notifications
                        </div>
                        <div className="oe-notifications-panel-header-info-unread">
                            2 new
                        </div>
                    </div>
                    <div className="oe-notifications-panel-header-actions">
                        <div className="oe-notifications-panel-header-actions-button">
                            <Funnel width={20} height={20} />
                        </div>
                        <div className="oe-notifications-panel-header-actions-button">
                            <MoreHorizontal width={20} height={20} />
                        </div>
                    </div>
                </div>
                <VeltNotificationsPanelWireframe.Header>
                    <div className="oe-notifications-panel-tab-header">
                        <VeltNotificationsPanelWireframe.Header.TabForYou />
                        <VeltNotificationsPanelWireframe.Header.TabAll />
                    </div>
                </VeltNotificationsPanelWireframe.Header>
                <VeltNotificationsPanelWireframe.Content>
                    <VeltNotificationsPanelWireframe.Content.ForYou>
                        <VeltNotificationsPanelWireframe.Content.List>
                            <VeltNotificationsPanelWireframe.Content.List.Item>
                                <div className="oe-notifications-panel-list-item">
                                    <div className="oe-notifications-panel-list-item-avatar">
                                        <VeltNotificationsPanelWireframe.Content.List.Item.Avatar />
                                    </div>
                                    <div className="oe-notifications-panel-list-item-content">
                                        <div className="oe-notifications-panel-list-item-content-headline">
                                            <VeltNotificationsPanelWireframe.Content.List.Item.Headline />
                                            <span>in</span>
                                            <VeltData field="notification.notificationSourceData.context.jobId" />
                                        </div>
                                        <VeltNotificationsPanelWireframe.Content.List.Item.Body />
                                    </div>
                                    <div className="oe-notifications-panel-list-item-time">
                                        <VeltNotificationsPanelWireframe.Content.List.Item.Time />
                                    </div>
                                    <div className="oe-notifications-panel-list-item-unread">
                                        <VeltNotificationsPanelWireframe.Content.List.Item.Unread />
                                    </div>
                                </div>
                            </VeltNotificationsPanelWireframe.Content.List.Item>
                        </VeltNotificationsPanelWireframe.Content.List>
                        <VeltNotificationsPanelWireframe.Content.LoadMore />
                        <VeltNotificationsPanelWireframe.Content.AllReadContainer />
                    </VeltNotificationsPanelWireframe.Content.ForYou>

                    <VeltNotificationsPanelWireframe.Content.All>
                        <VeltNotificationsPanelWireframe.Content.All.List>
                            <VeltNotificationsPanelWireframe.Content.All.List.Item>
                                <VeltNotificationsPanelWireframe.Content.All.List.Item.Label />
                                <VeltNotificationsPanelWireframe.Content.All.List.Item.Content>
                                    <VeltNotificationsPanelWireframe.Content.List>
                                        <VeltNotificationsPanelWireframe.Content.List.Item>
                                            <VeltNotificationsPanelWireframe.Content.List.Item.Avatar />
                                            <VeltNotificationsPanelWireframe.Content.List.Item.Unread />
                                            <VeltNotificationsPanelWireframe.Content.List.Item.Headline />
                                            <VeltNotificationsPanelWireframe.Content.List.Item.Body />
                                            <VeltNotificationsPanelWireframe.Content.List.Item.FileName />
                                            <VeltNotificationsPanelWireframe.Content.List.Item.Time />
                                        </VeltNotificationsPanelWireframe.Content.List.Item>
                                    </VeltNotificationsPanelWireframe.Content.List>
                                    <VeltNotificationsPanelWireframe.Content.LoadMore />
                                </VeltNotificationsPanelWireframe.Content.All.List.Item.Content>
                            </VeltNotificationsPanelWireframe.Content.All.List.Item>
                        </VeltNotificationsPanelWireframe.Content.All.List>
                        <VeltNotificationsPanelWireframe.Content.AllReadContainer />
                    </VeltNotificationsPanelWireframe.Content.All>
                </VeltNotificationsPanelWireframe.Content>
            </div>
        </VeltNotificationsPanelWireframe>
    );
};

export default VeltNotificationWf;