import { GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucketName = 'demo-aws-s3-test';
const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'Your AWS Access key id',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'Your AWS Secret Key',
  },
});

export async function getPutSignedUrl(filename: string = "new") {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: filename,
    ContentType: "application/yaml",
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 360, //seconds
  });
  return url;
}

export async function getObjectURL(key: string) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  const signedURL = await getSignedUrl(s3Client, command, { expiresIn: 60 * 30 }); // 30 min
  return signedURL;
}

export async function doesObjectPresent(key: string) {
  try {
    const command = new HeadObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
    const result = await s3Client.send(command);
    console.log(result)
    return true;
  } catch (error) {
    return false;
  }
}