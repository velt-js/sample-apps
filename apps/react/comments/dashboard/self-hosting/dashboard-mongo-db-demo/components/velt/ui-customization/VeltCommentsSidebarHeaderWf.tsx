"use client";
import { VeltCommentsSidebarWireframe, VeltData, VeltIf } from '@veltdev/react';
import { ArrowheadRight, MoreHorizontal } from './Icons';

const VeltCommentsSidebarHeaderWf = () => {
    return (
        <VeltCommentsSidebarWireframe.Header>
            <div className="oe-comment-sidebar-header">
                <div className="flex items-center gap-2 px-[4px]">
                    <VeltCommentsSidebarWireframe.CloseButton>
                        <div className="p-[4px]">
                            <ArrowheadRight width={16} height={16} />
                        </div>
                    </VeltCommentsSidebarWireframe.CloseButton>
                    <div className="oe-comment-sidebar-header--title">
                        Comments
                    </div>
                    <div className="oe-comment-sidebar-header--id">
                        OE0001163
                    </div>
                    <VeltIf condition="{unreadCommentAnnotationCount} > 0">
                        <div className="oe-comment-sidebar-header--unread-count">
                            <VeltData field="unreadCommentAnnotationCount" />
                            <div>new</div>
                        </div>
                    </VeltIf>
                </div>
                <div className="flex items-center gap-2">
                    <VeltCommentsSidebarWireframe.Status>
                        <VeltCommentsSidebarWireframe.Status.Trigger>
                            <div className='oe-comment-sidebar-header--status-trigger'>
                                <VeltCommentsSidebarWireframe.Status.Trigger.Name />
                                <VeltCommentsSidebarWireframe.Status.Trigger.Arrow />
                            </div>
                        </VeltCommentsSidebarWireframe.Status.Trigger>
                        <VeltCommentsSidebarWireframe.Status.Content />
                    </VeltCommentsSidebarWireframe.Status>
                    <VeltCommentsSidebarWireframe.MinimalActionsDropdown>
                        <VeltCommentsSidebarWireframe.MinimalActionsDropdown.Trigger>
                            <div className="oe--icon-button">
                                <MoreHorizontal width={17.5} height={17.5} />
                            </div>
                        </VeltCommentsSidebarWireframe.MinimalActionsDropdown.Trigger>
                        <VeltCommentsSidebarWireframe.MinimalActionsDropdown.Content>
                            <div className="oe-thread-card--options-content">
                                <VeltCommentsSidebarWireframe.MinimalActionsDropdown.Content.MarkAllRead>
                                    <div className="oe-thread-card--options-content-item">
                                        Mark all as read
                                    </div>
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

