import { useCurrentUser, useGetCommentAnnotations, useCommentAnnotationsCount } from '@veltdev/react'
import { ChevronDownIcon, GearIcon, CommentIcon } from './icons'
import { Avatar } from './Avatar'
import { StatusBadge } from './StatusBadge'
import { DueBadge } from './DueBadge'
import { Job } from './types'
import { useEffect, useMemo } from 'react'

interface JobsTableProps {
  jobs: Job[]
  onJobClick: (job: Job) => void
}

export const JobsTable = ({ jobs, onJobClick }: JobsTableProps) => {

  // Get document IDs from the current page's jobs (max 30)
  const jobDocumentIds = useMemo(() => jobs.slice(0, 30).map(job => job.id), [jobs]);

  const { data: commentAnnotationsCount } = useCommentAnnotationsCount({
    documentIds: jobDocumentIds
  });
  
  useEffect(() => {
    if (commentAnnotationsCount) {
      console.log('Comment annotations count for multiple documents:', commentAnnotationsCount);
    }
  }, [commentAnnotationsCount]);

  return (
    <div className="flex-1 overflow-auto px-8">
      <table className="w-full min-w-[1200px]">
        <thead className="sticky top-0 bg-white z-10">
          <tr className="border-b border-gray-200">
            <th className="w-12 py-2 px-3 text-left">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            </th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">
              <div className="flex items-center gap-1">
                Job <ChevronDownIcon />
              </div>
            </th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Cost</th>
            <th className="w-20 py-2 px-3 text-left text-xs font-medium text-gray-500">Comments</th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Ownership</th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Due</th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Current approver</th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Approval policy</th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">Status</th>
            <th className="w-10 py-2 px-3">
              <GearIcon />
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {jobs.map((job) => (
            <tr
              key={job.id}
              className="hover:bg-gray-50 cursor-pointer"
              id={`job-${job.id}`}
              data-id={`job-${job.id}`}
            >
              <td className="py-3 px-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td className="py-3 px-3">
                <span
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    onJobClick(job)
                  }}
                >
                  {job.id}
                </span>
              </td>
              <td className="py-3 px-3">
                <span className="text-sm text-gray-900">{job.cost}</span>
              </td>
              <td className="py-3 px-3">
                <div
                  className="flex items-center justify-center min-w-[64px] relative overflow-visible"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* <VeltCommentTool targetElementId={`job-${job.id}`} context={{jobId: `job-${job.id}`, jobStatus: job.status}} />
                  <VeltCommentBubble
                    targetElementId={`job-${job.id}`}
                    openDialog={false}
                    shadowDom={false}
                  /> */}
                  {(() => {
                    const data = commentAnnotationsCount?.[job.id];
                    const count = data?.total || 0;
                    const hasUnread = (data?.unread || 0) > 0;
                    return (
                      <button 
                        className="flex items-center justify-center px-1 py-1.5 hover:bg-gray-100 rounded transition-colors"
                        aria-label="View comments"
                      >
                        <CommentIcon count={count} hasUnread={hasUnread} />
                      </button>
                    );
                  })()}
                </div>
              </td>
              <td className="py-3 px-3">
                <div className="flex items-center gap-2">
                  <Avatar initials={job.ownership.initials} color={job.ownership.color} />
                  <span className="text-sm text-gray-700 truncate max-w-[120px]">{job.ownership.name}</span>
                </div>
              </td>
              <td className="py-3 px-3">
                <DueBadge due={job.due} type={job.dueType} />
              </td>
              <td className="py-3 px-3">
                {job.approver ? (
                  <div className="flex items-center gap-2">
                    <Avatar
                      initials={job.approver.initials}
                      color={job.approver.color}
                      hasIndicator={job.approver.hasIndicator}
                    />
                    {job.approverTime && <span className="text-xs text-gray-500">{job.approverTime}</span>}
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">...</span>
                )}
              </td>
              <td className="py-3 px-3">
                <span className="text-sm text-gray-700 truncate block max-w-[140px]">{job.policy}</span>
              </td>
              <td className="py-3 px-3">
                <StatusBadge status={job.status} type={job.statusType} />
              </td>
              <td className="py-3 px-3"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
