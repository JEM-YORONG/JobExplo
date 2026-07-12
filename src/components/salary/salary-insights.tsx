import { motion } from 'framer-motion'
import { DollarSign, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { SalaryData } from '@/types/salary'
import { cn } from '@/utils/cn'

interface SalaryInsightsProps {
  salaries: SalaryData[]
  className?: string
}

export function SalaryInsights({ salaries, className }: SalaryInsightsProps) {
  if (!salaries || salaries.length === 0) return null

  const min = Math.min(...salaries.map(s => s.min_salary))
  const max = Math.max(...salaries.map(s => s.max_salary))
  const average = salaries.reduce((sum, s) => sum + s.median_salary, 0) / salaries.length

  const chartData = salaries.map(s => ({
    name: s.job_title,
    min: s.min_salary,
    median: s.median_salary,
    max: s.max_salary,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('space-y-6', className)}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Salary Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">Minimum</p>
              <p className="text-2xl font-bold flex items-center justify-center gap-1">
                <DollarSign className="h-5 w-5" />
                {min.toLocaleString()}
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">Average</p>
              <p className="text-2xl font-bold flex items-center justify-center gap-1">
                <DollarSign className="h-5 w-5" />
                {Math.round(average).toLocaleString()}
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">Maximum</p>
              <p className="text-2xl font-bold flex items-center justify-center gap-1">
                <DollarSign className="h-5 w-5" />
                {max.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="min" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="median" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="max" fill="hsl(var(--primary) / 0.5)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
