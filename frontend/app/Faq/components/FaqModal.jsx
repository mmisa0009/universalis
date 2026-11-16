'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

/**
 * Add / edit a single FAQ entry. Admin only (the API enforces this too).
 * @param {{
 *   faq?: { id: string, question: string, answer: string } | null,
 *   onClose: () => void,
 *   onSave: (faq: any) => void,
 * }} props
 */
export default function FaqModal({ faq, onClose, onSave }) {
  const { token } = useAuth();
  const [question, setQuestion] = useState(faq?.question || '');
  const [answer, setAnswer] = useState(faq?.answer || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim()) { setError('Question is required.'); return; }
    setSaving(true);
    setError('');
    try {
      const res = await fetch(faq ? `/api/faqs/${faq.id}` : '/api/faqs', {
        method: faq ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ question: question.trim(), answer: answer.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      onSave(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-bold text-[#001C3D]">
            {faq ? 'Edit Question' : 'New Question'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#44474e] mb-2">
                Question
              </label>
              <input
                value={question}
                onChange={e => setQuestion(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#001C3D] focus:outline-none focus:border-[#001C3D]"
                placeholder="e.g. How can I join a committee?"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#44474e] mb-2">
                Answer
              </label>
              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                rows={10}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#001C3D] focus:outline-none focus:border-[#001C3D] resize-y"
                placeholder="Write the answer. Leave an empty line between paragraphs."
              />
              <p className="text-[11px] text-gray-400 mt-1">Tip: leave an empty line between paragraphs.</p>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 border border-gray-200 rounded-full text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-2.5 bg-[#001C3D] text-white rounded-full text-sm font-bold hover:bg-[#001C3D]/80 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
