'use client'

import Image from "next/image";
import logo from "../../public/sketch1704618933812two - Copy.png"
import Charboard_preview from "../../public/dashboard-preview.png"
import Fileupload_preview from "../../public/file-upload-preview.png"
import dashboardpreview from "../../public/dahsboard.png"
import { TypewriterEffectSmoothComp } from "@/components/TypewriterEffectSmooth";
import { Boxes } from "../components/background-boxes";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/tracing-beam"

export default function Home() {
  return (
    <>
      <div className="h-full relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <Boxes />
        <div className="flex justify-center align-center">
          <Image src={logo} alt="logo" className="z-20 w-52 h-52"></Image>
        </div>
        <TypewriterEffectSmoothComp ></TypewriterEffectSmoothComp>
      
        <TracingBeam className="z-20 px-6">
          <div className="max-w-2xl mx-auto antialiased pt-4 relative">
            {dummyContent.map((item, index) => (
              <div key={`content-${index}`} className="mb-10">

                <h1 className={twMerge("text-3xl text-blue-500 dark:text-blue-500 mb-4")}>
                  {item.title}
                </h1>
                {item.description}
                <div className="text-sm  prose prose-sm dark:prose-invert">
                  {item?.image && (
                    <div className='rounded-xl bg-gray-300/5 ring-1 ring-inset ring-gray-50 lg:rounded-2xl px-4 py-1'>
                      <Image
                        src={item.image}
                        alt='product preview'
                        quality={100}
                        className='rounded-md w-full h-full bg-white shadow-2xl ring-1 ring-gray-900/10'
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </>
  );
}



const dummyContent = [
  {
    title: "Step 1",
    description: (
      <>
        <p className="mb-4 text-xl text-white">
          Sign up for an account
          go to Dashboard
        </p>
      </>
    ),
    image:dashboardpreview,
  },
  {
    title: "Step 2",
    description: (
      <>
        <p className="mb-4 text-xl text-white">
          Upload your PDF file
        </p>
        <p className="mb-4 text-xl text-white">
          We&apos;ll process your file and make it
          ready for you to chat with.
        </p>
      </>
    ),
    image:Fileupload_preview
  },
  {
    title: "Step 3",
    description: (
      <>
        <p className="mb-4 text-xl text-white">
          Start asking questions
        </p>
        <p className="mb-4 text-xl text-white">
          It&apos;s that simple. Try out Chatdoc today -
          it really takes less than a minute.
        </p>
      </>
    ),
    image:Charboard_preview
    },
];