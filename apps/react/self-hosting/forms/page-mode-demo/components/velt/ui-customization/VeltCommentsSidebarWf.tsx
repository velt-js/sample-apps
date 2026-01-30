"use client";

import { VeltCommentsSidebarWireframe, VeltData } from "@veltdev/react";

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
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="16" height="16" fill="white" fillOpacity="0.01" />
                                            <path d="M2.5 4.5H13.5" stroke="#5C6C8A" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4.5 7.5H11.5" stroke="#5C6C8A" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M5.5 10.5H10.5" stroke="#465169" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Trigger>
                                <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content>
                                    <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.SortDate>
                                        <div className="privado-comments-sidebar-header-filter-dropdown-content-item-wrapper">
                                            <span>Sort by date</span>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="12" height="12" fill="white" fillOpacity="0.01" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.71402 5.30066C3.62206 5.20534 3.51205 5.12931 3.39042 5.07701C3.26879 5.0247 3.13797 4.99717 3.0056 4.99602C2.87323 4.99487 2.74195 5.02012 2.61943 5.0703C2.49691 5.12048 2.3856 5.19458 2.292 5.28829C2.19839 5.38199 2.12437 5.49342 2.07424 5.61607C2.02411 5.73872 1.99889 5.87013 2.00004 6.00265C2.00119 6.13516 2.02869 6.26612 2.08094 6.38787C2.13319 6.50963 2.20914 6.61976 2.30435 6.71182L4.29823 8.7078C4.48518 8.8949 4.73871 9 5.00306 9C5.26741 9 5.52094 8.8949 5.7079 8.7078L9.69565 4.71584C9.79086 4.62377 9.86681 4.51365 9.91906 4.39189C9.97131 4.27013 9.99881 4.13918 9.99996 4.00666C10.0011 3.87415 9.97589 3.74274 9.92576 3.62009C9.87563 3.49744 9.80161 3.38601 9.708 3.29231C9.6144 3.1986 9.50309 3.1245 9.38057 3.07432C9.25805 3.02414 9.12677 2.99889 8.9944 3.00004C8.86203 3.00119 8.73121 3.02872 8.60958 3.08102C8.48795 3.13333 8.37794 3.20936 8.28598 3.30468L5.00306 6.59106L3.71402 5.30066Z" fill="#754CFF" />
                                            </svg>
                                        </div>
                                    </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.SortDate>
                                    <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.SortUnread>
                                        <div className="privado-comments-sidebar-header-filter-dropdown-content-item-wrapper">
                                            <span>Sort by unread</span>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="12" height="12" fill="white" fillOpacity="0.01" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.71402 5.30066C3.62206 5.20534 3.51205 5.12931 3.39042 5.07701C3.26879 5.0247 3.13797 4.99717 3.0056 4.99602C2.87323 4.99487 2.74195 5.02012 2.61943 5.0703C2.49691 5.12048 2.3856 5.19458 2.292 5.28829C2.19839 5.38199 2.12437 5.49342 2.07424 5.61607C2.02411 5.73872 1.99889 5.87013 2.00004 6.00265C2.00119 6.13516 2.02869 6.26612 2.08094 6.38787C2.13319 6.50963 2.20914 6.61976 2.30435 6.71182L4.29823 8.7078C4.48518 8.8949 4.73871 9 5.00306 9C5.26741 9 5.52094 8.8949 5.7079 8.7078L9.69565 4.71584C9.79086 4.62377 9.86681 4.51365 9.91906 4.39189C9.97131 4.27013 9.99881 4.13918 9.99996 4.00666C10.0011 3.87415 9.97589 3.74274 9.92576 3.62009C9.87563 3.49744 9.80161 3.38601 9.708 3.29231C9.6144 3.1986 9.50309 3.1245 9.38057 3.07432C9.25805 3.02414 9.12677 2.99889 8.9944 3.00004C8.86203 3.00119 8.73121 3.02872 8.60958 3.08102C8.48795 3.13333 8.37794 3.20936 8.28598 3.30468L5.00306 6.59106L3.71402 5.30066Z" fill="#754CFF" />
                                            </svg>
                                        </div>
                                    </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.SortUnread>
                                    <div className="privado-comments-sidebar-header-filter-dropdown-content-divider">
                                    </div>
                                    <div className="privado-comments-sidebar-header-filter-dropdown-content-item-wrapper">
                                        <span>Only show assigned to me</span>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="12" height="12" fill="white" fillOpacity="0.01" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M3.71402 5.30066C3.62206 5.20534 3.51205 5.12931 3.39042 5.07701C3.26879 5.0247 3.13797 4.99717 3.0056 4.99602C2.87323 4.99487 2.74195 5.02012 2.61943 5.0703C2.49691 5.12048 2.3856 5.19458 2.292 5.28829C2.19839 5.38199 2.12437 5.49342 2.07424 5.61607C2.02411 5.73872 1.99889 5.87013 2.00004 6.00265C2.00119 6.13516 2.02869 6.26612 2.08094 6.38787C2.13319 6.50963 2.20914 6.61976 2.30435 6.71182L4.29823 8.7078C4.48518 8.8949 4.73871 9 5.00306 9C5.26741 9 5.52094 8.8949 5.7079 8.7078L9.69565 4.71584C9.79086 4.62377 9.86681 4.51365 9.91906 4.39189C9.97131 4.27013 9.99881 4.13918 9.99996 4.00666C10.0011 3.87415 9.97589 3.74274 9.92576 3.62009C9.87563 3.49744 9.80161 3.38601 9.708 3.29231C9.6144 3.1986 9.50309 3.1245 9.38057 3.07432C9.25805 3.02414 9.12677 2.99889 8.9944 3.00004C8.86203 3.00119 8.73121 3.02872 8.60958 3.08102C8.48795 3.13333 8.37794 3.20936 8.28598 3.30468L5.00306 6.59106L3.71402 5.30066Z" fill="#754CFF" />
                                        </svg>
                                    </div>
                                    <VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterOpen>
                                        <div className="privado-comments-sidebar-header-filter-dropdown-content-item-wrapper">
                                            <span>Hide resolved comments</span>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="12" height="12" fill="white" fillOpacity="0.01" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.71402 5.30066C3.62206 5.20534 3.51205 5.12931 3.39042 5.07701C3.26879 5.0247 3.13797 4.99717 3.0056 4.99602C2.87323 4.99487 2.74195 5.02012 2.61943 5.0703C2.49691 5.12048 2.3856 5.19458 2.292 5.28829C2.19839 5.38199 2.12437 5.49342 2.07424 5.61607C2.02411 5.73872 1.99889 5.87013 2.00004 6.00265C2.00119 6.13516 2.02869 6.26612 2.08094 6.38787C2.13319 6.50963 2.20914 6.61976 2.30435 6.71182L4.29823 8.7078C4.48518 8.8949 4.73871 9 5.00306 9C5.26741 9 5.52094 8.8949 5.7079 8.7078L9.69565 4.71584C9.79086 4.62377 9.86681 4.51365 9.91906 4.39189C9.97131 4.27013 9.99881 4.13918 9.99996 4.00666C10.0011 3.87415 9.97589 3.74274 9.92576 3.62009C9.87563 3.49744 9.80161 3.38601 9.708 3.29231C9.6144 3.1986 9.50309 3.1245 9.38057 3.07432C9.25805 3.02414 9.12677 2.99889 8.9944 3.00004C8.86203 3.00119 8.73121 3.02872 8.60958 3.08102C8.48795 3.13333 8.37794 3.20936 8.28598 3.30468L5.00306 6.59106L3.71402 5.30066Z" fill="#754CFF" />
                                            </svg>
                                        </div>
                                    </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content.FilterOpen>
                                </VeltCommentsSidebarWireframe.MinimalFilterDropdown.Content>
                            </VeltCommentsSidebarWireframe.MinimalFilterDropdown>
                        </div>
                    </div>
                    <VeltCommentsSidebarWireframe.List />
                    <VeltCommentsSidebarWireframe.PageModeComposer />
                </VeltCommentsSidebarWireframe.Panel>
                <VeltCommentsSidebarWireframe.FocusedThread>
                    <div className="privado-comments-sidebar-focused-thread-header-wrapper">
                        <VeltCommentsSidebarWireframe.FocusedThread.BackButton>
                            <div className="privado-comments-sidebar-focused-thread-back-button-wrapper">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.9999 8.66663H3.33325" stroke="#465169" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.33325 4.66669L3.33325 8.66669L7.33325 12.6667" stroke="#465169" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
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
}

export default VeltCommentsSidebarWf;