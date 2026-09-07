import { getSupabase, getSupabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

// Only settings the site is allowed to read/write through this route.
// Keeps the key/value store from becoming an arbitrary write target.
const ALLOWED_KEYS = ['hero_image_url'];

export async function GET() {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('site_settings')
    .select('key, value')
    .in('key', ALLOWED_KEYS);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const settings = Object.fromEntries((data ?? []).map((row) => [row.key, row.value]));
  return NextResponse.json(settings);
}

export async function PATCH(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  const supabase = getSupabase();
  const { data: { user }, error: sessionError } = await supabase.auth.getUser(token);
  if (sessionError || !user) {
    return NextResponse.json({ error: 'Session expired.' }, { status: 401 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data: profile } = await supabaseAdmin
    .from('profiles').select('role').eq('id', user.id).single();

  if (!profile || !['board', 'admin'].includes(profile.role?.toLowerCase())) {
    return NextResponse.json({ error: 'Insufficient permissions.' }, { status: 403 });
  }

  const { key, value } = await req.json();
  if (!ALLOWED_KEYS.includes(key) || typeof value !== 'string' || !value.trim()) {
    return NextResponse.json({ error: 'Invalid setting.' }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from('site_settings')
    .upsert({ key, value: value.trim(), updated_at: new Date().toISOString() }, { onConflict: 'key' });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ key, value: value.trim() });
}
