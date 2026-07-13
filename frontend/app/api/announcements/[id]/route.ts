import { getSupabase, getSupabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

async function authorizeAdmin(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return { error: 'Not authenticated.', status: 401 };

  const supabase = getSupabase();
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return { error: 'Session expired.', status: 401 };

  const supabaseAdmin = getSupabaseAdmin();
  const { data: profile } = await supabaseAdmin
    .from('profiles').select('role').eq('id', user.id).single();

  if (!profile || !['board', 'admin'].includes(profile.role)) {
    return { error: 'Insufficient permissions.', status: 403 };
  }

  return { supabaseAdmin };
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await authorizeAdmin(req);
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { title, content, tag, tag_color, time, location, image_url } = await req.json();
  if (!title) return NextResponse.json({ error: 'Title is required.' }, { status: 400 });

  const { data, error } = await auth.supabaseAdmin
    .from('announcements')
    .update({ title, content, tag, tag_color, time, location, image_url })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await authorizeAdmin(req);
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { error } = await auth.supabaseAdmin
    .from('announcements').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
