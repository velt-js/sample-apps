import { VeltButtonWireframe, VeltCommentComposerWireframe, VeltCommentDialogWireframe, VeltInlineCommentsSectionWireframe } from "@veltdev/react";

const VeltActionCommentsComposerWf = () => {
    return (
        <VeltCommentComposerWireframe variant="action-comment-section"  className="oe-action-comment-composer-wrapper">
            <VeltCommentDialogWireframe.Composer>
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
                            <VeltButtonWireframe id="action-comment-approve-button" type="button">
                                        Approve
                            </VeltButtonWireframe>
                        </VeltCommentDialogWireframe.Composer.ActionButton>
                    </div>
                </div>
            </VeltCommentDialogWireframe.Composer>
        </VeltCommentComposerWireframe>
    )
}

export default VeltActionCommentsComposerWf;
