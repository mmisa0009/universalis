-- One-time migration: switch `members.term_order` from an insertion-order
-- counter (10, 20, 30, 40, 50, ... — whatever order terms happened to be
-- created in) to an absolute chronological encoding: year * 10 + season
-- rank (Spring=0, Summer=1, Fall=2, Winter=3).
--
-- Why: with the old scheme, a brand-new term always got the *highest*
-- term_order, i.e. it always became the "current" board — even if an admin
-- was adding an older term like "Fall 2019" after "Fall 2025" already
-- existed. The app code (app/api/members/route.ts and
-- app/api/members/[id]/route.ts) now computes term_order this same way for
-- any new "<Season> <Year>" term, so it always slots in at the right
-- chronological position instead. Run this once so existing rows use the
-- same scale — otherwise their old small values (10-50) would sit below
-- every newly-added term regardless of actual chronology.
--
-- Safe to run anytime; only touches rows whose `term` matches
-- "<Spring|Summer|Fall|Autumn|Winter> <YYYY>" (every current row does).
-- A custom one-off term name that doesn't match this shape is left alone.

do $$
declare
  r record;
  season text;
  yr int;
  rank int;
begin
  for r in select id, term from members loop
    if r.term ~* '^(Spring|Summer|Fall|Autumn|Winter)\s+(\d{4})$' then
      season := lower((regexp_match(r.term, '^(Spring|Summer|Fall|Autumn|Winter)\s+(\d{4})$', 'i'))[1]);
      yr := ((regexp_match(r.term, '^(Spring|Summer|Fall|Autumn|Winter)\s+(\d{4})$', 'i'))[2])::int;
      rank := case season
        when 'spring' then 0
        when 'summer' then 1
        when 'fall' then 2
        when 'autumn' then 2
        when 'winter' then 3
      end;
      update members set term_order = yr * 10 + rank where id = r.id;
    end if;
  end loop;
end $$;
