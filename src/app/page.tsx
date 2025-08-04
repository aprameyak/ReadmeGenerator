"use client";
import React, { useState } from "react";
import type { ChangeEvent } from "react";

type FormState = {
  projectName: string;
  description: string;
  features?: string;
  techStack: string;
  liveLink: string;
};

function generateReadme({
  projectName,
  description,
  features,
  techStack,
  liveLink,
}: {
  projectName: string;
  description: string;
  features?: string;
  techStack: string;
  liveLink: string;
}): string {
  // Generate tech stack badges from user input
  const techBadges = generateTechBadges(techStack);
  
  return `# ${projectName || "Project Name"}

${techBadges}

## About

${description || "Project description goes here."}

## Features

${features || "List the main features of your project here."}

${liveLink ? `## Live Deployment

- **View Here**: [${liveLink}](https://${liveLink})` : ""}
`;
}

function generateTechBadges(techStack: string): string {
  if (!techStack.trim()) {
    return "";
  }
  
  const techMap: { [key: string]: string } = {
    'react': '![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)',
    'next.js': '![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)',
    'typescript': '![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)',
    'javascript': '![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)',
    'python': '![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)',
    'node.js': '![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)',
    'tailwind': '![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)',
    'mongodb': '![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)',
    'postgresql': '![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)',
    'mysql': '![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)',
    'firebase': '![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)',
    'aws': '![AWS](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)',
    'vercel': '![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)',
    'netlify': '![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)',
    'docker': '![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)',
    'kubernetes': '![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)',
    'git': '![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)',
    'github': '![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)',
    'html': '![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)',
    'css': '![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)',
    'sass': '![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)',
    'bootstrap': '![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)',
    'jquery': '![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)',
    'redux': '![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)',
    'vue.js': '![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)',
    'angular': '![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)',
    'express': '![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)',
    'django': '![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)',
    'flask': '![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)',
    'laravel': '![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)',
    'php': '![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)',
    'java': '![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)',
    'c++': '![C++](https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)',
    'c#': '![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)',
    'go': '![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)',
    'rust': '![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)',
    'swift': '![Swift](https://img.shields.io/badge/Swift-FA7343?style=for-the-badge&logo=swift&logoColor=white)',
    'kotlin': '![Kotlin](https://img.shields.io/badge/Kotlin-0095D5?style=for-the-badge&logo=Kotlin&logoColor=white)',
    'android': '![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)',
    'ios': '![iOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white)',
    'tensorflow': '![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)',
    'pytorch': '![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)',
    'opencv': '![OpenCV](https://img.shields.io/badge/OpenCV-27338e?style=for-the-badge&logo=opencv&logoColor=white)',
    'pandas': '![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)',
    'numpy': '![NumPy](https://img.shields.io/badge/Numpy-777BB4?style=for-the-badge&logo=numpy&logoColor=white)',
    'scikit-learn': '![Scikit Learn](https://img.shields.io/badge/scikit_learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)',
    'matplotlib': '![Matplotlib](https://img.shields.io/badge/Matplotlib-3776AB?style=for-the-badge&logo=matplotlib&logoColor=white)',
    'plotly': '![Plotly](https://img.shields.io/badge/Plotly-3F4F75?style=for-the-badge&logo=plotly&logoColor=white)',
    'jupyter': '![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white)',
    'anaconda': '![Anaconda](https://img.shields.io/badge/Anaconda-342B029?style=for-the-badge&logo=anaconda&logoColor=white)',
    'cohere': '![Cohere](https://img.shields.io/badge/Cohere-FF5C5C?style=for-the-badge&logo=cohere&logoColor=white)',
    'openai': '![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)',
    'gemini': '![Google AI](https://img.shields.io/badge/Google%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)',
  };

  const techList = techStack.toLowerCase().split(/[,\s]+/).filter(tech => tech.trim());
  const badges: string[] = [];

  techList.forEach(tech => {
    const cleanTech = tech.trim();
    if (techMap[cleanTech]) {
      badges.push(techMap[cleanTech]);
    }
  });

  return badges.join('\n');
}

export default function Home() {
  const [form, setForm] = useState<FormState>({
    projectName: "",
    description: "",
    features: "",
    techStack: "",
    liveLink: "",
  });
  const [readme, setReadme] = useState(() => generateReadme(form));
  const [loadingField, setLoadingField] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      setReadme(generateReadme(updated));
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

  async function handleAIGenerate(field: "description" | "features") {
    setLoadingField(field);
    setError("");
    
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: "",
          field,
          projectData: {
            projectName: form.projectName || "this project",
          },
        }),
      });
      
      if (!res.ok) {
        throw new Error("AI generation failed");
      }
      
      const data = await res.json();
      const aiText = data.text || "";
      
      setForm((prev) => {
        const updated = { ...prev, [field]: aiText };
        setReadme(generateReadme(updated));
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
          <strong>AI-Powered:</strong> This app uses Google&apos;s Gemini 2.0 Flash AI to generate professional content for your README files. Simply click the ✨ AI buttons next to any field to get AI-generated content.
        </div>
        {error && <div className="text-red-600 bg-red-50 border border-red-200 rounded p-2 text-sm">{error}</div>}
        <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()} aria-label="README Generator Form">
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
          <label htmlFor="techStack" className="font-medium">Tech Stack
            <input
              id="techStack"
              className="mt-1 p-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="techStack"
              value={form.techStack}
              onChange={handleChange}
              placeholder="html, css, javascript, react, python, etc."
              autoComplete="off"
            />
            <div className="text-xs text-gray-500 mt-1">Enter technologies separated by commas (e.g., html, css, javascript)</div>
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
                    setReadme(generateReadme(updated));
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
