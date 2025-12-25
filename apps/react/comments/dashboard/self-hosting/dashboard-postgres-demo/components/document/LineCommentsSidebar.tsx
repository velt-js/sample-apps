import { VeltInlineCommentsSection } from '@veltdev/react'
import { Job } from './types'

interface CommentsSidebarProps {
    isOpen: boolean
    selectedJob: Job | null
    onClose?: () => void
}

// Simplified sidebar - event handling moved to parent (DocumentCanvas)
export const LineCommentsSidebar = ({ isOpen, selectedJob, onClose }: CommentsSidebarProps) => {
    if (!isOpen || !selectedJob) return null;

    return (
        <div 
            className="fixed top-[45px] right-0 w-[552px] h-[calc(100vh-45px)] bg-white z-50 border-l border-gray-200 oe-comment-sidebar-inline overflow-hidden"
            id={`job-${selectedJob.id}`}
        >
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
