'use client'

import { useState } from 'react'

interface ActionModalProps {
  jobId: string
  actionType: string
  actionLabel: string
  onClose: () => void
  onSubmit: (comment: string) => void
}

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 5L5 15M5 5l10 10" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function ActionModal({ jobId, actionType, actionLabel, onClose, onSubmit }: ActionModalProps) {
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

  if (showSuccess) {
    return (
      <>
        <div className="fixed inset-0 bg-black/50 z-[60]" />
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              actionType === 'reject' || actionType === 'dispute' ? 'bg-red-100' : 'bg-green-100'
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
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-4">{config.description}</p>

            {/* Comment input - action comments are stored but not deletable */}
            <div
              id={actionTargetId}
              data-id={actionTargetId}
              className="mb-4"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment {config.required && <span className="text-red-500">*</span>}
              </label>
              <div className="relative">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={`Add your ${actionType} comment here...`}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                    config.required && !comment.trim() ? 'border-gray-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {config.required && !comment.trim() && (
                <p className="mt-1 text-xs text-gray-500">A comment is required for this action.</p>
              )}
            </div>

            {/* Info about action comments */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-800">
                <strong>Note:</strong> Action comments are recorded for audit purposes and cannot be deleted.
                They will appear in the job&apos;s comment history.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || (config.required && !comment.trim())}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${config.buttonClass}`}
            >
              {isSubmitting ? 'Submitting...' : config.buttonText}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
