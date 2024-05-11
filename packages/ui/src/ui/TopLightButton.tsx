import React, { ReactElement } from 'react'


type props={
    word:string
    children:ReactElement| undefined
}

export  function TopLightButton({children,word}:props) {
  return (
    <button
        className="group relative inline-block p-px font-semibold leading-6 text-white no-underline bg-slate-950 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900"><span
            className="absolute inset-0 overflow-hidden rounded-xl"><span
                className="absolute inset-0 rounded-xl bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">

            </span>
        </span>
        <div
            className="relative  z-10 flex gap-1 items-center text-sm px-4 py-2 rounded-md bg-gray-950/50 ring-1 ring-white/10 ">
            <span>{word}</span>
            <span className='group-hover:translate-x-2  duration-200 ease-in-out'>{children}</span>
        </div>
        <span
            className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
    </button>

)
}
