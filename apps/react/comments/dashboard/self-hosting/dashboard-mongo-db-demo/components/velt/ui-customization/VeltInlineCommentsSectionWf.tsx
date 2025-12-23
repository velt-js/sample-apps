import { VeltButtonWireframe, VeltData, VeltIf, VeltInlineCommentsSectionWireframe } from "@veltdev/react";
import { ArrowheadRight, Close, MarkRead } from "./Icons";

const VeltInlineCommentsSectionWf = () => {
    return (
        <VeltInlineCommentsSectionWireframe>
            <div className="oe-comment-sidebar-header">
                <div className="flex items-center gap-2 px-[4px]">
                    <VeltButtonWireframe id="close-sidebar" type="button">
                        <div className="p-[4px]">
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

            <div className="oe-comment-sidebar-header--metadata">
                <div className="oe-thread-card--metadata">
                    <MarkRead width={16} height={16} />
                    <span className="oe-thread-card--metadata-label">Field:</span>
                    <span className="oe-thread-card--metadata-label">Status</span>
                    <span className="oe-thread-card--metadata-separator">-</span>
                    <span className="oe-thread-card--metadata-label"><VeltData field="context.jobStatus" /></span>
                    <div className="ml-auto pl-[2px] border-l border-gray-400">
                        <VeltButtonWireframe id="close-sidebar" type="button">
                            <div className="p-[4px]">
                                <Close width={16} height={16} />
                            </div>
                        </VeltButtonWireframe>
                    </div>
                </div>
            </div>

            <VeltInlineCommentsSectionWireframe.Panel>
                <VeltInlineCommentsSectionWireframe.List />
                <VeltIf condition="{annotations.length} == 0">
                    <div className="flex flex-col flex-1 items-center justify-start pt-[140px]">
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