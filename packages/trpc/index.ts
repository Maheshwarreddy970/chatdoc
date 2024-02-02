import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
  privateProcedure,
  publicProcedure,
  router,
} from './trpc'
import { TRPCError } from '@trpc/server'
import { db } from '../database/dbconnect'
import { z } from 'zod'
import {FileuploadInput} from './zod/filetypes'
import { useHookResult } from '@trpc/react-query/dist/internals/useHookResult'

export const appRouter = router({
  authCallback: publicProcedure
  .query(async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if(!user || !user.id || !user.email){
      throw new TRPCError({ code: 'UNAUTHORIZED' })}

    // check if the user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    })

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      })
    }
    return {success:true}
  }),
  
  isExist:publicProcedure.input(z.object({userId:z.string()})).query(async({ input})=>{
    return await db.user.findFirst({
      where: {
        id: input.userId
      }
    })
  }),

  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx

    return await db.file.findMany({
      where: {
        userId,
      },
    })
  }),

  getFileUploadStatus: privateProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async ({ input, ctx }) => {
      const file = await db.file.findFirst({
        where: {
          id: input.fileId,
          userId: ctx.userId,
        },
      })

      if (!file) return { status: 'PENDING' as const }

      return { status: file.uploadStatus }
    }),

  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx

      const file = await db.file.findFirst({
        where: {
          key: input.key,
          userId,
        },
      })

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

      return file
    }),

  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx

      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId,
        },
      })

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

      await db.file.delete({
        where: {
          id: input.id,
        },
      })

      return file
    }),

  uploadFile: privateProcedure.input(FileuploadInput).
    mutation(async ({ ctx, input }) => {
      const isFileExist = await db.file.findFirst({
        where: {
          key: input.filekey,
        },
      })
      if (isFileExist) return
      const { userId } = ctx
      const createdFile = await db.file.create({
        data: {
          key: input.filekey,
          name: input.name,
          userId: userId,
          url: input.url,
          uploadStatus: 'PROCESSING',
        },
      })
      if (!createdFile) throw new TRPCError({ code: 'NOT_FOUND' })
      return createdFile;
    })


})

export type AppRouter = typeof appRouter