import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SalaryCard } from '@/components/salary/salary-card'
import { SalaryInsights } from '@/components/salary/salary-insights'
import { useEstimatedSalary } from '@/hooks/use-salary'
import { ErrorState } from '@/components/common/error-state'
import { SalarySkeleton } from '@/components/common/loading-skeleton'
import type { SalaryData } from '@/types/salary'

export function SalaryPage() {
  const [jobTitle, setJobTitle] = useState('')
  const [location, setLocation] = useState('')
  const [searched, setSearched] = useState(false)

  const { data, isLoading, isError, error, refetch } = useEstimatedSalary(
    { job_title: jobTitle, location },
    { enabled: false }
  )

  const salaries = data?.data || []

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (jobTitle && location) {
      setSearched(true)
      refetch()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <DollarSign className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl font-bold mb-2">Salary Insights</h1>
            <p className="text-muted-foreground">
              Get accurate salary estimates based on real market data
            </p>
          </motion.div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                placeholder="e.g. Software Engineer"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA"
                required
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Get Salary Insights
            </Button>
          </form>
        </div>

        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {isLoading && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <SalarySkeleton key={i} />
                ))}
              </div>
            )}

            {isError && (
              <ErrorState
                title="Failed to load salary data"
                description={error?.message || 'Something went wrong while fetching salary insights.'}
                onRetry={refetch}
              />
            )}

            {!isLoading && !isError && salaries.length > 0 && (
              <>
                <SalaryInsights salaries={salaries as SalaryData[]} />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {salaries.map((salary, index) => (
                    <SalaryCard key={index} salary={salary as SalaryData} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
