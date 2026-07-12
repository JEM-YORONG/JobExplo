import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SalaryData } from '@/types/salary'
import { formatSalary } from '@/utils/format'
import { cn } from '@/utils/cn'

interface SalaryCardProps {
  salary: SalaryData
  className?: string
}

export function SalaryCard({ salary, className }: SalaryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn('h-full', className)}
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium text-muted-foreground">
            {salary.job_title}
          </CardTitle>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <BarChart3 className="h-3.5 w-3.5" />
            {salary.location}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            <span className="text-3xl font-bold">
              {formatSalary(salary.min_salary, salary.max_salary, salary.currency)}
            </span>
          </div>
          {salary.percentiles && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">10th percentile</span>
                <span className="font-medium">
                  {salary.currency} {salary.percentiles.p10.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Median (50th)</span>
                <span className="font-medium">
                  {salary.currency} {salary.percentiles.p50.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">90th percentile</span>
                <span className="font-medium">
                  {salary.currency} {salary.percentiles.p90.toLocaleString()}
                </span>
              </div>
            </div>
          )}
          {salary.confidence && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              Confidence: {Math.round(salary.confidence * 100)}%
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
