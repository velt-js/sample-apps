interface DueBadgeProps {
  due: string
  type?: string
}

export const DueBadge = ({ due, type }: DueBadgeProps) => {
  const getStyles = () => {
    switch (type) {
      case 'overdue':
        return 'bg-red-100 text-red-700'
      case 'today':
        return 'bg-green-100 text-green-700'
      case 'warning':
        return 'bg-yellow-100 text-yellow-700'
      case 'paid':
        return 'text-gray-400'
      default:
        return 'text-gray-600'
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
