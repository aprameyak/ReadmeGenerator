// Default form content structure
export const defaultFormContent = {
  projectName: '',
  description: '',
  techStack: '',
  installation: '```bash\n# Clone the repository\ngit clone https://github.com/username/project.git\n\n# Install dependencies\ncd project\nnpm install\n```',
  usage: '```bash\n# Start the development server\nnpm run dev\n\n# Build for production\nnpm run build\n```',
  license: 'MIT',
};

// Sections that will be included in the README
export const README_SECTIONS = [
  'Overview',
  'Features',
  'Installation',
  'Usage',
  'API Reference',
  'Contributing',
  'License',
  'Contact',
];
