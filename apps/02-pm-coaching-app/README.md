<!-- markdownlint-disable MD029 -->
# PM Coaching App

A professional development tool for Product Managers to track their career growth through self-assessments and manager feedback.
Built with Next.js, Tailwind CSS, and state management using Zustand.

## Features

- 👥 **Dual Assessment System**: Complete both self and manager evaluations
- 📊 **Competency Tracking**: Evaluate skills across key PM competencies
- 📈 **Visual Comparisons**: Compare self, manager, and ideal scores with radar charts
- 🎯 **Growth Insights**: Identify gaps and areas for improvement
- 🌓 **Dark/Light Mode**: Elegant interface that adapts to your preference
- 💼 **Role-Based Targets**: Ideal competency scores tailored to different PM levels
- 📝 **Detailed Notes**: Add context and examples to each competency assessment
- 🎨 **Modern Design**: Clean, responsive UI with smooth transitions

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd 02-pm-coaching-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Charts**: [Chart.js](https://www.chartjs.org/) with React Chartjs 2

## Project Structure

```text
src/
├── app/
│   ├── assessment/
│   │   ├── self/      # Self-assessment interface
│   │   └── manager/   # Manager assessment interface
│   ├── comparison/    # Assessment comparison view
│   └── page.tsx      # Main dashboard
├── components/        # Reusable React components
├── store/            # Zustand state management
├── data/             # Competency definitions and user data
└── types/            # TypeScript type definitions
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the
[LICENSE](LICENSE) file for details.

## Acknowledgments

- Built as part of the #30Days30Apps challenge
- Inspired by real-world PM career development needs
- UI/UX influenced by modern design principles
