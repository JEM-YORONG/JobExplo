export interface EstimatedSalaryParams {
  job_title: string
  location: string
  radius?: number
}

export interface EstimatedSalaryResponse {
  data: SalaryData[]
}

export interface SalaryData {
  job_title: string
  location: string
  salary: number
  salary_period: string
  currency: string
  confidence?: number
  min_salary: number
  max_salary: number
  median_salary: number
  percentiles?: SalaryPercentiles
}

export interface SalaryPercentiles {
  p10: number
  p25: number
  p50: number
  p75: number
  p90: number
}

export interface CompanySalaryParams {
  company: string
  job_title: string
  location: string
}

export interface CompanySalaryResponse {
  data: CompanySalaryData[]
}

export interface CompanySalaryData {
  company: string
  job_title: string
  location: string
  average_salary: number
  salary_range: {
    min: number
    max: number
  }
  experience?: string
  industry?: string
  currency: string
  confidence?: number
}
