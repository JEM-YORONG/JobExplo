import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { Search, DollarSign, Building2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/search/search-bar'
import { JobCard } from '@/components/job/job-card'
import { useJobs } from '@/hooks/use-jobs'

export function HomePage() {
  const { data, isLoading, isError, refetch } = useJobs(
    { query: 'software engineer', country: 'us', page: 1, num_pages: 1 },
    { staleTime: 1000 * 60 * 5 }
  )

  const featuredJobs = data?.data?.jobs?.slice(0, 6) || []

  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              Discover Your Next Opportunity
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Search thousands of jobs from top companies. Get salary insights and find your perfect role.
            </p>
            <div className="mb-8">
              <SearchBar onSearchClick={() => refetch()} className="mx-auto" />
            </div>
            <Button size="lg" asChild className="gap-2">
              <Link to="/jobs">
                Browse All Jobs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            {[
              { icon: Search, title: 'Smart Search', description: 'Find jobs with AI-powered search and filters' },
              { icon: DollarSign, title: 'Salary Insights', description: 'Get accurate salary data for any role' },
              { icon: Building2, title: 'Company Info', description: 'Research companies and find the best fit' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-card border border-border"
              >
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {!isError && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Jobs</h2>
              <Button variant="outline" asChild>
                <Link to="/jobs">View All</Link>
              </Button>
            </div>
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-64 rounded-lg border border-border bg-card animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}