import { getSupabase, getSupabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

const BOARDS = ['EB', 'SB', 'AB'];

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

// Resolves the term_order a member should have for `term`: reuses an existing
// term's order if one already exists (ignoring this row itself), otherwise
// assigns a new highest order — same rule the create route uses, so editing a
// member's term tag can also start/rejoin a term.
async function resolveTermOrder(supabaseAdmin: ReturnType<typeof getSupabaseAdmin>, term: string, currentId: string) {
  const { data: sameTerm } = await supabaseAdmin
    .from('members')
    .select('term_order')
    .ilike('term', term)
    .neq('id', currentId)
    .limit(1);

  if (sameTerm && sameTerm.length > 0) return sameTerm[0].term_order;

  const { data: maxRow } = await supabaseAdmin
    .from('members')
    .select('term_order')
    .order('term_order', { ascending: false })
    .limit(1);
  return maxRow && maxRow.length > 0 ? maxRow[0].term_order + 1 : 1;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await authorizeAdmin(req);
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { name, position, img, board, term } = await req.json();
  if (!name?.trim() || !position?.trim() || !term?.trim()) {
    return NextResponse.json({ error: 'Name, position and term are required.' }, { status: 400 });
  }
  if (!BOARDS.includes(board)) {
    return NextResponse.json({ error: 'Board must be EB, SB or AB.' }, { status: 400 });
  }

  const cleanTerm = term.trim();
  const termOrder = await resolveTermOrder(auth.supabaseAdmin, cleanTerm, id);

  const { data, error } = await auth.supabaseAdmin
    .from('members')
    .update({
      name: name.trim(),
      position: position.trim(),
      img: img || '',
      board,
      term: cleanTerm,
      term_order: termOrder,
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
    .from('members').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
