# README Studio

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google AI](https://img.shields.io/badge/Google%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## About

**README Studio** is a modern, AI-powered README generator built with **Next.js, TypeScript, and Tailwind CSS**. It helps developers create professional README files with structured input fields and optional AI enhancement using Google's Gemini 1.5 Flash model.

---

## Features

- **AI-Powered Generation**: Uses Google Gemini 1.5 Flash (free tier) to generate descriptions, features, and tech stack details
- **Live Preview**: Real-time markdown preview with syntax highlighting
- **Portfolio Template**: Pre-configured template matching modern portfolio README structure
- **Tech Stack Badges**: Automatic generation of shields.io badges for popular technologies
- **Copy & Download**: Easy export of generated README files
- **Dark Mode**: Full dark mode support
- **Responsive Design**: Works seamlessly on all devices

---

## Technology Stack

- **Framework**: Next.js 16
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **AI**: Google Gemini 1.5 Flash API
- **Deployment**: Vercel

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key (free) from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/readme.git
cd readme
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

4. Add your Gemini API key to `.env.local`:
```
GEMINI_API_KEY=your_actual_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Gemini API key
4. Deploy!

### Environment Variables

For production deployment, set the following environment variable:

- `GEMINI_API_KEY` (required): Your Google Gemini API key
- `NEXT_PUBLIC_BASE_URL` (optional): Your app's base URL for metadata

---

## Usage

1. Enter your project name
2. Fill in project details (description, tech stack, features, etc.)
3. Use the "Generate with AI" button to auto-generate content
4. Preview your README in real-time
5. Copy or download the generated markdown

---

## License

MIT
