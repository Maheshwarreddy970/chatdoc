import Link from 'next/link'
import { MaxWidthWrapper,buttonVariants } from '@repo/ui/ui'
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight } from 'lucide-react'
import UserAccountNav from './UserAccountNav'
import Image from 'next/image'
import logo from "../../public/sketch1704618933812two - Copy.png"

const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link
            href='/dashboard'
            className='flex justify-center z-40 font-semibold'>
              <Image src={logo} alt="logo" className='h-11 w-11 hover:animate-spin'></Image>
          </Link>

          <div className='items-center space-x-4 sm:flex'>
            {!user ? (
              <>
                <LoginLink
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Sign in
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    className:'bg-gradient-to-r from-slate-500 to-slate-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 text-xs sm:text-sm'
                  })}>
                  Sign in{' '}
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </RegisterLink>
              </>
            ) : (
              <>
                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? 'Your Account'
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ''}
                  imageUrl={user.picture ?? ''}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}




export default Navbar