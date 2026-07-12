import { motion } from 'framer-motion'
import { JobCard } from '@/components/job/job-card'
import { EmptyState } from '@/components/common/empty-state'
import { ErrorState } from '@/components/common/error-state'
import { JobCardSkeleton } from '@/components/common/loading-skeleton'
import type { Job } from '@/types/job'
import { cn } from '@/utils/cn'

interface JobListProps {
  jobs: Job[]
  isLoading?: boolean
  isError?: boolean
  error?: Error | null
  onRetry?: () => void
  onSave?: (job: Job) => void
  emptyTitle?: string
  emptyDescription?: string
  className?: string
}

export function JobList({
  jobs,
  isLoading = false,
  isError = false,
  error,
  onRetry,
  onSave,
  emptyTitle,
  emptyDescription,
  className,
}: JobListProps) {
  if (isLoading) {
    return (
      <div className={cn('grid gap-6', className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load jobs"
        description={error?.message || 'Something went wrong while fetching jobs.'}
        onRetry={onRetry}
      />
    )
  }

  if (jobs.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
      />
    )
  }

  return (
    <div className={cn('grid gap-6', className)}>
      {jobs.map((job, index) => (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <JobCard job={job} onSave={onSave} />
        </motion.div>
      ))}
    </div>
  )
}
