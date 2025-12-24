import { VeltInlineCommentsSection } from '@veltdev/react'
import { Job } from './types'

interface CommentsSidebarProps {
    isOpen: boolean
    selectedJob: Job | null
}

// Simplified sidebar - event handling moved to parent (DocumentCanvas)
export const LineCommentsSidebar = ({ isOpen, selectedJob }: CommentsSidebarProps) => {
    if (!isOpen || !selectedJob) return null;

    return (
        <div className="oe-comment-sidebar-inline" id={`job-${selectedJob.id}`}>
            <VeltInlineCommentsSection
                context={{ jobId: `job-${selectedJob.id}`, jobStatus: selectedJob.status }}
                targetElementId={`job-${selectedJob.id}`}
                shadowDom={false}
                composerPosition="bottom"
                multiThread={false}
            />
        </div>
    )
}
