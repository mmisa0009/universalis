import { getSupabase, getSupabaseAdmin } from '@/lib/supabase';
import { NextRequest } from 'next/server';

// Only the 'admin' role (the secretary) may change FAQ content.
// Board members and regular members can only read it.
export async function authorizeFaqAdmin(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return { error: 'Not authenticated.', status: 401 } as const;

  const supabase = getSupabase();
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return { error: 'Session expired.', status: 401 } as const;

  const supabaseAdmin = getSupabaseAdmin();
  const { data: profile } = await supabaseAdmin
    .from('profiles').select('role').eq('id', user.id).single();

  if (!profile || profile.role?.toLowerCase() !== 'admin') {
    return { error: 'Only admins can edit the FAQ.', status: 403 } as const;
  }

  return { supabaseAdmin };
}
