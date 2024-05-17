'use client'

import { trpc } from '@/app/_trpc/client'
import UploadButton from './UploadButton'
import {
  FileQuestion,
  Loader2,
  MessageSquare,
  Plus,
  Trash,
} from 'lucide-react'
import {motion} from 'framer-motion'

import { format } from 'date-fns'
import { Button } from '@repo/ui/ui'
import { useState } from 'react'
import { deletefroms3 } from "@/lib/s3"
import { FileType } from '@repo/trpc/types'
import { GradualSpacing } from '../../../../packages/ui/src/components/TextGradualSpacing';
import { Filecard } from '@repo/ui/ui'

const Dashboard = () => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] =
    useState<string | null>(null)

  const utils = trpc.useContext()


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
    <main className='mx-auto z-20 w-full md:p-10'>
      <div className='mt-28 w-full flex px-10  gap-4 justify-between  border-b-2 shadow-lg border-stone-700  pb-3 flex-row items-center sm:gap-0'>
        <GradualSpacing></GradualSpacing>
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
            .map((file: FileType, index: number) => (
              <>
                <Filecard file={file}>
                  <div className=''>
                    <div className='flex text-black  justify-between my-6'>
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
                    </div>
                    <div>
                      <Button
                        onClick={() =>
                          deleteFile({ id: file.id })
                        }
                        size='sm'
                        className='w-full group  text-zinc-700 hover:text-red-500 backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(0,0,0,0.16)] to-transparent rounded-md py-2 px-6 shadow hover:shadow-red-500 duration-700'
                        variant='destructive'>
                        {currentlyDeletingFile === file.id ? (
                          <Loader2 className='h-4 w-4 text-red-500 animate-spin' />
                        ) : (
                          <Trash className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </div>
                </Filecard>
              </>
            ))}
        </ul>
      ) : (
        <div className='mt-52 w-full flex flex-col text-black items-center gap-2 '>
          <motion.span
          animate={{rotate:[30,-20]}}
          transition={{repeat:Infinity,duration:1,ease:'circIn',type:'spring'}}
          className=''>
          <FileQuestion className='w-16 h-16' />
          </motion.span>
          <h3 className='mt-7 mb-2'>
            Not much activity around here
          </h3>
          <p className=''>Let&apos;s Ready to upload your first PDF.</p>
        </div>
      )}
    </main>
  )
}

export default Dashboard
