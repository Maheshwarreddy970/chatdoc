import React from 'react'
import Image from 'next/image'
import logo from '../../../public/sketch1704618933812two - Copy.png'
import Sign_in from '@/components/Sign_in'


export default function page() {
  return (
    <div className='w-full flex justify-center items-center h-screen'>
    <div className='w-9/12 sm:w-3/12'>
        <div className="p-8 md:-mt-12   border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className='flex justify-center items-center'>
                <Image src={logo} alt='logo' className='w-14 -mt-5 mb-4 h-14'></Image>
            </div>
            <Sign_in></Sign_in>
        </div>
    </div>
</div>
  )
}
