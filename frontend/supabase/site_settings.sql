-- Site-wide settings that admins can edit from the site itself instead of
-- editing static files (e.g. the homepage hero background image, which used
-- to be a hardcoded file in /public — there is no bundled default image at
-- all now, so the homepage just shows a plain background until an admin
-- uploads one).
--
-- Simple key/value store: one row per setting. Run once in the Supabase SQL
-- editor for this project.

create table if not exists site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table site_settings enable row level security;
-- No public policies on purpose: reads and writes go through the Next.js
-- API routes (app/api/settings/**), which use the Supabase service-role key
-- and therefore bypass RLS — same pattern as `members`, `announcements` and
-- `documents`.

-- service_role bypassing RLS is not the same as having a table grant — see
-- the note in members.sql. Grant it explicitly so writes don't fail with
-- "permission denied for table site_settings":
grant select, insert, update, delete on table site_settings to service_role;

-- The bundled default hero image (/public/allMember.png) has been deleted —
-- there is no default anymore. If hero_image_url was never customized and
-- still points at that now-missing file, clear it so the homepage falls
-- back to a plain background instead of a broken image link.
delete from site_settings
where key = 'hero_image_url' and value = '/allMember.png';
