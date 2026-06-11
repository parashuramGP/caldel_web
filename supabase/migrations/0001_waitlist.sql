-- CALDEL waitlist table
-- Stores email or phone signups from the coming-soon landing page.

create extension if not exists "pgcrypto";

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  contact text not null,
  contact_type text not null check (contact_type in ('email', 'phone')),
  source text default 'web',
  ip text,
  user_agent text,
  created_at timestamptz not null default now(),
  unique (contact)
);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);
create index if not exists waitlist_contact_type_idx on public.waitlist (contact_type);

-- Lock the table down. All access happens via the service key from the Next.js
-- API route (server-side), so no anon/auth role needs direct read/write.
alter table public.waitlist enable row level security;

-- (No policies = no anon/authenticated access. Service key bypasses RLS.)
