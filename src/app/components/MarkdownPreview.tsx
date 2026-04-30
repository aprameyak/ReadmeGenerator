'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as Tabs from '@radix-ui/react-tabs';
import { Copy, Check } from 'lucide-react';
import { FormData } from './InputSection';
import { generateTechBadges } from './templates';

interface MarkdownPreviewProps {
  formData: FormData;
}

export function MarkdownPreview({ formData }: MarkdownPreviewProps) {
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);

  const generateMarkdown = () => {
    const lines: string[] = [];

    // Title
    lines.push(`# ${formData.projectName || 'Project Name'}`, '');

    // Tech Stack Badges
    const badges = generateTechBadges(formData.techStack);
    if (badges) {
      lines.push(badges, '');
    }

    lines.push('---', '');

    // About
    lines.push('## About', '');
    lines.push(formData.description || `**${formData.projectName || 'Project'}** is a modern project built with cutting-edge technologies.`, '');

    // Screenshot
    if (formData.screenshotUrl?.trim()) {
      lines.push('---', '');
      lines.push('## Screenshots', '');
      lines.push(`![${formData.projectName || 'Screenshot'}](${formData.screenshotUrl.trim()})`, '');
    }

    // Features
    const features = formData.features?.split('\n').map(f => f.trim()).filter(Boolean) ?? [];
    if (features.length > 0) {
      lines.push('---', '');
      lines.push('## Features', '');
      features.forEach(f => lines.push(`- ${f}`));
      lines.push('');
    }

    // Getting Started
    const prereqs = formData.prerequisites?.split('\n').map(p => p.trim()).filter(Boolean) ?? [];
    const steps = formData.installation?.split('\n').map(s => s.trim()).filter(Boolean) ?? [];
    if (prereqs.length > 0 || steps.length > 0) {
      lines.push('---', '');
      lines.push('## Getting Started', '');
      if (prereqs.length > 0) {
        lines.push('### Prerequisites', '');
        prereqs.forEach(p => lines.push(`- ${p}`));
        lines.push('');
      }
      if (steps.length > 0) {
        lines.push('### Installation', '');
        steps.forEach((step, i) => lines.push(`${i + 1}. \`${step}\``));
        lines.push('');
      }
    }

    // Technology Stack
    const techDetails = formData.techStackDetails?.split('\n').map(t => t.trim()).filter(Boolean) ?? [];
    if (techDetails.length > 0) {
      lines.push('---', '');
      lines.push('## Technology Stack', '');
      techDetails.forEach(tech => {
        const colonIdx = tech.indexOf(':');
        if (colonIdx !== -1) {
          const category = tech.slice(0, colonIdx).trim();
          const value = tech.slice(colonIdx + 1).trim();
          lines.push(`- **${category}**: ${value}`);
        } else {
          lines.push(`- **${tech}**`);
        }
      });
      lines.push('');
    }

    // Deployment
    if (formData.deploymentUrl?.trim()) {
      const url = formData.deploymentUrl.trim();
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
      lines.push('---', '');
      lines.push('## Deployment', '');
      lines.push(`Visit the live site at [${displayUrl}](${fullUrl})`, '');
    }

    // License
    if (formData.license) {
      lines.push('---', '');
      lines.push('## License', '');
      lines.push(`Distributed under the **${formData.license} License**. See \`LICENSE\` for more information.`, '');
    }

    return lines.join('\n');
  };

  const markdown = generateMarkdown();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Preview</h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>

      <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <Tabs.List className="flex gap-2 mb-4 border-b border-slate-200 dark:border-slate-700">
          <Tabs.Trigger
            value="preview"
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'preview'
                ? 'border-pink-500 text-pink-600 dark:text-pink-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Preview
          </Tabs.Trigger>
          <Tabs.Trigger
            value="raw"
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'raw'
                ? 'border-pink-500 text-pink-600 dark:text-pink-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Raw Markdown
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="preview" className="flex-1 overflow-auto">
          <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </div>
        </Tabs.Content>

        <Tabs.Content value="raw" className="flex-1 overflow-auto">
          <pre className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-x-auto font-mono text-sm">
            <code>{markdown}</code>
          </pre>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
