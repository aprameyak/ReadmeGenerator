"use client";
import React, { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";

type FormState = {
  projectName: string;
  description: string;
  features?: string;
  techStack: string;
  liveLink: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

function generateReadme({
  projectName,
  description,
  features,
  techStack,
  liveLink,
}: FormState): string {
  const techBadges = generateTechBadges(techStack);
  const normalizedLink = normalizeUrl(liveLink);

  return `# ${projectName || "Project Name"}

${techBadges}

## About

${description || "Project description goes here."}

## Features

${features || "List the main features of your project here."}

${
  normalizedLink
    ? `## Live Deployment

- **View Here**: [${normalizedLink}](https://${normalizedLink})`
    : ""
}
`;
}

function normalizeUrl(url: string): string {
  if (!url.trim()) return "";
  const cleaned = url.trim().replace(/^https?:\/\//, "");
  if (!/^[a-zA-Z0-9][a-zA-Z0-9-._]*[a-zA-Z0-9]\.[a-zA-Z]{2,}/.test(cleaned)) {
    return "";
  }
  return cleaned;
}

function generateTechBadges(techStack: string): string {
  if (!techStack.trim()) return "";

  const techMap: { [key: string]: string } = {
    react:
      "![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)",
    "next.js":
      "![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)",
    typescript:
      "![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)",
    javascript:
      "![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)",
    python:
      "![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)",
    "node.js":
      "![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)",
    tailwind:
      "![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)",
    mongodb:
      "![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)",
    postgresql:
      "![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)",
    mysql:
      "![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)",
    firebase:
      "![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)",
    aws: "![AWS](https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)",
    vercel:
      "![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)",
    netlify:
      "![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)",
    docker:
      "![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)",
    kubernetes:
      "![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)",
    git: "![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)",
    github:
      "![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)",
    html: "![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)",
    css: "![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)",
    sass: "![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)",
    bootstrap:
      "![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)",
    jquery:
      "![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)",
    redux:
      "![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)",
    "vue.js":
      "![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)",
    angular:
      "![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)",
    express:
      "![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)",
    django:
      "![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)",
    flask:
      "![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)",
    laravel:
      "![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)",
    php: "![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)",
    java: "![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)",
    "c++":
      "![C++](https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)",
    "c#": "![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)",
    go: "![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)",
    rust: "![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)",
    swift:
      "![Swift](https://img.shields.io/badge/Swift-FA7343?style=for-the-badge&logo=swift&logoColor=white)",
    kotlin:
      "![Kotlin](https://img.shields.io/badge/Kotlin-0095D5?style=for-the-badge&logo=Kotlin&logoColor=white)",
    android:
      "![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)",
    ios: "![iOS](https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white)",
    tensorflow:
      "![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)",
    pytorch:
      "![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)",
    opencv:
      "![OpenCV](https://img.shields.io/badge/OpenCV-27338e?style=for-the-badge&logo=opencv&logoColor=white)",
    pandas:
      "![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)",
    numpy:
      "![NumPy](https://img.shields.io/badge/Numpy-777BB4?style=for-the-badge&logo=numpy&logoColor=white)",
    "scikit-learn":
      "![Scikit Learn](https://img.shields.io/badge/scikit_learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)",
    matplotlib:
      "![Matplotlib](https://img.shields.io/badge/Matplotlib-3776AB?style=for-the-badge&logo=matplotlib&logoColor=white)",
    plotly:
      "![Plotly](https://img.shields.io/badge/Plotly-3F4F75?style=for-the-badge&logo=plotly&logoColor=white)",
    jupyter:
      "![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white)",
    anaconda:
      "![Anaconda](https://img.shields.io/badge/Anaconda-342B029?style=for-the-badge&logo=anaconda&logoColor=white)",
    cohere:
      "![Cohere](https://img.shields.io/badge/Cohere-FF5C5C?style=for-the-badge&logo=cohere&logoColor=white)",
    openai:
      "![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)",
    gemini:
      "![Google AI](https://img.shields.io/badge/Google%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)",
  };

  const techList = techStack
    .toLowerCase()
    .split(/[,\s]+/)
    .filter((tech) => tech.trim());
  const badges: string[] = [];
  const seen = new Set<string>();

  const variations: { [key: string]: string } = {
    nextjs: "next.js",
    next: "next.js",
    tailwindcss: "tailwind",
    "tailwind css": "tailwind",
    nodejs: "node.js",
    node: "node.js",
    vuejs: "vue.js",
    vue: "vue.js",
    reactjs: "react",
    js: "javascript",
    ts: "typescript",
    py: "python",
    postgres: "postgresql",
    mongo: "mongodb",
    tf: "tensorflow",
    sklearn: "scikit-learn",
    k8s: "kubernetes",
    scss: "sass",
    "express.js": "express",
    expressjs: "express",
  };

  techList.forEach((tech) => {
    const cleanTech = variations[tech.trim()] || tech.trim();
    if (techMap[cleanTech] && !seen.has(cleanTech)) {
      badges.push(techMap[cleanTech]);
      seen.add(cleanTech);
    }
  });

  return badges.join("\n");
}

// Parse markdown to extract form fields
function parseReadmeToForm(markdown: string): Partial<FormState> {
  const result: Partial<FormState> = {};

  // Extract project name from # heading
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  if (titleMatch) result.projectName = titleMatch[1].trim();

  // Extract description from About section
  const aboutMatch = markdown.match(
    /##\s*About\s*\n\n?([\s\S]*?)(?=\n##|\n*$)/i
  );
  if (aboutMatch) result.description = aboutMatch[1].trim();

  // Extract features
  const featuresMatch = markdown.match(
    /##\s*Features\s*\n\n?([\s\S]*?)(?=\n##|\n*$)/i
  );
  if (featuresMatch) result.features = featuresMatch[1].trim();

  // Extract live link
  const linkMatch = markdown.match(
    /\[([^\]]+)\]\(https?:\/\/([^)]+)\)/
  );
  if (linkMatch) result.liveLink = linkMatch[2];

  return result;
}

export default function Home() {
  const [form, setForm] = useState<FormState>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("readme-form");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return {
      projectName: "",
      description: "",
      features: "",
      techStack: "",
      liveLink: "",
    };
  });

  const [readme, setReadme] = useState(() => generateReadme(form));
  const [error, setError] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Editor modal state
  const [showEditor, setShowEditor] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  // Tab state
  const [activeTab, setActiveTab] = useState<"form" | "chat">("form");

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("readme-form", JSON.stringify(form));
    }, 500);
    return () => clearTimeout(timer);
  }, [form]);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      setReadme(generateReadme(updated));
      return updated;
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(readme);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      setError("Failed to copy to clipboard");
      setTimeout(() => setError(""), 3000);
    }
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
    if (!form.projectName.trim()) {
      setError("Please enter a project name first");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          field,
          projectData: { projectName: form.projectName },
        }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data: { text?: string; error?: string } = await res.json();
      const aiText = (data.text || "").trim();
      if (!aiText) throw new Error("Empty AI response");

      setForm((prev) => {
        const updated = { ...prev, [field]: aiText } as FormState;
        setReadme(generateReadme(updated));
        return updated;
      });
    } catch (e) {
      console.error("AI generation failed", e);
      setError("AI generation failed. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  }

  // Chat-based refinement
  async function handleChatSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!chatInput.trim() || isProcessing) return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsProcessing(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          field: "chat",
          prompt: userMessage,
          currentReadme: readme,
          projectData: form,
        }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      const aiResponse = (data.text || "").trim();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse },
      ]);

      // Try to extract updated README from response
      const readmeMatch = aiResponse.match(
        /```(?:markdown|md)?\n([\s\S]*?)```/
      );
      if (readmeMatch) {
        const newReadme = readmeMatch[1].trim();
        setReadme(newReadme);
        // Sync form fields from the new readme
        const parsed = parseReadmeToForm(newReadme);
        setForm((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error("Chat failed", e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  }

  // Open editor modal
  const openEditor = () => {
    setEditorContent(readme);
    setShowEditor(true);
  };

  // Save from editor
  const saveFromEditor = () => {
    setReadme(editorContent);
    const parsed = parseReadmeToForm(editorContent);
    setForm((prev) => ({ ...prev, ...parsed }));
    setShowEditor(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-40 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            README Craft
          </h1>
          <div className="flex gap-2">
            <button
              onClick={openEditor}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-medium transition-all flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Raw
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-sm font-medium transition-all"
            >
              {copySuccess ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-sm font-medium transition-all"
            >
              Download
            </button>
          </div>
        </div>
      </header>

      {error && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
            {error}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Form/Chat */}
        <div className="w-full lg:w-[420px] flex-shrink-0">
          {/* Tabs */}
          <div className="flex mb-4 bg-slate-800/50 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("form")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === "form"
                  ? "bg-slate-700 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Form Builder
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === "chat"
                  ? "bg-slate-700 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              AI Chat
            </button>
          </div>

          {/* Form Tab */}
          {activeTab === "form" && (
            <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Project Name
                </label>
                <input
                  name="projectName"
                  value={form.projectName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="My Awesome Project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Tech Stack
                </label>
                <input
                  name="techStack"
                  value={form.techStack}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="react, typescript, tailwind"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Comma-separated technologies
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  onBlur={(e) => {
                    if (!e.target.value.trim()) handleAIGenerate("description");
                  }}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all resize-none"
                  placeholder="Leave empty for AI generation..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Features
                </label>
                <textarea
                  name="features"
                  value={form.features || ""}
                  onChange={handleChange}
                  onBlur={(e) => {
                    if (!e.target.value.trim()) handleAIGenerate("features");
                  }}
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all resize-none"
                  placeholder="Leave empty for AI generation..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Live Link
                </label>
                <input
                  name="liveLink"
                  value={form.liveLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="example.com"
                />
              </div>
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === "chat" && (
            <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 flex flex-col h-[500px]">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                  <div className="text-center text-slate-500 py-8">
                    <p className="text-sm">
                      Ask me to modify your README in natural language
                    </p>
                    <p className="text-xs mt-2 text-slate-600">
                      e.g., &quot;Make the description more professional&quot; or
                      &quot;Add an installation section&quot;
                    </p>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm ${
                        msg.role === "user"
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-700/50 text-slate-200"
                      }`}
                    >
                      <pre className="whitespace-pre-wrap font-sans">
                        {msg.content}
                      </pre>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700/50 rounded-xl px-4 py-2.5">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                        <span
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <span
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleChatSubmit}
                className="border-t border-slate-700/50 p-3"
              >
                <div className="flex gap-2">
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask AI to refine your README..."
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm"
                    disabled={isProcessing}
                  />
                  <button
                    type="submit"
                    disabled={isProcessing || !chatInput.trim()}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right Panel - Preview */}
        <div className="flex-1 min-w-0">
          <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-6 min-h-[500px]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/50">
              <h2 className="text-lg font-semibold text-slate-200">
                Live Preview
              </h2>
              <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                README.md
              </span>
            </div>
            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-slate-100 prose-p:text-slate-300 prose-li:text-slate-300 prose-a:text-emerald-400">
              <MarkdownPreview markdown={readme} />
            </div>
          </div>
        </div>
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h3 className="text-lg font-semibold">Edit Raw Markdown</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowEditor(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={saveFromEditor}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-sm font-medium transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
            <textarea
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              className="flex-1 p-4 bg-slate-950 font-mono text-sm text-slate-300 resize-none outline-none"
              spellCheck={false}
            />
          </div>
        </div>
      )}
    </main>
  );
}

function MarkdownPreview({ markdown }: Readonly<{ markdown: string }>) {
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
