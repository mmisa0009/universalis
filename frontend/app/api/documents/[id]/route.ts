import { getSupabase, getSupabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });

  const supabase = getSupabase();
  const { data: { user }, error: sessionError } = await supabase.auth.getUser(token);
  if (sessionError || !user) return NextResponse.json({ error: 'Session expired.' }, { status: 401 });

  const supabaseAdmin = getSupabaseAdmin();
  const { data: profile } = await supabaseAdmin
    .from('profiles').select('role').eq('id', user.id).single();

  if (!profile || !['board', 'admin'].includes(profile.role)) {
    return NextResponse.json({ error: 'Insufficient permissions.' }, { status: 403 });
  }

  const { error } = await supabaseAdmin.from('documents').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
