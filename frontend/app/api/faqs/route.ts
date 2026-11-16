import { getSupabaseAdmin } from '@/lib/supabase';
import { authorizeFaqAdmin } from '@/lib/authorizeFaqAdmin';
import { NextRequest, NextResponse } from 'next/server';

// Public: anyone can read the FAQ.
export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// Admin only: add a new question. It goes to the end of the list.
export async function POST(req: NextRequest) {
  const auth = await authorizeFaqAdmin(req);
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { question, answer } = await req.json();
  if (!question?.trim()) {
    return NextResponse.json({ error: 'Question is required.' }, { status: 400 });
  }

  const { data: last } = await auth.supabaseAdmin
    .from('faqs').select('sort_order')
    .order('sort_order', { ascending: false }).limit(1).maybeSingle();

  const { data, error } = await auth.supabaseAdmin
    .from('faqs')
    .insert({
      question: question.trim(),
      answer: answer?.trim() || '',
      sort_order: (last?.sort_order ?? -1) + 1,
    })
    .select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
