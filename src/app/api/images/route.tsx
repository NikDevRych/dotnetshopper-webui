import { IMAGE_FORM_DATA_KEY } from "@/constants/api-constants";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const awsS3Url = process.env.NEXT_PUBLIC_AWS_S3_URL;
const awsS3AccessKey = process.env.AWS_S3_ACCESS_KEY;
const awsS3SecretKey = process.env.AWS_S3_SECRET_KEY;
const awsS3BucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

if (!awsS3Url || !awsS3AccessKey || !awsS3SecretKey || !awsS3BucketName) {
  throw new Error("Not have AWS S3 config!");
}

const awsS3Client = new S3Client({
  region: "us-east-1",
  endpoint: awsS3Url,
  credentials: {
    accessKeyId: awsS3AccessKey,
    secretAccessKey: awsS3SecretKey,
  },
  forcePathStyle: true,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get(IMAGE_FORM_DATA_KEY) as File;

  if (!image) {
    return Response.json({ error: "Image file is null." }, { status: 400 });
  }

  const command = new PutObjectCommand({
    Bucket: awsS3BucketName,
    Key: image.name,
    Body: Buffer.from(await image.arrayBuffer()),
    ContentType: image.type,
  });

  const response = await awsS3Client.send(command);

  if (response.$metadata.httpStatusCode != 200) {
    return Response.json({ error: "Fail to upload image." }, { status: 400 });
  }

  return new Response(null, { status: 200 });
}
