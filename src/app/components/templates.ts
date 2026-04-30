export const defaultFormContent = {
  projectName: '',
  description: '',
  techStack: '',
  features: '',
  techStackDetails: '',
  deploymentUrl: '',
  screenshotUrl: '',
  installation: '',
  prerequisites: '',
  license: 'MIT',
};

export const techBadgeMap: { [key: string]: string } = {
  // Frontend Frameworks
  'next.js': '![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white&style=for-the-badge)',
  'nextjs': '![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white&style=for-the-badge)',
  'react': '![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&style=for-the-badge)',
  'vue': '![Vue.js](https://img.shields.io/badge/Vue.js-35495E?logo=vuedotjs&logoColor=4FC08D&style=for-the-badge)',
  'vue.js': '![Vue.js](https://img.shields.io/badge/Vue.js-35495E?logo=vuedotjs&logoColor=4FC08D&style=for-the-badge)',
  'nuxt': '![Nuxt](https://img.shields.io/badge/Nuxt-002E3B?logo=nuxtdotjs&logoColor=00DC82&style=for-the-badge)',
  'nuxt.js': '![Nuxt](https://img.shields.io/badge/Nuxt-002E3B?logo=nuxtdotjs&logoColor=00DC82&style=for-the-badge)',
  'angular': '![Angular](https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=white&style=for-the-badge)',
  'svelte': '![Svelte](https://img.shields.io/badge/Svelte-4A4A55?logo=svelte&logoColor=FF3E00&style=for-the-badge)',
  'sveltekit': '![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?logo=svelte&logoColor=white&style=for-the-badge)',
  'astro': '![Astro](https://img.shields.io/badge/Astro-BC52EE?logo=astro&logoColor=white&style=for-the-badge)',
  'remix': '![Remix](https://img.shields.io/badge/Remix-000000?logo=remix&logoColor=white&style=for-the-badge)',
  'gatsby': '![Gatsby](https://img.shields.io/badge/Gatsby-663399?logo=gatsby&logoColor=white&style=for-the-badge)',
  'vite': '![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge)',

  // Languages
  'typescript': '![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)',
  'javascript': '![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge)',
  'python': '![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=for-the-badge)',
  'go': '![Go](https://img.shields.io/badge/Go-00ADD8?logo=go&logoColor=white&style=for-the-badge)',
  'golang': '![Go](https://img.shields.io/badge/Go-00ADD8?logo=go&logoColor=white&style=for-the-badge)',
  'rust': '![Rust](https://img.shields.io/badge/Rust-000000?logo=rust&logoColor=white&style=for-the-badge)',
  'java': '![Java](https://img.shields.io/badge/Java-ED8B00?logo=openjdk&logoColor=white&style=for-the-badge)',
  'c#': '![C#](https://img.shields.io/badge/C%23-239120?logo=csharp&logoColor=white&style=for-the-badge)',
  'c++': '![C++](https://img.shields.io/badge/C++-00599C?logo=cplusplus&logoColor=white&style=for-the-badge)',
  'php': '![PHP](https://img.shields.io/badge/PHP-777BB4?logo=php&logoColor=white&style=for-the-badge)',
  'ruby': '![Ruby](https://img.shields.io/badge/Ruby-CC342D?logo=ruby&logoColor=white&style=for-the-badge)',
  'swift': '![Swift](https://img.shields.io/badge/Swift-FA7343?logo=swift&logoColor=white&style=for-the-badge)',
  'kotlin': '![Kotlin](https://img.shields.io/badge/Kotlin-0095D5?logo=kotlin&logoColor=white&style=for-the-badge)',
  'dart': '![Dart](https://img.shields.io/badge/Dart-0175C2?logo=dart&logoColor=white&style=for-the-badge)',

  // Styling
  'tailwind css': '![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)',
  'tailwind': '![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)',
  'css': '![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge)',
  'sass': '![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white&style=for-the-badge)',
  'scss': '![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white&style=for-the-badge)',
  'bootstrap': '![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?logo=bootstrap&logoColor=white&style=for-the-badge)',
  'material ui': '![Material UI](https://img.shields.io/badge/Material_UI-007FFF?logo=mui&logoColor=white&style=for-the-badge)',
  'mui': '![Material UI](https://img.shields.io/badge/Material_UI-007FFF?logo=mui&logoColor=white&style=for-the-badge)',
  'chakra ui': '![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?logo=chakraui&logoColor=white&style=for-the-badge)',
  'shadcn': '![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?logo=shadcnui&logoColor=white&style=for-the-badge)',
  'shadcn/ui': '![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?logo=shadcnui&logoColor=white&style=for-the-badge)',
  'ant design': '![Ant Design](https://img.shields.io/badge/Ant_Design-0170FE?logo=antdesign&logoColor=white&style=for-the-badge)',

  // Animations
  'framer motion': '![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white&style=for-the-badge)',
  'framer': '![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white&style=for-the-badge)',
  'gsap': '![GSAP](https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=black&style=for-the-badge)',

  // Backend Frameworks
  'node.js': '![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white&style=for-the-badge)',
  'nodejs': '![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white&style=for-the-badge)',
  'express': '![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=for-the-badge)',
  'express.js': '![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=for-the-badge)',
  'fastify': '![Fastify](https://img.shields.io/badge/Fastify-000000?logo=fastify&logoColor=white&style=for-the-badge)',
  'nestjs': '![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white&style=for-the-badge)',
  'django': '![Django](https://img.shields.io/badge/Django-092E20?logo=django&logoColor=white&style=for-the-badge)',
  'fastapi': '![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white&style=for-the-badge)',
  'flask': '![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white&style=for-the-badge)',
  'rails': '![Rails](https://img.shields.io/badge/Rails-CC0000?logo=rubyonrails&logoColor=white&style=for-the-badge)',
  'ruby on rails': '![Rails](https://img.shields.io/badge/Rails-CC0000?logo=rubyonrails&logoColor=white&style=for-the-badge)',
  'laravel': '![Laravel](https://img.shields.io/badge/Laravel-FF2D20?logo=laravel&logoColor=white&style=for-the-badge)',
  'spring boot': '![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?logo=springboot&logoColor=white&style=for-the-badge)',
  'spring': '![Spring](https://img.shields.io/badge/Spring-6DB33F?logo=spring&logoColor=white&style=for-the-badge)',

  // Databases
  'postgresql': '![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white&style=for-the-badge)',
  'postgres': '![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white&style=for-the-badge)',
  'mysql': '![MySQL](https://img.shields.io/badge/MySQL-00000F?logo=mysql&logoColor=white&style=for-the-badge)',
  'mongodb': '![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white&style=for-the-badge)',
  'redis': '![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white&style=for-the-badge)',
  'sqlite': '![SQLite](https://img.shields.io/badge/SQLite-07405E?logo=sqlite&logoColor=white&style=for-the-badge)',
  'supabase': '![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white&style=for-the-badge)',
  'firebase': '![Firebase](https://img.shields.io/badge/Firebase-039BE5?logo=firebase&logoColor=white&style=for-the-badge)',
  'planetscale': '![PlanetScale](https://img.shields.io/badge/PlanetScale-000000?logo=planetscale&logoColor=white&style=for-the-badge)',
  'neon': '![Neon](https://img.shields.io/badge/Neon-00E5CC?style=for-the-badge)',
  'dynamodb': '![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?logo=amazondynamodb&logoColor=white&style=for-the-badge)',
  'turso': '![Turso](https://img.shields.io/badge/Turso-4FF8D2?style=for-the-badge)',

  // ORMs / Data
  'prisma': '![Prisma](https://img.shields.io/badge/Prisma-3982CE?logo=Prisma&logoColor=white&style=for-the-badge)',
  'drizzle': '![Drizzle](https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge)',

  // Auth
  'nextauth': '![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?logo=nextdotjs&logoColor=white&style=for-the-badge)',
  'auth.js': '![Auth.js](https://img.shields.io/badge/Auth.js-000000?logo=nextdotjs&logoColor=white&style=for-the-badge)',
  'auth0': '![Auth0](https://img.shields.io/badge/Auth0-EB5424?logo=auth0&logoColor=white&style=for-the-badge)',
  'clerk': '![Clerk](https://img.shields.io/badge/Clerk-6C47FF?logo=clerk&logoColor=white&style=for-the-badge)',

  // Testing
  'jest': '![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white&style=for-the-badge)',
  'vitest': '![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white&style=for-the-badge)',
  'playwright': '![Playwright](https://img.shields.io/badge/Playwright-45ba4b?logo=playwright&logoColor=white&style=for-the-badge)',
  'cypress': '![Cypress](https://img.shields.io/badge/Cypress-17202C?logo=cypress&logoColor=white&style=for-the-badge)',

  // DevOps / Cloud / Infra
  'vercel': '![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white&style=for-the-badge)',
  'netlify': '![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white&style=for-the-badge)',
  'aws': '![AWS](https://img.shields.io/badge/AWS-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge)',
  'gcp': '![GCP](https://img.shields.io/badge/GCP-4285F4?logo=googlecloud&logoColor=white&style=for-the-badge)',
  'google cloud': '![GCP](https://img.shields.io/badge/GCP-4285F4?logo=googlecloud&logoColor=white&style=for-the-badge)',
  'azure': '![Azure](https://img.shields.io/badge/Azure-0089D6?logo=microsoftazure&logoColor=white&style=for-the-badge)',
  'docker': '![Docker](https://img.shields.io/badge/Docker-2CA5E0?logo=docker&logoColor=white&style=for-the-badge)',
  'kubernetes': '![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?logo=kubernetes&logoColor=white&style=for-the-badge)',
  'k8s': '![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?logo=kubernetes&logoColor=white&style=for-the-badge)',
  'github actions': '![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white&style=for-the-badge)',
  'cloudflare': '![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare&logoColor=white&style=for-the-badge)',

  // Mobile
  'react native': '![React Native](https://img.shields.io/badge/React_Native-20232A?logo=react&logoColor=61DAFB&style=for-the-badge)',
  'flutter': '![Flutter](https://img.shields.io/badge/Flutter-02569B?logo=flutter&logoColor=white&style=for-the-badge)',
  'expo': '![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white&style=for-the-badge)',

  // APIs & protocols
  'graphql': '![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=white&style=for-the-badge)',
  'trpc': '![tRPC](https://img.shields.io/badge/tRPC-2596BE?logo=trpc&logoColor=white&style=for-the-badge)',

  // Tools & services
  'git': '![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white&style=for-the-badge)',
  'github': '![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white&style=for-the-badge)',
  'eslint': '![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white&style=for-the-badge)',
  'prettier': '![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black&style=for-the-badge)',
  'webpack': '![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?logo=webpack&logoColor=black&style=for-the-badge)',
  'stripe': '![Stripe](https://img.shields.io/badge/Stripe-008CDD?logo=stripe&logoColor=white&style=for-the-badge)',
  'openai': '![OpenAI](https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white&style=for-the-badge)',
  'anthropic': '![Anthropic](https://img.shields.io/badge/Anthropic-191919?style=for-the-badge)',
  'xcode': '![Xcode](https://img.shields.io/badge/Xcode-147EFB?logo=xcode&logoColor=white&style=for-the-badge)',
  'ios': '![iOS](https://img.shields.io/badge/iOS-000000?logo=apple&logoColor=white&style=for-the-badge)',
  'android': '![Android](https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white&style=for-the-badge)',
};

function generateFallbackBadge(tech: string): string {
  // shields.io encoding: underscores → __, dashes → --, spaces → _
  const encoded = tech
    .replace(/_/g, '__')
    .replace(/-/g, '--')
    .replace(/ /g, '_');
  return `![${tech}](https://img.shields.io/badge/${encoded}-555555?style=for-the-badge)`;
}

export function generateTechBadges(techStack: string): string {
  if (!techStack.trim()) return '';

  const techs = techStack.split(',').map(t => t.trim()).filter(Boolean);
  const badges: string[] = [];
  const seen = new Set<string>();

  techs.forEach(tech => {
    const normalized = tech.toLowerCase();
    if (seen.has(normalized)) return;
    seen.add(normalized);

    const badge = techBadgeMap[normalized] ?? generateFallbackBadge(tech);
    badges.push(badge);
  });

  return badges.join('\n');
}
