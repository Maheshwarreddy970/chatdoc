
import { db } from '@repo/database/dbconnect'
import { OpenAIEmbeddings } from '@langchain/openai'
import { PineconeStore } from '@langchain/pinecone'
import { pinecone } from '@/lib/pinecone'
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { NextRequest, NextResponse } from 'next/server';

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

   await PineconeStore.fromDocuments(
      pageLevelDocs,
      embeddings,
      {
        //@ts-ignore
        pineconeIndex,
        namespace: createdFile.id,
      })
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
  return NextResponse.json({
    message: "ok"
  }, { status: 200 })
}