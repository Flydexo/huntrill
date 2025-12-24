'use client'

import { useState, useEffect } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { Punchline } from '@/lib/types'
import { cn } from '@/lib/utils'

interface PunchlineCardProps {
  punchline: Punchline
  onVote: (id: number, upDelta: number, downDelta: number) => void
}

export default function PunchlineCard({ punchline, onVote }: PunchlineCardProps) {
  const [vote, setVote] = useState<'up' | 'down' | null>(null)
  
  // Optimistic score
  const [optimisticScore, setOptimisticScore] = useState(punchline.score)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    const storedVote = localStorage.getItem(`vote_${punchline.id}`)
    if (storedVote === 'up' || storedVote === 'down') {
      setVote(storedVote)
    }
  }, [punchline.id])

  const handleVote = (type: 'up' | 'down') => {
    if (vote === type) return
    
    let scoreChange = 0
    let upDelta = 0
    let downDelta = 0

    if (vote === null) {
      if (type === 'up') { scoreChange = 1; upDelta = 1; }
      else { scoreChange = -1; downDelta = 1; }
    } else {
      if (type === 'up') { scoreChange = 2; upDelta = 1; downDelta = -1; }
      else { scoreChange = -2; upDelta = -1; downDelta = 1; }
    }

    setOptimisticScore(prev => prev + scoreChange)
    setVote(type)
    localStorage.setItem(`vote_${punchline.id}`, type)
    onVote(punchline.id, upDelta, downDelta)
  }

  const handleShare = async () => {
    if (punchline.genius) {
      try {
        await navigator.clipboard.writeText(punchline.genius)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy text: ', err)
      }
    }
  }

  return (
    <div className="group relative border-b border-concrete bg-paper p-6 sm:border sm:border-concrete sm:hover:border-carbon">
      {/* ID Badge */}
      <div className="mb-4 flex items-center justify-between border-b border-concrete pb-2 border-dashed">
        <span className="font-mono text-xs text-concrete">
            NO. {String(punchline.id).padStart(4, '0')}
        </span>
        <span className="font-mono text-xs uppercase text-concrete bg-concrete/10 px-1">
            {punchline.track_title || 'UNTITLED'}
        </span>
      </div>
      
      {/* Content */}
      <div className="mb-8">
        <blockquote className="font-sans text-xl font-bold leading-tight text-carbon md:text-2xl tracking-tight">
          {punchline.content}
        </blockquote>
      </div>
        
      {/* Footer / Controls */}
      <div className="flex items-center justify-between">
        
        {/* Voting - Industrial/Technical */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleVote('up')}
            className={cn(
              "group/btn flex items-center gap-2 font-mono text-sm transition-colors hover:text-signal",
              vote === 'up' ? "text-signal font-bold" : "text-concrete"
            )}
          >
            <span className={cn(
                "flex h-8 w-8 items-center justify-center border transition-all",
                vote === 'up' ? "border-signal bg-signal text-white" : "border-concrete group-hover/btn:border-signal group-hover/btn:text-signal"
            )}>
                <ArrowUp size={16} />
            </span>
          </button>

          <span className={cn(
            "font-mono text-lg font-bold min-w-[3ch] text-center",
            vote === 'up' ? "text-signal" : vote === 'down' ? "text-concrete" : "text-carbon"
          )}>
            {optimisticScore}
          </span>
          
          <button
            onClick={() => handleVote('down')}
            className={cn(
              "group/btn flex items-center gap-2 font-mono text-sm transition-colors hover:text-carbon",
              vote === 'down' ? "text-carbon font-bold" : "text-concrete"
            )}
          >
             <span className={cn(
                "flex h-8 w-8 items-center justify-center border transition-all",
                vote === 'down' ? "border-carbon bg-carbon text-white" : "border-concrete group-hover/btn:border-carbon group-hover/btn:text-carbon"
            )}>
                <ArrowDown size={16} />
            </span>
          </button>
        </div>

        {/* Share - Simple text link */}
         <button 
          onClick={handleShare}
          disabled={!punchline.genius}
          className={cn(
            "font-mono text-xs uppercase transition-all duration-300",
            !punchline.genius ? "text-concrete/50 cursor-not-allowed" : 
            isCopied ? "text-signal font-bold" : "text-concrete hover:text-signal hover:underline decoration-signal underline-offset-4"
          )}
          title={punchline.genius ? "Copier le lien Genius" : "Pas de lien Genius"}
        >
          [ {isCopied ? 'COPIED' : 'SHARE_REF'} ]
        </button>
      </div>
    </div>
  )
}