import React from 'react'
import Charboard_preview from "@/../public/dashboard-preview.png"
import Fileupload_preview from "@/../public/file-upload-preview.png"
import dashboardpreview from "@/../public/dahsboard.png"
import { Stepsdisplay } from './Stepdisplay';
import Image from 'next/image';


export default function StepComponent() {
  return (
    <div className='flex justify-between'>
        <Stepsdisplay>
            <Image src={dashboardpreview} alt='dahporde'  className=''></Image>
        </Stepsdisplay>
        
    </div>
  )
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
    image: dashboardpreview,
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
    image: Fileupload_preview
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
    image: Charboard_preview
  },
];