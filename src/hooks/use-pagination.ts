import { useMemo } from 'react'

export function usePagination(totalItems: number, itemsPerPage: number, currentPage: number) {
  const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems, itemsPerPage])

  const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage, itemsPerPage])

  const endIndex = useMemo(() => Math.min(startIndex + itemsPerPage, totalItems), [startIndex, itemsPerPage, totalItems])

  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  return {
    totalPages,
    startIndex,
    endIndex,
    hasNextPage,
    hasPrevPage,
  }
}
