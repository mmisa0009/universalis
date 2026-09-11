-- Committees table: powers the Committees page (app/Committees/page.tsx).
-- Committee listings are now editable by admins/board members through the
-- site instead of being hardcoded in the page itself.
--
-- Run this once in the Supabase SQL editor for this project.

create table if not exists committees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  image text not null default '',
  instagram text not null default '',
  email text not null default '',
  created_at timestamptz not null default now()
);

alter table committees enable row level security;
-- No public policies on purpose: all reads and writes go through the
-- Next.js API routes (app/api/committees/**), which use the Supabase
-- service-role key and therefore bypass RLS — same pattern as `members`,
-- `announcements` and `documents`.

-- service_role bypassing RLS is not the same as having a table grant (see
-- the note in members.sql) — grant it up front this time so writes don't
-- fail with "permission denied for table committees":
grant select, insert, update, delete on table committees to service_role;

-- Seed data: carried over from the hardcoded list in
-- app/Committees/page.tsx, so no existing committee is lost in the move to
-- the database. Descriptions were all placeholder "coming soon" text —
-- admins can fill in real ones (and swap photos to S3 uploads) through the
-- site's "Edit" button now.
insert into committees (name, description, image, instagram, email) values
('Art', 'coming soon', '/art.png', 'https://www.instagram.com/ucmartsociety/', 'ucmartcommittee@gmail.com'),
('Bookclub', 'coming soon', '/bookclub.jpg', 'https://www.instagram.com/ucm_book_club/', 'ucmbookclub2023@gmail.com'),
('Charity', 'coming soon', '/charity.jpg', 'https://www.instagram.com/ucm.charitycommittee/', 'ucmcharitycommitee23@gmail.com'),
('Cooking', 'coming soon', '/cooking.jpg', 'https://www.instagram.com/forkyeah.ucm/', 'ucm.forkyeah@gmail.com'),
('Exco Excursion', 'coming soon', '/excursion.jpg', 'https://www.instagram.com/ucm_exco/', 'exco.ucmaastricht@gmail.com'),
('Film', 'coming soon', '/film.jpeg', 'https://www.instagram.com/ucmfilmcommittee/', 'ucmfilmcommittee1@gmail.com'),
('Finance', 'coming soon', '/finance.jpeg', 'https://www.instagram.com/ucmfinancecommittee/', 'ucmfinancecommittee@gmail.com'),
('Games', 'coming soon', '/games.jpg', 'https://www.instagram.com/ucm_gcc/', 'ucmgamesandchesscommittee@gmail.com'),
('Gardening', 'coming soon', '/gardening.jpg', 'https://www.instagram.com/ucmgardenningcommittee/', 'Gardening4ucm@gmail.com'),
('Gay Agenda', 'coming soon', '/gayAgenda.jpg', 'https://www.instagram.com/gayagenda_ucm/', 'ucmthegayagenda@gmail.com'),
('Graduation', 'coming soon', '/graduation.jpg', '#', ''),
('Hypatia', 'coming soon', '/hypatia.jpg', 'https://www.instagram.com/ucm.hypatia/', 'ucmhypatiacommittee@gmail.com'),
('IRDC', 'coming soon', '/irdc.jpg', 'https://www.instagram.com/irdc.ucm/', 'irdc.ucm@gmail.com'),
('Limburg', 'coming soon', '/limburg.jpg', 'https://www.instagram.com/ucmlimburg/', 'tech@maastrichtuniversity.nl'),
('Music', 'coming soon', '/music.jpg', 'https://www.instagram.com/ucmmusiccommittee/', 'ucmmusiccommittee2023@gmail.com'),
('Party', 'coming soon', '/party.jpeg', 'https://www.instagram.com/ucm_party/', 'partycommitteeucm@gmail.com'),
('Philosophy', 'coming soon', '/philosophy.jpg', 'https://www.instagram.com/ucm_philosophy_committee/', 'philosophycommitteeucm@gmail.com'),
('Poetry', 'coming soon', '/poetry.jpg', 'https://www.instagram.com/ucmpoetrysociety/', 'poetrysociety.ucm@gmail.com'),
('Radio', 'coming soon', '/radio.jpg', '#', 'rumoradio@gmail.com'),
('Spiritual Enlightenment', 'coming soon', '/spiritualEnlightenment.jpg', 'https://www.instagram.com/spiritualenlightenment.ucm/', 'spiritual.enlightenment.se@gmail.com'),
('Sports', 'coming soon', '/sports.jpg', 'https://www.instagram.com/ucmsportscommittee/', 'ucmsportscommittee@gmail.com'),
('Sustainability', 'coming soon', '/sustainability.jpg', 'https://www.instagram.com/sustainabilitycommittee_ucm/', 'suatainabilitycommitteeucm@gmail.com'),
('Theatre', 'coming soon', '/theatre.jpg', 'https://www.instagram.com/ucmtheatercommittee/', 'ucmtheatercommittee@gmail.com'),
('The Bell', 'coming soon', '/theBell.jpg', 'https://www.instagram.com/ucmthebell/', 'ucmthebell@gmail.com'),
('UCSRN', 'coming soon', '/ucsrn.png', 'https://www.instagram.com/ucm_ucsrn_committee/', '#');
