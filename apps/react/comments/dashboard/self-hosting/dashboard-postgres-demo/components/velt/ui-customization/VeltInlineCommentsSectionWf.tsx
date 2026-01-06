import { VeltButtonWireframe, VeltData, VeltIf, VeltInlineCommentsSectionWireframe } from "@veltdev/react";
import { ArrowheadRight, Close, MarkRead } from "./Icons";

const VeltInlineCommentsSectionWf = () => {
    return (
        <VeltInlineCommentsSectionWireframe>
            <div className="oe-comment-sidebar-header">
                <div className="oe-sidebar-header-left">
                    <VeltButtonWireframe id="close-sidebar" type="button">
                        <div className="oe-btn-padding-sm">
                            <ArrowheadRight width={16} height={16} />
                        </div>
                    </VeltButtonWireframe>
                    <div className="oe-comment-sidebar-header--title">
                        Thread
                    </div>
                    <div className="oe-comment-sidebar-header--id">
                        <VeltData field="context.jobId" />
                    </div>
                </div>
            </div>

            <div className="oe-comment--metadata-container">
                <div className="oe-comment--metadata">
                    <MarkRead width={16} height={16} />
                    <span className="oe-comment--metadata-label">Line:</span>
                    <span><VeltData field="context.lineItemDescription" /></span>
                    <span className="oe-comment--metadata-label">-</span>
                    <span><VeltData field="context.lineItemCurrency" /></span>
                    <span><VeltData field="context.lineItemAmount" /></span>
                    <div className="oe-metadata-close">
                        <VeltButtonWireframe id="close-sidebar" type="button">
                            <div className="oe-btn-padding-sm">
                                <Close width={16} height={16} />
                            </div>
                        </VeltButtonWireframe>
                    </div>
                </div>
            </div>

            <VeltInlineCommentsSectionWireframe.Panel>
                <VeltInlineCommentsSectionWireframe.List />
                <VeltIf condition="{annotations.length} == 0">
                    <div className="oe-inline-empty-placeholder">
                        <div className="oe-comment-sidebar-empty-placeholder--title">
                            No comments
                        </div>
                        <div className="oe-comment-sidebar-empty-placeholder--description">
                            Add a comment below.
                        </div>
                    </div>
                </VeltIf>
                <VeltInlineCommentsSectionWireframe.ComposerContainer />
            </VeltInlineCommentsSectionWireframe.Panel>
            <VeltInlineCommentsSectionWireframe.Skeleton />
        </VeltInlineCommentsSectionWireframe>
    )
}

export default VeltInlineCommentsSectionWf;
