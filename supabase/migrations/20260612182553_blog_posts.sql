-- Blog posts table for Bantu The People admin blog creator
create table if not exists blog_posts (
  id          uuid        primary key default gen_random_uuid(),
  title       text        not null,
  slug        text        unique not null,
  content     text        not null default '',
  excerpt     text        not null default '',
  tags        text[]      not null default '{}',
  published   boolean     not null default false,
  author      text        not null default 'Bantu The People',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-update updated_at on every change
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger blog_posts_updated_at
  before update on blog_posts
  for each row execute function set_updated_at();

-- Row-level security
alter table blog_posts enable row level security;

-- Anyone can read published posts (public blog)
create policy "public_read_published"
  on blog_posts for select
  using (published = true);

-- Admin (by JWT email claim) has full access
create policy "admin_full_access"
  on blog_posts for all
  using (
    (auth.jwt() ->> 'email') = 'dludlulungile08@gmail.com'
  )
  with check (
    (auth.jwt() ->> 'email') = 'dludlulungile08@gmail.com'
  );
