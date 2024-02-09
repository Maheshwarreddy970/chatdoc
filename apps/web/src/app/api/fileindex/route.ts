
import { db } from '@repo/database/dbconnect'
import { OpenAIEmbeddings } from '@langchain/openai'
import { PineconeStore } from '@langchain/pinecone'
import { getPineconeClient } from '@/lib/pinecone'
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { NextRequest } from 'next/server';
import { constants } from 'buffer';
//import { WebPDFLoader} from "langchain/document_loaders/web/pdf";



export const POST = async (req: NextRequest) => {
  const { res, createdFile } = await req.json()
  try {
    const response = await fetch(
      ` https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${res.file_key}`
    )

    const blob = await response.blob()
    //@ts-ignore
    const loader = new PDFLoader(blob)
    
    const pageLevelDocs = await loader.load()
    
    //const pagesAmt = pageLevelDocs.length
    // vectorize and index entire document
    const pinecone = await getPineconeClient()
    const pineconeIndex = pinecone.index('chardoc')
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    })
    console.log("pdfloading")

    await PineconeStore.fromDocuments(
      pageLevelDocs,
      embeddings,
      {
        //@ts-ignore
        pineconeIndex,
        namespace: createdFile.id,
      }
    )
    console.log("pdf uploaded")
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