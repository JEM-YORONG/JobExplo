import { motion } from 'framer-motion'
import { Building2, ExternalLink, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Company } from '@/types/company'
import { cn } from '@/utils/cn'

interface CompanyCardProps {
  company: Company
  onSelect?: (company: Company) => void
  className?: string
}

export function CompanyCard({ company, onSelect, className }: CompanyCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn('h-full', className)}
    >
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelect?.(company)}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            {company.logo ? (
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="h-12 w-12 rounded-lg object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                <Building2 className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base truncate">{company.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{company.industry || 'Technology'}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {company.location || 'Remote'}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-sm">
              <span className="font-semibold">{company.open_jobs || 0}</span>
              <span className="text-muted-foreground"> open jobs</span>
            </span>
            {company.website && (
              <Button variant="ghost" size="sm" asChild>
                <a href={company.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
