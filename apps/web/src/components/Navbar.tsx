import Link from 'next/link'
import { MaxWidthWrapper, buttonVariants } from '@repo/ui/ui'
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
                <LoginLink>
                  <button className=" flex px-4 py-2 rounded-md border border-black bg-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
                    Log in {' '}
                    <ArrowRight className='ml-1.5 h-5 w-5' />

                  </button>
                </LoginLink>
                <RegisterLink>
                  <button className="flex px-4 py-2 rounded-md border border-black bg-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
                    Join now {' '}
                    <ArrowRight className='ml-1.5 h-5 w-5' />
                  </button>
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