import { VeltInlineCommentsSection } from '@veltdev/react'
import { JobLineItem } from './types'

interface LineItemCommentsModalProps {
    isOpen: boolean
    selectedLineItem: { lineItem: JobLineItem; jobId: string; jobName: string } | null
    onClose: () => void
}

const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 5L5 15M5 5l10 10" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export const LineItemCommentsModal = ({ isOpen, selectedLineItem, onClose }: LineItemCommentsModalProps) => {
    if (!isOpen || !selectedLineItem) return null

    const targetId = `lineitem-${selectedLineItem.jobId}-${selectedLineItem.lineItem.id}`

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />

            {/* Modal */}
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                <div
                    className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 pt-4 shrink-0">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                {selectedLineItem.lineItem.description}
                            </h2>
                            <p className="text-sm text-gray-500 mt-0.5">
                                Line item comments - Job {selectedLineItem.jobId}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Comments Section */}
                    <div
                        className="flex-1 overflow-auto oe-comment-modal-inline"
                        id={targetId}
                    >
                        <VeltInlineCommentsSection
                            context={{ 
                                jobId: selectedLineItem.jobId,
                                jobName: selectedLineItem.jobName,
                                lineItemId: selectedLineItem.lineItem.id,
                                lineItemDescription: selectedLineItem.lineItem.description,
                                lineItemCurrency: selectedLineItem.lineItem.currency,
                                lineItemAmount: selectedLineItem.lineItem.amount,
                                commentType: 'lineItem'
                            }}
                            variant="action-inline-composer"
                            targetElementId={targetId}
                            shadowDom={false}
                            composerPosition="bottom"
                            multiThread={false}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
