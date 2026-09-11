-- Members table: powers "Meet Our Team" (current board, Section4) and the
-- Previous Boards page. Board rosters are now editable by admins/board members
-- through the site instead of being hardcoded in app/data/members.js and
-- app/data/previousBoards.js.
--
-- Run this once in the Supabase SQL editor for this project.
--
-- How "current" vs "previous" works
-- ----------------------------------
-- Every member row is tagged with a `term` (e.g. "Fall 2025") and a
-- `term_order`. The API (app/api/members/route.ts) assigns term_order
-- automatically whenever a member is created or edited:
--   - if the typed term matches an existing term (case-insensitive), the
--     member joins that term's existing term_order and gets appended to it.
--   - if the typed term is brand new, it gets term_order = current max + 1,
--     i.e. it becomes the newest term.
-- The homepage shows whichever term has the highest term_order as the
-- "current" board. Every other term is grouped and shown on the Previous
-- Boards page, ordered most-recent-first.
--
-- So starting a new term is just: add its first member with a new term tag.
-- The old board is archived to Previous Boards automatically — nothing to
-- toggle by hand.

create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null,
  img text not null default '',
  board text not null check (board in ('EB', 'SB', 'AB')),
  term text not null,
  term_order integer not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists members_term_order_idx on members (term_order);

alter table members enable row level security;
-- No public policies are defined on purpose: all reads and writes go through
-- the Next.js API routes (app/api/members/**), which use the Supabase
-- service-role key and therefore bypass RLS — same pattern as the existing
-- `announcements` and `documents` tables.

-- IMPORTANT: bypassing RLS is not the same as having a table grant. The
-- service_role Postgres role skips RLS checks, but it still needs an
-- explicit GRANT to run INSERT/UPDATE/DELETE against this table — without
-- it every write from the admin API routes fails with
-- "permission denied for table members" even though the caller is a real
-- admin. `announcements`/`documents` already have this grant from when they
-- were first created; run this once for `members` too (safe to re-run):
grant select, insert, update, delete on table members to service_role;

-- Seed data: carried over from app/data/members.js (the current Fall 2025
-- board) and app/data/previousBoards.js (Fall 2024, Fall 2021, Spring 2021,
-- Spring 2020), so no existing member history is lost in the move to the
-- database.
--
-- NOTE: app/data/previousBoards.js also had a "Spring 2026" entry and a
-- separate "Fall 2025" entry that were both identical copies of the current
-- Fall 2025 roster (just placeholders, not a distinct board) — those are not
-- re-inserted here to avoid duplicating the same 12 people under three
-- different labels. Add the real Spring 2026 board through the admin "Add
-- Member" UI once it's elected.
insert into members (name, position, img, board, term, term_order, sort_order) values
-- Spring 2020
('Michiel Nieuwenhuijs', 'President', '', 'EB', 'Spring 2020', 10, 0),
('Joost Wijffels', 'Secretary', '', 'EB', 'Spring 2020', 10, 1),
('Elena Lungu', 'Treasurer', '', 'EB', 'Spring 2020', 10, 2),
('Kendra Kibbey', 'Acquisitions', '', 'SB', 'Spring 2020', 10, 3),
('Manuel Ntsoumou', 'External Executive', '', 'AB', 'Spring 2020', 10, 4),
('Ties Kiem', 'Social Executive', '', 'SB', 'Spring 2020', 10, 5),

-- Spring 2021
('Lou Petrone', 'President', '', 'EB', 'Spring 2021', 20, 0),
('Belle Boss', 'Treasurer', '', 'EB', 'Spring 2021', 20, 1),
('Eylül Bilge Uçak', 'Events Coordinator', '', 'SB', 'Spring 2021', 20, 2),
('Shamayita Sarkar', 'Internal Executive', '', 'AB', 'Spring 2021', 20, 3),
('Vitor da Silva', 'External Executive', '', 'AB', 'Spring 2021', 20, 4),

-- Fall 2021
('Stephen McCarthy', 'President', '', 'EB', 'Fall 2021', 30, 0),
('Elena Catalina Lungu', 'Treasurer', '', 'EB', 'Fall 2021', 30, 1),
('Patsy Fetzer', 'Secretary', '', 'EB', 'Fall 2021', 30, 2),
('Julius Junck', 'Social Chair', '', 'SB', 'Fall 2021', 30, 3),
('Bea Bridge', 'Social Internal', '', 'SB', 'Fall 2021', 30, 4),
('Luisa Baumann', 'Social External', '', 'SB', 'Fall 2021', 30, 5),
('Marthe-Marie Voorspoel', 'Social Acquisitions', '', 'SB', 'Fall 2021', 30, 6),
('Giulia Petrelli', 'Academic Chair', '', 'AB', 'Fall 2021', 30, 7),
('Michelle Reitano', 'Academic Internal', '', 'AB', 'Fall 2021', 30, 8),
('Jola Gockel', 'Academic External', '', 'AB', 'Fall 2021', 30, 9),
('Sara Hock', 'Events Coordinator', '', 'SB', 'Fall 2021', 30, 10),

-- Fall 2024
('Audrey Giraud', 'President', '', 'EB', 'Fall 2024', 40, 0),
('Delphine Dorleans', 'Treasurer', '', 'EB', 'Fall 2024', 40, 1),
('Misaki Miyake', 'Secretary', '', 'EB', 'Fall 2024', 40, 2),
('Pascal Freyer', 'Social Chair', '', 'SB', 'Fall 2024', 40, 3),
('Mathilde Auradé-Hadchouel', 'Social Internal', '', 'SB', 'Fall 2024', 40, 4),
('Jasmijn Jeronimus', 'Social External', '', 'SB', 'Fall 2024', 40, 5),
('Iris Willems', 'Social Acquisitions', '', 'SB', 'Fall 2024', 40, 6),
('Maja Deutinger', 'Academic Chair', '', 'AB', 'Fall 2024', 40, 7),
('Juul Uilenreef', 'Academic Internal', '', 'AB', 'Fall 2024', 40, 8),
('Nik Schulz', 'Academic External', '', 'AB', 'Fall 2024', 40, 9),
('Charlotte Heuser', 'Academic Events', '', 'AB', 'Fall 2024', 40, 10),

-- Fall 2025 (current board — highest term_order, shown on the homepage)
('Anni Najorka', 'President', '', 'EB', 'Fall 2025', 50, 0),
('Kate Kronite', 'Treasurer', '', 'EB', 'Fall 2025', 50, 1),
('Misaki Miyake', 'Secretary', '', 'EB', 'Fall 2025', 50, 2),
('Jente Gietelink', 'Marketing Executive', '', 'EB', 'Fall 2025', 50, 3),
('Mathilde Auradé-Hadchouel', 'Social Chair', '', 'SB', 'Fall 2025', 50, 4),
('Léna Pörneczi', 'Social Events Executive', '', 'SB', 'Fall 2025', 50, 5),
('Lorette Lebrec', 'UC Relations Executive', '', 'SB', 'Fall 2025', 50, 6),
('Kai Heinermann', 'Acquisitions Executive', '', 'SB', 'Fall 2025', 50, 7),
('Mirthe van Dijk', 'Academic Chair', '', 'AB', 'Fall 2025', 50, 8),
('Lorelei Clarke', 'Academic Events Executive', '', 'AB', 'Fall 2025', 50, 9),
('Leonhard Cuzmin', 'Student Academic Advisor Executive', '', 'AB', 'Fall 2025', 50, 10),
('Elisa Bauer', 'FSE Representative Executive', '', 'AB', 'Fall 2025', 50, 11);
