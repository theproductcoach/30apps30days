# 🥾 HikeScout

HikeScout is an AI-powered hiking trip recommender that helps you discover perfect day hikes anywhere in the world. Simply enter your starting location and preferences, and get personalized hiking recommendations complete with transport options, food stops, and preparation tips.

## Features

- 🌍 **Location Flexible**: Start from any address, city, station, or landmark
- 🎯 **Personalized Recommendations**: Specify your preferred hike duration, travel distance, and terrain type
- 🍽️ **Food & Drink Tips**: Get suggestions for pubs, cafes, and picnic spots along your route
- 🚂 **Transport Planning**: Detailed instructions for getting to and from your hike
- 🧥 **Preparation Guide**: Custom tips for what to bring based on the terrain and typical conditions
- 🎲 **Surprise Me**: Let HikeScout randomly generate a hike within your preferred travel distance

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key

### Installation

1. Clone the repository and navigate to the app directory:

```bash
cd apps/10-hikescout
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:

```env
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Usage

1. Enter your starting location (can be an address, city, station, or landmark)
2. Specify how long you'd like to hike
3. Set your maximum travel distance from the starting point
4. Choose your preferred terrain type
5. Add any food or drink preferences (optional)
6. Click "Find My Hike" or "Surprise Me!"

The app will generate a detailed hiking recommendation including:

- Hike name and location
- Transport instructions
- Route description and difficulty level
- Food and drink recommendations
- Return journey options
- What to bring and how to prepare

## Technology Stack

- Next.js 14 (App Router)
- TypeScript
- OpenAI API
- CSS Modules
- React Hooks

## Environment Variables

Required environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Background images from [source] (replace with actual source)
- OpenAI for powering the hiking recommendations
- Next.js team for the amazing framework

---

Built with ❤️ as part of the #30Days30Apps challenge
