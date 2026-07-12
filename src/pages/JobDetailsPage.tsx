import { useParams, Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Bookmark, ExternalLink, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { JobMeta } from '@/components/common/job-meta'
import { JobTags } from '@/components/common/job-tags'
import { JobCard } from '@/components/job/job-card'
import { useJobDetails, useJobs } from '@/hooks/use-jobs'
import { useSavedJobs } from '@/hooks/use-saved-jobs'
import { formatSalary, formatRelativeTime, getEmploymentBadge, shareJob, copyLink } from '@/utils/format'
import { JobDetailsSkeleton } from '@/components/common/loading-skeleton'
import { ErrorState } from '@/components/common/error-state'
import { cn } from '@/utils/cn'

export function JobDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError, error, refetch } = useJobDetails(id || '')
  const { isJobSaved, toggleSaveJob } = useSavedJobs()

  const relatedQuery = useJobs({
    query: data?.data?.[0]?.title || '',
    country: 'us',
    page: 1,
    num_pages: 1,
  })

  const job = data?.data?.[0]
  const saved = job ? isJobSaved(job.id) : false

  const handleSave = () => {
    if (job) toggleSaveJob(job.id)
  }

  const handleShare = async () => {
    if (job) {
      try {
        await shareJob({ title: job.title, company: job.company })
      } catch {
        copyLink(window.location.href)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" size="sm" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to jobs
          </Button>
          <JobDetailsSkeleton />
        </div>
      </div>
    )
  }

  if (isError || !job) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" size="sm" className="mb-6 gap-2" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to jobs
            </Link>
          </Button>
          <ErrorState
            title="Job not found"
            description={error?.message || 'The job you are looking for does not exist or has been removed.'}
            onRetry={() => refetch()}
          />
        </div>
      </div>
    )
  }

  const employmentBadge = getEmploymentBadge(job.employment_type)
  const tags = [
    job.remote && 'Remote',
    job.hybrid && 'Hybrid',
    job.easy_apply && 'Easy Apply',
    job.urgent && 'Urgent',
    job.featured && 'Featured',
    job.visa_sponsorship && 'Visa Sponsorship',
    job.employment_type && employmentBadge?.label,
  ].filter(Boolean) as string[]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" size="sm" className="mb-6 gap-2" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to jobs
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex items-start gap-4 mb-6">
                {job.employer_logo ? (
                  <img
                    src={job.employer_logo}
                    alt={`${job.company} logo`}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-2xl font-bold text-muted-foreground">
                      {job.company?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-card-foreground mb-1">{job.title}</h1>
                  <p className="text-lg text-muted-foreground">{job.company}</p>
                </div>
              </div>

              <JobMeta
                location={job.location}
                salary={formatSalary(job.salary_min, job.salary_max, job.salary_currency)}
                postedDate={formatRelativeTime(job.job_posted_at_datetime_utc)}
                remote={job.remote}
                className="mb-4"
              />

              <JobTags tags={tags} className="mb-6" />

              <div className="flex flex-wrap gap-3">
                {job.job_apply_link && (
                  <Button size="lg" className="gap-2" asChild>
                    <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">
                      Apply Now
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                <Button variant="outline" size="lg" onClick={handleSave} className="gap-2">
                  <Bookmark className={cn('h-4 w-4', saved && 'fill-current')} />
                  {saved ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" size="lg" onClick={handleShare} className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-muted-foreground">{job.job_description}</p>
              </div>
            </motion.div>

            {job.job_responsibilities && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-lg border border-border bg-card p-6"
              >
                <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-muted-foreground">{job.job_responsibilities}</p>
                </div>
              </motion.div>
            )}

            {job.job_qualifications && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-lg border border-border bg-card p-6"
              >
                <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-muted-foreground">{job.job_qualifications}</p>
                </div>
              </motion.div>
            )}

            {job.job_benefits && job.job_benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-lg border border-border bg-card p-6"
              >
                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {job.job_benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {relatedQuery.data && relatedQuery.data.data.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold">Related Jobs</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {relatedQuery.data.data.slice(0, 4).map(relatedJob => (
                    <JobCard key={relatedJob.id} job={relatedJob} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-lg border border-border bg-card p-6"
              >
                <h3 className="font-semibold mb-4">Job Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Employment Type</span>
                    <span className="font-medium">{job.employment_type || 'Not specified'}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Schedule</span>
                    <span className="font-medium">{job.employment_type || 'Not specified'}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salary</span>
                    <span className="font-medium">
                      {formatSalary(job.salary_min, job.salary_max, job.salary_currency)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Posted</span>
                    <span className="font-medium">{formatRelativeTime(job.job_posted_at_datetime_utc)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remote</span>
                    <span className="font-medium">{job.remote ? 'Yes' : 'No'}</span>
                  </div>
                  {job.industry && (
                    <>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry</span>
                        <span className="font-medium">{job.industry}</span>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
