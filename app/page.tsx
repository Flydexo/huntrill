'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Punchline } from '@/lib/types'
import PunchlineCard from '@/components/PunchlineCard'
import Header from '@/components/Header'
import { Loader2 } from 'lucide-react'

const PAGE_SIZE = 10

export default function Home() {
  const [punchlines, setPunchlines] = useState<Punchline[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [_, setPage] = useState(0)
  const loaderRef = useRef<HTMLDivElement>(null)

  const fetchPunchlines = useCallback(async (pageIndex: number) => {
    try {
      const from = pageIndex * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      const { data, error } = await supabase
        .from('punchlines')
        .select('*')
        .order('score', { ascending: false }) // Best first
        .order('created_at', { ascending: false }) // Then newest
        .range(from, to)

      if (error) {
        throw error
      }

      if (data) {
        if (data.length < PAGE_SIZE) {
          setHasMore(false)
        }
        setPunchlines(prev => pageIndex === 0 ? data : [...prev, ...data])
      }
    } catch (error) {
      console.error('Error fetching punchlines:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPunchlines(0)
  }, [fetchPunchlines])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(prev => {
            const newPage = prev + 1
            fetchPunchlines(newPage)
            return newPage
          })
        }
      },
      { threshold: 1.0 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loading, fetchPunchlines])

  const handleVote = async (id: number, upDelta: number, downDelta: number) => {
    try {
      const { error } = await supabase.rpc('vote_punchline', {
        punchline_id: id,
        up_delta: upDelta,
        down_delta: downDelta
      })

      if (error) throw error
      
    } catch (error) {
      console.error('Error voting:', error)
    }
  }

  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-signal selection:text-white">
      <Header />
      
      <main className="container mx-auto max-w-4xl px-0 sm:px-4 sm:pt-10">
        
        {/* Intro / Header of list */}
        <div className="mb-8 border-b border-concrete px-4 py-8 sm:px-0">
            <h2 className="font-sans text-4xl font-black uppercase tracking-tighter text-carbon md:text-6xl">
              Archives
              <span className="block text-signal">Replica</span>
            </h2>
            <div className="mt-4 flex max-w-md items-center gap-4 border-l-2 border-concrete pl-4">
                <p className="font-mono text-xs text-concrete">
                    COLLECTION: HUNTRILL<br/>
                    SEASON: 2025<br/>
                    STATUS: PUBLIC_ACCESS
                </p>
            </div>
        </div>

        <div className="flex flex-col gap-0 sm:gap-4">
          {punchlines.map((p) => (
            <PunchlineCard key={p.id} punchline={p} onVote={handleVote} />
          ))}
        </div>

        {/* Loading State / Infinite Scroll Trigger */}
        <div ref={loaderRef} className="mt-10 flex justify-center p-4">
          {loading && <Loader2 className="animate-spin text-signal" size={32} />}
          {!loading && !hasMore && punchlines.length > 0 && (
            <div className="border border-concrete px-4 py-2">
                <p className="font-mono text-xs text-concrete">END_OF_ARCHIVE</p>
            </div>
          )}
          {!loading && punchlines.length === 0 && (
             <div className="border border-dashed border-concrete p-10 text-center">
                <p className="font-mono text-sm text-carbon">ARCHIVE_EMPTY</p>
             </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-20 border-t border-concrete py-10 text-center bg-paper">
         <p className="font-mono text-xs text-concrete">
            © 2025 HUNTRILL // REPLICA SYSTEM
         </p>
      </footer>
    </div>
  )
}