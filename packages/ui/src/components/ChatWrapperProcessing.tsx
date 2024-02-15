import React from 'react'
import { Loader2 } from 'lucide-react'

export function ChatWrapperProcessing() {
  return (
    <div className='flex-1 flex justify-center items-center flex-col mb-28'>
    <div className='flex flex-col items-center gap-2'>
      <Loader2 className='h-8 w-8 text-slate-950 animate-spin' />
      <h3 className='font-semibold text-xl'>
        Processing PDF...
      </h3>
      <p className='text-zinc-500 text-sm'>
        This won&apos;t take long.
      </p>
    </div>
  </div>
  )
}
