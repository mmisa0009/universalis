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
('Michiel Nieuwenhuijs', 'President', '/Spring2020-president.jpg', 'EB', 'Spring 2020', 10, 0),
('Joost Wijffels', 'Secretary', '/Spring2020-secretary.jpg', 'EB', 'Spring 2020', 10, 1),
('Elena Lungu', 'Treasurer', '/Spring2020-treasurer.jpg', 'EB', 'Spring 2020', 10, 2),
('Kendra Kibbey', 'Acquisitions', '/Spring2020-acquisitions.jpg', 'SB', 'Spring 2020', 10, 3),
('Manuel Ntsoumou', 'External Executive', '/Spring2020-external.jpg', 'AB', 'Spring 2020', 10, 4),
('Ties Kiem', 'Social Executive', '/Spring2020-social.jpg', 'SB', 'Spring 2020', 10, 5),

-- Spring 2021
('Lou Petrone', 'President', '/Spring2021-chair.jpeg', 'EB', 'Spring 2021', 20, 0),
('Belle Boss', 'Treasurer', '/Spring2021-treasurer.jpeg', 'EB', 'Spring 2021', 20, 1),
('Eylül Bilge Uçak', 'Events Coordinator', '/Spring2021-events.jpeg', 'SB', 'Spring 2021', 20, 2),
('Shamayita Sarkar', 'Internal Executive', '/Spring2021-internal.jpeg', 'AB', 'Spring 2021', 20, 3),
('Vitor da Silva', 'External Executive', '/Spring2021-external.jpeg', 'AB', 'Spring 2021', 20, 4),

-- Fall 2021
('Stephen McCarthy', 'President', '/Fall2021-president.jpg', 'EB', 'Fall 2021', 30, 0),
('Elena Catalina Lungu', 'Treasurer', '/Fall2021-treasurer.jpg', 'EB', 'Fall 2021', 30, 1),
('Patsy Fetzer', 'Secretary', '/Fall2021-secretary.jpg', 'EB', 'Fall 2021', 30, 2),
('Julius Junck', 'Social Chair', '/Fall2021-Socialchair.jpg', 'SB', 'Fall 2021', 30, 3),
('Bea Bridge', 'Social Internal', '/Fall2021-socialInternal.jpg', 'SB', 'Fall 2021', 30, 4),
('Luisa Baumann', 'Social External', '/Fall2021-socialExternal.jpg', 'SB', 'Fall 2021', 30, 5),
('Marthe-Marie Voorspoel', 'Social Acquisitions', '/Fall2021-socialAcquisitions.jpg', 'SB', 'Fall 2021', 30, 6),
('Giulia Petrelli', 'Academic Chair', '/Fall2021-academicChair.jpg', 'AB', 'Fall 2021', 30, 7),
('Michelle Reitano', 'Academic Internal', '/Fall2021-academicInternal.jpg', 'AB', 'Fall 2021', 30, 8),
('Jola Gockel', 'Academic External', '/Fall2021-academicExternal.jpg', 'AB', 'Fall 2021', 30, 9),
('Sara Hock', 'Events Coordinator', '/Fall2021-socialEvents.jpg', 'SB', 'Fall 2021', 30, 10),

-- Fall 2024
('Audrey Giraud', 'President', '/Fall2024-president.jpeg', 'EB', 'Fall 2024', 40, 0),
('Delphine Dorleans', 'Treasurer', '/Fall2024-treasurer.jpeg', 'EB', 'Fall 2024', 40, 1),
('Misaki Miyake', 'Secretary', '/Fall2024-secretary.JPG', 'EB', 'Fall 2024', 40, 2),
('Pascal Freyer', 'Social Chair', '/Fall2024-socialChair.png', 'SB', 'Fall 2024', 40, 3),
('Mathilde Auradé-Hadchouel', 'Social Internal', '/Fall2024-socialInternal.jpg', 'SB', 'Fall 2024', 40, 4),
('Jasmijn Jeronimus', 'Social External', '/Fall2024-socialExternal.jpg', 'SB', 'Fall 2024', 40, 5),
('Iris Willems', 'Social Acquisitions', '/Fall2024-socialAcquisitions.jpg', 'SB', 'Fall 2024', 40, 6),
('Maja Deutinger', 'Academic Chair', '/Fall2024-academicChair.png', 'AB', 'Fall 2024', 40, 7),
('Juul Uilenreef', 'Academic Internal', '/Fall2024-academicInternal.jpg', 'AB', 'Fall 2024', 40, 8),
('Nik Schulz', 'Academic External', '/Fall2024-academicExternal.jpg', 'AB', 'Fall 2024', 40, 9),
('Charlotte Heuser', 'Academic Events', '/Fall2024-abEvents.jpg', 'AB', 'Fall 2024', 40, 10),

-- Fall 2025 (current board — highest term_order, shown on the homepage)
('Anni Najorka', 'President', '/Fall2024-president.jpeg', 'EB', 'Fall 2025', 50, 0),
('Kate Kronite', 'Treasurer', '/Fall2025_treasurer.jpeg', 'EB', 'Fall 2025', 50, 1),
('Misaki Miyake', 'Secretary', '/Fall2025-secretary.jpeg', 'EB', 'Fall 2025', 50, 2),
('Jente Gietelink', 'Marketing Executive', '/Fall2025-marketing.jpeg', 'EB', 'Fall 2025', 50, 3),
('Mathilde Auradé-Hadchouel', 'Social Chair', '/Fall2025-socialChair.jpeg', 'SB', 'Fall 2025', 50, 4),
('Léna Pörneczi', 'Social Events Executive', '/Fall2025-socialEvents.jpeg', 'SB', 'Fall 2025', 50, 5),
('Lorette Lebrec', 'UC Relations Executive', '/Fall2025-ucRelations.jpeg', 'SB', 'Fall 2025', 50, 6),
('Kai Heinermann', 'Acquisitions Executive', '/Fall2025-acquisitions.jpeg', 'SB', 'Fall 2025', 50, 7),
('Mirthe van Dijk', 'Academic Chair', '/Fall2025-ab-chair.jpeg', 'AB', 'Fall 2025', 50, 8),
('Lorelei Clarke', 'Academic Events Executive', '/Fall2025-AbEvents.jpeg', 'AB', 'Fall 2025', 50, 9),
('Leonhard Cuzmin', 'Student Academic Advisor Executive', '/Fall2025-studentAcademicAdvisor.jpeg', 'AB', 'Fall 2025', 50, 10),
('Elisa Bauer', 'FSE Representative Executive', '/Fall2025-fseRepresentative.jpeg', 'AB', 'Fall 2025', 50, 11);
