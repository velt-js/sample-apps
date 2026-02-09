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
import {
    CommentDialogWrapper,
    AssigneeBannerWrapper,
    AssigneeBannerWrapperLeft,
    AssigneeBannerWrapperRight,
    ResolveButtonText,
    QuestionWrapperContainer,
    QuestionWrapper,
    QuestionText,
    ThreadCardWrapper,
    ThreadCardTopWrapper,
    ThreadCardTopWrapperLeft,
    ThreadCardTopWrapperRight,
    AssignButtonWrapper,
    ThreadCardContentWrapper,
    AttachmentsOther,
    ThreadCardBottomWrapper,
    ThreadCardBottomWrapperLeft,
    ThreadCardBottomWrapperRight,
    ReplyIconWrapper,
    ReplyCountWrapper,
    ThreadCardReplyCount,
    ReplyCountLine,
    ReplyCountText,
    ComposerDividerWrapper,
    FocusedThreadModeComposerDivider,
    PageModeComposerHeaderWrapper,
    OptionsContentItemWrapper,
    ReactionsWrapper,
    ReplyCountWrapperOuter
} from './styled';

const VeltCommentDialoglWf = () => {
    return (
        // [Velt] Custom wireframe for comment dialog
        <VeltCommentDialogWireframe>
            <CommentDialogWrapper className="privado-comment-dialog-wrapper">
                <VeltCommentDialogWireframe.AssigneeBanner>
                    <AssigneeBannerWrapper className="privado-comment-dialog-assignee-banner-wrapper">
                        <AssigneeBannerWrapperLeft className="privado-comment-dialog-assignee-banner-wrapper-left">
                            <VeltCommentDialogWireframe.AssigneeBanner.ResolveButton>
                                <ResolveIcon />
                                <ResolveButtonText className="privado-comment-dialog-assignee-banner-resolve-button-text">Resolve</ResolveButtonText>
                            </VeltCommentDialogWireframe.AssigneeBanner.ResolveButton>
                            <VeltCommentDialogWireframe.AssigneeBanner.UnresolveButton>
                                <ResolvedIcon />
                                <ResolveButtonText className="privado-comment-dialog-assignee-banner-unresolve-button-text">Resolved by
                                    <VeltData field="annotation.resolvedByUser.name" />
                                </ResolveButtonText>
                            </VeltCommentDialogWireframe.AssigneeBanner.UnresolveButton>
                        </AssigneeBannerWrapperLeft>
                        <AssigneeBannerWrapperRight className="privado-comment-dialog-assignee-banner-wrapper-right">
                            Assigned to <VeltData field="annotation.assignedTo.name" />
                        </AssigneeBannerWrapperRight>
                    </AssigneeBannerWrapper>
                </VeltCommentDialogWireframe.AssigneeBanner>
                <QuestionWrapperContainer className="privado-comment-dialog-question-wrapper-container">
                    <VeltIf condition="!{focusedThreadMode} && !{pageModeComposer} && {annotation.context.questionTitle}">
                        <QuestionWrapper className="privado-comment-dialog-question-wrapper">
                            <QuestionBarIcon />
                            <QuestionText className="privado-comment-dialog-question-text">
                                <VeltData field="annotation.context.questionNumber" />
                                {'. '}
                                <VeltData field="annotation.context.questionTitle" />
                            </QuestionText>
                        </QuestionWrapper>
                    </VeltIf>
                </QuestionWrapperContainer>
                <VeltCommentDialogWireframe.Body>
                    <VeltCommentDialogWireframe.Threads>
                        <VeltCommentDialogWireframe.ThreadCard veltClass="'privado-comment-dialog-thread-card-edit-mode': {editCommentIndex} === {i}">
                            <ThreadCardWrapper className="privado-comment-dialog-thread-card-wrapper">
                                <ThreadCardTopWrapper className="privado-comment-dialog-thread-card-top-wrapper">
                                    <ThreadCardTopWrapperLeft className="privado-comment-dialog-thread-card-top-wrapper-left">
                                        <VeltCommentDialogWireframe.ThreadCard.Avatar />
                                        <VeltCommentDialogWireframe.ThreadCard.Name />
                                        <VeltCommentDialogWireframe.ThreadCard.Time />
                                        <VeltCommentDialogWireframe.ThreadCard.Unread />
                                        <VeltCommentDialogWireframe.ThreadCard.Edited />
                                    </ThreadCardTopWrapperLeft>
                                    <ThreadCardTopWrapperRight className="privado-comment-dialog-thread-card-top-wrapper-right">
                                        <VeltCommentDialogWireframe.ThreadCard.AssignButton veltIf="!{annotation.resolvedByUserId}">
                                            <AssignButtonWrapper className="privado-comment-dialog-thread-card-assign-button-wrapper">
                                                <AssignUserIcon />
                                            </AssignButtonWrapper>
                                        </VeltCommentDialogWireframe.ThreadCard.AssignButton>
                                        <VeltCommentDialogWireframe.ThreadCard.Options veltClass="'privado-comment-dialog-thread-card-options-wrapper': {commentObj.from.userId} !== {user.userId}">
                                            <VeltCommentDialogWireframe.ThreadCard.Options.Trigger>
                                                <OptionsDotsIcon />
                                            </VeltCommentDialogWireframe.ThreadCard.Options.Trigger>
                                            <VeltCommentDialogWireframe.ThreadCard.Options.Content>
                                                <VeltCommentDialogWireframe.ThreadCard.Options.Content.Edit>
                                                    <OptionsContentItemWrapper className="privado-comment-dialog-thread-card-options-content-item-wrapper">
                                                        Edit
                                                    </OptionsContentItemWrapper>
                                                </VeltCommentDialogWireframe.ThreadCard.Options.Content.Edit>
                                                <VeltCommentDialogWireframe.ThreadCard.Options.Content.Delete>
                                                    <OptionsContentItemWrapper className="privado-comment-dialog-thread-card-options-content-item-wrapper">
                                                        Delete
                                                    </OptionsContentItemWrapper>
                                                </VeltCommentDialogWireframe.ThreadCard.Options.Content.Delete>
                                            </VeltCommentDialogWireframe.ThreadCard.Options.Content>
                                        </VeltCommentDialogWireframe.ThreadCard.Options>
                                    </ThreadCardTopWrapperRight>
                                </ThreadCardTopWrapper>
                                <ThreadCardContentWrapper className="privado-comment-dialog-thread-card-content-wrapper">
                                    <VeltCommentDialogWireframe.ThreadCard.Message />
                                    <VeltCommentDialogWireframe.ThreadCard.Attachments>
                                        <VeltCommentDialogWireframe.ThreadCard.Attachments.Image />
                                        <VeltCommentDialogWireframe.ThreadCard.Attachments.Other>
                                            <AttachmentsOther className="privado-comment-dialog-thread-card-attachments-other">
                                                <PdfAttachmentIcon />
                                                <VeltCommentDialogWireframe.ThreadCard.Attachments.Other.Name />
                                                <VeltCommentDialogWireframe.ThreadCard.Attachments.Other.Download>
                                                    <DownloadIcon />
                                                </VeltCommentDialogWireframe.ThreadCard.Attachments.Other.Download>
                                            </AttachmentsOther>
                                        </VeltCommentDialogWireframe.ThreadCard.Attachments.Other>
                                    </VeltCommentDialogWireframe.ThreadCard.Attachments>
                                    <VeltCommentDialogWireframe.ThreadCard.EditComposer />
                                </ThreadCardContentWrapper>
                                <VeltIf condition="{editCommentIndex} !== {i}" className="privado-comment-dialog-thread-card-reactions-wrapper">
                                    <ReactionsWrapper className="privado-comment-dialog-thread-card-reactions-wrapper">
                                        <ThreadCardBottomWrapper className="privado-comment-dialog-thread-card-bottom-wrapper">
                                            <ThreadCardBottomWrapperLeft className="privado-comment-dialog-thread-card-bottom-wrapper-left">
                                                <VeltCommentDialogWireframe.ThreadCard.ReactionPin reactionId="THUMBS_UP" />
                                                <VeltCommentDialogWireframe.ThreadCard.Reactions excludeReactionIds={['THUMBS_UP']} />
                                            </ThreadCardBottomWrapperLeft>
                                            <VeltIf condition="!{focusedThreadMode} && !{commentDialogSelected}">
                                                <ThreadCardBottomWrapperRight className="privado-comment-dialog-thread-card-bottom-wrapper-right">
                                                    <VeltCommentDialogWireframe.ReplyAvatars />
                                                    <VeltIf condition="{annotation.comments.length} === 1">
                                                        <ReplyIconWrapper className="privado-comment-dialog-thread-card-bottom-wrapper-right-reply-icon-wrapper">
                                                            <ReplyIcon />
                                                        </ReplyIconWrapper>
                                                        <VeltCommentDialogWireframe.ToggleReply.Text />
                                                    </VeltIf>
                                                    <VeltIf condition="{annotation.comments.length} > 1">
                                                        <ReplyCountWrapper className="privado-comment-dialog-thread-card-bottom-wrapper-right-count-wrapper">
                                                            <VeltCommentDialogWireframe.ToggleReply.Count />
                                                            <VeltCommentDialogWireframe.ToggleReply.Text />
                                                        </ReplyCountWrapper>
                                                    </VeltIf>
                                                </ThreadCardBottomWrapperRight>
                                            </VeltIf>
                                        </ThreadCardBottomWrapper>
                                    </ReactionsWrapper>
                                </VeltIf>
                            </ThreadCardWrapper>
                            <VeltIf condition="{focusedThreadMode} && {i} === 0 && {annotation.comments.length} > 1" className="privado-comment-dialog-thread-card-reply-count-wrapper">
                                <ReplyCountWrapperOuter className="privado-comment-dialog-thread-card-reply-count-wrapper">
                                    <ThreadCardReplyCount className="privado-comment-dialog-thread-card-reply-count">
                                        <ReplyCountLine className="privado-comment-dialog-thread-card-reply-count-left" />
                                        <ReplyCountText className="privado-comment-dialog-thread-card-reply-count-text">
                                            <VeltCommentDialogWireframe.ToggleReply.Count />
                                            <VeltIf condition="{annotation.comments.length} === 2">reply</VeltIf>
                                            <VeltIf condition="{annotation.comments.length} > 2">replies</VeltIf>
                                        </ReplyCountText>
                                        <ReplyCountLine className="privado-comment-dialog-thread-card-reply-count-right" />
                                    </ThreadCardReplyCount>
                                </ReplyCountWrapperOuter>
                            </VeltIf>
                        </VeltCommentDialogWireframe.ThreadCard>
                    </VeltCommentDialogWireframe.Threads>
                </VeltCommentDialogWireframe.Body>
                <ComposerDividerWrapper className="privado-composer-divider-wrapper">
                    <VeltIf condition="{focusedThreadMode}">
                        <FocusedThreadModeComposerDivider className="privado-focused-thread-mode-composer-divider" />
                    </VeltIf>
                </ComposerDividerWrapper>

                <PageModeComposerHeaderWrapper className="privado-page-mode-composer-header-wrapper">
                    <VeltIf condition="{pageModeComposer} && {context.questionTitle}">
                        <VeltData field="context.questionTitle" />
                        <VeltButtonWireframe type="button" id="remove-page-mode-composer-button">
                            <CloseCircleIcon />
                        </VeltButtonWireframe>
                    </VeltIf>
                </PageModeComposerHeaderWrapper>

                <VeltCommentDialogWireframe.Composer />
            </CommentDialogWrapper>
        </VeltCommentDialogWireframe>
    );
};

export default VeltCommentDialoglWf;
