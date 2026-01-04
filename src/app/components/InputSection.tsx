import { Sparkles } from 'lucide-react';

interface InputSectionProps {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  onOpenAIModal: () => void;
}

export interface FormData {
  projectName: string;
  description: string;
  techStack: string; // Comma-separated for badges
  features: string; // Newline-separated features
  techStackDetails: string; // Detailed tech stack with versions
  deploymentUrl: string;
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
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Project Name *
          </label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => handleChange('projectName', e.target.value)}
            placeholder="Portfolio"
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors text-slate-900 dark:text-white"
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Tech Stack (for badges)
          </label>
          <input
            type="text"
            value={formData.techStack}
            onChange={(e) => handleChange('techStack', e.target.value)}
            placeholder="Next.js, TypeScript, Tailwind CSS, Framer Motion, Vercel"
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors text-slate-900 dark:text-white"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Comma-separated list (e.g., Next.js, TypeScript, Tailwind CSS)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Features
          </label>
          <textarea
            value={formData.features}
            onChange={(e) => handleChange('features', e.target.value)}
            placeholder="Responsive design with mobile-first approach&#10;Smooth page transitions and scroll animations&#10;Interactive UI elements with hover effects"
            rows={6}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors text-slate-900 dark:text-white resize-none"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">One feature per line (each line becomes a bullet point)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Technology Stack (Detailed)
          </label>
          <textarea
            value={formData.techStackDetails}
            onChange={(e) => handleChange('techStackDetails', e.target.value)}
            placeholder="Framework: Next.js 14&#10;Language: TypeScript 5.3&#10;Styling: Tailwind CSS 3.4&#10;Animations: Framer Motion 12.14"
            rows={6}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors font-mono text-sm text-slate-900 dark:text-white resize-none"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">One item per line in format: Category: Technology Version</p>
        </div>

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
      </div>
    </div>
  );
}
