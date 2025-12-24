import { VeltCommentsSidebarWireframe } from "@veltdev/react";

const VeltCommentsSidebarEmptyPlaceholderWf = () => {
    return (
        <VeltCommentsSidebarWireframe.EmptyPlaceholder>
            <div className="flex flex-col items-center justify-start pt-[140px]">
                <div className="oe-comment-sidebar-empty-placeholder--title">
                    No comments
                </div>
                <div className="oe-comment-sidebar-empty-placeholder--description">
                    Add a comment below.
                </div>
            </div>
        </VeltCommentsSidebarWireframe.EmptyPlaceholder>
    )
}

export default VeltCommentsSidebarEmptyPlaceholderWf;