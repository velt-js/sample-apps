"use client";

import { VeltCommentDialogWireframe } from "@veltdev/react";
import { SendIcon, PdfAttachmentIcon, LoadingSpinnerIcon, DeleteIcon, AttachmentIcon, MentionIcon } from "./VeltIcons";
import {
    ComposerWrapper,
    ComposerInputWrapper,
    ComposerInputWrapperInner,
    ComposerActionsWrapper,
    ComposerActionsLeft,
    ComposerActionsRight,
    ComposerActionButtonWrapper,
    ComposerSubmitButtonWrapper,
    ComposerAttachmentsOther
} from './styled';

const VeltCommentComposerWf = () => {
    return (
        <VeltCommentDialogWireframe.Composer>
            <ComposerWrapper className="privado-comment-dialog-composer-wrapper">
                <VeltCommentDialogWireframe.Composer.AssignUser />
                <ComposerInputWrapper className="privado-comment-dialog-composer-input-wrapper">
                    <ComposerInputWrapperInner className="privado-comment-dialog-composer-input-wrapper-inner">
                        <VeltCommentDialogWireframe.Composer.Input placeholder="Write a comment..." />
                        <ComposerActionsRight className="privado-comment-dialog-composer-actions-right">
                            <VeltCommentDialogWireframe.Composer.ActionButton type="submit">
                                <ComposerSubmitButtonWrapper className="privado-comment-dialog-composer-submit-button-wrapper">
                                    <SendIcon />
                                </ComposerSubmitButtonWrapper>
                            </VeltCommentDialogWireframe.Composer.ActionButton>
                        </ComposerActionsRight>
                    </ComposerInputWrapperInner>
                    <VeltCommentDialogWireframe.Composer.Attachments>
                        <VeltCommentDialogWireframe.Composer.Attachments.Selected>
                            <VeltCommentDialogWireframe.Composer.Attachments.Selected.Image />
                            <VeltCommentDialogWireframe.Composer.Attachments.Selected.Other>
                                <ComposerAttachmentsOther className="privado-comment-dialog-composer-attachments-other">
                                    <VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Icon>
                                        <PdfAttachmentIcon />
                                    </VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Icon>
                                    <VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Loading>
                                        <LoadingSpinnerIcon className="loading-spinner" />
                                    </VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Loading>
                                    <VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Name />
                                    <VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Delete>
                                        <DeleteIcon />
                                    </VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Delete>
                                </ComposerAttachmentsOther>
                            </VeltCommentDialogWireframe.Composer.Attachments.Selected.Other>
                        </VeltCommentDialogWireframe.Composer.Attachments.Selected>
                    </VeltCommentDialogWireframe.Composer.Attachments>
                </ComposerInputWrapper>
                <ComposerActionsWrapper className="privado-comment-dialog-composer-actions-wrapper">
                    <ComposerActionsLeft className="privado-comment-dialog-composer-actions-left">
                        <VeltCommentDialogWireframe.Composer.ActionButton type="attachments">
                            <ComposerActionButtonWrapper className="privado-comment-dialog-composer-action-button-wrapper">
                                <AttachmentIcon />
                            </ComposerActionButtonWrapper>
                        </VeltCommentDialogWireframe.Composer.ActionButton>
                        <VeltCommentDialogWireframe.Composer.ActionButton type="userMentions">
                            <ComposerActionButtonWrapper className="privado-comment-dialog-composer-action-button-wrapper">
                                <MentionIcon />
                            </ComposerActionButtonWrapper>
                        </VeltCommentDialogWireframe.Composer.ActionButton>
                    </ComposerActionsLeft>
                    <ComposerActionsRight className="privado-comment-dialog-composer-actions-right">
                        <VeltCommentDialogWireframe.Composer.ActionButton type="submit">
                            <ComposerSubmitButtonWrapper className="privado-comment-dialog-composer-submit-button-wrapper">
                                <SendIcon />
                            </ComposerSubmitButtonWrapper>
                        </VeltCommentDialogWireframe.Composer.ActionButton>
                    </ComposerActionsRight>
                </ComposerActionsWrapper>
            </ComposerWrapper>
        </VeltCommentDialogWireframe.Composer>
    );
};

export default VeltCommentComposerWf;
