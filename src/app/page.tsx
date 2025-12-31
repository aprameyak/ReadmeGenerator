'use client';

import { useState } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { Moon, Sun, ArrowLeft } from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { InputSection, FormData } from './components/InputSection';
import { MarkdownPreview } from './components/MarkdownPreview';
import { AIModal } from './components/AIModal';
import { defaultFormContent } from './components/templates';

export default function Home() {
  const [showApp, setShowApp] = useState(false);
  const [formData, setFormData] = useState<FormData>(defaultFormContent);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const handleAIGenerate = (enhancedData: FormData) => {
    setFormData(enhancedData);
  };

  const handleReset = () => {
    setFormData(defaultFormContent);
  };

  if (!showApp) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light">
        <LandingPage onGetStarted={() => setShowApp(true)} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <AppHeader onBack={() => setShowApp(false)} onReset={handleReset} />
        
        <div className="container mx-auto px-6 py-6">
          <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
            {/* Left Panel - Input */}
            <div className="overflow-y-auto bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <InputSection
                formData={formData}
                onFormDataChange={setFormData}
                onOpenAIModal={() => setAiModalOpen(true)}
              />
            </div>

            {/* Right Panel - Preview */}
            <div className="overflow-hidden bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col">
              <MarkdownPreview formData={formData} />
            </div>
          </div>
        </div>

        <AIModal
          open={aiModalOpen}
          onOpenChange={setAiModalOpen}
          currentFormData={formData}
          onGenerate={handleAIGenerate}
        />
      </div>
    </ThemeProvider>
  );
}

function AppHeader({ onBack, onReset }: { onBack: () => void; onReset: () => void }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const currentTheme = theme || 'light';
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              README Studio
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onReset}
              className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Reset
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {(theme || 'light') === 'dark' ? (
                <Sun className="w-5 h-5 text-slate-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
