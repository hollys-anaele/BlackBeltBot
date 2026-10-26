-- Run this in the Supabase SQL editor (or via the CLI) before starting the Java API.

create extension if not exists "pgcrypto";

create table if not exists public.items (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    body text not null,
    created_at timestamptz not null default timezone('utc', now())
);

alter table public.items enable row level security;

-- The Java backend uses the Postgres connection (service credentials),
-- which bypasses RLS. Keep this policy for any future client-side reads.
create policy "Allow public read of items"
    on public.items
    for select
    using (true);

insert into public.items (title, body)
values
    ('Welcome to BlackBeltBot', 'Replace this sample table with fighters, clips, and analysis results.'),
    ('Connect your stack', 'React talks to Spring Boot. Spring Boot talks to Supabase Postgres.');
