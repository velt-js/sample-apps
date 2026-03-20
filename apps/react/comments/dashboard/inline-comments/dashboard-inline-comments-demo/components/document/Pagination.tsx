import {
  ChevronDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from './icons'

export const Pagination = () => {
  return (
    <div className="flex items-center justify-between px-8 py-3 border-t border-gray-200 dark:border-gray-700 bg-background">
      <span className="text-sm text-gray-500 dark:text-gray-400">Showing 1-12 of 91 results (page 1 of 8)</span>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded disabled:opacity-50" disabled>
            <DoubleArrowLeftIcon />
          </button>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded disabled:opacity-50" disabled>
            <ArrowLeftIcon />
          </button>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
            <ArrowRightIcon />
          </button>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
            <DoubleArrowRightIcon />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">12 rows</span>
          <ChevronDownIcon />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Go to page:</span>
          <input
            type="text"
            className="w-12 px-2 py-1 text-sm border border-gray-200 dark:border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-background text-foreground"
            placeholder="1"
          />
        </div>
      </div>
    </div>
  )
}
