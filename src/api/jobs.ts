import { api } from './axios'
import { ENDPOINTS } from './endpoints'
import type { Job, JobSearchParams, JobSearchResponse, JobDetailsResponse } from '@/types/job'

function isJobArray(value: unknown): value is JobSearchResponse['data']['jobs'] {
  return Array.isArray(value)
}

function mapApiJobToJob(raw: Record<string, unknown>): Job {
  return {
    id: typeof raw.job_id === 'string' ? raw.job_id : '',
    title: typeof raw.job_title === 'string' ? raw.job_title : '',
    company: typeof raw.employer_name === 'string' ? raw.employer_name : '',
    company_logo: typeof raw.employer_logo === 'string' ? raw.employer_logo : undefined,
    location: typeof raw.job_location === 'string' ? raw.job_location : '',
    country: typeof raw.job_country === 'string' ? raw.job_country : '',
    city: typeof raw.job_city === 'string' ? raw.job_city : undefined,
    state: typeof raw.job_state === 'string' ? raw.job_state : undefined,
    remote: typeof raw.job_is_remote === 'boolean' ? raw.job_is_remote : false,
    hybrid: false,
    salary: typeof raw.job_salary_string === 'string' ? raw.job_salary_string : undefined,
    salary_min: typeof raw.job_min_salary === 'number' ? raw.job_min_salary : undefined,
    salary_max: typeof raw.job_max_salary === 'number' ? raw.job_max_salary : undefined,
    salary_currency: typeof raw.job_salary_period === 'string' ? raw.job_salary_period : undefined,
    employment_type: typeof raw.job_employment_type === 'string' ? raw.job_employment_type : undefined,
    job_posted_at_datetime_utc: typeof raw.job_posted_at_datetime_utc === 'string' ? raw.job_posted_at_datetime_utc : undefined,
    job_posted_at_timestamp: typeof raw.job_posted_at_timestamp === 'number' ? raw.job_posted_at_timestamp : undefined,
    employer_logo: typeof raw.employer_logo === 'string' ? raw.employer_logo : undefined,
    employer_website: typeof raw.employer_website === 'string' ? raw.employer_website : undefined,
    employer_company_type: typeof raw.employer_company_type === 'string' ? raw.employer_company_type : undefined,
    job_description: typeof raw.job_description === 'string' ? raw.job_description : undefined,
    job_responsibilities: typeof raw.job_responsibilities === 'string' ? raw.job_responsibilities : undefined,
    job_qualifications: typeof raw.job_qualifications === 'string' ? raw.job_qualifications : undefined,
    job_benefits: Array.isArray(raw.job_benefits) ? raw.job_benefits.map(String) : undefined,
    required_experience: typeof raw.required_experience === 'string' ? raw.required_experience : undefined,
    required_skills: Array.isArray(raw.required_skills) ? raw.required_skills.map(String) : undefined,
    education: typeof raw.education === 'string' ? raw.education : undefined,
    industry: typeof raw.industry === 'string' ? raw.industry : undefined,
    job_apply_link: typeof raw.job_apply_link === 'string' ? raw.job_apply_link : undefined,
    apply_options: Array.isArray(raw.apply_options)
      ? raw.apply_options.map((opt: Record<string, unknown>) => ({
          publisher: typeof opt.publisher === 'string' ? opt.publisher : '',
          apply_link: typeof opt.apply_link === 'string' ? opt.apply_link : '',
        }))
      : undefined,
    easy_apply: false,
    urgent: false,
    featured: false,
    visa_sponsorship: false,
    experience_range: typeof raw.experience_range === 'string' ? raw.experience_range : undefined,
    job_requirements: typeof raw.job_requirements === 'string' ? raw.job_requirements : undefined,
    job_highlights: raw.job_highlights && typeof raw.job_highlights === 'object'
      ? {
          Qualifications: Array.isArray((raw.job_highlights as Record<string, unknown>).Qualifications)
            ? ((raw.job_highlights as Record<string, unknown>).Qualifications as unknown[]).map(String)
            : undefined,
          Benefits: Array.isArray((raw.job_highlights as Record<string, unknown>).Benefits)
            ? ((raw.job_highlights as Record<string, unknown>).Benefits as unknown[]).map(String)
            : undefined,
          Responsibilities: Array.isArray((raw.job_highlights as Record<string, unknown>).Responsibilities)
            ? ((raw.job_highlights as Record<string, unknown>).Responsibilities as unknown[]).map(String)
            : undefined,
        }
      : undefined,
    job_metadata: undefined,
  }
}

function normalizeSearchResponse(response: unknown): JobSearchResponse {
  if (response && typeof response === 'object' && 'data' in response) {
    const payload = (response as Record<string, unknown>).data
    if (payload && typeof payload === 'object' && 'jobs' in payload) {
      const jobs = (payload as Record<string, unknown>).jobs
      if (isJobArray(jobs)) {
        const meta = payload as Record<string, unknown>
        return {
          data: {
            jobs: jobs.map((job: Record<string, unknown>) => mapApiJobToJob(job)),
            cursor: typeof meta.cursor === 'string' ? meta.cursor : undefined,
          },
          total: typeof meta.total === 'number' ? meta.total : jobs.length,
          page: typeof meta.page === 'number' ? meta.page : 1,
          num_pages: typeof meta.num_pages === 'number' ? meta.num_pages : 1,
        }
      }
    }
  }
  if (isJobArray(response)) {
    return { data: { jobs: response.map((job: Record<string, unknown>) => mapApiJobToJob(job)) }, total: response.length, page: 1, num_pages: 1 }
  }
  return { data: { jobs: [] }, total: 0, page: 1, num_pages: 1 }
}

export const searchJobs = async (params: JobSearchParams): Promise<JobSearchResponse> => {
  if (!params.query?.trim()) {
    return { data: { jobs: [] }, total: 0, page: 1, num_pages: 1 }
  }
  const { data } = await api.get(ENDPOINTS.SEARCH_JOBS, { params })
  return normalizeSearchResponse(data)
}

export const getJobDetails = async (jobId: string, country = 'us'): Promise<JobDetailsResponse> => {
  const { data } = await api.get(ENDPOINTS.JOB_DETAILS, { params: { job_id: jobId, country } })
  if (isJobArray(data)) {
    return { data: data.map((job: Record<string, unknown>) => mapApiJobToJob(job)) }
  }
  return { data: [] }
}
