CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table if not exists users (
    id uuid primary key default uuid_generate_v4() not null,
    username text not null,
    password text not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

create table if not exists users_data (
    id uuid primary key default uuid_generate_v4() not null,
    first_name text not null,
    last_name text not null,
    email text not null,
    user_id uuid not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

