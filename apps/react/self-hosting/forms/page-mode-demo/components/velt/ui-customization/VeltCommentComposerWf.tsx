"use client";

import { VeltCommentDialogWireframe } from "@veltdev/react";
import { SendIcon, PdfAttachmentIcon, LoadingSpinnerIcon, DeleteIcon, AttachmentIcon, MentionIcon } from "./VeltIcons";

const VeltCommentComposerWf = () => {
    return (
        <VeltCommentDialogWireframe.Composer>
            <div className="privado-comment-dialog-composer-wrapper">
                <VeltCommentDialogWireframe.Composer.AssignUser />
                <div className="privado-comment-dialog-composer-input-wrapper">
                    <div className="privado-comment-dialog-composer-input-wrapper-inner">
                        <VeltCommentDialogWireframe.Composer.Input placeholder="Write a comment..." />
                        <div className="privado-comment-dialog-composer-actions-right">
                            <VeltCommentDialogWireframe.Composer.ActionButton type="submit">
                                <div className="privado-comment-dialog-composer-submit-button-wrapper">
                                    <SendIcon />
                                </div>
                            </VeltCommentDialogWireframe.Composer.ActionButton>
                        </div>
                    </div>
                    <VeltCommentDialogWireframe.Composer.Attachments>
                        <VeltCommentDialogWireframe.Composer.Attachments.Selected>
                            <VeltCommentDialogWireframe.Composer.Attachments.Selected.Image />
                            <VeltCommentDialogWireframe.Composer.Attachments.Selected.Other>
                                <div className="privado-comment-dialog-composer-attachments-other">
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
                                </div>
                            </VeltCommentDialogWireframe.Composer.Attachments.Selected.Other>
                        </VeltCommentDialogWireframe.Composer.Attachments.Selected>
                    </VeltCommentDialogWireframe.Composer.Attachments>
                </div>
                <div className="privado-comment-dialog-composer-actions-wrapper">
                    <div className="privado-comment-dialog-composer-actions-left">
                        <VeltCommentDialogWireframe.Composer.ActionButton type="attachments">
                            <div className="privado-comment-dialog-composer-action-button-wrapper">
                                <AttachmentIcon />
                            </div>
                        </VeltCommentDialogWireframe.Composer.ActionButton>
                        <VeltCommentDialogWireframe.Composer.ActionButton type="userMentions">
                            <div className="privado-comment-dialog-composer-action-button-wrapper">
                                <MentionIcon />
                            </div>
                        </VeltCommentDialogWireframe.Composer.ActionButton>
                    </div>
                    <div className="privado-comment-dialog-composer-actions-right">
                        <VeltCommentDialogWireframe.Composer.ActionButton type="submit">
                            <div className="privado-comment-dialog-composer-submit-button-wrapper">
                                <SendIcon />
                            </div>
                        </VeltCommentDialogWireframe.Composer.ActionButton>
                    </div>
                </div>
            </div>
        </VeltCommentDialogWireframe.Composer>
    );
};

export default VeltCommentComposerWf;
