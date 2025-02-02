import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const awsS3Client = new S3Client({
  region: "us-east-1",
  endpoint: "http://127.0.0.1:9000",
  forcePathStyle: true,
  requestChecksumCalculation: "WHEN_REQUIRED",
  credentials: {
    accessKeyId: "qg6Y8pbO4SI5LNj1yLDG",
    secretAccessKey: "RP5niSV8FSuePE8gKLJ008fKKeUxwLIl8NtRGIb6",
  },
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("image") as File;

  if (!file) {
    return Response.json({ error: "No image file!" }, { status: 400 });
  }

  const response = await awsS3Client.send(
    new PutObjectCommand({
      Bucket: "products",
      Key: `${file.name.trim()}`,
      Body: Buffer.from(await file.arrayBuffer()),
    }),
  );

  if (response.$metadata.httpStatusCode != 200) {
    return Response.json(
      { error: "Cant upload image to AWS S3" },
      { status: 400 },
    );
  }

  const imagePath = `http://127.0.0.1:9000/products/${file.name.trim()}`;

  return Response.json({ imagePath }, { status: 200 });
}
