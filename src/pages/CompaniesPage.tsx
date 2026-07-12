import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CompanyCard } from '@/components/company/company-card'
import { CompanySalaryCard } from '@/components/salary/company-salary-card'
import { useCompanySalary } from '@/hooks/use-salary'
import { ErrorState } from '@/components/common/error-state'
import { SalarySkeleton } from '@/components/common/loading-skeleton'
import type { Company } from '@/types/company'

const mockCompanies: Company[] = [
  {
    name: 'Google',
    logo: 'https://logo.clearbit.com/google.com',
    industry: 'Technology',
    website: 'https://google.com',
    location: 'Mountain View, CA',
    description: 'Multinational technology company',
    open_jobs: 1250,
    average_salary: 150000,
  },
  {
    name: 'Microsoft',
    logo: 'https://logo.clearbit.com/microsoft.com',
    industry: 'Technology',
    website: 'https://microsoft.com',
    location: 'Redmond, WA',
    description: 'Technology corporation',
    open_jobs: 980,
    average_salary: 145000,
  },
  {
    name: 'Amazon',
    logo: 'https://logo.clearbit.com/amazon.com',
    industry: 'E-commerce',
    website: 'https://amazon.com',
    location: 'Seattle, WA',
    description: 'E-commerce and cloud computing',
    open_jobs: 2100,
    average_salary: 135000,
  },
  {
    name: 'Meta',
    logo: 'https://logo.clearbit.com/meta.com',
    industry: 'Technology',
    website: 'https://meta.com',
    location: 'Menlo Park, CA',
    description: 'Social technology company',
    open_jobs: 750,
    average_salary: 160000,
  },
]

export function CompaniesPage() {
  const [search, setSearch] = useState('')
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)

  const { data, isLoading, isError, error, refetch } = useCompanySalary(
    { company: selectedCompany || 'Google', job_title: 'Software Engineer', location: 'United States' },
    { enabled: !!selectedCompany }
  )

  const filteredCompanies = mockCompanies.filter(company =>
    company.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Building2 className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold mb-2">Companies</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore top companies, view open positions, and get salary insights
          </p>
        </motion.div>

        <div className="mb-8">
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search companies..."
            className="max-w-md"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {filteredCompanies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <CompanyCard
                company={company}
                onSelect={c => setSelectedCompany(c.name)}
              />
            </motion.div>
          ))}
        </div>

        {selectedCompany && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">
              Salary at {selectedCompany}
            </h2>
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
                description={error?.message || 'Something went wrong.'}
                onRetry={refetch}
              />
            )}
            {!isLoading && !isError && data?.data && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.data.map((salary, index) => (
                  <CompanySalaryCard key={index} data={salary} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
