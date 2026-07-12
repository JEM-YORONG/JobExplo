import { motion } from 'framer-motion'
import { Search, MapPin, Briefcase, DollarSign, GraduationCap, Building2, CalendarDays, ArrowUpDown, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { EMPLOYMENT_TYPES, DATE_POSTED_OPTIONS, COUNTRIES, EXPERIENCE_LEVELS, SORT_OPTIONS } from '@/constants/jobs'
import type { SearchFilters } from '@/types/search'
import { cn } from '@/utils/cn'

interface SearchFiltersProps {
  filters: SearchFilters
  onChange: (filters: SearchFilters) => void
  onReset?: () => void
  className?: string
}

export function SearchFilters({ filters, onChange, onReset, className }: SearchFiltersProps) {
  const updateFilter = (key: keyof SearchFilters, value: unknown) => {
    onChange({ ...filters, [key]: value })
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className={cn('space-y-6', className)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Search className="h-5 w-5" />
          Filters
        </h3>
        {onReset && (
          <Button variant="ghost" size="sm" onClick={onReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="query" className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Search
        </Label>
        <Input
          id="query"
          value={filters.query}
          onChange={e => updateFilter('query', e.target.value)}
          placeholder="Job title, company, keyword..."
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Country
        </Label>
        <Select value={filters.country} onValueChange={value => updateFilter('country', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map(country => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city" className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          City
        </Label>
        <Input
          id="city"
          value={filters.city}
          onChange={e => updateFilter('city', e.target.value)}
          placeholder="City name"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="remote"
          checked={filters.remote}
          onCheckedChange={checked => updateFilter('remote', checked)}
        />
        <Label htmlFor="remote" className="font-normal">
          Remote only
        </Label>
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          Employment Type
        </Label>
        <Select value={filters.employment_type} onValueChange={value => updateFilter('employment_type', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {EMPLOYMENT_TYPES.map(type => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Minimum Salary
        </Label>
        <Slider
          value={[filters.salary_min || 0]}
          onValueChange={value => updateFilter('salary_min', value[0])}
          max={500000}
          step={10000}
          className="w-full"
        />
        <p className="text-sm text-muted-foreground">
          ${(filters.salary_min || 0).toLocaleString()}+
        </p>
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          Experience Level
        </Label>
        <Select value={filters.experience} onValueChange={value => updateFilter('experience', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {EXPERIENCE_LEVELS.map(level => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry" className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Industry
        </Label>
        <Input
          id="industry"
          value={filters.industry}
          onChange={e => updateFilter('industry', e.target.value)}
          placeholder="Industry name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company" className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Company
        </Label>
        <Input
          id="company"
          value={filters.company}
          onChange={e => updateFilter('company', e.target.value)}
          placeholder="Company name"
        />
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          Date Posted
        </Label>
        <Select value={filters.date_posted} onValueChange={value => updateFilter('date_posted', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            {DATE_POSTED_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4" />
          Sort By
        </Label>
        <Select value={filters.sort} onValueChange={value => updateFilter('sort', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  )
}
