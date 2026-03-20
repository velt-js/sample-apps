import { ClockIcon, EyeIcon } from './icons'

interface StatusBadgeProps {
  status: string
  type: string
}

export const StatusBadge = ({ status, type }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (type) {
      case 'review':
        return 'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/40 dark:text-violet-300 dark:border-violet-700'
      case 'pending':
        return 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
      case 'conflict':
        return 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700'
      case 'dispute':
        return 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700'
      case 'submit':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700'
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'review':
        return <span className="w-2 h-2 rounded-full bg-violet-500 mr-1.5"></span>
      case 'pending':
        return <span className="mr-1"><ClockIcon /></span>
      case 'conflict':
        return <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>
      case 'dispute':
        return <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>
      case 'submit':
        return <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
      default:
        return <span className="mr-1"><EyeIcon /></span>
    }
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStatusStyles()}`}>
      {getIcon()}
      {status}
    </span>
  )
}
