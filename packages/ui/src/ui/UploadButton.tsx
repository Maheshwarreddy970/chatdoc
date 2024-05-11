import { FilePlus2 } from 'lucide-react'
import React from 'react'

export function UploadFileButton() {
  return (
    <div
    className=" group relative inline-block p-px font-semibold  leading-6 text-white no-underline bg-slate-950 shadow-lg cursor-pointer group rounded-full shadow-zinc-900"><span
        className="absolute inset-0 overflow-hidden rounded-full"><span
            className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">

        </span>
    </span>
    <div
        className="relative text-lg  z-10 flex gap-2 items-center px-7 py-4 rounded-full bg-gray-950/50 ring-1 ring-white/10 ">
        <span>Upload File</span>
        <span className=' duration-200 ease-in-out'><FilePlus2 size={20} /></span>
    </div>
    <span
        className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
</div>
  )
}
