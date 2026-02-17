'use client'

import { useCommentUtils, useVeltEventCallback, VeltCommentComposer } from '@veltdev/react'
import { CommentAnnotation } from '@veltdev/types'
import { useEffect, useState } from 'react'

interface ActionModalProps {
    jobId: string
    jobName: string
    actionType: string
    actionLabel: string
    onClose: () => void
    onSubmit: (comment: string) => void
}

const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 5L5 15M5 5l10 10" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export default function ActionModal({ jobId, jobName, actionType, actionLabel, onClose, onSubmit }: ActionModalProps) {
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const actionTargetId = `action-${jobId}-${actionType}`

    // Get action-specific styling and messaging
    const getActionConfig = () => {
        switch (actionType) {
            case 'approve':
                return {
                    title: `Approve Job ${jobId}`,
                    description: 'Add an optional comment explaining your approval decision.',
                    buttonText: 'Approve',
                    buttonClass: 'bg-green-600 hover:bg-green-700 text-white',
                    iconColor: 'text-green-600',
                }
            case 'reject':
                return {
                    title: `Reject Job ${jobId}`,
                    description: 'Please provide a reason for rejecting this job.',
                    buttonText: 'Reject',
                    buttonClass: 'bg-red-600 hover:bg-red-700 text-white',
                    iconColor: 'text-red-600',
                    required: true,
                }
            case 'dispute':
                return {
                    title: `Resolve Dispute - Job ${jobId}`,
                    description: 'Add details about how this dispute was resolved.',
                    buttonText: 'Resolve Dispute',
                    buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
                    iconColor: 'text-blue-600',
                    required: true,
                }
            case 'shortpay':
                return {
                    title: `Short Pay - Job ${jobId}`,
                    description: 'Explain the reason for short payment and the adjusted amount.',
                    buttonText: 'Submit Short Pay',
                    buttonClass: 'bg-amber-600 hover:bg-amber-700 text-white',
                    iconColor: 'text-amber-600',
                    required: true,
                }
            case 'resolve':
                return {
                    title: `Resolve Conflict - Job ${jobId}`,
                    description: 'Document how this conflict was resolved.',
                    buttonText: 'Resolve Conflict',
                    buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
                    iconColor: 'text-blue-600',
                    required: true,
                }
            case 'submit':
                return {
                    title: `Submit for Approval - Job ${jobId}`,
                    description: 'Add any notes for the approver.',
                    buttonText: 'Submit',
                    buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
                    iconColor: 'text-blue-600',
                }
            default:
                return {
                    title: `${actionLabel} - Job ${jobId}`,
                    description: 'Add a comment for this action.',
                    buttonText: actionLabel,
                    buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
                    iconColor: 'text-blue-600',
                }
        }
    }

    const config = getActionConfig()

    const handleSubmit = async () => {
        if (config.required && !comment.trim()) {
            return // Don't submit if comment is required but empty
        }

        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))

        setIsSubmitting(false)
        setShowSuccess(true)

        // Show success for a moment then close
        setTimeout(() => {
            onSubmit(comment)
        }, 1500)
    }

    // Velt button click listener
    const veltButtonClickEventData = useVeltEventCallback('veltButtonClick');

    useEffect(() => {
        if (veltButtonClickEventData?.buttonContext?.clickedButtonId === 'action-comment-approve-button' || veltButtonClickEventData?.buttonContext?.clickedButtonId === 'action-comment-cancel-button') {
            onClose();
        }
    }, [veltButtonClickEventData]);

    if (showSuccess) {
        return (
            <>
                <div className="fixed inset-0 bg-black/50 z-[60]" />
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${actionType === 'reject' || actionType === 'dispute' ? 'bg-red-100' : 'bg-green-100'
                            }`}>
                            <CheckIcon />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {actionLabel} Complete
                        </h3>
                        <p className="text-sm text-gray-500">
                            {comment.trim()
                                ? 'Your comment has been added to this job.'
                                : 'Action completed successfully.'}
                        </p>
                    </div>
                </div>
            </>
        )
    }


    const highlightDataValues = [
        {
            type: 'ApproverComment',
            label: 'Approved',
        },
        {
            type: 'SubmitToApprove',
            label: 'Submitted for approval',
        },
        {
            type: 'DisputeDiscrepancyComment',
            label: 'Dispute started: Disputed amount $57,600.00 USD',
        },
        {
            type: 'RejectApprovalComment',
            label: 'Rejected',
        }, 
        {
            type: 'ApproveForDifferentAmount',
            label: 'Invoice total override: $57,600.00 USD to $57,600.00 USD',
        },
        {
            type: 'LineItemComment',
            label: 'Line item: description',
        }
    ]

    const commentUtils = useCommentUtils();
    const [annotation, setAnnotation] = useState<CommentAnnotation | null>(null);

    useEffect(() => {
        if (!commentUtils) {
            return;
        }

        // @ts-ignore
        const subscription = commentUtils.on('composerTextChange').subscribe((event: any) => {
            console.log('Text changed:', event);
            // Store annotation by targetComposerElementId for later programmatic submission
            if (event.annotation && event.targetComposerElementId) {
                setAnnotation(event.annotation);
            }
        });

        // Cleanup: unsubscribe when component unmounts or commentUtils changes
        return () => {
            subscription?.unsubscribe();
        };
    }, [commentUtils]);

    const handleSubmitProgrammatic = async () => {
        if(annotation) {
            // Clear annotation state immediately to prevent duplicate submissions from rapid clicks
            const annotationToSubmit = annotation;
            setAnnotation(null);
            
            const result = await commentUtils?.addCommentAnnotation({ annotation: annotationToSubmit });
            console.log('addCommentAnnotation result:', result);
            (commentUtils as any)?.clearComposer({ targetComposerElementId: 'composer-1' });
        }
    }

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />

            {/* Modal */}
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">{config.title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Content */}
                    <div>
                        <p className="text-sm text-gray-600 p-6 pb-4">{config.description}</p>

                        {/* Comment input - action comments are stored but not deletable */}
                        <div
                            id={actionTargetId}
                            data-id={actionTargetId}
                            className="oe-action-comment-composer-wrapper"
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2 px-6">
                                Comment {config.required && <span className="text-red-500">*</span>}
                            </label>
                            <VeltCommentComposer variant="action-comment-section" context={{
                                jobId: jobId,
                                jobName: jobName,
                                commentType: 'action',
                                highlightData: highlightDataValues[5]
                            }} shadowDom={false} targetComposerElementId='composer-1' />
                            {/* <button onClick={() => handleSubmitProgrammatic()}>Submit</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
