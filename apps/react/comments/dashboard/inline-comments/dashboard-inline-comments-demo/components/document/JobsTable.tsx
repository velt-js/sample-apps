import { VeltCommentBubble, VeltCommentTool } from '@veltdev/react'
import { ChevronDownIcon, GearIcon } from './icons'
import { Avatar } from './Avatar'
import { StatusBadge } from './StatusBadge'
import { DueBadge } from './DueBadge'
import { Job } from './types'

interface JobsTableProps {
  jobs: Job[]
  onJobClick: (job: Job) => void
  onRowClick: (job: Job) => void
}

export const JobsTable = ({ jobs, onJobClick, onRowClick }: JobsTableProps) => {
  return (
    <div className="flex-1 overflow-auto px-8">
      <table className="w-full min-w-[1200px]">
        <thead className="sticky top-0 bg-background z-10">
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="w-12 py-2 px-3 text-left">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500" />
            </th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                Job <ChevronDownIcon />
              </div>
            </th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Cost</th>
            <th className="w-20 py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Comments</th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Ownership</th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Due</th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Current approver</th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Approval policy</th>
            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
            <th className="w-10 py-2 px-3">
              <GearIcon />
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {jobs.map((job) => (
            <tr
              key={job.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              id={`job-${job.id}`}
              data-id={`job-${job.id}`}
              onClick={() => onRowClick(job)}
            >
              <td className="py-3 px-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td className="py-3 px-3">
                <span
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    onJobClick(job)
                  }}
                >
                  {job.id}
                </span>
              </td>
              <td className="py-3 px-3">
                <span className="text-sm text-gray-900 dark:text-gray-100">{job.cost}</span>
              </td>
              <td className="py-3 px-3">
                <div
                  className="flex items-center justify-center min-w-[64px] relative overflow-visible"
                  onClick={(e) => e.stopPropagation()}
                >
                  <VeltCommentTool targetElementId={`job-${job.id}`} context={{jobId: `job-${job.id}`, jobStatus: job.status}} />
                  <VeltCommentBubble
                    openDialog={false}
                    targetElementId={`job-${job.id}`}
                    shadowDom={false}
                  />
                </div>
              </td>
              <td className="py-3 px-3">
                <div className="flex items-center gap-2">
                  <Avatar initials={job.ownership.initials} color={job.ownership.color} />
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[120px]">{job.ownership.name}</span>
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
                    {job.approverTime && <span className="text-xs text-gray-500 dark:text-gray-400">{job.approverTime}</span>}
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">...</span>
                )}
              </td>
              <td className="py-3 px-3">
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate block max-w-[140px]">{job.policy}</span>
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
