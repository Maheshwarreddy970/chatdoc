import Link from 'next/link'
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight } from 'lucide-react'
import UserAccountNav from './UserAccountNav'
import Image from 'next/image'
import logo from "../../public/sketch1704618933812two - Copy.png"
import { TopLightButton } from '@repo/ui/ui'

const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <nav className=' fixed px-60 z-50 top-8  h-14 w-full'>
        <div className='border border-white/40 flex items-center px-5 justify-between  h-full backdrop-blur-lg shadow-inner py-1  shadow-black/30 rounded-md bg-black/10'>
          <Link
            href='/dashboard'
            className='flex justify-center z-40 font-semibold'>
            <Image src={logo} alt="logo" className='h-11 w-11 hover:animate-spin'></Image>
          </Link>

          <div className='items-center space-x-4 sm:flex'>
            {!user ? (
              <>
                <LoginLink>
                  <TopLightButton word={"Login"}><ArrowRight size={"17px"}></ArrowRight></TopLightButton>
                </LoginLink>
                <RegisterLink>
                <TopLightButton word={"Join Now"}><ArrowRight size={"17px"}></ArrowRight></TopLightButton>
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
    </nav>
  )
}




export default Navbar