import { getSupabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiter: 5 signups per IP per 15 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const max = 5;
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (record.count >= max) return true;
  record.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 });
  }

  const { email, password, username } = await req.json();
  if (!email || !password || !username) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: false,
    user_metadata: { username },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .insert({ id: data.user.id, username });

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}