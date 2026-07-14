import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query'
import { searchJobs, getJobDetails } from '@/api/jobs'
import type { JobSearchParams, JobSearchResponse, JobDetailsResponse } from '@/types/job'

export function useJobs(
  params: JobSearchParams,
  options?: Omit<UseQueryOptions<JobSearchResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['jobs', params],
    queryFn: () => searchJobs(params),
    enabled: !!params.query?.trim(),
    ...options,
  })
}

export function useInfiniteJobs(
  params: JobSearchParams,
  searchVersion: number,
  options?: Omit<UseInfiniteQueryOptions<JobSearchResponse, Error>, 'queryKey' | 'queryFn' | 'getNextPageParam'>
) {
  return useInfiniteQuery({
    queryKey: ['jobs', 'infinite', params, searchVersion],
    queryFn: ({ pageParam }) => searchJobs({ ...params, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.num_pages) return undefined
      return lastPage.page + 1
    },
    enabled: !!params.query?.trim(),
    ...options,
  })
}

export function useJobDetails(
  jobId: string,
  country = 'us',
  options?: Omit<UseQueryOptions<JobDetailsResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['job', jobId, country],
    queryFn: () => getJobDetails(jobId, country),
    enabled: !!jobId,
    ...options,
  })
}
