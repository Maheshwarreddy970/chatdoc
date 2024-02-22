import {z} from "zod"

export const FileuploadInput=z.object({
    filekey: z.string(),
    name: z.string(),
    url: z.string(),
  })

export type FileuploadType = z.infer<typeof FileuploadInput>;

const UploadStatus = z.enum(['PENDING', 'PROCESSING', 'FAILED', 'SUCCESS']);

// Define the filetype interface with Zod types
export const FileType = z.object({
  userId: z.string().nullable(),
  id: z.string(),
  key: z.string(),
  name: z.string(),
  url: z.string(),
  uploadStatus: UploadStatus,
  createdAt: z.string(), // You might want to use a date type here based on your actual schema
  updatedAt: z.string(), // Same as createdAt
});

export type FileType=z.infer<typeof FileType>