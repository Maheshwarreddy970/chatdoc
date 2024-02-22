import {z} from "zod"

export const FileuploadInput=z.object({
    filekey: z.string(),
    name: z.string(),
    url: z.string(),
  })

export type FileuploadType = z.infer<typeof FileuploadInput>;


