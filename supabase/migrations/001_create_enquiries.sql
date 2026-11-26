-- Migration: 001_create_enquiries.sql
-- Purpose: Secure storage for portfolio consultation & project enquiries
-- Access model: RLS enabled with NO public/anon policies.
-- Only the server-side Vercel API route using SUPABASE_SERVICE_ROLE_KEY inserts records.

create extension if not exists pgcrypto;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) >= 2 and char_length(full_name) <= 120),
  email text not null check (char_length(trim(email)) >= 5 and char_length(email) <= 160),
  phone text not null check (char_length(trim(phone)) >= 7 and char_length(phone) <= 40),
  company_name text check (company_name is null or char_length(company_name) <= 140),
  project_type text not null check (char_length(trim(project_type)) >= 2 and char_length(project_type) <= 100),
  budget_range text check (budget_range is null or char_length(budget_range) <= 100),
  project_description text not null check (char_length(trim(project_description)) >= 20 and char_length(project_description) <= 3000),
  consent_given boolean not null default false check (consent_given = true),
  source text not null default 'portfolio-website',
  status text not null default 'new' check (status in ('new', 'reviewed', 'responded', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

-- Enforce strict Row Level Security so public anon keys cannot read, list, update or spam this table.
alter table public.enquiries enable row level security;

-- Explicitly revoke direct anon/authenticated privileges as defence in depth.
revoke all on table public.enquiries from anon, authenticated;
