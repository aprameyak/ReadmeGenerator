"use client";
import React, { useState } from "react";
import type { ChangeEvent } from "react";

const LICENSES = [
  {
    name: "MIT",
    badge:
      "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)",
    text: `This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.`,
  },
  {
    name: "Apache 2.0",
    badge:
      "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](https://opensource.org/licenses/Apache-2.0)",
    text: `This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.`,
  },
  {
    name: "GPLv3",
    badge:
      "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=for-the-badge)](https://www.gnu.org/licenses/gpl-3.0)",
    text: `This project is licensed under the GPLv3 License - see the [LICENSE](LICENSE) file for details.`,
  },
];

const BADGES = [
  "![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white&style=for-the-badge)",
  "![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)",
  "![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)",
  "![Google AI](https://img.shields.io/badge/Google%20AI-4285F4?logo=google&logoColor=white&style=for-the-badge)",
  "![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white&style=for-the-badge)",
];

type License = {
  name: string;
  badge: string;
  text: string;
};

type FormState = {
  projectName: string;
  description: string;
  features?: string;
  installation: string;
  usage: string;
  contribution: string;
  liveLink: string;
  license: License;
};

function generateReadme({
  projectName,
  description,
  features,
  installation,
  usage,
  license,
  contribution,
  liveLink,
}: {
  projectName: string;
  description: string;
  features?: string;
  installation: string;
  usage: string;
  license: License;
  contribution: string;
  liveLink: string;
}): string {
  return `# ${projectName || "Project Name"}

${BADGES.join("\n")}
${license.badge ? `\n${license.badge}` : ""}

## About\n\n${description || "Project description goes here."}

## Features\n\n${features || "- Dynamic form fields for experience, education, and skills  \n- AI-enhanced work experience descriptions via Google's Gemini API  \n- Responsive design using Tailwind CSS  \n- Serverless API routes for handling resume data  \n- Form validation for complete and accurate input"}

## Technology Stack\n\n- **Frontend**: React.js (Next.js), TypeScript, Tailwind CSS  \n- **Backend**: Next.js API Routes  \n- **AI Integration**: Google Gemini API (for generating descriptions)  \n- **Deployment**: Vercel

## Live Deployment\n\n- **View Here**: [${liveLink || "https://your-live-link.com/"}](https://${liveLink || "your-live-link.com/"})

## Installation\n\n${installation || "Describe installation steps here."}

## Usage\n\n${usage || "Describe usage instructions here."}

## Contribution\n\n${contribution || "Describe contribution guidelines here."}

## License\n\n${license.text}
`;
}

export default function Home() {
  const [form, setForm] = useState<FormState>({
    projectName: "ResuMaker",
    description:
      "**ResuMaker** is a dynamic web application built with **Next.js** and **TypeScript** that enables users to create professional resumes. It features **AI-enhanced descriptions** for work experiences, ensuring users can easily generate impactful bullet points for their job roles.",
    installation: "",
    usage: "",
    contribution: "",
    liveLink: "resumaker-six.vercel.app/",
    license: LICENSES[0],
  });
  const [readme, setReadme] = useState(() => generateReadme({ ...form, license: LICENSES[0] }));
  const [loadingField, setLoadingField] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      setReadme(generateReadme({ ...updated, license: updated.license }));
      return updated;
    });
  };

  const handleLicenseChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = LICENSES.find((l) => l.name === e.target.value) || LICENSES[0];
    setForm((prev) => {
      const updated = { ...prev, license: selected };
      setReadme(generateReadme({ ...updated, license: selected }));
      return updated;
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(readme);
    // toast notification will be added in next step
  };

  const handleDownload = () => {
    const blob = new Blob([readme], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  async function handleAIGenerate(field: "description" | "features" | "usage") {
    setLoadingField(field);
    setError("");
    let prompt = "";
    if (field === "description") {
      prompt = `Write a concise, professional project description for a README about a web app called ${form.projectName}.`;
    } else if (field === "features") {
      prompt = `List the main features of a web app called ${form.projectName} for a README, in markdown bullet points.`;
    } else if (field === "usage") {
      prompt = `Write clear usage instructions for a web app called ${form.projectName} for a README.`;
    }
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          field,
        }),
      });
      
      if (!res.ok) {
        throw new Error("AI generation failed");
      }
      
      const data = await res.json();
      const aiText = data.text || "";
      
      setForm((prev) => {
        const updated = { ...prev, [field]: aiText };
        setReadme(generateReadme({ ...updated, license: updated.license }));
        return updated;
      });
    } catch {
      setError("AI generation failed. Please try again.");
    } finally {
      setLoadingField(null);
    }
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-white dark:bg-black text-black dark:text-white p-4 md:p-8 gap-8">
      <section className="w-full max-w-lg flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-bold mb-2 text-center">README Generator</h1>
        <div className="mb-4 p-3 rounded bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100 text-sm">
          <strong>Free & Private:</strong> This app is 100% free and does not use any paid APIs. For AI features, you can provide your own API key (e.g., Gemini, OpenAI) below. Your key is stored only in your browser and never sent anywhere else.<br/>
          <span className="block mt-2">Get a free API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google Gemini</a> or <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI</a>.</span>
        </div>
        {error && <div className="text-red-600 bg-red-50 border border-red-200 rounded p-2 text-sm">{error}</div>}
        <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()} aria-label="README Generator Form">
          <label htmlFor="apiKey" className="font-medium">AI API Key (optional)
            <div className="flex gap-2 mt-1">
              <input
                id="apiKey"
                className="flex-1 p-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                value={apiKey}
                onChange={handleApiKeyChange}
                placeholder="Paste your Gemini or OpenAI API key here"
                autoComplete="off"
              />
              <button
                type="button"
                className="bg-blue-600 text-white rounded px-3 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleApiKeySave}
                aria-label="Save API Key"
              >
                Save
              </button>
            </div>
          </label>
          <label htmlFor="projectName" className="font-medium">Project Name
            <input
              id="projectName"
              className="mt-1 p-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="projectName"
              value={form.projectName}
              onChange={handleChange}
              required
              aria-required="true"
              autoComplete="off"
            />
          </label>
          <label htmlFor="description" className="font-medium flex flex-col gap-1">Description
            <div className="flex gap-2 items-center">
              <textarea
                id="description"
                className="flex-1 p-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                required
                aria-required="true"
              />
              <button
                type="button"
                className="bg-purple-600 text-white rounded px-3 py-2 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center"
                onClick={() => handleAIGenerate("description")}
                disabled={loadingField === "description"}
                aria-label="Generate description with AI"
              >
                {loadingField === "description" ? <span className="animate-spin mr-1">⏳</span> : <span className="mr-1">✨</span>}
                AI
              </button>
            </div>
          </label>
          <label htmlFor="features" className="font-medium flex flex-col gap-1">Features
            <div className="flex gap-2 items-center">
              <textarea
                id="features"
                className="flex-1 p-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="features"
                value={form.features || ""}
                onChange={e => {
                  setForm((prev) => {
                    const updated = { ...prev, features: e.target.value };
                    setReadme(generateReadme({ ...updated, license: updated.license }));
                    return updated;
                  });
                }}
                rows={3}
              />
              <button
                type="button"
                className="bg-purple-600 text-white rounded px-3 py-2 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center"
                onClick={() => handleAIGenerate("features")}
                disabled={loadingField === "features"}
                aria-label="Generate features with AI"
              >
                {loadingField === "features" ? <span className="animate-spin mr-1">⏳</span> : <span className="mr-1">✨</span>}
                AI
              </button>
            </div>
          </label>
          <label htmlFor="usage" className="font-medium flex flex-col gap-1">Usage Instructions
            <div className="flex gap-2 items-center">
              <textarea
                id="usage"
                className="flex-1 p-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="usage"
                value={form.usage}
                onChange={handleChange}
                rows={2}
              />
              <button
                type="button"
                className="bg-purple-600 text-white rounded px-3 py-2 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center"
                onClick={() => handleAIGenerate("usage")}
                disabled={loadingField === "usage"}
                aria-label="Generate usage with AI"
              >
                {loadingField === "usage" ? <span className="animate-spin mr-1">⏳</span> : <span className="mr-1">✨</span>}
                AI
              </button>
            </div>
          </label>
          <label htmlFor="contribution" className="font-medium">Contribution Guidelines
            <textarea
              id="contribution"
              className="mt-1 p-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="contribution"
              value={form.contribution}
              onChange={handleChange}
              rows={2}
            />
          </label>
          <label htmlFor="liveLink" className="font-medium">Live Deployment Link
            <input
              id="liveLink"
              className="mt-1 p-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="liveLink"
              value={form.liveLink}
              onChange={handleChange}
              placeholder="your-live-link.com"
              autoComplete="off"
            />
          </label>
          <label htmlFor="license" className="font-medium">License
            <select
              id="license"
              className="mt-1 p-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="license"
              value={form.license.name}
              onChange={handleLicenseChange}
              aria-label="License Type"
            >
              {LICENSES.map((l) => (
                <option key={l.name} value={l.name}>
                  {l.name}
                </option>
              ))}
            </select>
          </label>
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              className="flex-1 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleCopy}
              aria-label="Copy README to clipboard"
            >
              Copy
            </button>
            <button
              type="button"
              className="flex-1 bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={handleDownload}
              aria-label="Download README.md"
            >
              Download
            </button>
          </div>
        </form>
      </section>
      <section className="w-full flex-1 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto shadow-lg border border-gray-200 dark:border-gray-800 max-w-3xl">
        <h2 className="text-xl font-semibold mb-2 text-center md:text-left">Live Preview</h2>
        <MarkdownPreview markdown={readme} />
      </section>
    </main>
  );
}

function MarkdownPreview({ markdown }: { markdown: string }) {
  const [html, setHtml] = React.useState("");
  React.useEffect(() => {
    (async () => {
      const mod = await import("marked");
      const result = await mod.parse(markdown);
      setHtml(result);
    })();
  }, [markdown]);
  return (
    <div
      className="prose prose-sm max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
