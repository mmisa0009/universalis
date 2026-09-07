import { getS3, S3_BUCKET, S3_REGION } from '@/lib/s3';
import { getSupabase } from '@/lib/supabase';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const DOCUMENT_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];
const ALLOWED_TYPES = [...IMAGE_TYPES, ...DOCUMENT_TYPES];

// Images are capped well under common hosting-platform request body limits
// (e.g. Vercel serverless functions hard-cap around ~4.5MB regardless of
// what we allow here) — above that the platform itself rejects the request
// before this route ever runs, returning a plain-text error page instead of
// JSON and breaking the client's response parsing. Documents (PDFs, etc.)
// keep the older, higher limit.
const MAX_IMAGE_MB = 4;
const MAX_DOCUMENT_MB = 10;

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  const supabase = getSupabase();
  const { error: sessionError } = await supabase.auth.getUser(token);
  if (sessionError) {
    return NextResponse.json({ error: 'Session expired.' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const folder = (formData.get('folder') as string) || 'uploads';

  if (!file) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'File type not allowed.' }, { status: 400 });
  }
  const maxMb = IMAGE_TYPES.includes(file.type) ? MAX_IMAGE_MB : MAX_DOCUMENT_MB;
  if (file.size > maxMb * 1024 * 1024) {
    return NextResponse.json({ error: `File exceeds ${maxMb}MB limit.` }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const key = `${folder}/${Date.now()}-${safeName}`;

  const s3 = getS3();
  await s3.send(new PutObjectCommand({
    Bucket: S3_BUCKET(),
    Key: key,
    Body: buffer,
    ContentType: file.type,
  }));

  const url = `https://${S3_BUCKET()}.s3.${S3_REGION()}.amazonaws.com/${key}`;
  return NextResponse.json({ url, key });
}