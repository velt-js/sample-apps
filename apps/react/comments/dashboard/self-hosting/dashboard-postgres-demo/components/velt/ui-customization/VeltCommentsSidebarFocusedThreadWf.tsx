import { VeltCommentsSidebarWireframe, VeltData, VeltIf } from "@veltdev/react";
import { ArrowheadRight, Close, MarkRead } from "./Icons";

const VeltCommentsSidebarFocusedThreadWf = () => {
    return (
        <VeltCommentsSidebarWireframe.FocusedThread>
            <div className="oe-comment-sidebar-header">
                <div className="flex items-center gap-2 px-[4px]">
                    <VeltCommentsSidebarWireframe.FocusedThread.BackButton>
                        <div className="p-[4px]">
                            <ArrowheadRight width={16} height={16} />
                        </div>
                    </VeltCommentsSidebarWireframe.FocusedThread.BackButton>
                    <div className="oe-comment-sidebar-header--title">
                        Thread
                    </div>
                    <div className="oe-comment-sidebar-header--id">
                        <VeltData field="focusedAnnotation.context.jobId" />
                    </div>
                </div>
            </div>
            <div className="oe-comment--metadata-container">
                <div className="oe-comment--metadata">
                    <MarkRead width={16} height={16} />
                    <span className="oe-comment--metadata-label">Field:</span>
                    <span className="oe-comment--metadata-label">Status</span>
                    <span className="oe-comment--metadata-separator">-</span>
                    <span className="oe-comment--metadata-label"><VeltData field="focusedAnnotation.context.jobStatus" /></span>
                    <div className="ml-auto pl-[2px] border-l border-gray-400">
                        <VeltCommentsSidebarWireframe.FocusedThread.BackButton>
                            <div className="p-[4px]">
                                <Close width={16} height={16} />
                            </div>
                        </VeltCommentsSidebarWireframe.FocusedThread.BackButton>
                    </div>
                </div>
            </div>

            <VeltCommentsSidebarWireframe.FocusedThread.DialogContainer />
        </VeltCommentsSidebarWireframe.FocusedThread>
    )
}

export default VeltCommentsSidebarFocusedThreadWf;