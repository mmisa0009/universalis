import { getSupabase, getSupabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  const supabase = getSupabase();
  const supabaseAdmin = getSupabaseAdmin();

  const { data: { user }, error: sessionError } = await supabase.auth.getUser(token);
  if (sessionError || !user) {
    return NextResponse.json({ error: 'Session expired.' }, { status: 401 });
  }

  const { data: profile } = await supabaseAdmin
    .from('profiles').select('role').eq('id', user.id).single();

  if (!profile || !['board', 'admin'].includes(profile.role)) {
    return NextResponse.json({ error: 'Insufficient permissions.' }, { status: 403 });
  }

  const { title, content, tag, tag_color, time, location, image_url } = await req.json();

  if (!title) {
    return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('announcements')
    .insert({ title, content, tag, tag_color, time, location, image_url })
    .select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}