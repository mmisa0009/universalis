-- Site-wide settings that admins can edit from the site itself instead of
-- editing static files (e.g. the homepage hero background image, which used
-- to be the hardcoded /public/allMember.png).
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

-- Seed the homepage hero background with its current hardcoded image, so
-- nothing changes visually until an admin picks a new one.
insert into site_settings (key, value) values ('hero_image_url', '/allMember.png')
on conflict (key) do nothing;
