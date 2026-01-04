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

export function AIModal({ open, onOpenChange, currentFormData, onGenerate }: AIModalProps) {
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      setError('Please enter some text to generate content.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInput: userInput.trim(),
          currentFormData: currentFormData,
        }),
      });
      
      if (!response.ok) {
        let errorMessage = 'Failed to generate content';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If response is not JSON, try to get text
          try {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          } catch {
            errorMessage = `Server error: ${response.status}`;
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Merge generated data with existing data (only update fields that were returned)
      const enhancedData: FormData = {
        projectName: data.projectName !== undefined ? data.projectName : currentFormData.projectName,
        description: data.description !== undefined ? data.description : currentFormData.description,
        techStack: data.techStack !== undefined ? data.techStack : currentFormData.techStack,
        features: data.features !== undefined ? data.features : currentFormData.features,
        techStackDetails: data.techStackDetails !== undefined ? data.techStackDetails : currentFormData.techStackDetails,
        deploymentUrl: data.deploymentUrl !== undefined ? data.deploymentUrl : currentFormData.deploymentUrl,
      };

      onGenerate(enhancedData);
      setUserInput(''); // Clear input after successful generation
      onOpenChange(false);
    } catch (error) {
      console.error('Content generation error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while generating content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-lg z-50 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <Dialog.Title className="text-xl font-semibold text-slate-900 dark:text-white">
                Smart Content Generation
              </Dialog.Title>
            </div>
            <Dialog.Close className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </Dialog.Close>
          </div>

          <div className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Describe what you want to generate or improve
              </label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="e.g., 'This is a portfolio website built with Next.js and TypeScript. It has dark mode, smooth animations, and is deployed on Vercel.'"
                rows={6}
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-colors text-slate-900 dark:text-white resize-none"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Will intelligently fill in the form fields based on your description. Subsequent uses will build on existing content.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !userInput.trim()}
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
              Will enhance your existing content while preserving your project details.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
