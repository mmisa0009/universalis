import { getSupabase, getSupabaseAdmin } from '@/lib/supabase';
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

  // Use regular signUp so Supabase respects the project's email confirmation setting
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (!data.user && !data.session) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const userId = data.user?.id;
  if (!userId) {
      return NextResponse.json({ success: true }, { status: 201 });
  }

  // Create profile with service role client (bypasses RLS)
  const supabaseAdmin = getSupabaseAdmin();
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .insert({ id: userId, username });

  if (profileError && !profileError.code?.includes('23505')) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}