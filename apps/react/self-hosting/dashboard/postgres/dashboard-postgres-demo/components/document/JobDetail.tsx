'use client'

import { useState, useEffect, useMemo } from 'react'
import { useVeltEventCallback, useGetCommentAnnotations, useAddCommentAnnotation, useVeltClient } from '@veltdev/react'
import type { AddCommentAnnotationRequest, CommentAnnotation } from '@veltdev/types'
import ActionModal from './ActionModal'
import { LineItemCommentsSidebar } from './LineItemCommentsSidebar'
import { BackIcon, GLIcon, TagIcon, CommentIcon, EditIcon } from './icons'
import type { Job, JobLineItem } from './types'

// Line item row component
function LineItemRow({
    lineItem,
    jobId,
    onCommentClick,
    annotationData
}: {
    lineItem: JobLineItem;
    jobId: string;
    onCommentClick: (lineItem: JobLineItem) => void;
    annotationData: { count: number; hasUnread: boolean } | undefined;
}) {
    const formatCurrency = (value: number, currency: string) => {
        const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$'
        return `${symbol}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }

    const count = annotationData?.count || 0;
    const hasUnread = annotationData?.hasUnread || false;

    const { client } = useVeltClient();

    const handleEditLineItem = () => {
        const oldTitle = 'Office Chair Ergonomic Updated 2'
        const updatedContext = { lineItemDescription: 'Office Chair Ergonomic Updated 3' };
        const updateContextConfig = { merge: true };
        const commentElement = client?.getCommentElement();
        commentElement?.getAllCommentAnnotations().subscribe((commentAnnotations: CommentAnnotation[] | null) => {
            commentAnnotations?.forEach((commentAnnotation) => {
                if (commentAnnotation.context?.lineItemDescription === oldTitle) {
                    commentElement?.updateContext(commentAnnotation.annotationId, updatedContext, updateContextConfig);
                }
            })
        });
    }

    return (
        <div className="border-b border-gray-100 last:border-b-0">
            <div className="flex items-start py-4 px-6 gap-6 hover:bg-gray-50/50 transition-colors">
                {/* Itemized charges - Description with icons */}
                <div className="w-[180px] min-w-[180px]">
                    <p className="text-sm font-medium text-gray-900 mb-2">{lineItem.description}</p>
                    <div className="flex items-center gap-3">
                        <button className="hover:opacity-70 transition-opacity" title="GL">
                            <GLIcon />
                        </button>
                        <button className="hover:opacity-70 transition-opacity" title="Tag">
                            <TagIcon />
                        </button>
                        <button className="hover:opacity-70 transition-opacity" title="Edit" onClick={() => handleEditLineItem()}>
                            <EditIcon />
                        </button>
                    </div>
                </div>

                {/* Comment button - separate column */}
                <div className="w-[60px] min-w-[60px] flex items-center justify-center">
                    <button
                        onClick={() => onCommentClick(lineItem)}
                        className="flex items-center justify-center px-1 py-1.5 hover:bg-gray-100 rounded transition-colors"
                        title="Comments"
                    >
                        <CommentIcon count={count} hasUnread={hasUnread} />
                    </button>
                </div>

                {/* Quantity */}
                <div className="w-[70px] min-w-[70px] text-center">
                    <span className="text-sm text-gray-700">{lineItem.quantity}</span>
                </div>

                {/* Currency */}
                <div className="w-[70px] min-w-[70px] text-center">
                    <span className="text-sm font-medium text-gray-700">{lineItem.currency}</span>
                </div>

                {/* Unit */}
                <div className="w-[60px] min-w-[60px] text-center">
                    <span className="text-sm text-gray-600">{lineItem.unit}</span>
                </div>

                {/* Unit Price */}
                <div className="w-[90px] min-w-[90px] text-right">
                    <span className="text-sm text-gray-700">{formatCurrency(lineItem.unitPrice, lineItem.currency)}</span>
                </div>

                {/* Discount % */}
                <div className="w-[80px] min-w-[80px] text-center">
                    <span className="text-sm text-gray-600">{lineItem.discountPercent}%</span>
                </div>

                {/* Amt pre tax */}
                <div className="w-[100px] min-w-[100px] text-right">
                    <span className="text-sm text-gray-700">{formatCurrency(lineItem.amtPreTax, lineItem.currency)}</span>
                </div>

                {/* Tax % */}
                <div className="w-[60px] min-w-[60px] text-center">
                    <span className="text-sm text-gray-600">{lineItem.taxPercent}%</span>
                </div>

                {/* Amount */}
                <div className="w-[100px] min-w-[100px] text-right">
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(lineItem.amount, lineItem.currency)}</span>
                </div>
            </div>
        </div>
    )
}

interface JobDetailProps {
    job: Job
    onBack: () => void
}

export default function JobDetail({ job, onBack }: JobDetailProps) {
    const [actionModal, setActionModal] = useState<{ type: string; label: string } | null>(null)
    const [selectedLineItem, setSelectedLineItem] = useState<{ lineItem: JobLineItem; jobId: string; jobName: string } | null>(null)
    const [isCommentSidebarOpen, setIsCommentSidebarOpen] = useState(false)

    // Velt hooks for comment annotations
    const commentAnnotations = useGetCommentAnnotations();
    const { addCommentAnnotation } = useAddCommentAnnotation();

    // Create a map of targetElementId -> { count, hasUnread }
    const annotationDataByTargetId = useMemo(() => {
        const dataMap: Record<string, { count: number; hasUnread: boolean }> = {};
        if (commentAnnotations?.data) {
            // Iterate through all document arrays
            Object.values(commentAnnotations.data).forEach((annotations: any[]) => {
                annotations.forEach((annotation) => {
                    const targetId = annotation.targetElementId;
                    if (targetId) {
                        if (!dataMap[targetId]) {
                            dataMap[targetId] = { count: 0, hasUnread: false };
                        }
                        if(annotation.status.id !== 'RESOLVED') {
                            dataMap[targetId].count = annotation.comments.length;
                        }

                        // Use the pre-computed unread property from the annotation
                        if (annotation.unread) {
                            dataMap[targetId].hasUnread = true;
                        }
                    }
                });
            });
        }
        return dataMap;
    }, [commentAnnotations]);

    // Velt button click listener
    const veltButtonClickEventData = useVeltEventCallback('veltButtonClick');
    const { client } = useVeltClient();

    // Handle close button click from Velt component
    useEffect(() => {
        if (veltButtonClickEventData?.buttonContext?.clickedButtonId === 'close-sidebar') {
            setIsCommentSidebarOpen(false);
            setSelectedLineItem(null);
        }
        if (veltButtonClickEventData?.buttonContext?.clickedButtonId === 'reply-in-thread-button') {
            if(client) {
                const commentElement = client.getCommentElement();
                commentElement?.selectCommentByAnnotationId(veltButtonClickEventData?.commentAnnotation?.annotationId)
            }
        }
    }, [veltButtonClickEventData, client]);

    const handleLineItemCommentClick = (lineItem: JobLineItem) => {
        setSelectedLineItem({ lineItem, jobId: job.id, jobName: job.jobName })
        setIsCommentSidebarOpen(true)
    }

    // Calculate totals
    const subtotal = job.lineItems.reduce((sum, item) => sum + item.amtPreTax, 0)
    const taxTotal = job.lineItems.reduce((sum, item) => sum + (item.amtPreTax * item.taxPercent / 100), 0)
    const total = job.lineItems.reduce((sum, item) => sum + item.amount, 0)

    // Determine available actions based on status
    const getAvailableActions = () => {
        const actions: { type: string; label: string; variant: 'primary' | 'secondary' | 'danger' }[] = []

        switch (job.statusType) {
            case 'review':
                actions.push({ type: 'approve', label: 'Approve', variant: 'primary' })
                actions.push({ type: 'reject', label: 'Reject', variant: 'danger' })
                break
            case 'dispute':
                actions.push({ type: 'dispute', label: 'Resolve Dispute', variant: 'primary' })
                actions.push({ type: 'shortpay', label: 'Short Pay', variant: 'secondary' })
                break
            case 'conflict':
                actions.push({ type: 'resolve', label: 'Resolve Conflict', variant: 'primary' })
                break
            case 'submit':
                actions.push({ type: 'submit', label: 'Submit for Approval', variant: 'primary' })
                break
            default:
                actions.push({ type: 'approve', label: 'Approve', variant: 'primary' })
        }

        return actions
    }

    const actions = getAvailableActions()

    const handleActionClick = (action: { type: string; label: string }) => {
        setActionModal(action)
    }

    const handleActionClose = () => {
        setActionModal(null)
    }

    const handleActionSubmit = (comment: string) => {
        console.log('Action submitted with comment:', comment)
        // TODO: Handle the comment (e.g., save to API, update job record)
        const commentAnnotation = {
            comments: [
                {
                    commentText: comment,
                    commentHtml: `<p>${comment}</p>`,
                }
            ],
            context: {
                commentType: 'action',
                jobStatus: job.status,
                jobId: job.id,
                jobName: job.jobName,
            }
        };
        const addCommentAnnotationRequest: AddCommentAnnotationRequest = {
            annotation: commentAnnotation as CommentAnnotation
        };

        addCommentAnnotation(addCommentAnnotationRequest);

        setActionModal(null)
    }


    return (
        <>
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
                {/* Page Header with Back Button */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <BackIcon />
                        </button>
                        <h2 className="text-xl font-semibold text-gray-900">Job {job.id}</h2>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${job.statusType === 'review' ? 'bg-violet-100 text-violet-700' :
                                job.statusType === 'dispute' ? 'bg-red-100 text-red-700' :
                                    job.statusType === 'conflict' ? 'bg-red-100 text-red-700' :
                                        job.statusType === 'submit' ? 'bg-green-100 text-green-700' :
                                            'bg-gray-100 text-gray-700'
                            }`}>
                            {job.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        {actions.map((action) => (
                            <button
                                key={action.type}
                                onClick={() => handleActionClick(action)}
                                className={`px-4 py-2 text-sm font-medium rounded-lg ${action.variant === 'primary'
                                        ? 'text-white bg-blue-600 hover:bg-blue-700'
                                        : action.variant === 'danger'
                                            ? 'text-white bg-red-600 hover:bg-red-700'
                                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto">
                    <div className="p-6">
                        {/* Job Info Section */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Ownership</p>
                                <p className="text-sm font-medium text-gray-900">{job.ownership.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Due Date</p>
                                <p className="text-sm font-medium text-gray-900">{job.due}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Approval Policy</p>
                                <p className="text-sm font-medium text-gray-900">{job.policy}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Total</p>
                                <p className="text-sm font-medium text-gray-900">{job.cost || `$${total.toFixed(2)}`}</p>
                            </div>
                        </div>

                        {/* Line Items Section */}
                        <div className="mb-6">
                            <div className="border border-gray-200 rounded-lg overflow-hidden overflow-x-auto">
                                {/* Header */}
                                <div className="flex items-center py-3 px-6 gap-6 border-b border-gray-200 bg-white min-w-[924px]">
                                    <div className="w-[180px] min-w-[180px] text-xs font-normal text-gray-400">Itemized charges</div>
                                    <div className="w-[60px] min-w-[60px] text-xs font-normal text-gray-400 text-center">Comments</div>
                                    <div className="w-[70px] min-w-[70px] text-xs font-normal text-gray-400 text-center">Quantity</div>
                                    <div className="w-[70px] min-w-[70px] text-xs font-normal text-gray-400 text-center">Currency</div>
                                    <div className="w-[60px] min-w-[60px] text-xs font-normal text-gray-400 text-center">Unit</div>
                                    <div className="w-[90px] min-w-[90px] text-xs font-normal text-gray-400 text-right">Unit Price</div>
                                    <div className="w-[80px] min-w-[80px] text-xs font-normal text-gray-400 text-center">Discount %</div>
                                    <div className="w-[100px] min-w-[100px] text-xs font-normal text-gray-400 text-right">Amt pre tax</div>
                                    <div className="w-[60px] min-w-[60px] text-xs font-normal text-gray-400 text-center">Tax %</div>
                                    <div className="w-[100px] min-w-[100px] text-xs font-normal text-gray-400 text-right">Amount</div>
                                </div>

                                {/* Divider line */}
                                <div className="h-px bg-violet-200 mx-6" />

                                {/* Line Items */}
                                <div className="min-w-[924px]">
                                    {job.lineItems.map((lineItem) => (
                                        <LineItemRow
                                            key={lineItem.id}
                                            lineItem={lineItem}
                                            jobId={job.id}
                                            onCommentClick={handleLineItemCommentClick}
                                            annotationData={annotationDataByTargetId[`lineitem-${job.id}-${lineItem.id}`]}
                                        />
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="bg-gray-50 border-t border-gray-200 min-w-[924px]">
                                    <div className="flex items-center py-2 px-6">
                                        <div className="flex-1"></div>
                                        <div className="w-[110px] min-w-[110px] text-right">
                                            <span className="text-xs text-gray-500">Subtotal: </span>
                                            <span className="text-sm text-gray-900">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center py-2 px-6">
                                        <div className="flex-1"></div>
                                        <div className="w-[110px] min-w-[110px] text-right">
                                            <span className="text-xs text-gray-500">Tax: </span>
                                            <span className="text-sm text-gray-900">${taxTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center py-3 px-6 border-t border-gray-200">
                                        <div className="flex-1"></div>
                                        <div className="w-[110px] min-w-[110px] text-right">
                                            <span className="text-sm font-semibold text-gray-900">Total: </span>
                                            <span className="text-base font-bold text-gray-900">${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Line Item Comments Sidebar */}
            <LineItemCommentsSidebar
                isOpen={isCommentSidebarOpen}
                selectedLineItem={selectedLineItem}
                onClose={() => {
                    setIsCommentSidebarOpen(false)
                    setSelectedLineItem(null)
                }}
            />

            {/* Action Modal */}
            {actionModal && (
                <ActionModal
                    jobId={job.id}
                    jobName={job.jobName}
                    actionType={actionModal.type}
                    actionLabel={actionModal.label}
                    onClose={handleActionClose}
                    onSubmit={handleActionSubmit}
                />
            )}
        </>
    )
}

