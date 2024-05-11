import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  Icons,
  Avatar, AvatarFallback,
  TopLightButton
} from '@repo/ui/ui'
import Image from 'next/image'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight, LogOut } from 'lucide-react'
import Link from 'next/link'

interface UserAccountNavProps {
  email: string | undefined
  name: string
  imageUrl: string
}

const UserAccountNav = async ({
  email,
  imageUrl,
  name,
}: UserAccountNavProps) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='overflow-visible'>
        <Button className='rounded-full h-9 w-9 aspect-square bg-slate-400'>
          <Avatar className='relative h-9 w-9'>
            {imageUrl ? (
              <div className='relative aspect-square h-full w-full'>
                <Image
                  fill
                  src={imageUrl}
                  alt='profile picture'
                  referrerPolicy='no-referrer'
                />
              </div>
            ) : (
              <AvatarFallback>
                <span className='sr-only'>{name}</span>
                <Icons.user className='h-4 w-4 text-zinc-900' />
              </AvatarFallback>
            )}
          </Avatar>

        </Button>
      </DropdownMenuTrigger>
      <Link
      href="/dashboard"
      >
      <TopLightButton word={"Dashboard"}><ArrowRight size={"17px"}></ArrowRight></TopLightButton>
      </Link>

      <DropdownMenuContent className='bg-white' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            {name && (
              <p className='font-medium text-sm text-black'>
                {name}
              </p>
            )}
            {email && (
              <p className='w-[200px] truncate text-xs text-zinc-700'>
                {email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuSeparator />

        <DropdownMenuItem className='w-full cursor-pointer '>
          <LogoutLink className='w-full text-red-700 flex justify-between'><span>Log out</span> <LogOut className='w-4  text-red-700 h-4'></LogOut></LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav