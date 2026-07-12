export interface Company {
  name: string
  logo?: string
  industry?: string
  website?: string
  location?: string
  description?: string
  open_jobs?: number
  average_salary?: number
}

export interface CompanyCardProps {
  company: Company
  onSelect?: (company: Company) => void
}
