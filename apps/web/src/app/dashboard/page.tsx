import Dashboard from '@/components/Dashboard'
import { db } from '@repo/database/dbconnect'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { UserType } from '@repo/trpc/types'

const Page = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  console.log(user)
  if (!user|| !user.id){
    redirect('/auth-callback?origin=dashboard')
    }

  return <Dashboard/>
}

export default Page