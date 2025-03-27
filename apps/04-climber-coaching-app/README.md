# Climber Coach App

A Next.js application for rock climbing coaching, featuring blog posts, session booking, Q&A, progress tracking, and a Redpoint Journal.

## Features

- Blog with markdown support for climbing tips and advice
- Session booking system
- Q&A section for climbing-related questions
- Progress tracking for logged climbs
- Redpoint Journal for tracking climbing projects and sessions
- Admin dashboard for managing content and requests

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Local storage and server-side JSON storage
- React Markdown

## Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Tailwind Typography plugin for the blog:

   ```bash
   npm install @tailwindcss/typography
   ```

4. Update your `tailwind.config.ts` to include the typography plugin:

   ```typescript
   plugins: [require('@tailwindcss/typography')],
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Redpoint Journal

The Redpoint Journal feature allows climbers to:

- Log climbing projects they're working on
- Record session notes for each attempt
- Track progress from "in progress" to "sent" status
- View a history of attempts on each project

Data is stored using:

- API routes for server interaction
- JSON files in the `/data` directory

## Deployment

The app is ready to be deployed on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy your application.

## Usage

1. **Blog**: View climbing tips and advice in the blog section
2. **Booking**: Submit a session booking request
3. **Q&A**: Ask questions and view answers from the coach
4. **Progress**: Track your overall climbing progress
5. **Journal**: Log and track specific climbing projects
6. **Admin**: Access the admin dashboard at `/admin` to manage content and requests

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
