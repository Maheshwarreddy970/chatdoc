import { Pinecone } from '@pinecone-database/pinecone';

export const getPineconeClient = () => {
  return  new Pinecone({
    apiKey: '7ef035a3-e536-4356-a820-0e08147fcde9'
  });
};
