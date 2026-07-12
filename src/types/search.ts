export interface SearchFilters {
  query: string
  country?: string
  city?: string
  remote?: boolean
  employment_type?: string
  salary_min?: number
  experience?: string
  industry?: string
  company?: string
  date_posted?: string
  sort?: string
}

export interface SearchSuggestion {
  id: string
  text: string
  type: 'recent' | 'popular' | 'autocomplete'
}
