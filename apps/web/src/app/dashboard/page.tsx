import Dashboard from '@/components/Dashboard'
import { db } from '@repo/database/dbconnect'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { UserType } from '@repo/trpc/types'

const Page = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || !user || !user.id) redirect('/auth-callback?origin=dashboard')

  const dbUser:UserType|null = await db.user.findFirst({
    where: {
      id: user.id
    }
  })

  if(!dbUser) redirect('/auth-callback?origin=dashboard')


  return <Dashboard/>
}

export default Page