'use client';

// Keep this comfortably under hosting-platform request body limits (e.g.
// Vercel serverless functions hard-cap request bodies around ~4.5MB
// regardless of what our own /api/upload route allows) — otherwise the
// platform itself rejects the request before our code runs and returns a
// plain-text error page instead of JSON.
export const MAX_UPLOAD_MB = 4;

export class UploadError extends Error {}

export async function uploadImage(file: File, folder: string, token: string | null): Promise<string> {
  if (!token) throw new UploadError('You must be logged in to upload images.');
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
    throw new UploadError(`Image is too large — please use a file under ${MAX_UPLOAD_MB}MB.`);
  }

  const fd = new FormData();
  fd.append('file', file);
  fd.append('folder', folder);

  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  });

  // A proxy or the hosting platform can reject an oversized/invalid request
  // before it reaches this route, returning a plain-text error page (e.g.
  // "Request Entity Too Large") instead of JSON. Parsing that straight with
  // res.json() throws a confusing "Unexpected token" error, so read as text
  // first and parse defensively.
  const raw = await res.text();
  let data: { url?: string; error?: string } | null = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    // Not JSON — fall through to the status-based message below.
  }

  if (!res.ok) {
    throw new UploadError(
      data?.error ||
      (res.status === 413
        ? `Image is too large — please use a file under ${MAX_UPLOAD_MB}MB.`
        : `Upload failed (${res.status}).`)
    );
  }

  if (!data?.url) throw new UploadError('Upload failed: no URL returned.');
  return data.url;
}
