"use client"

import React from 'react'
import Charboard_preview from "@/../public/dashboard-preview.png"
import Fileupload_preview from "@/../public/file-upload-preview.png"
import dashboardpreview from "@/../public/dahsboard.png"
import { Stepsdisplay } from './Stepdisplay';
import Image from 'next/image';
import { motion } from 'framer-motion';


export default function StepComponent() {
  return (
    <div className=' flex flex-col gap-20'>
      <div className='flex justify-between px-40'>
        <div >
          <Stepsdisplay rotateY={80}>
            <Image src={dashboardpreview} alt='dahsboard' className=' w-full h-full'></Image>
          </Stepsdisplay>
        </div>
        <div>
          <motion.h3
            initial={{ y: 50, }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className=' text-4xl text-black font-bold'>Steps 1</motion.h3>
          <motion.p
            initial={{ y: -50 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='mt-10 font-normal text-lg'>
            Sign up for an account redirect
            to Dashboard Page
          </motion.p>
        </div>
      </div>
      <div className='flex justify-between px-40'>
        <div>
          <motion.h3
            initial={{ y: 50, }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className=' text-4xl text-black font-bold'>Steps 2 : Upload your PDF file</motion.h3>
          <motion.p
            initial={{ y: -50 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='mt-10 font-normal text-lg'>
             We&apos;ll process your file and make it
          ready for you to chat with.
          </motion.p>
        </div>
        <div >
          <Stepsdisplay rotateY={-80}>
            <Image src={Fileupload_preview} alt='filieupload image' className=' w-full h-full object-cover'></Image>
          </Stepsdisplay>
        </div>
      </div>
      <div className='flex justify-between px-40'>
        <div >
          <Stepsdisplay rotateY={80}>
            <Image src={Charboard_preview} alt='chatboard' className='w-full h-full object-cover'></Image>
          </Stepsdisplay>
        </div>
        <div>
          <motion.h3
            initial={{ y: 50, }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className=' text-4xl text-black font-bold'>Steps 3 : Start asking questions
             </motion.h3>
          <motion.p
            initial={{ y: -50 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='mt-10 font-normal text-lg'>
                It&apos;s that simple. Try out Chatdoc today -
          it really takes less than a minute.
          </motion.p>
        </div>
      </div>
    </div>
  )
}
