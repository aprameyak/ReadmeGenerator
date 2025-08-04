# README Generator

A modern web application built with Next.js and TypeScript that helps developers create professional README files for their projects. Features AI-powered content generation using Google's Gemini 2.0 Flash.

## Features

- **AI-Powered Content Generation**: Uses Google Gemini 2.0 Flash to generate professional descriptions, features, and usage instructions
- **Live Preview**: Real-time markdown rendering as you type
- **Multiple License Options**: MIT, Apache 2.0, and GPLv3 with proper badges
- **Export Options**: Copy to clipboard or download as README.md file
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Dark Mode Support**: Automatic dark/light theme switching

## Technology Stack

- **Frontend**: React.js (Next.js), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI Integration**: Google Gemini 2.0 Flash API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd readme
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```bash
# Gemini API Key
# Get your free API key from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Fill out the form**: Enter your project name, description, features, and other details
2. **Use AI generation**: Click the ✨ AI buttons next to any field to get AI-generated content
3. **Preview**: See your README rendered in real-time in the preview section
4. **Export**: Copy to clipboard or download as README.md file

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required for AI features)
  - Get a free API key from: https://aistudio.google.com/app/apikey

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Don't forget to add your `GEMINI_API_KEY` environment variable in your Vercel project settings.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google Gemini API Documentation](https://ai.google.dev/docs)

## License

This project is licensed under the MIT License.
