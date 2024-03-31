'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  Button,
  Progress,
  useToast
} from '@repo/ui/ui'
import { uploadToS3 } from "../lib/s3"
import Dropzone from 'react-dropzone'
import { Cloud, Loader2, File } from 'lucide-react'
import { trpc } from '@/app/_trpc/client'
import { useRouter } from 'next/navigation'
import { MovingButton } from './moving-border'



const UploadDropzone = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] =
    useState<boolean>(false)
  const [uploadProgress, setUploadProgress] =
    useState<number>(0)
  const { toast } = useToast()
  const { mutate: startPolling } = trpc.getFile.useMutation(
    {
      onSuccess: (file: any) => {
        router.push(`/dashboard/${file.id}`)
      },
      retry: true,
      retryDelay: 500,
    }
  )
  const { mutate: fileUpload } = trpc.uploadFile.useMutation({
    onSuccess: async (data: any) => {
      await fetch("api/fileindex", {
        method: "POST",
        body: JSON.stringify({
          createdFile: data
        }),
        headers: {
          "content-type": "application/json",
        },
      }).catch((e) => console.log(e));
    }
  });

  const startSimulatedProgress = () => {
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval)
          return prevProgress
        }
        return prevProgress + 5
      })
    }, 500)

    return interval
  }
  return (
    <div>
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile: any) => {
        setIsUploading(true)

        const progressInterval = startSimulatedProgress()
        if (acceptedFile.size > 10 * 1024 * 1024) {
          // bigger than 10mb!
          return toast({
            title: "file is lagre in size",
            description: "upload file less then 10mb",
            variant: "destructive"
          });
        }
        // handle file uploading
        const res = await uploadToS3(acceptedFile);
        await fileUpload({
          filekey: res.file_key,
          name: res.file_name,
          url: `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${res.file_key}`
        })
        if (!res) {
          return toast({
            title: 'Something went wrong',
            description: 'Please try again later',
            variant: 'destructive',
          })
        }
        const key = res?.file_key;


        clearInterval(progressInterval)
        setUploadProgress(100)
        startPolling({ key })
      }}>
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className='border h-64 m-4 border-dashed border-gray-300 rounded-lg'>
          <div className='flex items-center justify-center h-full w-full'>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'>
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <Cloud className='h-6 w-6 text-zinc-500 mb-2' />
                <p className='mb-2 text-sm text-zinc-700'>
                  <span className='font-semibold'>
                    Click to upload
                  </span>{' '}
                  or drag and drop
                </p>
                <p className='text-xs text-zinc-500'>
                  PDF up to 10 MB
                </p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className='max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200'>
                  <div className='px-3 py-2 h-full grid place-items-center'>
                    <File className='h-4 w-4 text-zinc-900' />
                  </div>
                  <div className='px-3 py-2 h-full text-sm truncate'>
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className='w-full mt-4 max-w-xs mx-auto'>
                  <Progress
                    indicatorColor={
                      uploadProgress === 100
                        ? 'bg-green-500'
                        : ''
                    }
                    value={uploadProgress}
                    className='h-1 w-full bg-zinc-200'
                  />
                  {uploadProgress === 100 ? (
                    <div className='flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2'>
                      <Loader2 className='text-slate-950 h-3 w-3 animate-spin' />
                      Redirecting...
                    </div>
                  ) : null}
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type='file'
                id='dropzone-file'
                className='hidden'
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
    </div>

  )
}

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v)
        }
      }}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        asChild>
        <MovingButton
          borderRadius="1.75rem"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Upload PDF        
          </MovingButton>
      </DialogTrigger>
      <DialogContent>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  )
}

interface restype {
  file_key: string;
  file_name: string;
}
export default UploadButton