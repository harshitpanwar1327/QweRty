import { s3 } from "./S3Client.js";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function generateUploadURL(category: string, fileType: string) {
  const folder = category==='apps' ? "Apps" : category==='social' ? 'Social Media': 'Others';

  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileType}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    ContentType: `image/${fileType}`
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return { url, key: fileName };
}

export async function generateDownloadURL(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  });

  const downloadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return downloadUrl;
}