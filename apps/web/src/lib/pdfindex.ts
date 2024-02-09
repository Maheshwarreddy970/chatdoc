
import { db } from '@repo/database/dbconnect'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { getPineconeClient } from '@/lib/pinecone'
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
//import { WebPDFLoader} from "langchain/document_loaders/web/pdf";

// //@ts-ignore
// let pdfLoader;

// if (typeof window === 'undefined') {
//   // Server-side code, use a server-side PDF loader
//   pdfLoader = require('server-side-pdf-loader');
// } else {
//   // Client-side code, use a client-side PDF loader
//   pdfLoader = require('client-side-pdf-loader');
// }

// Use pdfLoader accordingly


export default async function pdfindex(res:any,createdFile:any){
try {
    const response = await fetch(
     ` https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${res.file_key}`
    )

    const blob = await response.blob()
    //@ts-ignore
    const loader = new PDFLoader(blob)

    const pageLevelDocs = await loader.load()

    const pagesAmt = pageLevelDocs.length

    // vectorize and index entire document
    const pinecone = await getPineconeClient()
    const pineconeIndex = pinecone.index

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    })

    await PineconeStore.fromDocuments(
      pageLevelDocs,
      embeddings,
      {
        //@ts-ignore
        pineconeIndex,
        namespace: createdFile.id,
      }
    )

    await db.file.update({
      data: {
        uploadStatus: 'SUCCESS',
      },
      where: {
        id: createdFile.id,
      },
    })
  } catch (err) {
    await db.file.update({
      data: {
        uploadStatus: 'FAILED',
      },
      where: {
        id: createdFile.id,
      },
    })
  }
}