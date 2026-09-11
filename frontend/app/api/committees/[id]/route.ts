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

  if (!profile || !['board', 'admin'].includes(profile.role?.toLowerCase())) {
    return { error: 'Insufficient permissions.', status: 403 };
  }

  return { supabaseAdmin };
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await authorizeAdmin(req);
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { name, description, image, instagram, email } = await req.json();
  if (!name?.trim()) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  }

  const { data, error } = await auth.supabaseAdmin
    .from('committees')
    .update({
      name: name.trim(),
      description: description?.trim() || '',
      image: image || '',
      instagram: instagram?.trim() || '',
      email: email?.trim() || '',
    })
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
    .from('committees').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
