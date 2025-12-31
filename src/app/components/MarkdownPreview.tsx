'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as Tabs from '@radix-ui/react-tabs';
import { Copy, Download, Check } from 'lucide-react';
import { FormData } from './InputSection';
import { README_SECTIONS } from './templates';

interface MarkdownPreviewProps {
  formData: FormData;
}

export function MarkdownPreview({ formData }: MarkdownPreviewProps) {
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);

  const generateMarkdown = () => {
    let markdown = `# ${formData.projectName || 'Project Name'}\n\n`;
    markdown += `${formData.description || 'Project description goes here.'}\n\n`;

    if (formData.techStack) {
      markdown += `## Tech Stack\n\n${formData.techStack}\n\n`;
    }

    if (formData.installation) {
      markdown += `## Installation\n\n${formData.installation}\n\n`;
    }

    if (formData.usage) {
      markdown += `## Usage\n\n${formData.usage}\n\n`;
    }

    if (README_SECTIONS.includes('Features')) {
      markdown += `## Features\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n`;
    }

    if (README_SECTIONS.includes('Contributing')) {
      markdown += `## Contributing\n\nContributions are welcome! Please feel free to submit a Pull Request.\n\n`;
    }

    markdown += `## License\n\n${formData.license}\n`;

    return markdown;
  };

  const markdown = generateMarkdown();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Preview</h2>
        <div className="flex gap-2">
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
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <Tabs.List className="flex gap-2 mb-4 border-b border-slate-200 dark:border-slate-700">
          <Tabs.Trigger
            value="preview"
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'preview'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Preview
          </Tabs.Trigger>
          <Tabs.Trigger
            value="raw"
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'raw'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
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


