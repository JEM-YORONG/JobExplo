import { MapPin, Building2, DollarSign, Clock } from 'lucide-react'
import { cn } from '@/utils/cn'

interface JobMetaProps {
  location?: string
  company?: string
  salary?: string
  postedDate?: string
  remote?: boolean
  className?: string
}

export function JobMeta({ location, company, salary, postedDate, remote, className }: JobMetaProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3 text-sm text-muted-foreground', className)}>
      {location && (
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {location}
        </span>
      )}
      {company && (
        <span className="flex items-center gap-1">
          <Building2 className="h-3.5 w-3.5" />
          {company}
        </span>
      )}
      {salary && (
        <span className="flex items-center gap-1">
          <DollarSign className="h-3.5 w-3.5" />
          {salary}
        </span>
      )}
      {postedDate && (
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {postedDate}
        </span>
      )}
      {remote && (
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
          Remote
        </span>
      )}
    </div>
  )
}
