// Default form content structure
export const defaultFormContent = {
  projectName: '',
  description: '',
  techStack: '', // Comma-separated tech stack for badges (e.g., "Next.js, TypeScript, Tailwind CSS")
  features: '', // Newline-separated features
  techStackDetails: '', // Detailed tech stack with versions (e.g., "Next.js 14, TypeScript 5.3")
  deploymentUrl: '',
};

// Tech stack badge mapping
export const techBadgeMap: { [key: string]: string } = {
  'next.js': '![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white&style=for-the-badge)',
  'nextjs': '![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white&style=for-the-badge)',
  'typescript': '![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)',
  'tailwind css': '![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)',
  'tailwind': '![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)',
  'framer motion': '![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white&style=for-the-badge)',
  'framer': '![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white&style=for-the-badge)',
  'vercel': '![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white&style=for-the-badge)',
  'react': '![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&style=for-the-badge)',
  'node.js': '![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white&style=for-the-badge)',
  'python': '![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=for-the-badge)',
  'javascript': '![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge)',
};

export function generateTechBadges(techStack: string): string {
  if (!techStack.trim()) return '';
  
  const techs = techStack.split(',').map(t => t.trim().toLowerCase());
  const badges: string[] = [];
  const seen = new Set<string>();
  
  techs.forEach(tech => {
    const normalized = tech.toLowerCase();
    if (techBadgeMap[normalized] && !seen.has(normalized)) {
      badges.push(techBadgeMap[normalized]);
      seen.add(normalized);
    }
  });
  
  return badges.join('\n');
}
