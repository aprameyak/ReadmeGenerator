# Deployment Guide

## Environment Variables

### Required
- `GEMINI_API_KEY` - Your Google Gemini API key (get it free from https://aistudio.google.com/app/apikey)

### Optional
- `NEXT_PUBLIC_BASE_URL` - Your app's base URL (defaults to vercel.app URL)

## Local Development Setup

1. Create `.env.local` file:
```bash
GEMINI_API_KEY=your_api_key_here
```

2. Run development server:
```bash
npm run dev
```

## Vercel Deployment

1. Push code to GitHub
2. Import project on Vercel
3. Add environment variable:
   - Key: `GEMINI_API_KEY`
   - Value: Your Gemini API key
4. Deploy!

## AI Model

The app uses **Gemini 1.5 Flash** - Google's best free model with:
- Fast response times
- High quality output
- Generous free tier limits
- No credit card required

## Build Status

✅ TypeScript compilation
✅ All dependencies installed
✅ API routes configured
✅ Environment variables documented
✅ Ready for deployment
