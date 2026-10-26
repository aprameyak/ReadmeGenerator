# README Studio

A Next.js web app for drafting a project README from a form, with a live Markdown preview and an optional Gemini-backed assistant that fills in fields from a plain-language description.

Live site: https://readme-generator-gold.vercel.app

## Features

- Form fields for project name, description, tech stack, features, prerequisites, installation steps, tech stack details, deployment URL, screenshot URL, and license
- Live preview with a "Preview" tab (rendered with `react-markdown` and `remark-gfm`) and a "Raw Markdown" tab
- Tech stack entries turn into shields.io badges, using a built-in map of common technologies and a generic gray badge for anything not in the map
- "Copy" button that puts the generated Markdown on the clipboard
- AI assistant: describe the project in up to 2000 characters and the app asks Gemini to update only the fields your description mentions

## Getting started

Requires Node.js (CI uses Node 20) and npm.

```bash
git clone https://github.com/aprameyak/ReadmeGenerator.git
cd ReadmeGenerator
npm install
```

The AI assistant needs a Google Gemini API key. Create `.env.local` in the project root:

```bash
GEMINI_API_KEY=your-key-here
```

Without the key, the form and preview still work, but the assistant returns an error.

Then run the dev server:

```bash
npm run dev
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Usage

1. Open http://localhost:3000 and click "Start Generating".
2. Fill in the form on the left. The preview on the right updates as you type.
3. Optionally click "Smart Generate" and describe the project, for example "A CLI in Go that syncs dotfiles, MIT licensed". Returned fields are merged into the form.
4. Switch to "Raw Markdown" or click "Copy" and paste the result into your repo's `README.md`.

## How it works

- `src/app/page.tsx` holds the form state and lays out the input panel, preview, and assistant modal.
- `src/app/components/MarkdownPreview.tsx` builds the Markdown string from the form data, section by section, skipping empty sections.
- `src/app/components/templates.ts` contains the default form content and the tech-to-badge map.
- `src/app/api/generate/route.ts` is the assistant endpoint. It rate-limits to 20 requests per IP per minute (in memory), sends a prompt to the Gemini REST API, falls back through a list of Gemini models if one fails or hits a quota, and parses the JSON reply into form fields.

## Limitations

- The rate limiter is an in-memory `Map`, so it resets on restart and is not shared across serverless instances.
- AI output is not validated beyond JSON parsing. Review generated text, URLs, and install commands before using them.
- There are no automated tests. CI runs lint and build only.

## Contributing

Issues and pull requests are welcome. Before opening a PR, run `npm run lint` and `npm run build`, which is what CI (`.github/workflows/ci.yml`) checks.

## License

MIT. See [LICENSE](LICENSE).
