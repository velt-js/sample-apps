"use client";

import { VeltCommentsSidebarWireframe, VeltData, VeltIf } from "@veltdev/react";
import { FilterIcon, CheckIcon, EmptyCommentIcon, BackArrowIcon } from './VeltIcons';

const VeltCommentsSidebarWf = () => {
    return (
        <VeltCommentsSidebarWireframe>
            <div className="privado-comments-sidebar-wrapper">
                <VeltCommentsSidebarWireframe.Skeleton />
                <VeltCommentsSidebarWireframe.Panel>
                    <div className="privado-comments-sidebar-header-wrapper">
                        <div className="privado-comments-sidebar-header-left-wrapper">
                            <VeltData field="filteredCommentAnnotationsCount" />
                            &nbsp;
                            <span>Comments</span>
                        </div>
                        <div className="privado-comments-sidebar-header-right-wrapper">
                            <VeltCommentsSidebarWireframe.MinimalFilterDropdown>
                                <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Trigger>
                                    <div className="privado-comments-sidebar-header-filter-dropdown-trigger-wrapper">
                                        <FilterIcon />
                                    </div>
                                </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Trigger>
                                <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content>
                                    <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.SortDate>
                                        <div className="privado-comments-sidebar-header-filter-dropdown-content-item-wrapper">
                                            <span>Sort by date</span>
                                            <CheckIcon />
                                        </div>
                                    </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.SortDate>
                                    <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.SortUnread>
                                        <div className="privado-comments-sidebar-header-filter-dropdown-content-item-wrapper">
                                            <span>Sort by unread</span>
                                            <CheckIcon />
                                        </div>
                                    </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.SortUnread>
                                    <div className="privado-comments-sidebar-header-filter-dropdown-content-divider">
                                    </div>
                                    <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterAssignedToMe>
                                        <div className="privado-comments-sidebar-header-filter-dropdown-content-item-wrapper">
                                            <span>Only show assigned to me</span>
                                            <CheckIcon />
                                        </div>
                                    </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterAssignedToMe>
                                    <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterOpen>
                                        <div className="privado-comments-sidebar-header-filter-dropdown-content-item-wrapper">
                                            <span>Hide resolved comments</span>
                                            <CheckIcon />
                                        </div>
                                    </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterOpen>
                                </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content>
                            </VeltCommentsSidebarWireframe.MinimalFilterDropdown>
                        </div>
                    </div>
                    <VeltCommentsSidebarWireframe.List />
                    <VeltCommentsSidebarWireframe.EmptyPlaceholder>
                        <div className="privado-comments-sidebar-empty-placeholder-wrapper">
                            <div className="privado-comments-sidebar-empty-placeholder-icon-wrapper">
                                <EmptyCommentIcon />
                            </div>
                            <div className="privado-comments-sidebar-empty-placeholder-title">
                                <VeltIf condition="{noCommentsFound}">
                                    No comments yet
                                </VeltIf>
                                <VeltIf condition="!{noCommentsFound}">
                                    No comments to display
                                </VeltIf>
                            </div>
                            <div className="privado-comments-sidebar-empty-placeholder-description">
                                Comment on findings, discuss questions, or @mention teammates
                            </div>
                        </div>
                    </VeltCommentsSidebarWireframe.EmptyPlaceholder>
                    <VeltCommentsSidebarWireframe.PageModeComposer />
                </VeltCommentsSidebarWireframe.Panel>
                <VeltCommentsSidebarWireframe.FocusedThread>
                    <div className="privado-comments-sidebar-focused-thread-header-wrapper">
                        <VeltCommentsSidebarWireframe.FocusedThread.BackButton>
                            <div className="privado-comments-sidebar-focused-thread-back-button-wrapper">
                                <BackArrowIcon />
                                <span className="privado-comments-sidebar-focused-thread-back-button-text">Back</span>
                            </div>
                        </VeltCommentsSidebarWireframe.FocusedThread.BackButton>
                    </div>
                    <div className="privado-comments-sidebar-focused-thread-question-wrapper">
                        <VeltData field="focusedAnnotation.context.questionTitle" />
                    </div>
                    <VeltCommentsSidebarWireframe.FocusedThread.DialogContainer />
                </VeltCommentsSidebarWireframe.FocusedThread>
            </div>
        </VeltCommentsSidebarWireframe>
    );
};

export default VeltCommentsSidebarWf;
