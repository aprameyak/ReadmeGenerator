'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { FormData } from './InputSection';

interface AIModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentFormData: FormData;
  onGenerate: (formData: FormData) => void;
}

type Tone = 'concise' | 'professional' | 'friendly';
type Depth = 'minimal' | 'standard' | 'detailed';

export function AIModal({ open, onOpenChange, currentFormData, onGenerate }: AIModalProps) {
  const [tone, setTone] = useState<Tone>('professional');
  const [depth, setDepth] = useState<Depth>('standard');
  const [preserveFormatting, setPreserveFormatting] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation with mock enhancement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const enhancedData: FormData = {
      ...currentFormData,
      description: currentFormData.description || generateMockDescription(tone, depth),
      features: currentFormData.features || generateMockFeatures(depth),
      techStackDetails: currentFormData.techStackDetails || generateMockTechStack(depth),
    };

    setIsGenerating(false);
    onGenerate(enhancedData);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-md z-50 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <Dialog.Title className="text-xl font-semibold text-slate-900 dark:text-white">
                AI Content Generation
              </Dialog.Title>
            </div>
            <Dialog.Close className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </Dialog.Close>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Tone
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['concise', 'professional', 'friendly'] as Tone[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-4 py-2 rounded-lg border-2 capitalize transition-colors ${
                      tone === t
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300'
                        : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                README Depth
              </label>
              <div className="space-y-2">
                {(['minimal', 'standard', 'detailed'] as Depth[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDepth(d)}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 capitalize transition-colors ${
                      depth === d
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                        : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                    }`}
                  >
                    <div className="font-medium text-slate-900 dark:text-white">{d}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {d === 'minimal' && 'Quick overview with essential information'}
                      {d === 'standard' && 'Balanced coverage of all sections'}
                      {d === 'detailed' && 'Comprehensive documentation with examples'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preserveFormatting}
                  onChange={(e) => setPreserveFormatting(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-pink-600 focus:ring-pink-500"
                />
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">
                    Preserve my formatting
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Keep existing structure and code blocks
                  </div>
                </div>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 disabled:from-slate-400 disabled:to-slate-500 text-white rounded-lg transition-colors shadow-lg disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Content
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              AI will enhance your existing content while preserving your project details
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function generateMockDescription(tone: Tone, depth: Depth): string {
  const base = "A modern, feature-rich application built with cutting-edge technologies.";
  
  if (tone === 'concise') {
    return base;
  } else if (tone === 'professional') {
    return `${base} This project demonstrates best practices in software development, including clean architecture, comprehensive testing, and robust error handling.`;
  } else {
    return `${base} We've built this with love and attention to detail, making it easy for developers to get started and build amazing things! 🚀`;
  }
}

function generateMockFeatures(depth: Depth): string {
  if (depth === 'minimal') {
    return 'Responsive design\nModern UI/UX\nFast performance';
  } else if (depth === 'standard') {
    return 'Responsive design with mobile-first approach\nSmooth page transitions and scroll animations\nInteractive UI elements with hover effects\nDynamic content loading\nSEO optimized\nPerformance optimized';
  } else {
    return 'Responsive design with mobile-first approach\nSmooth page transitions and scroll animations\nInteractive UI elements with hover effects\nDynamic content loading with TypeScript type safety\nModern theme with gradient accents\nSEO optimized with Next.js metadata\nPerformance optimized with Next.js Image component\nAccessibility features\nDark mode support';
  }
}

function generateMockTechStack(depth: Depth): string {
  if (depth === 'minimal') {
    return 'Framework: Next.js\nLanguage: TypeScript\nStyling: Tailwind CSS';
  } else if (depth === 'standard') {
    return 'Framework: Next.js 14\nLanguage: TypeScript 5.3\nStyling: Tailwind CSS 3.4\nDeployment: Vercel';
  } else {
    return 'Framework: Next.js 14\nLanguage: TypeScript 5.3\nStyling: Tailwind CSS 3.4\nAnimations: Framer Motion 12.14\nDeployment: Vercel\nFont: Inter (Google Fonts)';
  }
}


