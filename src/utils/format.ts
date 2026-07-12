import { format, formatDistanceToNow } from 'date-fns'

export function formatSalary(min?: number, max?: number, currency = 'USD'): string {
  if (!min && !max) return 'Not disclosed'
  if (min && max) {
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`
  }
  if (min) {
    return `${currency} ${min.toLocaleString()}+`
  }
  return `${currency} ${max?.toLocaleString()}`
}

export function formatDate(dateString?: string | number): string {
  if (!dateString) return ''
  const date = typeof dateString === 'number' ? new Date(dateString * 1000) : new Date(dateString)
  return format(date, 'MMM d, yyyy')
}

export function formatRelativeTime(dateString?: string | number): string {
  if (!dateString) return ''
  const date = typeof dateString === 'number' ? new Date(dateString * 1000) : new Date(dateString)
  return formatDistanceToNow(date, { addSuffix: true })
}

export function getEmploymentBadge(type?: string): { label: string; color: string } | null {
  if (!type) return null
  const badges: Record<string, { label: string; color: string }> = {
    'FULLTIME': { label: 'Full Time', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    'PARTTIME': { label: 'Part Time', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    'CONTRACT': { label: 'Contract', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
    'INTERNSHIP': { label: 'Internship', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
  }
  return badges[type.toUpperCase()] || null
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function buildSearchParams(filters: Record<string, unknown>): URLSearchParams {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value))
    }
  })
  return params
}

export function getCountryFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export function shareJob(job: { title: string; company: string; url?: string }): Promise<void> {
  const shareData = {
    title: `${job.title} at ${job.company}`,
    url: job.url || window.location.href,
  }
  return navigator.share(shareData)
}

export function copyLink(url: string): Promise<void> {
  return navigator.clipboard.writeText(url)
}
