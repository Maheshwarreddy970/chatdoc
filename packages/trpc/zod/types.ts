import {z} from "zod"

export const MessageInput=z.object({
    id:z.string(),
    text: z.string(),
    isUserMessage: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.string().nullable(),
    fileId: z.string().nullable()
}) 


export type MessageType = z.infer<typeof MessageInput>;


export const UserInput=z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
    password: z.string().nullable(),
})

export type UserType = z.infer<typeof UserInput>;



