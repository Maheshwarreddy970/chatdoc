'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../@/components/ui/dialog'
import { Button } from '../../@/components/ui/button'
import { MovingButton } from '../../../../apps/web/src/components/moving-border';



export const UploadButton = () => {
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
        <Button>Upload PDF</Button>
        <MovingButton
          borderRadius="1.75rem"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Borders are cool
        </MovingButton>
      </DialogTrigger>

      <DialogContent>
      </DialogContent>
    </Dialog>
  )
}

