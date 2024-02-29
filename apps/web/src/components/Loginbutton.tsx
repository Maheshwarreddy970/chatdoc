import React from 'react'

import { MaxWidthWrapper,buttonVariants } from '@repo/ui/ui'
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight } from 'lucide-react'

function Loginbutton() {
    return (
        <RegisterLink
            className={buttonVariants({
                size: 'sm',
                className: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800'
            })}>
            Get started{' '}
            <ArrowRight className='ml-1.5 h-5 w-5' />
        </RegisterLink>
    )
}

export default Loginbutton
