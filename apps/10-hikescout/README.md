# HikeScout 🥾

A Next.js application that generates personalized hiking recommendations based on your preferences. Get detailed hiking itineraries including weather forecasts, transport options, and scenic photos.

## Features

- 🗺️ Personalized hiking recommendations based on:
  - Starting location
  - Desired hiking duration
  - Travel distance preference
  - Terrain type
  - Vibe of the hike
  - Food preferences

- 🌤️ Real-time weather information using Open-Meteo API
- 📸 Location-specific photos from Unsplash
- 🚂 Detailed transport instructions
- 🍽️ Food and refreshment suggestions
- 🧥 What to bring recommendations

## Tech Stack

- Next.js 14
- TypeScript
- CSS Modules
- APIs:
  - Unsplash API for location photos
  - Open-Meteo for weather data
  - Open-Meteo Geocoding API

## Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with:

   ```
   UNSPLASH_ACCESS_KEY=your_unsplash_api_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

## Environment Variables

- `UNSPLASH_ACCESS_KEY`: Required for fetching location photos from Unsplash

## API Routes

### `/api/weather`

Fetches current weather conditions for a given location using Open-Meteo API.

### `/api/unsplash`

Retrieves relevant hiking photos for the location using Unsplash API.

### `/api/generate-hike`

Generates personalized hiking recommendations based on user preferences.

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Background images from [source] (replace with actual source)
- OpenAI for powering the hiking recommendations
- Next.js team for the amazing framework

---

Built with ❤️ as part of the #30Days30Apps challenge
