-- One-time migration: the hardcoded seed photos these paths point to have
-- been deleted from /public (all member photos are moving to S3 uploads via
-- the admin "Edit" button instead). Clear `img` for any member still
-- pointing at one of those now-missing files, so the site shows the "no
-- photo yet" placeholder instead of a broken image link. Re-upload each
-- member's real photo via the edit button whenever you're ready — it
-- uploads to S3 and updates this field automatically.
update members set img = '' where img in (
  '/Spring2020-president.jpg', '/Spring2020-secretary.jpg', '/Spring2020-treasurer.jpg',
  '/Spring2020-acquisitions.jpg', '/Spring2020-external.jpg', '/Spring2020-social.jpg',
  '/Spring2021-chair.jpeg', '/Spring2021-treasurer.jpeg', '/Spring2021-events.jpeg',
  '/Spring2021-internal.jpeg', '/Spring2021-external.jpeg',
  '/Fall2021-president.jpg', '/Fall2021-treasurer.jpg', '/Fall2021-secretary.jpg',
  '/Fall2021-Socialchair.jpg', '/Fall2021-socialInternal.jpg', '/Fall2021-socialExternal.jpg',
  '/Fall2021-socialAcquisitions.jpg', '/Fall2021-academicChair.jpg', '/Fall2021-academicInternal.jpg',
  '/Fall2021-academicExternal.jpg', '/Fall2021-socialEvents.jpg',
  '/Fall2024-president.jpeg', '/Fall2024-treasurer.jpeg', '/Fall2024-secretary.JPG',
  '/Fall2024-socialChair.png', '/Fall2024-socialInternal.jpg', '/Fall2024-socialExternal.jpg',
  '/Fall2024-socialAcquisitions.jpg', '/Fall2024-academicChair.png', '/Fall2024-academicInternal.jpg',
  '/Fall2024-academicExternal.jpg', '/Fall2024-abEvents.jpg',
  '/Fall2025_treasurer.jpeg', '/Fall2025-secretary.jpeg', '/Fall2025-marketing.jpeg',
  '/Fall2025-socialChair.jpeg', '/Fall2025-socialEvents.jpeg', '/Fall2025-ucRelations.jpeg',
  '/Fall2025-acquisitions.jpeg', '/Fall2025-ab-chair.jpeg', '/Fall2025-AbEvents.jpeg',
  '/Fall2025-studentAcademicAdvisor.jpeg', '/Fall2025-fseRepresentative.jpeg'
);
