'use client'

import { useState } from 'react'
import { VeltCommentTool, VeltCommentBubble, VeltInlineCommentsSection } from '@veltdev/react'
import type { Job, JobLineItem } from './document-canvas'
import ActionModal from './ActionModal'

interface JobDetailModalProps {
  job: Job
  isOpen: boolean
  onClose: () => void
}

// Icon components
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 5L5 15M5 5l10 10" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)


// Line item row component with inline comments
function LineItemRow({ lineItem, jobId }: { lineItem: JobLineItem; jobId: string }) {
  const [showComments, setShowComments] = useState(false)
  const targetId = `lineitem-${jobId}-${lineItem.id}`

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <div className="flex items-center py-3 px-4 hover:bg-gray-50">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{lineItem.description}</p>
        </div>
        <div className="w-20 text-right">
          <span className="text-sm text-gray-600">{lineItem.quantity}</span>
        </div>
        <div className="w-28 text-right">
          <span className="text-sm text-gray-600">${lineItem.unitPrice.toFixed(2)}</span>
        </div>
        <div className="w-28 text-right">
          <span className="text-sm font-medium text-gray-900">${lineItem.total.toFixed(2)}</span>
        </div>
        <div className="w-24 flex items-center justify-end" id={targetId} data-id={targetId}>
          <div className="flex items-center justify-center min-w-[64px]">
            <VeltCommentTool targetElementId={targetId} />
            <VeltCommentBubble targetElementId={targetId} />
          </div>
        </div>
      </div>

      {/* Inline comments section for this line item */}
      {showComments && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-2">Comments for: {lineItem.description}</div>
          <VeltInlineCommentsSection
            targetElementId={targetId}
            multiThread={false}
            shadowDom={false}
          />
        </div>
      )}
    </div>
  )
}

export default function JobDetailModal({ job, isOpen, onClose }: JobDetailModalProps) {
  const [actionModal, setActionModal] = useState<{ type: string; label: string } | null>(null)

  if (!isOpen) return null

  const jobTargetId = `job-${job.id}`

  // Calculate totals
  const subtotal = job.lineItems.reduce((sum, item) => sum + item.total, 0)
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

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

  const handleActionSubmit = () => {
    setActionModal(null)
    // In a real app, you would process the action here
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-10 lg:inset-20 bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Job {job.id}</h2>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
              job.statusType === 'review' ? 'bg-violet-100 text-violet-700' :
              job.statusType === 'dispute' ? 'bg-red-100 text-red-700' :
              job.statusType === 'conflict' ? 'bg-red-100 text-red-700' :
              job.statusType === 'submit' ? 'bg-green-100 text-green-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {job.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <CloseIcon />
          </button>
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

            {/* Job-level comments section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">Job Comments</h3>
                <div className="flex items-center gap-2" id={jobTargetId} data-id={jobTargetId}>
                  <div className="flex items-center justify-center min-w-[64px]">
                    <VeltCommentTool targetElementId={jobTargetId} />
                    <VeltCommentBubble targetElementId={jobTargetId} />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <VeltInlineCommentsSection
                  targetElementId={jobTargetId}
                  multiThread={false}
                  shadowDom={false}
                />
              </div>
            </div>

            {/* Line Items Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Line Items</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center py-2 px-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex-1 text-xs font-medium text-gray-500">Description</div>
                  <div className="w-20 text-right text-xs font-medium text-gray-500">Qty</div>
                  <div className="w-28 text-right text-xs font-medium text-gray-500">Unit Price</div>
                  <div className="w-28 text-right text-xs font-medium text-gray-500">Total</div>
                  <div className="w-24 text-right text-xs font-medium text-gray-500">Comments</div>
                </div>

                {/* Line Items */}
                {job.lineItems.map((lineItem) => (
                  <LineItemRow key={lineItem.id} lineItem={lineItem} jobId={job.id} />
                ))}

                {/* Totals */}
                <div className="bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center py-2 px-4">
                    <div className="flex-1"></div>
                    <div className="w-20"></div>
                    <div className="w-28 text-right text-xs text-gray-500">Subtotal</div>
                    <div className="w-28 text-right text-sm text-gray-900">${subtotal.toFixed(2)}</div>
                    <div className="w-24"></div>
                  </div>
                  <div className="flex items-center py-2 px-4">
                    <div className="flex-1"></div>
                    <div className="w-20"></div>
                    <div className="w-28 text-right text-xs text-gray-500">Tax (8%)</div>
                    <div className="w-28 text-right text-sm text-gray-900">${tax.toFixed(2)}</div>
                    <div className="w-24"></div>
                  </div>
                  <div className="flex items-center py-3 px-4 border-t border-gray-200">
                    <div className="flex-1"></div>
                    <div className="w-20"></div>
                    <div className="w-28 text-right text-sm font-semibold text-gray-900">Total</div>
                    <div className="w-28 text-right text-base font-bold text-gray-900">${total.toFixed(2)}</div>
                    <div className="w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          {actions.map((action) => (
            <button
              key={action.type}
              onClick={() => handleActionClick(action)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                action.variant === 'primary'
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

      {/* Action Modal */}
      {actionModal && (
        <ActionModal
          jobId={job.id}
          actionType={actionModal.type}
          actionLabel={actionModal.label}
          onClose={handleActionClose}
          onSubmit={handleActionSubmit}
        />
      )}
    </>
  )
}
