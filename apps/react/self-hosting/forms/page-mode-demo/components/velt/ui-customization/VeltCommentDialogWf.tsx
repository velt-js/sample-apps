"use client";

import { VeltButtonWireframe, VeltCommentDialogWireframe, VeltData, VeltIf } from "@veltdev/react";
import {
    AssignUserIcon,
    CloseCircleIcon,
    DownloadIcon,
    OptionsDotsIcon,
    PdfAttachmentIcon,
    QuestionBarIcon,
    ReplyIcon,
    ResolveIcon,
    ResolvedIcon
} from './VeltIcons';

const VeltCommentDialoglWf = () => {
    return (
        // [Velt] Custom wireframe for comment dialog
        <VeltCommentDialogWireframe>
            <div className="privado-comment-dialog-wrapper">
                <VeltCommentDialogWireframe.AssigneeBanner>
                    <div className="privado-comment-dialog-assignee-banner-wrapper">
                        <div className="privado-comment-dialog-assignee-banner-wrapper-left">
                            <VeltCommentDialogWireframe.AssigneeBanner.ResolveButton>
                                <ResolveIcon />
                                <span className="privado-comment-dialog-assignee-banner-resolve-button-text">Resolve</span>
                            </VeltCommentDialogWireframe.AssigneeBanner.ResolveButton>
                            <VeltCommentDialogWireframe.AssigneeBanner.UnresolveButton>
                                <ResolvedIcon />
                                <span className="privado-comment-dialog-assignee-banner-unresolve-button-text">Resolved by
                                    <VeltData field="annotation.resolvedByUser.name" />
                                </span>
                            </VeltCommentDialogWireframe.AssigneeBanner.UnresolveButton>
                        </div>
                        <div className="privado-comment-dialog-assignee-banner-wrapper-right">
                            Assigned to <VeltData field="annotation.assignedTo.name" />
                        </div>
                    </div>
                </VeltCommentDialogWireframe.AssigneeBanner>
                <div className="privado-comment-dialog-question-wrapper-container">
                    <VeltIf condition="!{focusedThreadMode} && !{pageModeComposer} && {annotation.context.questionTitle}">
                        <div className="privado-comment-dialog-question-wrapper">
                            <QuestionBarIcon />
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
                        <VeltCommentDialogWireframe.ThreadCard veltClass="'privado-comment-dialog-thread-card-edit-mode': {editCommentIndex} === {i}">
                            <div className="privado-comment-dialog-thread-card-wrapper">
                                <div className="privado-comment-dialog-thread-card-top-wrapper">
                                    <div className="privado-comment-dialog-thread-card-top-wrapper-left">
                                        <VeltCommentDialogWireframe.ThreadCard.Avatar />
                                        <VeltCommentDialogWireframe.ThreadCard.Name />
                                        <VeltCommentDialogWireframe.ThreadCard.Time />
                                        <VeltCommentDialogWireframe.ThreadCard.Unread />
                                        <VeltCommentDialogWireframe.ThreadCard.Edited />
                                    </div>
                                    <div className="privado-comment-dialog-thread-card-top-wrapper-right">
                                        <VeltCommentDialogWireframe.ThreadCard.AssignButton veltIf="!{annotation.resolvedByUserId}">
                                            <div className="privado-comment-dialog-thread-card-assign-button-wrapper">
                                                <AssignUserIcon />
                                            </div>
                                        </VeltCommentDialogWireframe.ThreadCard.AssignButton>
                                        <VeltCommentDialogWireframe.ThreadCard.Options veltClass="'privado-comment-dialog-thread-card-options-wrapper': {commentObj.from.userId} !== {user.userId}">
                                            <VeltCommentDialogWireframe.ThreadCard.Options.Trigger>
                                                <OptionsDotsIcon />
                                            </VeltCommentDialogWireframe.ThreadCard.Options.Trigger>
                                            <VeltCommentDialogWireframe.ThreadCard.Options.Content>
                                                <VeltCommentDialogWireframe.ThreadCard.Options.Content.Edit>
                                                    <div className="privado-comment-dialog-thread-card-options-content-item-wrapper">
                                                        Edit
                                                    </div>
                                                </VeltCommentDialogWireframe.ThreadCard.Options.Content.Edit>
                                                <VeltCommentDialogWireframe.ThreadCard.Options.Content.Delete>
                                                    <div className="privado-comment-dialog-thread-card-options-content-item-wrapper">
                                                        Delete
                                                    </div>
                                                </VeltCommentDialogWireframe.ThreadCard.Options.Content.Delete>
                                            </VeltCommentDialogWireframe.ThreadCard.Options.Content>
                                        </VeltCommentDialogWireframe.ThreadCard.Options>
                                    </div>
                                </div>
                                <div className="privado-comment-dialog-thread-card-content-wrapper">
                                    <VeltCommentDialogWireframe.ThreadCard.Message />
                                    <VeltCommentDialogWireframe.ThreadCard.Attachments>
                                        <VeltCommentDialogWireframe.ThreadCard.Attachments.Image />
                                        <VeltCommentDialogWireframe.ThreadCard.Attachments.Other>
                                            <div className="privado-comment-dialog-thread-card-attachments-other">
                                                <PdfAttachmentIcon />
                                                <VeltCommentDialogWireframe.ThreadCard.Attachments.Other.Name />
                                                <VeltCommentDialogWireframe.ThreadCard.Attachments.Other.Download>
                                                    <DownloadIcon />
                                                </VeltCommentDialogWireframe.ThreadCard.Attachments.Other.Download>
                                            </div>
                                        </VeltCommentDialogWireframe.ThreadCard.Attachments.Other>
                                    </VeltCommentDialogWireframe.ThreadCard.Attachments>
                                    <VeltCommentDialogWireframe.ThreadCard.EditComposer />
                                </div>
                                <VeltIf condition="{editCommentIndex} !== {i}" className="privado-comment-dialog-thread-card-reactions-wrapper">
                                    <div className="privado-comment-dialog-thread-card-bottom-wrapper">
                                        <div className="privado-comment-dialog-thread-card-bottom-wrapper-left">
                                            <VeltCommentDialogWireframe.ThreadCard.ReactionPin reactionId="THUMBS_UP" />
                                            <VeltCommentDialogWireframe.ThreadCard.Reactions excludeReactionIds={['THUMBS_UP']} />
                                        </div>
                                        <VeltIf condition="!{focusedThreadMode} && !{commentDialogSelected}">
                                            <div className="privado-comment-dialog-thread-card-bottom-wrapper-right">
                                                <VeltCommentDialogWireframe.ReplyAvatars />
                                                <VeltIf condition="{annotation.comments.length} === 1">
                                                    <div className="privado-comment-dialog-thread-card-bottom-wrapper-right-reply-icon-wrapper">
                                                        <ReplyIcon />
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
                                </VeltIf>
                            </div>
                            <VeltIf condition="{focusedThreadMode} && {i} === 0 && {annotation.comments.length} > 1" className="privado-comment-dialog-thread-card-reply-count-wrapper">
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

                <div className="privado-page-mode-composer-header-wrapper">
                    <VeltIf condition="{pageModeComposer} && {context.questionTitle}">
                        <VeltData field="context.questionTitle" />
                        <VeltButtonWireframe type="button" id="remove-page-mode-composer-button">
                            <CloseCircleIcon />
                        </VeltButtonWireframe>
                    </VeltIf>
                </div>

                <VeltCommentDialogWireframe.Composer />
            </div>
        </VeltCommentDialogWireframe>
    );
};

export default VeltCommentDialoglWf;
