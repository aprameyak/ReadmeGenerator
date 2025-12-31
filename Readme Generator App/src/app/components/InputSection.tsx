import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Template } from './templates';

interface InputSectionProps {
  template: Template;
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  onOpenAIModal: () => void;
  useAI: boolean;
  onToggleAI: (value: boolean) => void;
}

export interface FormData {
  projectName: string;
  description: string;
  techStack: string;
  installation: string;
  usage: string;
  license: string;
}

export function InputSection({
  template,
  formData,
  onFormDataChange,
  onOpenAIModal,
  useAI,
  onToggleAI,
}: InputSectionProps) {
  const handleChange = (field: keyof FormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Project Details</h2>
        <button
          onClick={onOpenAIModal}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-colors shadow-md"
        >
          <Sparkles className="w-4 h-4" />
          Generate with AI
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Project Name *
          </label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => handleChange('projectName', e.target.value)}
            placeholder="my-awesome-project"
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Project Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="A brief description of what your project does..."
            rows={4}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors text-slate-900 dark:text-white resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Tech Stack
          </label>
          <input
            type="text"
            value={formData.techStack}
            onChange={(e) => handleChange('techStack', e.target.value)}
            placeholder="React, TypeScript, Tailwind CSS"
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Installation Steps
          </label>
          <textarea
            value={formData.installation}
            onChange={(e) => handleChange('installation', e.target.value)}
            placeholder="Installation instructions..."
            rows={6}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors font-mono text-sm text-slate-900 dark:text-white resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Usage Examples
          </label>
          <textarea
            value={formData.usage}
            onChange={(e) => handleChange('usage', e.target.value)}
            placeholder="Usage examples..."
            rows={6}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors font-mono text-sm text-slate-900 dark:text-white resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            License
          </label>
          <select
            value={formData.license}
            onChange={(e) => handleChange('license', e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors text-slate-900 dark:text-white"
          >
            <option value="MIT">MIT</option>
            <option value="Apache-2.0">Apache 2.0</option>
            <option value="GPL-3.0">GPL 3.0</option>
            <option value="BSD-3-Clause">BSD 3-Clause</option>
            <option value="ISC">ISC</option>
            <option value="Proprietary">Proprietary</option>
          </select>
        </div>
      </div>
    </div>
  );
}
