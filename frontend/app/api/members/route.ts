import { getSupabase, getSupabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

const BOARDS = ['EB', 'SB', 'AB'];

export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('term_order', { ascending: false })
    .order('sort_order', { ascending: true });

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

  if (!profile || !['board', 'admin'].includes(profile.role?.toLowerCase())) {
    return NextResponse.json({ error: 'Insufficient permissions.' }, { status: 403 });
  }

  const { name, position, img, board, term } = await req.json();

  if (!name?.trim() || !position?.trim() || !term?.trim()) {
    return NextResponse.json({ error: 'Name, position and term are required.' }, { status: 400 });
  }
  if (!BOARDS.includes(board)) {
    return NextResponse.json({ error: 'Board must be EB, SB or AB.' }, { status: 400 });
  }

  const cleanTerm = term.trim();

  // Reuse the term_order of an existing term with the same name (case-insensitive),
  // appending after its last member. Otherwise this is a brand-new term — it
  // becomes the newest one, which automatically archives every older term to
  // the Previous Boards page.
  let termOrder: number;
  let sortOrder = 0;

  const { data: sameTerm } = await supabaseAdmin
    .from('members')
    .select('term_order, sort_order')
    .ilike('term', cleanTerm)
    .order('sort_order', { ascending: false })
    .limit(1);

  if (sameTerm && sameTerm.length > 0) {
    termOrder = sameTerm[0].term_order;
    sortOrder = sameTerm[0].sort_order + 1;
  } else {
    const { data: maxRow } = await supabaseAdmin
      .from('members')
      .select('term_order')
      .order('term_order', { ascending: false })
      .limit(1);
    termOrder = maxRow && maxRow.length > 0 ? maxRow[0].term_order + 1 : 1;
  }

  const { data, error } = await supabaseAdmin
    .from('members')
    .insert({
      name: name.trim(),
      position: position.trim(),
      img: img || '',
      board,
      term: cleanTerm,
      term_order: termOrder,
      sort_order: sortOrder,
    })
    .select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
