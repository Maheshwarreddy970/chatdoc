import { PutObjectCommandOutput, S3 } from "@aws-sdk/client-s3";
import * as AWS from 'aws-sdk';

export async function uploadToS3(
  file: any
): Promise<{ file_key: string; file_name: string }> {
  return new Promise((resolve, reject) => {
    try {
      const s3 = new S3({
        region: "ap-south-1",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });
      const file_key ="uploads/" + Date.now().toString() + file[0].name.replace(" ", "-");

      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
        Body: file[0],
      };
      s3.putObject(
        params,
        (err: any, data: PutObjectCommandOutput | undefined) => {
          return resolve({
            file_key,
            file_name: file[0].name,
          });
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}


export async function deletefroms3(
  file_path: any
): Promise< {}> {
  return new Promise((resolve, reject) => {
    try {
      const s3 = new AWS.S3({
        region: "ap-south-1",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });

      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_path,
      };
      s3.deleteObject (params, (err, data) => {
        if (err) {
          console.error('Error deleting object:', err);
        } else {
          console.log('Object deleted successfully:', data);
        }
      })
    } catch (error) {
      reject(error);
    }
  });
}


export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${file_key}`;
  return url;
}