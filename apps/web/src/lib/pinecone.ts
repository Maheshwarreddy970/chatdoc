import { Pinecone } from '@pinecone-database/pinecone';

export const getPineconeClient = async () => {
  const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY!});

  // Create a serverless index
  await pc.createIndex({
    name: 'chardoc',
    dimension: 1536,
    metric: 'cosine',
    spec: { 
        serverless: { 
            cloud: 'gcp', 
            region: 'us-central1' 
        }
    } })
  // Connect to the index
  return {index:pc.index}
};
