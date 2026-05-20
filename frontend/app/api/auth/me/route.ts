import { getSupabase, getSupabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });

  const supabase = getSupabase();
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return NextResponse.json({ error: 'Invalid token.' }, { status: 401 });

  const supabaseAdmin = getSupabaseAdmin();
  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('username, role')
    .eq('id', user.id)
    .single();


  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email ?? '',
      username: profile?.username ?? '',
      role: profile?.role ?? 'member',
    },
  });
}