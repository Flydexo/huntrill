# Huntrill - Punchline Rater

A luxury/street aesthetic website to rate the best punchlines of the French rapper Huntrill. Built with Next.js, Tailwind CSS, and Supabase.

## Features

- **Ranked Feed:** Punchlines ordered by score (upvotes - downvotes).
- **Infinite Scrolling:** Smoothly load more punchlines as you scroll.
- **Voting System:** Upvote or downvote your favorite lines.
- **Luxury Aesthetic:** Dark mode, gold accents, glassmorphism.

## Setup

### 1. Prerequisites

- Node.js installed.
- A [Supabase](https://supabase.com/) project.

### 2. Environment Variables

Rename `.env.local` (or create it) and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

Go to your Supabase SQL Editor and run the content of `supabase/schema.sql`. This will:
- Create the `punchlines` table.
- Set up RLS policies.
- Create the `vote_punchline` function.
- Seed some initial data.

### 4. Run the App

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.