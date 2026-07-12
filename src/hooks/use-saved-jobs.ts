import { useCallback } from 'react'
import { useLocalStorage } from './use-local-storage'

export function useSavedJobs() {
  const [savedJobs, setSavedJobs] = useLocalStorage<string[]>('savedJobs', [])

  const saveJob = useCallback((jobId: string) => {
    setSavedJobs(prev => (prev.includes(jobId) ? prev : [...prev, jobId]))
  }, [setSavedJobs])

  const unsaveJob = useCallback((jobId: string) => {
    setSavedJobs(prev => prev.filter(id => id !== jobId))
  }, [setSavedJobs])

  const isJobSaved = useCallback(
    (jobId: string) => savedJobs.includes(jobId),
    [savedJobs]
  )

  const toggleSaveJob = useCallback(
    (jobId: string) => {
      if (isJobSaved(jobId)) {
        unsaveJob(jobId)
      } else {
        saveJob(jobId)
      }
    },
    [isJobSaved, unsaveJob, saveJob]
  )

  return {
    savedJobs,
    saveJob,
    unsaveJob,
    isJobSaved,
    toggleSaveJob,
  }
}
