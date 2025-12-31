export interface Template {
  id: string;
  name: string;
  description: string;
  difficulty: 'Minimal' | 'Standard' | 'Detailed';
  sections: string[];
  defaultContent: {
    projectName: string;
    description: string;
    techStack: string;
    installation: string;
    usage: string;
    license: string;
  };
}

export const templates: Template[] = [
  {
    id: 'basic',
    name: 'Basic Open Source',
    description: 'Simple and clean template for open source projects',
    difficulty: 'Minimal',
    sections: ['Overview', 'Installation', 'Usage', 'License'],
    defaultContent: {
      projectName: '',
      description: '',
      techStack: '',
      installation: '```bash\nnpm install project-name\n```',
      usage: '```javascript\nimport { feature } from \'project-name\';\n\n// Your code here\n```',
      license: 'MIT',
    },
  },
  {
    id: 'professional',
    name: 'Professional Project',
    description: 'Comprehensive template for professional projects',
    difficulty: 'Detailed',
    sections: [
      'Overview',
      'Features',
      'Installation',
      'Usage',
      'API Reference',
      'Contributing',
      'License',
      'Contact',
    ],
    defaultContent: {
      projectName: '',
      description: '',
      techStack: '',
      installation: '```bash\n# Clone the repository\ngit clone https://github.com/username/project.git\n\n# Install dependencies\ncd project\nnpm install\n```',
      usage: '```bash\n# Start the development server\nnpm run dev\n\n# Build for production\nnpm run build\n```',
      license: 'MIT',
    },
  },
  {
    id: 'startup',
    name: 'Startup / SaaS',
    description: 'Marketing-focused template for startup projects',
    difficulty: 'Standard',
    sections: [
      'Introduction',
      'Key Features',
      'Demo',
      'Getting Started',
      'Documentation',
      'Roadmap',
      'Support',
    ],
    defaultContent: {
      projectName: '',
      description: '',
      techStack: '',
      installation: '## Quick Start\n\n```bash\nnpx create-app my-app\ncd my-app\nnpm start\n```',
      usage: '## How It Works\n\n1. Sign up for an account\n2. Configure your settings\n3. Start building',
      license: 'Proprietary',
    },
  },
  {
    id: 'library',
    name: 'Library / Package',
    description: 'Technical documentation for libraries and packages',
    difficulty: 'Detailed',
    sections: [
      'Overview',
      'Installation',
      'Quick Start',
      'API Documentation',
      'Examples',
      'Configuration',
      'TypeScript Support',
      'Contributing',
    ],
    defaultContent: {
      projectName: '',
      description: '',
      techStack: 'TypeScript, Node.js',
      installation: '```bash\nnpm install @scope/package-name\n# or\nyarn add @scope/package-name\n```',
      usage: '```typescript\nimport { Library } from \'@scope/package-name\';\n\nconst instance = new Library({\n  apiKey: \'your-api-key\',\n});\n\nawait instance.method();\n```',
      license: 'MIT',
    },
  },
];
