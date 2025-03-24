# App Idea Generator

A creative tool that generates app ideas using AI, with adjustable creativity levels.
Built with Next.js, Tailwind CSS, and OpenAI's GPT-3.5.

## Features

- 🎯 **Instant App Ideas**: Generates unique app concepts with type and purpose
- 🎚️ **Creativity Slider**: Adjust idea generation from practical to wild
  - Practical: Real-world solutions to common problems
  - Creative: Innovative and unique concepts
  - Wild: Experimental and boundary-pushing ideas
  - Crazy: Over-the-top, unconventional concepts
- ✨ **Animated Interface**: Smooth transitions and visual feedback
- 🎨 **Modern Design**: Clean, responsive UI with a dark theme
- 🤖 **AI-Powered**: Leverages OpenAI's GPT-3.5 for intelligent suggestions

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd 01-what-app-should-i-build
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

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Integration**: [OpenAI API](https://openai.com/)

## Project Structure

```text
app/
├── api/
│   └── generate/    # OpenAI API integration
├── components/      # React components
├── page.tsx        # Main application page
├── layout.tsx      # Root layout
└── globals.css     # Global styles
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the
[LICENSE](LICENSE) file for details.

## Acknowledgments

- Built as part of the #30Days30Apps challenge
- Powered by OpenAI's GPT-3.5
- Inspired by the developer community's need for app ideas
