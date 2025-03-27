# Climber Coach App

A Next.js application for rock climbing coaching, featuring blog posts, session booking, Q&A, and progress tracking.

## Features

- Blog with markdown support for climbing tips and advice
- Session booking system
- Q&A section for climbing-related questions
- Progress tracking for logged climbs
- Admin dashboard for managing content and requests

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Database)
- React Markdown

## Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a Supabase project and set up the following tables:

   ```sql
   -- Blog posts table
   create table blog_posts (
     id uuid default uuid_generate_v4() primary key,
     title text not null,
     content text not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     updated_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Booking requests table
   create table booking_requests (
     id uuid default uuid_generate_v4() primary key,
     name text not null,
     email text not null,
     preferred_date timestamp with time zone not null,
     goals text not null,
     status text not null default 'pending',
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Questions table
   create table questions (
     id uuid default uuid_generate_v4() primary key,
     question text not null,
     answer text,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     updated_at timestamp with time zone
   );

   -- Climb logs table
   create table climb_logs (
     id uuid default uuid_generate_v4() primary key,
     date date not null,
     climb_name text not null,
     grade text not null,
     notes text,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );
   ```

4. Create a `.env.local` file in the root directory with your Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The app is ready to be deployed on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy your application.

Make sure to add your Supabase environment variables in the Vercel project settings.

## Usage

1. **Blog**: View climbing tips and advice in the blog section
2. **Booking**: Submit a session booking request
3. **Q&A**: Ask questions and view answers from the coach
4. **Progress**: Log your climbs and track your progress
5. **Admin**: Access the admin dashboard at `/admin` to manage content and requests

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
