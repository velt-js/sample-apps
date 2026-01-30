"use client";

import { VeltCommentDialogWireframe, VeltData, VeltIf } from "@veltdev/react";

const VeltCommentDialoglWf = () => {
    return (
        // [Velt] Custom wireframe for comment dialog
        <VeltCommentDialogWireframe>
            <div className="privado-comment-dialog-wrapper">
                <VeltCommentDialogWireframe.AssigneeBanner>
                    <div className="privado-comment-dialog-assignee-banner-wrapper">
                        <div className="privado-comment-dialog-assignee-banner-wrapper-left">
                            <VeltCommentDialogWireframe.AssigneeBanner.ResolveButton>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_249_2027)">
                                        <rect x="1.22729" y="1.22729" width="13.5455" height="13.5455" rx="6.77273" fill="white" stroke="#BFC8DC" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_249_2027">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <span className="privado-comment-dialog-assignee-banner-resolve-button-text">Resolve</span>
                            </VeltCommentDialogWireframe.AssigneeBanner.ResolveButton>
                            <VeltCommentDialogWireframe.AssigneeBanner.UnresolveButton>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_249_2066)">
                                        <rect x="0.727295" y="0.727295" width="14.5455" height="14.5455" rx="7.27273" fill="#1DCA73" />
                                        <rect x="11.1948" y="4.64136" width="1.5" height="8" rx="0.75" transform="rotate(45 11.1948 4.64136)" fill="white" />
                                        <rect x="3.74463" y="8.53052" width="1.5" height="4" rx="0.75" transform="rotate(-45 3.74463 8.53052)" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_249_2066">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <span className="privado-comment-dialog-assignee-banner-unresolve-button-text">Resolved by
                                    <VeltData field="annotation.resolvedByUserId" />
                                </span>
                            </VeltCommentDialogWireframe.AssigneeBanner.UnresolveButton>
                        </div>
                        <div className="privado-comment-dialog-assignee-banner-wrapper-right">
                            Assigned to <VeltData field="annotation.assignedTo.userId" />
                        </div>
                    </div>
                </VeltCommentDialogWireframe.AssigneeBanner>
                <div className="privado-comment-dialog-question-wrapper-container">
                    <VeltIf condition="!{focusedThreadMode} && !{pageModeComposer} && {annotation.context.questionTitle}">
                        <div className="privado-comment-dialog-question-wrapper">
                            <svg width="3" height="18" viewBox="0 0 3 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="3" height="18" rx="1.5" fill="currentColor" />
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
                                        <VeltCommentDialogWireframe.ThreadCard.Unread />
                                    </div>
                                    <div className="privado-comment-dialog-thread-card-top-wrapper-right">
                                        <VeltCommentDialogWireframe.ThreadCard.Options>
                                            <VeltCommentDialogWireframe.ThreadCard.Options.Trigger>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="16" height="16" fill="white" fillOpacity="0.01" />
                                                    <path d="M7 8.5C7 9.32843 7.67157 10 8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5Z" fill="#5C6C8A" />
                                                    <path d="M12 8.5C12 9.32843 12.6716 10 13.5 10C14.3284 10 15 9.32843 15 8.5C15 7.67157 14.3284 7 13.5 7C12.6716 7 12 7.67157 12 8.5Z" fill="#5C6C8A" />
                                                    <path d="M2 8.5C2 9.32843 2.67157 10 3.5 10C4.32843 10 5 9.32843 5 8.5C5 7.67157 4.32843 7 3.5 7C2.67157 7 2 7.67157 2 8.5Z" fill="#5C6C8A" />
                                                </svg>
                                            </VeltCommentDialogWireframe.ThreadCard.Options.Trigger>
                                            <VeltCommentDialogWireframe.ThreadCard.Options.Content />
                                        </VeltCommentDialogWireframe.ThreadCard.Options>
                                    </div>
                                </div>
                                <div className="privado-comment-dialog-thread-card-content-wrapper">
                                    <VeltCommentDialogWireframe.ThreadCard.Message />
                                    <VeltCommentDialogWireframe.ThreadCard.Attachments>
                                        <VeltCommentDialogWireframe.ThreadCard.Attachments.Image />
                                        <VeltCommentDialogWireframe.ThreadCard.Attachments.Other>
                                            <div className="privado-comment-dialog-thread-card-attachments-other">
                                                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g filter="url(#filter0_d_220_539)">
                                                        <path data-figma-bg-blur-radius="20" d="M26.5607 10.0607L19.9393 3.43934C19.658 3.15804 19.2765 3 18.8787 3H8C6.34315 3 5 4.34315 5 6V26C5 27.6569 6.34315 29 8 29H24C25.6569 29 27 27.6569 27 26V11.1213C27 10.7235 26.842 10.342 26.5607 10.0607Z" fill="white" fillOpacity="0.9" />
                                                        <path d="M20.7922 24V17H25.0122V18.1H22.0422V20H24.6422V21.1H22.0422V24H20.7922Z" fill="#5C6C8A" />
                                                        <path d="M14.1461 24V17H16.1961C17.9161 17 19.0961 18.42 19.0961 20.5C19.0961 22.58 17.9161 24 16.1961 24H14.1461ZM15.3961 22.9H16.1961C17.2061 22.9 17.8461 21.97 17.8461 20.5C17.8461 19.03 17.2061 18.1 16.1961 18.1H15.3961V22.9Z" fill="#5C6C8A" />
                                                        <path d="M8 24V17H10.51C11.83 17 12.75 17.89 12.75 19.15C12.75 20.41 11.83 21.3 10.51 21.3H9.25V24H8ZM9.25 20.2H10.56C11.15 20.2 11.55 19.78 11.55 19.15C11.55 18.52 11.15 18.1 10.56 18.1H9.25V20.2Z" fill="#5C6C8A" />
                                                        <g filter="url(#filter2_d_220_539)">
                                                            <path d="M19 4V11H26" fill="white" />
                                                            <path d="M19 4V11H26L19 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </g>
                                                    </g>
                                                    <defs>
                                                        <filter id="filter0_d_220_539" x="-2.66667" y="-1.33333" width="37.3333" height="37.3333" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                            <feOffset dy="1.33333" />
                                                            <feGaussianBlur stdDeviation="1.33333" />
                                                            <feColorMatrix type="matrix" values="0 0 0 0 0.643275 0 0 0 0 0.672823 0 0 0 0 0.725353 0 0 0 0.32 0" />
                                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_220_539" />
                                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_220_539" result="shape" />
                                                        </filter>
                                                        <clipPath id="bgblur_0_220_539_clip_path" transform="translate(15 17)"><path d="M26.5607 10.0607L19.9393 3.43934C19.658 3.15804 19.2765 3 18.8787 3H8C6.34315 3 5 4.34315 5 6V26C5 27.6569 6.34315 29 8 29H24C25.6569 29 27 27.6569 27 26V11.1213C27 10.7235 26.842 10.342 26.5607 10.0607Z" />
                                                        </clipPath><filter id="filter2_d_220_539" x="14" y="1" width="17" height="17" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                            <feOffset dy="2" />
                                                            <feGaussianBlur stdDeviation="2" />
                                                            <feColorMatrix type="matrix" values="0 0 0 0 0.496 0 0 0 0 0.554286 0 0 0 0 0.664 0 0 0 0.5 0" />
                                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_220_539" />
                                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_220_539" result="shape" />
                                                        </filter>
                                                    </defs>
                                                </svg>
                                                <VeltCommentDialogWireframe.ThreadCard.Attachments.Other.Name />
                                                <VeltCommentDialogWireframe.ThreadCard.Attachments.Other.Download>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="16" height="16" transform="translate(4 4)" fill="white" fillOpacity="0.01" />
                                                        <path d="M12.5 5.5L12.5 15.5" stroke="#5C6C8A" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M16.5 11.5L12.5 15.5L8.5 11.5" stroke="#5C6C8A" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M6.5 15.5V16.5C6.5 17.6046 7.39543 18.5 8.5 18.5H16.5C17.6046 18.5 18.5 17.6046 18.5 16.5V15.5" stroke="#465169" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </VeltCommentDialogWireframe.ThreadCard.Attachments.Other.Download>
                                            </div>
                                        </VeltCommentDialogWireframe.ThreadCard.Attachments.Other>
                                    </VeltCommentDialogWireframe.ThreadCard.Attachments>
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
                                                <div className="privado-comment-dialog-thread-card-bottom-wrapper-right-reply-icon-wrapper">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4.5 3.5V6.5C4.5 7.29565 4.81607 8.05871 5.37868 8.62132C5.94129 9.18393 6.70435 9.5 7.5 9.5H12.5" stroke="#465169" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M9.5 6.5L12.5 9.5L9.5 12.5" stroke="#465169" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
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
                                        <VeltIf condition="{annotation.comments.length} === 2">reply</VeltIf>
                                        <VeltIf condition="{annotation.comments.length} > 2">replies</VeltIf>
                                    </span>
                                    <div className="privado-comment-dialog-thread-card-reply-count-right"></div>
                                </div>
                            </VeltIf>

                        </VeltCommentDialogWireframe.ThreadCard>
                    </VeltCommentDialogWireframe.Threads>
                </VeltCommentDialogWireframe.Body>
                <div className="privado-composer-divider-wrapper">
                    <VeltIf condition="{focusedThreadMode}">
                        <div className="privado-focused-thread-mode-composer-divider"></div>
                    </VeltIf>
                </div>

                <VeltCommentDialogWireframe.Composer>
                    <div className="privado-comment-dialog-composer-wrapper">
                        <div className="privado-comment-dialog-composer-input-wrapper">
                            <div className="privado-comment-dialog-composer-input-wrapper-inner">
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
                            <VeltCommentDialogWireframe.Composer.Attachments>
                                <VeltCommentDialogWireframe.Composer.Attachments.Selected.Image />
                                <VeltCommentDialogWireframe.Composer.Attachments.Selected.Other>
                                    <div className="privado-comment-dialog-composer-attachments-other">
                                        <VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Icon veltIf="!{uploadingAttachments}">
                                            <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g filter="url(#filter0_d_220_539)">
                                                    <path data-figma-bg-blur-radius="20" d="M26.5607 10.0607L19.9393 3.43934C19.658 3.15804 19.2765 3 18.8787 3H8C6.34315 3 5 4.34315 5 6V26C5 27.6569 6.34315 29 8 29H24C25.6569 29 27 27.6569 27 26V11.1213C27 10.7235 26.842 10.342 26.5607 10.0607Z" fill="white" fillOpacity="0.9" />
                                                    <path d="M20.7922 24V17H25.0122V18.1H22.0422V20H24.6422V21.1H22.0422V24H20.7922Z" fill="#5C6C8A" />
                                                    <path d="M14.1461 24V17H16.1961C17.9161 17 19.0961 18.42 19.0961 20.5C19.0961 22.58 17.9161 24 16.1961 24H14.1461ZM15.3961 22.9H16.1961C17.2061 22.9 17.8461 21.97 17.8461 20.5C17.8461 19.03 17.2061 18.1 16.1961 18.1H15.3961V22.9Z" fill="#5C6C8A" />
                                                    <path d="M8 24V17H10.51C11.83 17 12.75 17.89 12.75 19.15C12.75 20.41 11.83 21.3 10.51 21.3H9.25V24H8ZM9.25 20.2H10.56C11.15 20.2 11.55 19.78 11.55 19.15C11.55 18.52 11.15 18.1 10.56 18.1H9.25V20.2Z" fill="#5C6C8A" />
                                                    <g filter="url(#filter2_d_220_539)">
                                                        <path d="M19 4V11H26" fill="white" />
                                                        <path d="M19 4V11H26L19 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </g>
                                                </g>
                                                <defs>
                                                    <filter id="filter0_d_220_539" x="-2.66667" y="-1.33333" width="37.3333" height="37.3333" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                        <feOffset dy="1.33333" />
                                                        <feGaussianBlur stdDeviation="1.33333" />
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0.643275 0 0 0 0 0.672823 0 0 0 0 0.725353 0 0 0 0.32 0" />
                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_220_539" />
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_220_539" result="shape" />
                                                    </filter>
                                                    <clipPath id="bgblur_0_220_539_clip_path" transform="translate(15 17)"><path d="M26.5607 10.0607L19.9393 3.43934C19.658 3.15804 19.2765 3 18.8787 3H8C6.34315 3 5 4.34315 5 6V26C5 27.6569 6.34315 29 8 29H24C25.6569 29 27 27.6569 27 26V11.1213C27 10.7235 26.842 10.342 26.5607 10.0607Z" />
                                                    </clipPath><filter id="filter2_d_220_539" x="14" y="1" width="17" height="17" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                        <feOffset dy="2" />
                                                        <feGaussianBlur stdDeviation="2" />
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0.496 0 0 0 0 0.554286 0 0 0 0 0.664 0 0 0 0.5 0" />
                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_220_539" />
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_220_539" result="shape" />
                                                    </filter>
                                                </defs>
                                            </svg>
                                        </VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Icon>
                                        <VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Loading>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.3" d="M2.70923 8.39768C2.68402 7.67585 2.80124 6.95612 3.05418 6.27959C3.30713 5.60306 3.69085 4.98297 4.18343 4.45474C4.67602 3.9265 5.26783 3.50046 5.92507 3.20094C6.58231 2.90142 7.2921 2.73429 8.01393 2.70908C8.73576 2.68387 9.45549 2.80109 10.132 3.05403C10.8086 3.30698 11.4286 3.6907 11.9569 4.18328C12.4851 4.67587 12.9111 5.26768 13.2107 5.92492C13.5102 6.58215 13.6773 7.29195 13.7025 8.01378C13.7277 8.73561 13.6105 9.45534 13.3576 10.1319C13.1046 10.8084 12.7209 11.4285 12.2283 11.9567C11.7357 12.485 11.1439 12.911 10.4867 13.2105C9.82945 13.51 9.11966 13.6772 8.39783 13.7024C7.676 13.7276 6.95627 13.6104 6.27974 13.3574C5.60321 13.1045 4.98312 12.7208 4.45489 12.2282C3.92665 11.7356 3.50061 11.1438 3.20109 10.4865C2.90157 9.8293 2.73444 9.1195 2.70923 8.39767L2.70923 8.39768Z" stroke="#754CFF" />
                                                <path d="M2.70923 8.39768C2.67894 7.53025 2.85437 6.66796 3.22119 5.88133C3.588 5.09469 4.13578 4.40604 4.81974 3.87167C5.5037 3.3373 6.30442 2.97239 7.15643 2.80678C8.00844 2.64117 8.88755 2.67955 9.72189 2.91879" stroke="#754CFF" strokeLinecap="round" />
                                            </svg>
                                        </VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Loading>
                                        <span className="velt-composer-comment-attachment--name">Kitchen-Work-Instruction-Template.pdf</span>
                                        <VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Name />
                                        <VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Delete>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="16" height="16" fill="white" fillOpacity="0.01" />
                                                <path d="M12.5 3.5L3.5 12.5" stroke="#5C6C8A" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3.5 3.5L12.5 12.5" stroke="#5C6C8A" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Delete>
                                    </div>
                                </VeltCommentDialogWireframe.Composer.Attachments.Selected.Other>
                            </VeltCommentDialogWireframe.Composer.Attachments>
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
