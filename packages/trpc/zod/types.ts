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
})

export type UserType = z.infer<typeof UserInput>;

const MessageInputType = z.object({
    id: z.string(),
    createdAt: z.string(), // Adjust as per your actual schema
    text: z.string(),
    isUserMessage: z.boolean(),
  });
  
  export type MessageInputType = z.infer<typeof MessageInputType>;

