import { VeltData, VeltIf, VeltNotificationsPanelWireframe } from "@veltdev/react";
import { MarkRead } from "./Icons";
import React from "react";

const VeltNotificationWf = () => {
    return (
        <VeltNotificationsPanelWireframe>
            <div className="oe-notifications-panel">
                <div className="oe-notifications-panel-header">
                    <div className="oe-notifications-panel-header-info">
                        <div className="oe-notifications-panel-header-info-title">
                            Notifications
                        </div>
                        <VeltIf condition="{notificationsPanel.unreadCount.forYou} > 0 || ({user.isAdmin} && {notificationsPanel.unreadCount.all} > 0)">
                            <div className="oe-notifications-panel-header-info-unread">
                                <VeltIf condition="{selectedTab} === 'forYou'">
                                    <VeltData field="notificationsPanel.unreadCount.forYou" />
                                </VeltIf>
                                <VeltIf condition="{selectedTab} === 'all'">
                                    <VeltData field="notificationsPanel.unreadCount.all" />
                                </VeltIf>
                                new
                            </div>
                        </VeltIf>
                    </div>
                    <div className="oe-notifications-panel-header-actions">
                        <VeltNotificationsPanelWireframe.ReadAllButton>
                            <div className="oe-notifications-panel-header-actions-button">
                                <MarkRead width={20} height={20} />
                            </div>
                        </VeltNotificationsPanelWireframe.ReadAllButton>
                    </div>
                </div>
                <VeltNotificationsPanelWireframe.Header veltIf="{user.isAdmin}">
                    <div className="oe-notifications-panel-tab-header">
                        <VeltNotificationsPanelWireframe.Header.TabForYou />
                        <VeltNotificationsPanelWireframe.Header.TabAll />
                    </div>
                </VeltNotificationsPanelWireframe.Header>
                <VeltNotificationsPanelWireframe.Content>
                    <VeltNotificationsPanelWireframe.Content.ForYou />
                    <VeltNotificationsPanelWireframe.Content.All />
                </VeltNotificationsPanelWireframe.Content>
            </div>
        </VeltNotificationsPanelWireframe>
    );
};

export default VeltNotificationWf;