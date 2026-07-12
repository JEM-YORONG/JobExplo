export interface Job {
  id: string
  title: string
  company: string
  company_logo?: string
  location: string
  country: string
  city?: string
  state?: string
  remote: boolean
  hybrid: boolean
  salary?: string
  salary_min?: number
  salary_max?: number
  salary_currency?: string
  employment_type?: string
  job_posted_at_datetime_utc?: string
  job_posted_at_timestamp?: number
  employer_logo?: string
  employer_website?: string
  employer_company_type?: string
  job_description?: string
  job_responsibilities?: string
  job_qualifications?: string
  job_benefits?: string[]
  required_experience?: string
  required_skills?: string[]
  education?: string
  industry?: string
  job_apply_link?: string
  apply_options?: ApplyOption[]
  easy_apply: boolean
  urgent: boolean
  featured: boolean
  visa_sponsorship: boolean
  experience_range?: string
  job_requirements?: string
  job_highlights?: JobHighlights
  job_metadata?: JobMetadata
}

export interface ApplyOption {
  publisher: string
  apply_link: string
}

export interface JobHighlights {
  Qualifications?: string[]
  Benefits?: string[]
  Responsibilities?: string[]
}

export interface JobMetadata {
 分享?: boolean
}

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

export interface JobSearchParams {
  query: string
  page?: number
  num_pages?: number
  country?: string
  date_posted?: string
  employment_types?: string
  remote_jobs_only?: boolean
  job_requirements?: string
  radius?: number
}

export interface JobSearchResponse {
  data: {
    jobs: Job[]
    cursor?: string
  }
  total?: number
  page?: number
  num_pages?: number
}

export interface JobDetailsResponse {
  data: Job[]
}
