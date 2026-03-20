import { CheckCircleIcon, WarningIcon, DisputeIcon } from './icons'

export const SummaryCards = () => {
  return (
    <div className="flex gap-4 px-8 pb-4">
      {/* Review & approve card */}
      <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-violet-50 dark:bg-violet-950/30 rounded-lg border border-violet-100 dark:border-violet-800">
        <div className="flex items-center justify-center w-10 h-10 bg-violet-100 dark:bg-violet-900/50 rounded-lg">
          <CheckCircleIcon />
        </div>
        <span className="flex-1 text-sm font-medium text-violet-900 dark:text-violet-200">Review & approve</span>
        <span className="text-2xl font-semibold text-violet-700 dark:text-violet-300">2</span>
      </div>

      {/* Conflict card */}
      <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-100 dark:border-amber-800">
        <div className="flex items-center justify-center w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
          <WarningIcon />
        </div>
        <span className="flex-1 text-sm font-medium text-amber-900 dark:text-amber-200">Conflict</span>
        <span className="text-2xl font-semibold text-amber-700 dark:text-amber-300">2</span>
      </div>

      {/* Dispute card */}
      <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-100 dark:border-red-800">
        <div className="flex items-center justify-center w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-lg">
          <DisputeIcon />
        </div>
        <span className="flex-1 text-sm font-medium text-red-900 dark:text-red-200">Dispute</span>
        <span className="text-2xl font-semibold text-red-700 dark:text-red-300">6</span>
      </div>
    </div>
  )
}
