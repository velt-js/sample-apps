import { VeltInlineCommentsSection } from '@veltdev/react'
import { JobLineItem } from './types'

interface LineItemCommentsSidebarProps {
    isOpen: boolean
    selectedLineItem: { lineItem: JobLineItem; jobId: string } | null
    onClose?: () => void
}

export const LineItemCommentsSidebar = ({ isOpen, selectedLineItem, onClose }: LineItemCommentsSidebarProps) => {
    if (!isOpen || !selectedLineItem) return null;

    const targetId = `lineitem-${selectedLineItem.jobId}-${selectedLineItem.lineItem.id}`

    return (
        <div 
            className="oe-comment-sidebar-inline"
            id={targetId}
        >
            <VeltInlineCommentsSection
                context={{ 
                    jobId: selectedLineItem.jobId,
                    lineItemId: selectedLineItem.lineItem.id,
                    lineItemDescription: selectedLineItem.lineItem.description,
                    lineItemCurrency: selectedLineItem.lineItem.currency,
                    lineItemAmount: selectedLineItem.lineItem.amount,
                    commentType: 'lineItem'
                }}
                targetElementId={targetId}
                shadowDom={false}
                composerPosition="bottom"
                multiThread={false}
            />
        </div>
    )
}
