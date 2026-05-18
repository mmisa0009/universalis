import { S3Client } from '@aws-sdk/client-s3';

let _s3: S3Client | null = null;

export function getS3(): S3Client {
  if (!_s3) {
    _s3 = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }
  return _s3;
}

export const S3_BUCKET = () => process.env.AWS_S3_BUCKET_NAME!;
export const S3_REGION = () => process.env.AWS_REGION!;