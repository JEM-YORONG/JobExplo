import { cn } from '@/utils/cn'

interface JobTagsProps {
  tags: string[]
  className?: string
}

const tagStyles: Record<string, string> = {
  Remote: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Hybrid: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Full Time': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Part Time': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  Contract: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'Easy Apply': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  Featured: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  'Visa Sponsorship': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  Internship: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
}

export function JobTags({ tags, className }: JobTagsProps) {
  if (!tags || tags.length === 0) return null

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map(tag => (
        <span
          key={tag}
          className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', tagStyles[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200')}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
