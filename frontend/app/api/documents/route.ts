import { getSupabase, getSupabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  const supabase = getSupabase();
  let query = supabase
    .from('documents').select('*').order('created_at', { ascending: false });

  if (category && category !== 'All Categories') {
    query = query.eq('category', category);
  }
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }

  const { data, error } = await query;

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

  const { title, description, file_url, file_type, category } = await req.json();

  if (!title || !file_url) {
    return NextResponse.json({ error: 'Title and file_url are required.' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('documents')
    .insert({ title, description, file_url, file_type, category, uploaded_by: user.id })
    .select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}