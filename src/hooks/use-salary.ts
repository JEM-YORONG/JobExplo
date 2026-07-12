import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getEstimatedSalary, getCompanySalary } from '@/api/salary'
import type { EstimatedSalaryParams, EstimatedSalaryResponse, CompanySalaryParams, CompanySalaryResponse } from '@/types/salary'

export function useEstimatedSalary(
  params: EstimatedSalaryParams,
  options?: Omit<UseQueryOptions<EstimatedSalaryResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['salary', 'estimated', params],
    queryFn: () => getEstimatedSalary(params),
    enabled: !!params.job_title && !!params.location,
    ...options,
  })
}

export function useCompanySalary(
  params: CompanySalaryParams,
  options?: Omit<UseQueryOptions<CompanySalaryResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['salary', 'company', params],
    queryFn: () => getCompanySalary(params),
    enabled: !!params.company && !!params.job_title && !!params.location,
    ...options,
  })
}
