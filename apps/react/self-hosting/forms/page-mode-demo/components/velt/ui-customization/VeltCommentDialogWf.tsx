"use client";

import { VeltCommentDialogWireframe, VeltData, VeltIf } from "@veltdev/react";

const VeltCommentDialoglWf = () => {
    return (
        // [Velt] Custom wireframe for comment dialog
        <VeltCommentDialogWireframe>
            <div className="privado-comment-dialog-wrapper">
                <div className="privado-comment-dialog-question-wrapper-container">
                    <VeltIf condition="!{focusedThreadMode} && !{pageModeComposer} && {annotation.context.questionTitle}">
                        <div className="privado-comment-dialog-question-wrapper">
                            <svg width="3" height="18" viewBox="0 0 3 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="3" height="18" rx="1.5" fill="#D3C5FC" />
                            </svg>
                            <span className="privado-comment-dialog-question-text">
                                <VeltData field="annotation.context.questionNumber" />
                                {'. '}
                                <VeltData field="annotation.context.questionTitle" />
                            </span>
                        </div>
                    </VeltIf>
                </div>
                <VeltCommentDialogWireframe.Body>
                    <VeltCommentDialogWireframe.Threads>
                        <VeltCommentDialogWireframe.ThreadCard>
                            <div className="privado-comment-dialog-thread-card-wrapper">
                                <div className="privado-comment-dialog-thread-card-top-wrapper">
                                    <div className="privado-comment-dialog-thread-card-top-wrapper-left">
                                        <VeltCommentDialogWireframe.ThreadCard.Avatar />
                                        <VeltCommentDialogWireframe.ThreadCard.Name />
                                        <VeltCommentDialogWireframe.ThreadCard.Time />
                                    </div>
                                    <div className="privado-comment-dialog-thread-card-top-wrapper-right">

                                    </div>
                                </div>
                                <div className="privado-comment-dialog-thread-card-content-wrapper">
                                    <VeltCommentDialogWireframe.ThreadCard.Message />
                                </div>
                                <div className="privado-comment-dialog-thread-card-bottom-wrapper">
                                    <div className="privado-comment-dialog-thread-card-bottom-wrapper-left">
                                        {/* <div className="privado-reaction-wrapper">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_154_608)">
                                                    <path d="M4.5 13.5H2.5V8.5H4.5" stroke="#9AA8C3" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M4.5 8.5L6.5 2.5H7C7.39782 2.5 7.77936 2.65804 8.06066 2.93934C8.34196 3.22064 8.5 3.60218 8.5 4V6.5H11.77C11.9849 6.49999 12.1973 6.54616 12.3928 6.63538C12.5883 6.7246 12.7624 6.85479 12.9032 7.01713C13.044 7.17946 13.1483 7.37017 13.209 7.57632C13.2697 7.78247 13.2854 7.99926 13.255 8.212L12.684 12.212C12.633 12.5693 12.4548 12.8962 12.1823 13.1328C11.9097 13.3694 11.5609 13.4998 11.2 13.5H4.5V8.5Z" stroke="#9AA8C3" strokeLinecap="round" strokeLinejoin="round" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_154_608">
                                                        <rect width="12" height="12" fill="white" transform="translate(2 2)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div> */}
                                        <VeltCommentDialogWireframe.ThreadCard.Reactions />
                                    </div>
                                    <VeltIf condition="!{focusedThreadMode} && !{commentDialogSelected}">
                                        <div className="privado-comment-dialog-thread-card-bottom-wrapper-right">
                                            <VeltCommentDialogWireframe.ReplyAvatars />
                                            <VeltIf condition="{annotation.comments.length} === 1">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.5 3.5V6.5C4.5 7.29565 4.81607 8.05871 5.37868 8.62132C5.94129 9.18393 6.70435 9.5 7.5 9.5H12.5" stroke="#465169" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M9.5 6.5L12.5 9.5L9.5 12.5" stroke="#465169" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <VeltCommentDialogWireframe.ToggleReply.Text />
                                            </VeltIf>
                                            <VeltIf condition="{annotation.comments.length} > 1">
                                                <div className="privado-comment-dialog-thread-card-bottom-wrapper-right-count-wrapper">
                                                    <VeltCommentDialogWireframe.ToggleReply.Count />
                                                    <VeltCommentDialogWireframe.ToggleReply.Text />
                                                </div>
                                            </VeltIf>
                                        </div>
                                    </VeltIf>
                                </div>
                            </div>
                            <VeltIf condition="{focusedThreadMode} && {i} === 0 && {annotation.comments.length} > 1">
                                <div className="privado-comment-dialog-thread-card-reply-count">
                                    <div className="privado-comment-dialog-thread-card-reply-count-left"></div>
                                    <span className="privado-comment-dialog-thread-card-reply-count-text">
                                        <VeltCommentDialogWireframe.ToggleReply.Count />
                                        replies
                                    </span>
                                    <div className="privado-comment-dialog-thread-card-reply-count-right"></div>
                                </div>
                            </VeltIf>

                        </VeltCommentDialogWireframe.ThreadCard>
                    </VeltCommentDialogWireframe.Threads>
                </VeltCommentDialogWireframe.Body>
                <VeltCommentDialogWireframe.Composer>
                    <div className="privado-comment-dialog-composer-wrapper">
                        <div className="privado-comment-dialog-composer-input-wrapper">
                            <VeltCommentDialogWireframe.Composer.Attachments />
                            <VeltCommentDialogWireframe.Composer.Input placeholder="Write a comment..." />
                            <div className="privado-comment-dialog-composer-actions-right">
                                <VeltCommentDialogWireframe.Composer.ActionButton type="submit">
                                    <div className="privado-comment-dialog-composer-submit-button-wrapper">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.6056 7.55279L3.54513 2.02257C3.1517 1.82585 2.71428 2.19641 2.84364 2.61682L4.45476 7.85296C4.48424 7.94877 4.48424 8.05123 4.45476 8.14704L2.84364 13.3832C2.71428 13.8036 3.1517 14.1741 3.54513 13.9774L14.6056 8.44721C14.9741 8.26295 14.9741 7.73705 14.6056 7.55279Z" fill="white" />
                                        </svg>
                                    </div>
                                </VeltCommentDialogWireframe.Composer.ActionButton>
                            </div>
                        </div>
                        <div className="privado-comment-dialog-composer-actions-wrapper">
                            <div className="privado-comment-dialog-composer-actions-left">
                                <VeltCommentDialogWireframe.Composer.ActionButton type="attachments">
                                    <div className="privado-comment-dialog-composer-action-button-wrapper">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_163_436)">
                                                <path d="M8.85695 5.357L5.85195 8.362C5.16895 9.045 5.16895 10.153 5.85195 10.837C6.53495 11.52 7.64295 11.52 8.32695 10.837L12.393 6.771C13.76 5.404 13.76 3.188 12.393 1.821C11.026 0.453996 8.80995 0.453996 7.44295 1.821L3.02395 6.241C0.97395 8.291 0.97395 11.615 3.02395 13.666C5.07395 15.716 8.39795 15.716 10.449 13.666L14.514 9.6" stroke="#9AA8C3" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_163_436">
                                                    <rect width="16" height="16" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </VeltCommentDialogWireframe.Composer.ActionButton>
                                <VeltCommentDialogWireframe.Composer.ActionButton type="userMentions">
                                    <div className="privado-comment-dialog-composer-action-button-wrapper">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_163_440)">
                                                <path d="M5.24976 0.489441C6.86723 -0.102535 8.63323 -0.15659 10.2839 0.335144C11.9348 0.827063 13.3831 1.83904 14.4128 3.21991C15.4426 4.60085 15.9993 6.27757 15.9998 8.00018V9.50018C15.9997 10.1632 15.7361 10.799 15.2673 11.2678C14.7985 11.7365 14.1627 12.0002 13.4998 12.0002C12.8368 12.0001 12.201 11.7365 11.7322 11.2678C11.4901 11.0257 11.3031 10.7389 11.1785 10.4269C10.4475 11.3828 9.29598 12.0002 7.99976 12.0002C5.79077 12.0001 3.99982 10.2092 3.99976 8.00018C3.99976 5.79113 5.79073 4.00031 7.99976 4.00018C9.19451 4.00018 10.2668 4.52418 10.9998 5.35468V4.50018C10.9998 4.22412 11.2237 4.0003 11.4998 4.00018C11.7759 4.00018 11.9997 4.22405 11.9998 4.50018V9.50018C11.9998 9.89789 12.158 10.2795 12.4392 10.5607C12.7205 10.8419 13.1021 11.0001 13.4998 11.0002C13.8975 11.0002 14.279 10.8419 14.5603 10.5607C14.8416 10.2795 14.9997 9.89794 14.9998 9.50018V8.00018C14.9993 6.4929 14.5121 5.02589 13.6111 3.81757C12.7101 2.60942 11.4431 1.72455 9.99878 1.29413C8.55431 0.863749 7.00891 0.910873 5.59351 1.42889C4.17831 1.947 2.96761 2.90811 2.14233 4.16913C1.3171 5.43025 0.920648 6.92455 1.01245 8.42889C1.10432 9.93308 1.67975 11.3674 2.6521 12.5187C3.62464 13.6701 4.94311 14.4774 6.41089 14.8195C7.87868 15.1615 9.41823 15.0209 10.7996 14.4182C11.0526 14.3077 11.3472 14.423 11.4578 14.676C11.5682 14.929 11.4529 15.2236 11.2 15.3342C9.6212 16.0231 7.86193 16.1841 6.18433 15.7932C4.50674 15.4022 2.99998 14.4802 1.88843 13.1642C0.77693 11.8483 0.119337 10.2088 0.0144043 8.48944C-0.0905067 6.77015 0.362238 5.06258 1.30542 3.62128C2.24862 2.18007 3.63232 1.08154 5.24976 0.489441ZM7.99976 5.00018C6.34301 5.00032 4.99976 6.34341 4.99976 8.00018C4.99982 9.6569 6.34305 11.0001 7.99976 11.0002C9.65657 11.0002 10.9997 9.65698 10.9998 8.00018C10.9998 6.34333 9.65661 5.00018 7.99976 5.00018Z" fill="#9AA8C3" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_163_440">
                                                    <rect width="16" height="16" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </div>
                                </VeltCommentDialogWireframe.Composer.ActionButton>
                            </div>
                            <div className="privado-comment-dialog-composer-actions-right">
                                <VeltCommentDialogWireframe.Composer.ActionButton type="submit">
                                    <div className="privado-comment-dialog-composer-submit-button-wrapper">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.6056 7.55279L3.54513 2.02257C3.1517 1.82585 2.71428 2.19641 2.84364 2.61682L4.45476 7.85296C4.48424 7.94877 4.48424 8.05123 4.45476 8.14704L2.84364 13.3832C2.71428 13.8036 3.1517 14.1741 3.54513 13.9774L14.6056 8.44721C14.9741 8.26295 14.9741 7.73705 14.6056 7.55279Z" fill="white" />
                                        </svg>
                                    </div>
                                </VeltCommentDialogWireframe.Composer.ActionButton>
                            </div>
                        </div>
                    </div>
                </VeltCommentDialogWireframe.Composer>
            </div>
        </VeltCommentDialogWireframe>
    );
};

export default VeltCommentDialoglWf;
