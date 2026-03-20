interface DueBadgeProps {
  due: string
  type?: string
}

export const DueBadge = ({ due, type }: DueBadgeProps) => {
  const getStyles = () => {
    switch (type) {
      case 'overdue':
        return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
      case 'today':
        return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300'
      case 'paid':
        return 'text-gray-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  if (type === 'overdue' || type === 'today' || type === 'warning') {
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStyles()}`}>
        {due}
      </span>
    )
  }

  return <span className={`text-sm ${getStyles()}`}>{due}</span>
}
