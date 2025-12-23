"use client";

import { VeltCommentDialogWireframe, VeltData, VeltIf } from "@veltdev/react";
import { Reactions, Checkmark, MoreHorizontal, MarkRead, Attach1, At, ArrowUp } from "./Icons";

const VeltCommentDialogWf = () => {
    return (
        <VeltCommentDialogWireframe>
            <VeltCommentDialogWireframe.Body>
                <VeltCommentDialogWireframe.Threads>
                    <VeltCommentDialogWireframe.ThreadCard>
                        <div className="flex gap-2">
                            <div className="mt-[4px]">
                                <VeltCommentDialogWireframe.ThreadCard.Avatar />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0 gap-[8px]">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <VeltCommentDialogWireframe.ThreadCard.Name />
                                        <VeltCommentDialogWireframe.ThreadCard.Time />
                                        <VeltCommentDialogWireframe.ThreadCard.Unread />
                                    </div>
                                    <div className="flex items-center">
                                        <VeltCommentDialogWireframe.ThreadCard.ReactionTool />
                                        <VeltCommentDialogWireframe.ResolveButton>
                                            <div className="oe--icon-button">
                                                <Checkmark width={17.5} height={17.5} />
                                            </div>
                                        </VeltCommentDialogWireframe.ResolveButton>
                                        <VeltCommentDialogWireframe.ThreadCard.Options>
                                            <VeltCommentDialogWireframe.ThreadCard.Options.Trigger>
                                                <div className="oe--icon-button">
                                                    <MoreHorizontal width={17.5} height={17.5} />
                                                </div>
                                            </VeltCommentDialogWireframe.ThreadCard.Options.Trigger>
                                            <VeltCommentDialogWireframe.ThreadCard.Options.Content>
                                                <div className="oe-thread-card--options-content">
                                                    <div className="oe-thread-card--options-content-item">
                                                        Mark as read
                                                    </div>
                                                    <VeltCommentDialogWireframe.ThreadCard.Options.Content.Edit>
                                                        <div className="oe-thread-card--options-content-item">
                                                            Edit comment
                                                        </div>
                                                    </VeltCommentDialogWireframe.ThreadCard.Options.Content.Edit>
                                                    <div className="oe-thread-card--options-content-item">
                                                        Reply in thread
                                                    </div>
                                                    <VeltCommentDialogWireframe.ThreadCard.Options.Content.Delete>
                                                        <VeltCommentDialogWireframe.ThreadCard.Options.Content.Delete.Comment>
                                                            <div className="oe-thread-card--options-content-item">
                                                                Delete comment
                                                            </div>
                                                        </VeltCommentDialogWireframe.ThreadCard.Options.Content.Delete.Comment>
                                                        <VeltCommentDialogWireframe.ThreadCard.Options.Content.Delete.Thread>
                                                            <div className="oe-thread-card--options-content-item">
                                                                Delete thread
                                                            </div>
                                                        </VeltCommentDialogWireframe.ThreadCard.Options.Content.Delete.Thread>
                                                    </VeltCommentDialogWireframe.ThreadCard.Options.Content.Delete>
                                                </div>
                                            </VeltCommentDialogWireframe.ThreadCard.Options.Content>
                                        </VeltCommentDialogWireframe.ThreadCard.Options>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[8px]">
                                    <VeltIf condition="!{commentDialogSelected}">
                                        <div className="oe-thread-card--metadata">
                                            <MarkRead width={16} height={16} />
                                            <span className="oe-thread-card--metadata-label">Field:</span>
                                            <span className="oe-thread-card--metadata-label">Status</span>
                                            <span className="oe-thread-card--metadata-separator">-</span>
                                            <span className="oe-thread-card--metadata-label"><VeltData field="annotation.context.jobStatus" /></span>
                                        </div>
                                    </VeltIf>
                                    <VeltCommentDialogWireframe.ThreadCard.Message />
                                    <VeltCommentDialogWireframe.ThreadCard.Attachments />
                                    <VeltCommentDialogWireframe.ThreadCard.Reactions />
                                </div>
                            </div>
                        </div>
                    </VeltCommentDialogWireframe.ThreadCard>
                </VeltCommentDialogWireframe.Threads>
                <VeltIf condition="!{commentDialogSelected} && {annotation.comments.length} > 1">
                    <div className="flex items-center h-[32px] ml-[32px]">
                        <VeltCommentDialogWireframe.ReplyAvatars veltIf="!{commentDialogSelected}" />
                        <VeltCommentDialogWireframe.ToggleReply />
                    </div>
                </VeltIf>
            </VeltCommentDialogWireframe.Body>
            <VeltCommentDialogWireframe.Composer>
                <div className="oe-composer--content flex flex-col">
                    <div className="flex flex-col gap-[4px]">
                        <VeltCommentDialogWireframe.Composer.Attachments />
                        <VeltCommentDialogWireframe.Composer.Input />
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center">
                            <VeltCommentDialogWireframe.Composer.ActionButton type="attachments">
                                <div className="oe-composer--icon-button">
                                    <Attach1 width={18} height={18} />
                                </div>
                            </VeltCommentDialogWireframe.Composer.ActionButton>
                            <VeltCommentDialogWireframe.Composer.ActionButton type="userMentions">
                                <div className="oe-composer--icon-button">
                                    <At width={18} height={18} />
                                </div>
                            </VeltCommentDialogWireframe.Composer.ActionButton>
                        </div>
                        <div className="flex flex-row items-center">
                            <VeltCommentDialogWireframe.Composer.ActionButton type="submit">
                                <div className="oe-composer--icon-button">
                                    <ArrowUp width={18} height={18} />
                                </div>
                            </VeltCommentDialogWireframe.Composer.ActionButton>
                        </div>
                    </div>
                </div>
            </VeltCommentDialogWireframe.Composer>
        </VeltCommentDialogWireframe>
    );
};

export default VeltCommentDialogWf;
