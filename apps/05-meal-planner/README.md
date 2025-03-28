# Meal Planner App

A comprehensive meal planning application built with Next.js and Supabase. This app helps users manage their pantry, discover recipes based on available ingredients, and plan meals for the week.

## Features

- **Pantry Scanner**: Upload photos of your spices, condiments, and ingredients
- **Preference Questionnaire**: Swipeable "this or that" interface to set food preferences
- **Weekly Meal Planner**: Plan your entire week's meals
- **Dinner Suggestions**: Get recipe ideas based on your pantry and preferences

## Tech Stack

- [Next.js](https://nextjs.org/) with App Router
- [Supabase](https://supabase.com/) for database and storage
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [@zxing/library](https://github.com/zxing-js/library) for barcode scanning
- [OpenAI API](https://openai.com/api/) for recipe generation
- [Framer Motion](https://www.framer.com/motion/) for animations

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account with a project
- OpenAI API key

### Setup

1. Clone the repository
2. Install dependencies:

```bash
cd 05-meal-planner
npm install
```

3. Create a `.env.local` file with your API keys:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

4. Set up Supabase tables:

Create the following tables in your Supabase project:

- `mealplanner_pantry_item`
- `mealplanner_userprefs`
- `mealplanner_meal_plan`

Each with the schema described in the project requirements.

5. Create a Supabase Storage bucket named `meal-planner` with public access for pantry item images.

6. Run the development server:

```bash
npm run dev
```

## Database Schema

### mealplanner_pantry_item

- id: uuid (PK)
- user_id: uuid (optional, nullable)
- name: text
- image_url: text
- category: text (e.g. spice, condiment)
- expires_at: date (nullable)
- created_at: timestamp (default now)

### mealplanner_userprefs

- id: uuid (PK)
- user_id: uuid (optional)
- likes_asian: boolean
- dislikes_pork: boolean
- vegetarian: boolean

### mealplanner_meal_plan

- id: uuid (PK)
- user_id: uuid
- week_start: date
- plan_data: json
- created_at: timestamp

## Pages

- `/`: Home page with feature overview
- `/questionnaire`: Food preference quiz
- `/pantry`: Pantry management
- `/plan`: Weekly meal planning
- `/dinner`: "What's for dinner tonight?" suggestions

## Future Enhancements

- User authentication
- Shopping list generation
- Nutrition tracking
- Recipe saving and favorites
- Meal prep instructions
- Dietary restriction filters
