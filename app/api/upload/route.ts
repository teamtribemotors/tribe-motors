import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.R2_BUCKET_NAME;
    const publicDomain = process.env.R2_PUBLIC_DOMAIN;

    if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicDomain) {
      console.error('Missing R2 environment variables:', {
        hasAccountId: !!accountId,
        hasAccessKey: !!accessKeyId,
        hasSecret: !!secretAccessKey,
        hasBucket: !!bucketName,
        hasPublicDomain: !!publicDomain
      });
      return NextResponse.json({ error: 'Storage configuration missing' }, { status: 500 });
    }

    const s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split('.').pop();
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    const key = `uploads/${uniqueFilename}`;

    await s3Client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    }));

    // Ensure the public domain is properly formatted (e.g. https://pub-xxxx.r2.dev or a custom domain)
    const baseUrl = publicDomain.startsWith('http') ? publicDomain : `https://${publicDomain}`;
    const imageUrl = `${baseUrl}/${key}`;

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error('Error uploading file to R2:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
