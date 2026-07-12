import { motion } from 'framer-motion'
import { DollarSign, Building2, MapPin, Briefcase } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CompanySalaryData } from '@/types/salary'
import { formatSalary } from '@/utils/format'
import { cn } from '@/utils/cn'

interface CompanySalaryCardProps {
  data: CompanySalaryData
  className?: string
}

export function CompanySalaryCard({ data, className }: CompanySalaryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn('h-full', className)}
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            {data.company}
          </CardTitle>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5" />
            {data.job_title}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            <span className="text-3xl font-bold">
              {formatSalary(data.average_salary, data.average_salary, data.currency)}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Salary Range</span>
              <span className="font-medium">
                {data.currency} {data.salary_range.min.toLocaleString()} - {data.salary_range.max.toLocaleString()}
              </span>
            </div>
            {data.experience && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Experience</span>
                <span className="font-medium">{data.experience}</span>
              </div>
            )}
            {data.industry && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Industry</span>
                <span className="font-medium">{data.industry}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                Location
              </span>
              <span className="font-medium">{data.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
