import { Check } from 'lucide-react';
import { Template, templates } from './templates';

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onSelectTemplate: (template: Template) => void;
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Choose Template</h2>
      <div className="space-y-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedTemplate.id === template.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{template.name}</h3>
                  {selectedTemplate.id === template.id && (
                    <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{template.description}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    template.difficulty === 'Minimal' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                    template.difficulty === 'Standard' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                    'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  }`}>
                    {template.difficulty}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-500">
                    {template.sections.length} sections
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {template.sections.slice(0, 4).map((section) => (
                <span
                  key={section}
                  className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded"
                >
                  {section}
                </span>
              ))}
              {template.sections.length > 4 && (
                <span className="text-xs px-2 py-1 text-slate-500 dark:text-slate-400">
                  +{template.sections.length - 4} more
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
