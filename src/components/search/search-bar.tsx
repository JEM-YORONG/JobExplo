import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Mic, X, Clock, TrendingUp } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { SearchSuggestion } from '@/types/search'
import { cn } from '@/utils/cn'

interface SearchBarProps {
  onSearchClick?: (query: string) => void
  onSearch?: (query: string) => void
  suggestions?: SearchSuggestion[]
  recentSearches?: string[]
  popularSearches?: string[]
  onSuggestionClick?: (suggestion: string) => void
  className?: string
}

export function SearchBar({
  onSearchClick,
  onSearch,
  suggestions = [],
  recentSearches = [],
  popularSearches = [],
  onSuggestionClick,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    const trimmed = query.trim()
    if (!trimmed) return
    onSearchClick?.(trimmed)
    onSearch?.(trimmed)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser.')
      return
    }

    const SpeechRecognition = (window as unknown as Record<string, unknown>)['SpeechRecognition'] ??
      (window as unknown as Record<string, unknown>)['webkitSpeechRecognition']
    const recognition = new (SpeechRecognition as new () => {
      continuous: boolean
      interimResults: boolean
      onstart: () => void
      onend: () => void
      onresult: (event: { results: { item: Array<{ 0: { transcript: string } }> }[] }) => void
      start: () => void
    })()
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onresult = (event: { results: { item: Array<{ 0: { transcript: string } }> }[] }) => {
      const result = event.results[0]
      const transcript = result.item[0][0].transcript
      setQuery(transcript)
    }

    recognition.start()
  }

  const handleClear = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  const showSuggestions = isFocused && (suggestions.length > 0 || recentSearches.length > 0 || popularSearches.length > 0)

  return (
    <div className={cn('relative w-full max-w-2xl', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search jobs, companies, or keywords..."
          className="pl-10 pr-20 h-12 text-base"
          aria-label="Search jobs"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              aria-label="Clear search"
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearch}
            aria-label="Search"
            className="h-8 w-8 text-primary hover:text-primary"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleVoiceSearch}
            aria-label="Voice search"
            className={cn('h-8 w-8', isListening && 'text-red-500')}
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
          >
            {recentSearches.length > 0 && (
              <div className="p-2">
                <p className="text-xs font-medium text-muted-foreground px-2 py-1">Recent Searches</p>
                {recentSearches.map((search, index) => (
                  <button
                    key={`recent-${index}`}
                    className="w-full flex items-center gap-2 px-2 py-2 text-sm hover:bg-muted rounded-md transition-colors text-left"
                    onClick={() => {
                      setQuery(search)
                      onSuggestionClick?.(search)
                    }}
                  >
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {search}
                  </button>
                ))}
              </div>
            )}
            {popularSearches.length > 0 && (
              <div className="p-2 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground px-2 py-1">Popular Searches</p>
                {popularSearches.map((search, index) => (
                  <button
                    key={`popular-${index}`}
                    className="w-full flex items-center gap-2 px-2 py-2 text-sm hover:bg-muted rounded-md transition-colors text-left"
                    onClick={() => {
                      setQuery(search)
                      onSuggestionClick?.(search)
                    }}
                  >
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    {search}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
