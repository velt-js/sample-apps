"use client";

import { VeltCommentDialogWireframe } from "@veltdev/react";
import { ArrowUp } from "lucide-react";
import { At } from "./Icons";

const VeltCommentComposerWf = () => {
    return (
        <VeltCommentDialogWireframe.Composer veltClass="'oe-disabled': {annotation.context.commentType} === 'action'">
                <div className="oe-composer--content oe-composer-wrapper">
                    <div className="oe-composer-input-section">
                        <VeltCommentDialogWireframe.Composer.Attachments />
                        <VeltCommentDialogWireframe.Composer.Input />
                    </div>
                    <div className="oe-composer-actions">
                        <div className="oe-composer-actions-group">
                            <VeltCommentDialogWireframe.Composer.ActionButton type="userMentions">
                                <div className="oe-composer--icon-button">
                                    <At width={18} height={18} />
                                </div>
                            </VeltCommentDialogWireframe.Composer.ActionButton>
                        </div>
                        <div className="oe-composer-actions-group">
                            <VeltCommentDialogWireframe.Composer.ActionButton type="submit">
                                <div className="oe-composer--icon-button">
                                    <ArrowUp width={18} height={18} />
                                </div>
                            </VeltCommentDialogWireframe.Composer.ActionButton>
                        </div>
                    </div>
                </div>
            </VeltCommentDialogWireframe.Composer>
    );
};

export default VeltCommentComposerWf;
