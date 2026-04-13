"use client";

import { VeltCommentDialogWireframe, VeltData, VeltIf } from "@veltdev/react";
import { SendIcon, PdfAttachmentIcon, LoadingSpinnerIcon, DeleteIcon, AttachmentIcon, MentionIcon, DefaultFileIcon, JsonFileIcon, PdfFileTypeIcon, VideoFileIcon, ImageFileIcon } from "./VeltIcons";
import {
    ComposerWrapper,
    ComposerInputWrapper,
    ComposerInputWrapperInner,
    ComposerActionsWrapper,
    ComposerActionsLeft,
    ComposerActionsRight,
    ComposerActionButtonWrapper,
    ComposerSubmitButtonWrapper,
    ComposerAttachments
} from './styled';

const VeltCommentComposerWf = () => {
    return (
        <VeltCommentDialogWireframe.Composer>
            <ComposerWrapper className="privado-comment-dialog-composer-wrapper">
                <VeltCommentDialogWireframe.Composer.AssignUser veltIf="!{annotation.annotationId}" />
                <ComposerInputWrapper className="privado-comment-dialog-composer-input-wrapper">
                    <ComposerInputWrapperInner className="privado-comment-dialog-composer-input-wrapper-inner">
                        <VeltCommentDialogWireframe.Composer.Input />
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
                            <VeltCommentDialogWireframe.Composer.Attachments.Selected.Image>
                                <ComposerAttachments>
                                    <div className="velt-comment-attachment-image-icon">
                                        <ImageFileIcon />
                                    </div>
                                    <VeltCommentDialogWireframe.Composer.Attachments.Selected.Image.Loading>
                                        <LoadingSpinnerIcon className="loading-spinner" />
                                    </VeltCommentDialogWireframe.Composer.Attachments.Selected.Image.Loading>
                                    <VeltData className="velt-composer--attachment-name" field="file.file.name" />
                                    <VeltData className="velt-composer--attachment-name" field="file.name" />
                                    <VeltCommentDialogWireframe.Composer.Attachments.Selected.Image.Delete>
                                        <DeleteIcon />
                                    </VeltCommentDialogWireframe.Composer.Attachments.Selected.Image.Delete>
                                </ComposerAttachments>
                            </VeltCommentDialogWireframe.Composer.Attachments.Selected.Image>
                            <VeltCommentDialogWireframe.Composer.Attachments.Selected.Other>
                                <ComposerAttachments>
                                    <VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Icon>
                                        <VeltIf condition="{file.fileType} === 'video/mp4' || {file.fileType} === 'audio/mpeg'">
                                            <VideoFileIcon />
                                        </VeltIf>
                                        <VeltIf condition="{file.fileType} === 'application/pdf'">
                                            <PdfFileTypeIcon />
                                        </VeltIf>
                                        <VeltIf condition="{file.fileType} === 'application/json'">
                                            <JsonFileIcon />
                                        </VeltIf>
                                        <VeltIf condition="{file.fileType} !== 'video/mp4' && {file.fileType} !== 'audio/mpeg' && {file.fileType} !== 'application/pdf' && {file.fileType} !== 'application/json'">
                                            <DefaultFileIcon />
                                        </VeltIf>
                                    </VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Icon>
                                    <VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Loading>
                                        <LoadingSpinnerIcon className="loading-spinner" />
                                    </VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Loading>
                                    <VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Name />
                                    <VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Delete>
                                        <DeleteIcon />
                                    </VeltCommentDialogWireframe.Composer.Attachments.Selected.Other.Delete>
                                </ComposerAttachments>
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
