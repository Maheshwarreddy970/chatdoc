
import { db } from '@repo/database/dbconnect'
import { OpenAIEmbeddings } from '@langchain/openai'
import { PineconeStore } from '@langchain/pinecone'
import { pinecone } from '@/lib/pinecone'
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { NextRequest, NextResponse } from 'next/server';
import { constants } from 'buffer';
import { ConfigureIndexRequestSpecToJSON } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch';
import { WebPDFLoader} from "langchain/document_loaders/web/pdf";

export const POST = async (req: NextRequest) => {
  const { createdFile } = await req.json()
  if (!createdFile.id) return;
  try {
    const response = await fetch(createdFile.url)
    const blob = await response.blob()
    //@ts-ignore
    const loader = new PDFLoader(blob)
    const pageLevelDocs = await loader.load()
    const pagesAmt = pageLevelDocs.length
    // vectorize and index entire document
    const pineconeIndex = pinecone.Index('chatdocai')
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    })
   const res= await PineconeStore.fromDocuments(
      pageLevelDocs,
      embeddings,
      {
        //@ts-ignore
        pineconeIndex,
        namespace: createdFile.id,
      }
    )
    console.log(res)
    console.log("pinecoineupload")
    await db.file.update({
      data: {
        uploadStatus: 'SUCCESS',
      },
      where: {
        id: createdFile.id,
      },
    })
  } catch (err) {
    console.log(err)
    await db.file.update({
      data: {
        uploadStatus: 'FAILED',
      },
      where: {
        id: createdFile.id,
      },
    })
  }
  return NextResponse.json({
    message: "ok"
  }, { status: 200 })
}