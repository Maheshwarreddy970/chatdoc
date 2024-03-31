'use client'

import { trpc } from '@/app/_trpc/client'
import UploadButton from './UploadButton'
import {
  Ghost,
  Loader2,
  MessageSquare,
  Plus,
  Trash,
} from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import { format } from 'date-fns'
import { Button } from '@repo/ui/ui'
import { useState } from 'react'
import { deletefroms3 } from "@/lib/s3"
import { FileType } from '@repo/trpc/types'
import { PinContainer } from './3d-pin'
import { TypewriterEffect } from './typewriter-effect'


const Dashboard = () => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] =
    useState<string | null>(null)

  const utils = trpc.useContext()
  const words = [
     {
      text: "My Files",
      className: "text-zinc-900 dark:text-zinc-900",
    },
  ];

  const { data, isLoading } =
    trpc.getUserFiles.useQuery()

  const files: FileType[] | undefined = data

  const { mutate: deleteFile } =
    trpc.deleteFile.useMutation({
      onSuccess: async (file) => {
        deletefroms3(file.key);
        utils.getUserFiles.invalidate()
      },
      onMutate({ id }) {
        setCurrentlyDeletingFile(id)
      },
      onSettled() {
        setCurrentlyDeletingFile(null)
      },
    })



  return (
    <main className='mx-auto w-full md:p-10'>
      <div className='mt-8 -mb-24 w-full flex  gap-4 justify-between border-b border-gray-200 pb-5 flex-row items-center sm:gap-0'>
        <TypewriterEffect className='mt-4 sm:mt-0' words={words}></TypewriterEffect>
        <div className='flex justify-end'>
          <UploadButton />
        </div>
      </div>

      {/* display all user files */}
      {files && files?.length !== 0 ? (
        <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
          {files
            .sort(
              (a: FileType, b: FileType) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file: FileType,index:number) => (
              <li key={index}>
                  <div className="h-[40rem] w-full flex items-center justify-center ">
                    <PinContainer
                      title={file.name}
                      href={`/dashboard/${file.id}`}
                    >
                <Link
                  href={`/dashboard/${file.id}`}>
                      <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-zinc-900">
                          {file.name}
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
                          <span className="text-slate-500 ">
                            Customizable Tailwind CSS and Framer Motion Components.
                          </span>
                        </div>
                        <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-amber-500 to-pink-500" />
                      </div>
                  </Link>

                      <div className='px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500'>
                        <div className='flex items-center gap-2'>
                          <Plus className='h-4 w-4' />
                          {format(
                            new Date(file.createdAt),
                            'MMM yyyy'
                          )}
                        </div>

                        <div className='flex items-center gap-2'>
                          <MessageSquare className='h-4 w-4' />
                          mocked
                        </div>

                        <Button
                          onClick={() =>
                            deleteFile({ id: file.id })
                          }
                          size='sm'
                          className='w-full bg-transparent hover:bg-red-100'
                          variant='destructive'>
                          {currentlyDeletingFile === file.id ? (
                            <Loader2 className='h-4 w-4 text-red-500 animate-spin' />
                          ) : (
                            <Trash className='h-4 w-4 text-red-500' />
                          )}
                        </Button>
                      </div>

                    </PinContainer>
                  </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className='my-2' count={3} />
      ) : (
        <div className='mt-52 flex flex-col items-center gap-2 '>
          <Ghost className='h-8 w-8 text-black' />
          <h3 className='text-black'>
            Not much activity around here
          </h3>
          <p className='text-black'>Let&apos;s Ready to upload your first PDF.</p>
        </div>
      )}
    </main>
  )
}

export default Dashboard
