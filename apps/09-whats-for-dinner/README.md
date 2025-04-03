# What's for Dinner?

A Next.js application that generates personalized recipes based on your ingredients and preferences using AI. Built with modern web technologies and a clean, dark-mode interface.

## Features

- **Ingredient Selection**
  - Searchable protein and carb inputs with suggestions.
  - Multiple vegetable selection with custom additions.
  - Various cuisine style options.
  - Cooking time preference.
  - ✨ "Surprise Me" feature for random recipe generation.

- **AI Recipe Generation**
  - Generates complete recipes using OpenAI's GPT model.
  - Provides detailed shopping lists.
  - Step-by-step cooking instructions.
  - Cuisine-specific recipe suggestions.
  - Random recipe generation with one click.

- **Modern UI/UX**
  - Clean, dark mode interface.
  - Mobile responsive design.
  - Interactive form elements.
  - Real-time input validation.
  - Neon purple accents for fun interactions.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Components**:
  - Headless UI for accessible components
  - Hero Icons for icons
- **Styling**: CSS Modules
- **AI Integration**: OpenAI API
- **Language**: TypeScript

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

You can generate recipes in two ways:

### 1. Custom Recipe

1. Select or type in your preferred protein
2. Choose or enter your desired carb
3. Select one or more vegetables (including custom options)
4. Pick a cuisine style
5. Set your desired cooking time
6. Click "Generate Recipe" to get your personalized recipe

### 2. Random Recipe

1. Click the "✨ Surprise Me!" button to instantly generate a random recipe with:
   - Random protein selection
   - Random carb selection
   - 1-3 random vegetables
   - Random cuisine style
   - Random cooking time between 15-135 minutes

The app will generate:

- A recipe name and description
- A categorized shopping list
- Step-by-step cooking instructions

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)

## Contributing

Feel free to submit issues and enhancement requests!
