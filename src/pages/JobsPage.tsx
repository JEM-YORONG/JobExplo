import { useState } from 'react'
import { SlidersHorizontal, LayoutGrid, List, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { JobList } from '@/components/job/job-list'
import { SearchFilters } from '@/components/search/search-filters'
import { useInfiniteJobs } from '@/hooks/use-jobs'
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'
import type { SearchFilters as SearchFiltersType } from '@/types/search'
import type { InfiniteData } from '@tanstack/react-query'
import type { JobSearchResponse } from '@/types/job'
import { cn } from '@/utils/cn'

export function JobsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [pendingFilters, setPendingFilters] = useState<SearchFiltersType>({
    query: 'software engineer',
    country: 'us',
  })
  const [committedFilters, setCommittedFilters] = useState<SearchFiltersType>({
    query: 'software engineer',
    country: 'us',
  })
  const [searchVersion, setSearchVersion] = useState(0)

  const handleSearch = () => {
    setCommittedFilters(pendingFilters)
    setSearchVersion(v => v + 1)
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error, refetch } = useInfiniteJobs(committedFilters, searchVersion)

  const { loadMoreRef } = useInfiniteScroll(
    () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    hasNextPage,
    isFetchingNextPage
  )

  const jobs = (data as InfiniteData<JobSearchResponse, number> | undefined)?.pages.flatMap(page => page.data.jobs) || []
  const total = (data as InfiniteData<JobSearchResponse, number> | undefined)?.pages[0]?.total

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Find Jobs</h1>
            <p className="text-muted-foreground">
              {total ? `${total.toLocaleString()} jobs found` : 'Search for your next opportunity'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleSearch} size="default" className="gap-2">
              <Search className="h-4 w-4" />
              Search
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <div className="hidden lg:flex items-center border border-border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('grid')}
                className={cn(viewMode === 'grid' && 'bg-muted')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode('list')}
                className={cn(viewMode === 'list' && 'bg-muted')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className={cn('hidden lg:block lg:col-span-1', showFilters && 'block')}>
            <div className="sticky top-24">
              <SearchFilters filters={pendingFilters} onChange={setPendingFilters} />
            </div>
          </aside>

          <main className="lg:col-span-3">
            <JobList
              jobs={jobs}
              isLoading={isLoading}
              isError={isError}
              error={error ?? undefined}
              onRetry={() => refetch()}
              className={cn(viewMode === 'grid' ? 'md:grid-cols-2' : 'md:grid-cols-1')}
            />
            {hasNextPage && (
              <div ref={loadMoreRef} className="flex justify-center py-8">
                {isFetchingNextPage && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    Loading more...
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}