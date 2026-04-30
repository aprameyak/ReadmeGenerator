import { Sparkles } from 'lucide-react';

interface InputSectionProps {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  onOpenAIModal: () => void;
}

export interface FormData {
  projectName: string;
  description: string;
  techStack: string;       // Comma-separated for badges
  features: string;        // Newline-separated features
  techStackDetails: string; // Detailed tech stack with versions
  deploymentUrl: string;
  screenshotUrl: string;   // Optional screenshot/demo image URL
  installation: string;    // Newline-separated setup steps
  prerequisites: string;   // Newline-separated prerequisites
  license: string;         // License type (e.g. MIT)
}

export function InputSection({
  formData,
  onFormDataChange,
  onOpenAIModal,
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
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-lg transition-colors shadow-md"
        >
          <Sparkles className="w-4 h-4" />
          Smart Generate
        </button>
      </div>

      <div className="space-y-4">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Project Name *
          </label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => handleChange('projectName', e.target.value)}
            placeholder="MyAwesomeApp"
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors text-slate-900 dark:text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            About / Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="A brief description of your project..."
            rows={4}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors text-slate-900 dark:text-white resize-none"
          />
        </div>

        {/* Tech Stack Badges */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Tech Stack (for badges)
          </label>
          <input
            type="text"
            value={formData.techStack}
            onChange={(e) => handleChange('techStack', e.target.value)}
            placeholder="Next.js, TypeScript, Tailwind CSS, Supabase, Vercel"
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors text-slate-900 dark:text-white"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Comma-separated. Known techs get logo badges; others get plain badges automatically.
          </p>
        </div>

        {/* Screenshot URL */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Screenshot / Demo URL
          </label>
          <input
            type="text"
            value={formData.screenshotUrl}
            onChange={(e) => handleChange('screenshotUrl', e.target.value)}
            placeholder="https://your-image-host.com/screenshot.png"
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors text-slate-900 dark:text-white"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Shown as an image in the README (e.g. from GitHub, Imgur, or your CDN)
          </p>
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Features
          </label>
          <textarea
            value={formData.features}
            onChange={(e) => handleChange('features', e.target.value)}
            placeholder="Responsive design with mobile-first approach&#10;Smooth page transitions and scroll animations&#10;Interactive UI elements with hover effects"
            rows={5}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors text-slate-900 dark:text-white resize-none"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">One feature per line — each becomes a bullet point</p>
        </div>

        {/* Prerequisites */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Prerequisites
          </label>
          <textarea
            value={formData.prerequisites}
            onChange={(e) => handleChange('prerequisites', e.target.value)}
            placeholder="Node.js v18+&#10;npm or yarn&#10;PostgreSQL / Supabase account"
            rows={3}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors text-slate-900 dark:text-white resize-none"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">One prerequisite per line — shown in Getting Started</p>
        </div>

        {/* Installation / Getting Started */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Installation Steps
          </label>
          <textarea
            value={formData.installation}
            onChange={(e) => handleChange('installation', e.target.value)}
            placeholder="git clone https://github.com/you/project.git&#10;cd project&#10;npm install&#10;cp .env.example .env&#10;npm run dev"
            rows={5}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors font-mono text-sm text-slate-900 dark:text-white resize-none"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">One step per line — rendered as a numbered list with code formatting</p>
        </div>

        {/* Tech Stack Details */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Technology Stack (Detailed)
          </label>
          <textarea
            value={formData.techStackDetails}
            onChange={(e) => handleChange('techStackDetails', e.target.value)}
            placeholder="Framework: Next.js 14&#10;Language: TypeScript 5.3&#10;Styling: Tailwind CSS 3.4&#10;Database: Supabase (PostgreSQL)&#10;Deployment: Vercel"
            rows={5}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors font-mono text-sm text-slate-900 dark:text-white resize-none"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">One item per line — format: <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">Category: Technology Version</code></p>
        </div>

        {/* Deployment URL */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Deployment URL
          </label>
          <input
            type="text"
            value={formData.deploymentUrl}
            onChange={(e) => handleChange('deploymentUrl', e.target.value)}
            placeholder="https://your-project.vercel.app"
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors text-slate-900 dark:text-white"
          />
        </div>

        {/* License */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            License
          </label>
          <select
            value={formData.license}
            onChange={(e) => handleChange('license', e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors text-slate-900 dark:text-white"
          >
            <option value="MIT">MIT</option>
            <option value="Apache 2.0">Apache 2.0</option>
            <option value="GPL-3.0">GPL-3.0</option>
            <option value="BSD-2-Clause">BSD-2-Clause</option>
            <option value="BSD-3-Clause">BSD-3-Clause</option>
            <option value="ISC">ISC</option>
            <option value="MPL-2.0">MPL-2.0</option>
            <option value="AGPL-3.0">AGPL-3.0</option>
            <option value="Unlicense">Unlicense</option>
          </select>
        </div>
      </div>
    </div>
  );
}
