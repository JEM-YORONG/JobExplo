import { motion } from 'framer-motion'
import { Bookmark, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { JobMeta } from '@/components/common/job-meta'
import { JobTags } from '@/components/common/job-tags'
import { useSavedJobs } from '@/hooks/use-saved-jobs'
import { formatSalary, formatRelativeTime, getEmploymentBadge } from '@/utils/format'
import type { Job } from '@/types/job'
import { cn } from '@/utils/cn'

interface JobCardProps {
  job: Job
  onSave?: (job: Job) => void
  className?: string
}

export function JobCard({ job, onSave, className }: JobCardProps) {
  const { isJobSaved, toggleSaveJob } = useSavedJobs()
  const saved = isJobSaved(job.id)
  const navigate = useNavigate()

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleSaveJob(job.id)
    onSave?.(job)
  }

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleCardClick = () => {
    navigate(`/jobs/${job.id}`)
  }

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      navigate(`/jobs/${job.id}`)
    }
  }

  const employmentBadge = getEmploymentBadge(job.employment_type)
  const tags = [
    job.remote && 'Remote',
    job.hybrid && 'Hybrid',
    job.easy_apply && 'Easy Apply',
    job.urgent && 'Urgent',
    job.featured && 'Featured',
    job.visa_sponsorship && 'Visa Sponsorship',
    job.employment_type && getEmploymentBadge(job.employment_type)?.label,
  ].filter(Boolean) as string[]

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn('h-full', className)}
    >
      <div
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        role="link"
        tabIndex={0}
        className="block h-full rounded-lg border border-border bg-card p-4 sm:p-6 transition-shadow hover:shadow-lg cursor-pointer group"
      >
        <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex-shrink-0">
            {job.employer_logo ? (
              <img
                src={job.employer_logo}
                alt={`${job.company} logo`}
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover"
              />
            ) : (
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-muted flex items-center justify-center">
                <span className="text-base sm:text-lg font-bold text-muted-foreground">
                  {job.company?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground text-sm sm:text-base truncate group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{job.company}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            aria-label={saved ? 'Unsave job' : 'Save job'}
            className="shrink-0 h-8 w-8 sm:h-9 sm:w-9"
          >
            <Bookmark className={cn('h-4 w-4 sm:h-5 sm:w-5', saved && 'fill-current text-primary')} />
          </Button>
        </div>

        <JobMeta
          location={job.location}
          salary={formatSalary(job.salary_min, job.salary_max, job.salary_currency)}
          postedDate={formatRelativeTime(job.job_posted_at_datetime_utc)}
          remote={job.remote}
          className="mb-3 sm:mb-4"
        />

        <JobTags tags={tags} className="mb-3 sm:mb-4" />

        <div className="flex flex-wrap items-center gap-2 pt-3 sm:pt-4 border-t border-border">
          {employmentBadge && (
            <Badge variant="secondary" className={employmentBadge.color}>
              {employmentBadge.label}
            </Badge>
          )}
          {job.job_apply_link && (
            <Button size="sm" className="ml-auto gap-1.5 sm:gap-2 text-xs sm:text-sm" asChild>
              <a
                href={job.job_apply_link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleApplyClick}
              >
                Apply
                <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
