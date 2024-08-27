import {
  GetObjectCommand,
  ListObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'Your AWS Access key id',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'Your AWS Secret Key',
  },
});

async function getObjectURL(key: string) {
  try {
    const command = new GetObjectCommand({
      Bucket: 'demo-aws-s3-test',
      // Bucket: 'static-book',
      Key: key,
    });
    const signedURL = await getSignedUrl(s3Client, command);
    return signedURL;
  } catch (error) {
    console.log('error');
  }
}

async function putObject(filename: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: 'demo-aws-s3-test',
    Key: `upload/user-upload/${filename}`,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function listObject() {
  const command = new ListObjectsV2Command({
    Bucket: 'demo-aws-s3-test',
  });

  const result = await s3Client.send(command);
  fs.writeFileSync('./listObject.json', JSON.stringify(result));
  return result;
}
async function init() {
  // console.log("presigned-url : ", await getObjectURL('openapiSpec/blog.yaml'))
  // console.log("presigned-url : ", await getObjectURL('upload/user-upload/image-1724590468108.jpeg'));
  // console.log('URL for uploading', await putObject(`image-${Date.now()}.jpeg`, `image/jpeg`))
  // await listObject();
  // console.log('see ./listfile.json')
}

init();
