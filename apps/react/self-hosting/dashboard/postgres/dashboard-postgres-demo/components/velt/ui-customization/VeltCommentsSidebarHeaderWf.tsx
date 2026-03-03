'use client';
import { VeltButtonWireframe, VeltCommentsSidebarWireframe, VeltData, VeltIf } from '@veltdev/react';
import { ArrowheadRight, ChevronDown, MoreHorizontal } from './Icons';

const VeltCommentsSidebarHeaderWf = () => {
    return (
        <VeltCommentsSidebarWireframe.Header>
            <div className="oe-comment-sidebar-header">
                <div className="oe-sidebar-header-left">
                    <VeltIf condition="{embedMode}">
                        <VeltButtonWireframe id="close-sidebar-button" type="button">
                            <div className="oe-btn-padding-sm">
                                <ArrowheadRight width={16} height={16} />
                            </div>
                        </VeltButtonWireframe>
                    </VeltIf>
                    <VeltCommentsSidebarWireframe.CloseButton>
                        <div className="oe-btn-padding-sm">
                            <ArrowheadRight width={16} height={16} />
                        </div>
                    </VeltCommentsSidebarWireframe.CloseButton>
                    <div className="oe-comment-sidebar-header--title">Comments</div>
                    <div className="oe-comment-sidebar-header--id">
                        <VeltData field="context.jobName" />
                    </div>
                    <VeltIf condition="{unreadCommentAnnotationCount} > 0">
                        <div className="oe-comment-sidebar-header--unread-count">
                            <VeltData field="unreadCommentAnnotationCount" />
                            <div>new</div>
                        </div>
                    </VeltIf>
                </div>
                <div className="oe-sidebar-header-right">
                    <VeltCommentsSidebarWireframe.MinimalFilterDropdown>
                        <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Trigger>
                            <div className="oe-comment-sidebar-header--status-trigger">
                                <span className="oe-comment-sidebar-header--status-trigger-name">
                                    <VeltIf condition="{selectedMinimalFilterDropdownOption.filter} != 'reset'">
                                        <VeltData field="selectedMinimalFilterDropdownOption.filter" />
                                    </VeltIf>
                                    <VeltIf condition="{selectedMinimalFilterDropdownOption.filter} == 'reset'">
                                        <span>All</span>
                                    </VeltIf>
                                </span>
                                <ChevronDown width={16} height={16} />
                            </div>
                        </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Trigger>
                        <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content>
                            <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterOpen>
                                <div className="oe-comment-sidebar-header--status-content-name">Open</div>
                            </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterOpen>
                            <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterUnread>
                                <div className="oe-comment-sidebar-header--status-content-name">Unread</div>
                            </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterUnread>
                            <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterResolved>
                                <div className="oe-comment-sidebar-header--status-content-name">Resolved</div>
                            </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterResolved>
                            <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterReset>
                                <div className="oe-comment-sidebar-header--status-content-name">All</div>
                            </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterReset>
                        </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content>
                    </VeltCommentsSidebarWireframe.MinimalFilterDropdown>
                    <VeltCommentsSidebarWireframe.MinimalActionsDropdown>
                        <VeltCommentsSidebarWireframe.MinimalActionsDropdown.Trigger>
                            <div className="oe--icon-button">
                                <MoreHorizontal width={17.5} height={17.5} />
                            </div>
                        </VeltCommentsSidebarWireframe.MinimalActionsDropdown.Trigger>
                        <VeltCommentsSidebarWireframe.MinimalActionsDropdown.Content>
                            <div className="oe-thread-card--options-content">
                                <VeltCommentsSidebarWireframe.MinimalActionsDropdown.Content.MarkAllRead>
                                    <div className="oe-thread-card--options-content-item">Mark all as read</div>
                                </VeltCommentsSidebarWireframe.MinimalActionsDropdown.Content.MarkAllRead>
                            </div>
                        </VeltCommentsSidebarWireframe.MinimalActionsDropdown.Content>
                    </VeltCommentsSidebarWireframe.MinimalActionsDropdown>
                </div>
            </div>
        </VeltCommentsSidebarWireframe.Header>
    );
};

export default VeltCommentsSidebarHeaderWf;
