import { authorizeFaqAdmin } from '@/lib/authorizeFaqAdmin';
import { NextRequest, NextResponse } from 'next/server';

// Admin only: edit a question's text and answer (not its position/layout).
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await authorizeFaqAdmin(req);
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { question, answer } = await req.json();
  if (!question?.trim()) {
    return NextResponse.json({ error: 'Question is required.' }, { status: 400 });
  }

  const { data, error } = await auth.supabaseAdmin
    .from('faqs')
    .update({ question: question.trim(), answer: answer?.trim() || '' })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// Admin only: delete a question.
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await authorizeFaqAdmin(req);
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { error } = await auth.supabaseAdmin.from('faqs').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
