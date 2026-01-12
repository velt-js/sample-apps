import { VeltData, VeltIf, VeltNotificationsPanelWireframe } from '@veltdev/react';
import { Bell, ChevronRight, MarkRead, Settings1 } from './Icons';
import React from 'react';

const VeltNotificationWf = () => {
  return (
    <VeltNotificationsPanelWireframe>
      <div className="oe-notifications-panel">
        <VeltNotificationsPanelWireframe.Header>
          <div className="oe-notifications-panel-header">
            <div className="oe-notifications-panel-header-info">
              <div className="oe-notifications-panel-header-info-title">Notifications</div>
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
              <VeltNotificationsPanelWireframe.SettingsButton>
                <div className="oe-notifications-panel-header-actions-button">
                  <Settings1 width={20} height={20} />
                </div>
              </VeltNotificationsPanelWireframe.SettingsButton>
              <VeltNotificationsPanelWireframe.ReadAllButton>
                <div className="oe-notifications-panel-header-actions-button">
                  <MarkRead width={20} height={20} />
                </div>
              </VeltNotificationsPanelWireframe.ReadAllButton>
            </div>
          </div>
          <div className="oe-notifications-panel-tab-header">
            <VeltNotificationsPanelWireframe.Header.TabForYou />
            <VeltNotificationsPanelWireframe.Header.TabDocuments />
            <VeltNotificationsPanelWireframe.Header.TabAll />
          </div>
        </VeltNotificationsPanelWireframe.Header>
        <VeltNotificationsPanelWireframe.Content>
          <VeltNotificationsPanelWireframe.Content.ForYou />
          <VeltNotificationsPanelWireframe.Content.Documents />
          <VeltNotificationsPanelWireframe.Content.All />
        </VeltNotificationsPanelWireframe.Content>
        <VeltNotificationsPanelWireframe.Settings>
          <div className="oe-notifications-panel-settings">
            <div className="oe-notifications-panel-settings-header">
              <div className="oe-notifications-panel-settings-bell-icon">
                <Bell width={20} height={20} />
              </div>
              <div className="oe-notifications-panel-settings-right-icon">
                <ChevronRight width={20} height={20} />
              </div>
              <span className="oe-notifications-panel-settings-title">Settings</span>
            </div>
            <VeltNotificationsPanelWireframe.Settings.List>
              <VeltNotificationsPanelWireframe.Settings.List.Accordion>
                <VeltNotificationsPanelWireframe.Settings.List.Accordion.Trigger>
                  <div className="oe-notifications-panel-settings-accordion-trigger">
                    <VeltNotificationsPanelWireframe.Settings.List.Accordion.Trigger.Label />
                    <div className="oe-notifications-panel-settings-accordion-trigger-selected-value">
                      <VeltNotificationsPanelWireframe.Settings.List.Accordion.Trigger.SelectedValue />
                      <VeltNotificationsPanelWireframe.Settings.List.Accordion.Trigger.Icon />
                    </div>
                  </div>
                </VeltNotificationsPanelWireframe.Settings.List.Accordion.Trigger>
                <VeltNotificationsPanelWireframe.Settings.List.Accordion.Content>
                  <VeltNotificationsPanelWireframe.Settings.List.Accordion.Content.Item>
                    <VeltNotificationsPanelWireframe.Settings.List.Accordion.Content.Item.Label />
                  </VeltNotificationsPanelWireframe.Settings.List.Accordion.Content.Item>
                </VeltNotificationsPanelWireframe.Settings.List.Accordion.Content>
              </VeltNotificationsPanelWireframe.Settings.List.Accordion>
            </VeltNotificationsPanelWireframe.Settings.List>
          </div>
        </VeltNotificationsPanelWireframe.Settings>
      </div>
    </VeltNotificationsPanelWireframe>
  );
};

export default VeltNotificationWf;
