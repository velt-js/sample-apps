import { useVeltEventCallback, VeltInlineCommentsSection } from '@veltdev/react'
import { ChevronLeftIcon } from './icons'
import { Job } from './types'
import { ArrowheadRight } from '../velt/ui-customization/Icons'
import { useEffect } from 'react'

interface CommentsSidebarProps {
    isOpen: boolean
    onClose: () => void
    selectedJob: Job | null
}

export const CommentsSidebar = ({ isOpen, onClose, selectedJob }: CommentsSidebarProps) => {
    const veltButtonClickEventData = useVeltEventCallback('veltButtonClick');
    useEffect(() => {
        if (veltButtonClickEventData) {
            if (veltButtonClickEventData.buttonContext?.clickedButtonId === 'close-sidebar') {
                onClose();
            }
        }
    }, [veltButtonClickEventData, onClose]);

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
