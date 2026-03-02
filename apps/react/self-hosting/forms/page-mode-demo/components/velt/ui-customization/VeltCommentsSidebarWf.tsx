"use client";

import { VeltCommentsSidebarWireframe, VeltData, VeltIf } from "@veltdev/react";
import { FilterIcon, CheckIcon, EmptyCommentIcon, BackArrowIcon } from './VeltIcons';
import {
    SidebarWrapper,
    SidebarHeaderWrapper,
    SidebarHeaderLeftWrapper,
    SidebarHeaderRightWrapper,
    FilterDropdownTriggerWrapper,
    FilterDropdownContentItemWrapper,
    FilterDropdownContentDivider,
    EmptyPlaceholderWrapper,
    EmptyPlaceholderIconWrapper,
    EmptyPlaceholderTitle,
    EmptyPlaceholderDescription,
    FocusedThreadHeaderWrapper,
    FocusedThreadBackButtonWrapper,
    FocusedThreadBackButtonText,
    FocusedThreadQuestionWrapper
} from './styled';

const VeltCommentsSidebarWf = () => {
    return (
        <VeltCommentsSidebarWireframe>
            <SidebarWrapper className="privado-comments-sidebar-wrapper">
                <VeltCommentsSidebarWireframe.Skeleton />
                <VeltCommentsSidebarWireframe.Panel>
                    <SidebarHeaderWrapper className="privado-comments-sidebar-header-wrapper">
                        <SidebarHeaderLeftWrapper className="privado-comments-sidebar-header-left-wrapper">
                            <VeltData field="filteredCommentAnnotationsCount" />
                            &nbsp;
                            <span>Comments</span>
                        </SidebarHeaderLeftWrapper>
                        <SidebarHeaderRightWrapper className="privado-comments-sidebar-header-right-wrapper">
                            <VeltCommentsSidebarWireframe.MinimalFilterDropdown>
                                <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Trigger>
                                    <FilterDropdownTriggerWrapper className="privado-comments-sidebar-header-filter-dropdown-trigger-wrapper">
                                        <FilterIcon />
                                    </FilterDropdownTriggerWrapper>
                                </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Trigger>
                                <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content>
                                    <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.SortDate>
                                        <FilterDropdownContentItemWrapper className="privado-comments-sidebar-header-filter-dropdown-content-item-wrapper">
                                            <span>Sort by date</span>
                                            <CheckIcon />
                                        </FilterDropdownContentItemWrapper>
                                    </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.SortDate>
                                    <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.SortUnread>
                                        <FilterDropdownContentItemWrapper className="privado-comments-sidebar-header-filter-dropdown-content-item-wrapper">
                                            <span>Sort by unread</span>
                                            <CheckIcon />
                                        </FilterDropdownContentItemWrapper>
                                    </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.SortUnread>
                                    <FilterDropdownContentDivider className="privado-comments-sidebar-header-filter-dropdown-content-divider" />
                                    <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterAssignedToMe>
                                        <FilterDropdownContentItemWrapper className="privado-comments-sidebar-header-filter-dropdown-content-item-wrapper">
                                            <span>Only show assigned to me</span>
                                            <CheckIcon />
                                        </FilterDropdownContentItemWrapper>
                                    </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterAssignedToMe>
                                    <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterOpen>
                                        <FilterDropdownContentItemWrapper className="privado-comments-sidebar-header-filter-dropdown-content-item-wrapper">
                                            <span>Hide resolved comments</span>
                                            <CheckIcon />
                                        </FilterDropdownContentItemWrapper>
                                    </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterOpen>
                                </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content>
                            </VeltCommentsSidebarWireframe.MinimalFilterDropdown>
                        </SidebarHeaderRightWrapper>
                    </SidebarHeaderWrapper>
                    <VeltCommentsSidebarWireframe.List />
                    <VeltCommentsSidebarWireframe.EmptyPlaceholder>
                        <EmptyPlaceholderWrapper className="privado-comments-sidebar-empty-placeholder-wrapper">
                            <EmptyPlaceholderIconWrapper className="privado-comments-sidebar-empty-placeholder-icon-wrapper">
                                <EmptyCommentIcon />
                            </EmptyPlaceholderIconWrapper>
                            <EmptyPlaceholderTitle className="privado-comments-sidebar-empty-placeholder-title">
                                <VeltIf condition="{noCommentsFound}">
                                    No comments yet
                                </VeltIf>
                                <VeltIf condition="!{noCommentsFound}">
                                    No comments to display
                                </VeltIf>
                            </EmptyPlaceholderTitle>
                            <EmptyPlaceholderDescription className="privado-comments-sidebar-empty-placeholder-description">
                                Comment on findings, discuss questions, or @mention teammates
                            </EmptyPlaceholderDescription>
                        </EmptyPlaceholderWrapper>
                    </VeltCommentsSidebarWireframe.EmptyPlaceholder>
                    <VeltCommentsSidebarWireframe.PageModeComposer />
                </VeltCommentsSidebarWireframe.Panel>
                <VeltCommentsSidebarWireframe.FocusedThread>
                    <FocusedThreadHeaderWrapper className="privado-comments-sidebar-focused-thread-header-wrapper">
                        <VeltCommentsSidebarWireframe.FocusedThread.BackButton>
                            <FocusedThreadBackButtonWrapper className="privado-comments-sidebar-focused-thread-back-button-wrapper">
                                <BackArrowIcon />
                                <FocusedThreadBackButtonText className="privado-comments-sidebar-focused-thread-back-button-text">Back</FocusedThreadBackButtonText>
                            </FocusedThreadBackButtonWrapper>
                        </VeltCommentsSidebarWireframe.FocusedThread.BackButton>
                    </FocusedThreadHeaderWrapper>
                    <FocusedThreadQuestionWrapper className="privado-comments-sidebar-focused-thread-question-wrapper">
                        <VeltData className="privado-focused-thread-question-number" field="focusedAnnotation.context.questionNumber" />{'. '}
                        <VeltData field="focusedAnnotation.context.questionTitle" />
                    </FocusedThreadQuestionWrapper>
                    <VeltCommentsSidebarWireframe.FocusedThread.DialogContainer />
                </VeltCommentsSidebarWireframe.FocusedThread>
            </SidebarWrapper>
        </VeltCommentsSidebarWireframe>
    );
};

export default VeltCommentsSidebarWf;
