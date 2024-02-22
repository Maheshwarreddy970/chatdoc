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
import {deletefroms3} from "@/lib/s3"
import { FileType } from '@repo/trpc/types'

const Dashboard = () => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] =
    useState<string | null>(null)

  const utils = trpc.useContext()

  const { data, isLoading } =
    trpc.getUserFiles.useQuery()

  const files:FileType[]|undefined=data

  const { mutate: deleteFile } =
    trpc.deleteFile.useMutation({
      onSuccess: async(file) => {
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
    <main className='mx-auto max-w-7xl md:p-10'>
      <div className='mt-8 mb-5 flex flex-col items-start gap-4 justify-center sm:justify-between border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-4 font-bold text-5xl bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-pink-500'>
          My Files
        </h1>
        <div className='flex justify-end'>
        <UploadButton/>
        </div>
      </div>

      {/* display all user files */}
      {files && files?.length !== 0 ? (
        <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3'>
          {files
            .sort(
              (a:FileType, b:FileType) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file:FileType) => (
              <li
                key={file.id}
                className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'>
                <Link
                  href={`/dashboard/${file.id}`}
                  className='flex flex-col gap-2'>
                  <div className='pt-6 px-6 flex w-full items-center justify-between space-x-6'>
                    <div className='h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-slate-500 to-slate-800' />
                    <div className='flex-1 truncate'>
                      <div className='flex items-center space-x-3'>
                        <h3 className='truncate text-lg font-medium text-zinc-900'>
                          {file.name}
                        </h3>
                      </div>
                    </div>
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
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className='my-2' count={3} />
      ) : (
        <div className='mt-16 flex flex-col items-center gap-2 '>
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