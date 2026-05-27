import { getSupabase, getSupabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email: emailOrUsername, password } = await req.json();

  if (!emailOrUsername || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  let email = emailOrUsername;

  // If input doesn't look like an email, treat it as a username and look up the email
  if (!emailOrUsername.includes('@')) {
    const supabaseAdmin = getSupabaseAdmin();
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('id, username')
      .eq('username', emailOrUsername)
      .single();

    if (!profile) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }

    const { data: { user } } = await supabaseAdmin.auth.admin.getUserById(profile.id);
    if (!user?.email) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }
    email = user.email;
  }

  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  return NextResponse.json({
    user: { id: data.user.id, email: data.user.email },
    session: data.session,
  });
}