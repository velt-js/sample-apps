"use client";

import { VeltButtonWireframe, VeltCommentDialogWireframe, VeltData, VeltIf } from "@veltdev/react";
import {
    AssignUserIcon,
    CloseCircleIcon,
    DefaultFileIcon,
    DownloadIcon,
    ImageFileIcon,
    JsonFileIcon,
    OptionsDotsIcon,
    PdfFileTypeIcon,
    QuestionBarIcon,
    ReplyIcon,
    VideoFileIcon
} from './VeltIcons';
import {
    AssignButtonWrapper,
    Attachments,
    CommentDialogWrapper,
    ComposerDividerWrapper,
    FocusedThreadModeComposerDivider,
    OptionsContentItemWrapper,
    PageModeComposerHeaderWrapper,
    QuestionText,
    QuestionTooltip,
    QuestionWrapper,
    QuestionWrapperContainer,
    ReactionsWrapper,
    ReplyCountLine,
    ReplyCountText,
    ReplyCountWrapper,
    ReplyCountWrapperOuter,
    ReplyIconWrapper,
    ThreadCardBottomWrapper,
    ThreadCardBottomWrapperLeft,
    ThreadCardBottomWrapperRight,
    ThreadCardContentWrapper,
    ThreadCardReplyCount,
    ThreadCardTopWrapper,
    ThreadCardTopWrapperLeft,
    ThreadCardTopWrapperRight,
    ThreadCardWrapper
} from './styled';

const VeltCommentDialoglWf = () => {
    return (
        // [Velt] Custom wireframe for comment dialog
        <VeltCommentDialogWireframe>
            <CommentDialogWrapper className="privado-comment-dialog-wrapper">
                <VeltCommentDialogWireframe.AssigneeBanner veltIf="!{focusedThreadMode} && !{inlineCommentSectionMode}" />
                <VeltIf condition="!{focusedThreadMode} && !{inlineCommentSectionMode} && !{pageModeComposer} && {annotation.context.questionTitle}">
                    <VeltButtonWireframe type="button" id="navigate-to-question-button" className="privado-comment-dialog-navigate-to-question-button">
                        <QuestionWrapperContainer className="privado-comment-dialog-question-wrapper-container">
                            <QuestionWrapper className="privado-comment-dialog-question-wrapper">
                                <QuestionBarIcon />
                                <QuestionText className="privado-comment-dialog-question-text">
                                    <VeltData field="annotation.context.questionNumber" />
                                    {'. '}
                                    <VeltData field="annotation.context.questionTitle" />
                                </QuestionText>
                                <QuestionTooltip className="privado-question-tooltip">
                                    <VeltData field="annotation.context.questionTitle" />
                                </QuestionTooltip>
                            </QuestionWrapper>
                        </QuestionWrapperContainer>
                    </VeltButtonWireframe>
                </VeltIf>
                <VeltCommentDialogWireframe.Body>
                    <VeltCommentDialogWireframe.Threads>
                        <VeltCommentDialogWireframe.ThreadCard veltClass="'privado-comment-dialog-thread-card-edit-mode': {editCommentIndex} === {i}">
                            <ThreadCardWrapper className="privado-comment-dialog-thread-card-wrapper">
                                <VeltIf condition="{i} === 0 && {focusedThreadMode}" className="privado-comment-dialog-thread-card-assignee-banner-wrapper">
                                    <VeltCommentDialogWireframe.AssigneeBanner />
                                </VeltIf>
                                <ThreadCardTopWrapper className="privado-comment-dialog-thread-card-top-wrapper">
                                    <ThreadCardTopWrapperLeft className="privado-comment-dialog-thread-card-top-wrapper-left">
                                        <VeltCommentDialogWireframe.ThreadCard.Avatar />
                                        <VeltCommentDialogWireframe.ThreadCard.Name />
                                        <VeltCommentDialogWireframe.ThreadCard.Time />
                                        <VeltCommentDialogWireframe.ThreadCard.Unread />
                                        <VeltCommentDialogWireframe.ThreadCard.Edited />
                                    </ThreadCardTopWrapperLeft>
                                    <ThreadCardTopWrapperRight className="privado-comment-dialog-thread-card-top-wrapper-right">
                                        <VeltIf condition="{inlineCommentSectionMode}">
                                            <VeltCommentDialogWireframe.ThreadCard.ReactionPin reactionId="THUMBS_UP" />
                                            <VeltCommentDialogWireframe.ThreadCard.Reactions excludeReactionIds={['THUMBS_UP']} />
                                        </VeltIf>
                                        <VeltCommentDialogWireframe.ThreadCard.AssignButton veltIf="!{annotation.resolvedByUserId} && !{inlineCommentSectionMode}">
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
                                    <VeltIf className="privado-comment-dialog-thread-card-message-content-wrapper" condition="{editCommentIndex} !== {i}">
                                        <VeltCommentDialogWireframe.ThreadCard.Message />
                                        <VeltCommentDialogWireframe.ThreadCard.Attachments>
                                            <VeltCommentDialogWireframe.ThreadCard.Attachments.Image>
                                                <Attachments className="privado-comment-dialog-thread-card-attachments-other">
                                                    <ImageFileIcon />
                                                    <VeltData className="velt-comment-attachment--name" field="attachment.name" />
                                                    <VeltCommentDialogWireframe.ThreadCard.Attachments.Image.Download>
                                                        <DownloadIcon />
                                                    </VeltCommentDialogWireframe.ThreadCard.Attachments.Image.Download>
                                                </Attachments>
                                            </VeltCommentDialogWireframe.ThreadCard.Attachments.Image>
                                            <VeltCommentDialogWireframe.ThreadCard.Attachments.Other>
                                                <Attachments className="privado-comment-dialog-thread-card-attachments-other">
                                                    <VeltCommentDialogWireframe.ThreadCard.Attachments.Other.Icon>
                                                        <VeltIf condition="{attachment.type} === 'mp4' || {attachment.type} === 'mp3'">
                                                            <VideoFileIcon />
                                                        </VeltIf>
                                                        <VeltIf condition="{attachment.type} === 'pdf'">
                                                            <PdfFileTypeIcon />
                                                        </VeltIf>
                                                        <VeltIf condition="{attachment.type} === 'json'">
                                                            <JsonFileIcon />
                                                        </VeltIf>
                                                        <VeltIf condition="{attachment.type} !== 'mp4' && {attachment.type} !== 'mp3' && {attachment.type} !== 'pdf' && {attachment.type} !== 'json'">
                                                            <DefaultFileIcon />
                                                        </VeltIf>
                                                    </VeltCommentDialogWireframe.ThreadCard.Attachments.Other.Icon>
                                                    <VeltCommentDialogWireframe.ThreadCard.Attachments.Other.Name />
                                                    <VeltCommentDialogWireframe.ThreadCard.Attachments.Other.Download>
                                                        <DownloadIcon />
                                                    </VeltCommentDialogWireframe.ThreadCard.Attachments.Other.Download>
                                                </Attachments>
                                            </VeltCommentDialogWireframe.ThreadCard.Attachments.Other>
                                        </VeltCommentDialogWireframe.ThreadCard.Attachments>
                                    </VeltIf>
                                    <VeltCommentDialogWireframe.ThreadCard.EditComposer />
                                </ThreadCardContentWrapper>
                                <VeltIf condition="{editCommentIndex} !== {i}" className="privado-comment-dialog-thread-card-reactions-wrapper">
                                    <ReactionsWrapper className="privado-comment-dialog-thread-card-reactions-wrapper">
                                        <ThreadCardBottomWrapper className="privado-comment-dialog-thread-card-bottom-wrapper">
                                            <VeltIf condition="!{inlineCommentSectionMode}">
                                                <ThreadCardBottomWrapperLeft className="privado-comment-dialog-thread-card-bottom-wrapper-left">
                                                    <VeltCommentDialogWireframe.ThreadCard.ReactionPin reactionId="THUMBS_UP" />
                                                    <VeltCommentDialogWireframe.ThreadCard.Reactions excludeReactionIds={['THUMBS_UP']} />
                                                </ThreadCardBottomWrapperLeft>
                                            </VeltIf>
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
        </VeltCommentDialogWireframe >
    );
};

export default VeltCommentDialoglWf;
