import { getS3, S3_BUCKET } from '@/lib/s3';
import { getSupabase } from '@/lib/supabase';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });

  const supabase = getSupabase();
  const { error: authError } = await supabase.auth.getUser(token);
  if (authError) return NextResponse.json({ error: 'Invalid token.' }, { status: 401 });

  const { data: doc } = await supabase
    .from('documents').select('file_url').eq('id', id).single();
  if (!doc) return NextResponse.json({ error: 'Document not found.' }, { status: 404 });

  // Extract the S3 key from the stored URL
  const key = new URL(doc.file_url).pathname.slice(1);

  const s3 = getS3();
  const command = new GetObjectCommand({ Bucket: S3_BUCKET(), Key: key });
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return NextResponse.json({ url: signedUrl });
}