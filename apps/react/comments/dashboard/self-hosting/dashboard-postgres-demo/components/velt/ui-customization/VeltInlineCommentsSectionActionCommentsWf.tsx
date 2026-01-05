import { VeltCommentDialogWireframe, VeltInlineCommentsSectionWireframe } from "@veltdev/react";

const VeltInlineCommentsSectionActionCommentsWf = () => {
    return (
        <VeltInlineCommentsSectionWireframe variant="action-comment-section">
            <VeltInlineCommentsSectionWireframe.Panel>
            <VeltInlineCommentsSectionWireframe.ComposerContainer>
            <VeltCommentDialogWireframe.Composer veltClass="'oe-disabled': {annotation.context.commentType} === 'action'">
                <div className="oe-action-composer">
                    {/* Textarea Input */}
                    <div className="oe-action-composer-input-wrapper">
                        <VeltCommentDialogWireframe.Composer.Input placeholder="Add your approve comment here..." />
                    </div>

                    {/* Info about action comments */}
                    <div className="oe-action-composer-note">
                        <p className="oe-action-composer-note-text">
                            <strong>Note:</strong> Action comments are recorded for audit purposes and cannot be deleted.
                            They will appear in the job&apos;s comment history.
                        </p>
                    </div>

                    {/* Approve Button */}
                    <div className="oe-action-composer-buttons">
                        <VeltCommentDialogWireframe.Composer.ActionButton type="submit">
                            <button type="button" className="oe-action-btn-approve">
                                Approve
                            </button>
                        </VeltCommentDialogWireframe.Composer.ActionButton>
                    </div>
                </div>
            </VeltCommentDialogWireframe.Composer>
            </VeltInlineCommentsSectionWireframe.ComposerContainer>
            </VeltInlineCommentsSectionWireframe.Panel>
        </VeltInlineCommentsSectionWireframe>
    )
}

export default VeltInlineCommentsSectionActionCommentsWf;
