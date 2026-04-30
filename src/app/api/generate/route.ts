import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limiter: 20 requests per IP per minute
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_INPUT_LENGTH = 2000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

type GenerateRequestBody = {
  userInput: string;
  currentFormData: {
    projectName?: string;
    description?: string;
    techStack?: string;
    features?: string;
    techStackDetails?: string;
    deploymentUrl?: string;
    screenshotUrl?: string;
    installation?: string;
    prerequisites?: string;
    license?: string;
  };
};

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    const { userInput, currentFormData } = (await request.json()) as GenerateRequestBody;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured.' },
        { status: 500 }
      );
    }

    if (!userInput || !userInput.trim()) {
      return NextResponse.json(
        { error: 'User input is required.' },
        { status: 400 }
      );
    }

    if (userInput.length > MAX_INPUT_LENGTH) {
      return NextResponse.json(
        { error: `Input must be ${MAX_INPUT_LENGTH} characters or fewer.` },
        { status: 400 }
      );
    }

    const projectName = currentFormData?.projectName || 'the project';
    const existingDescription = currentFormData?.description || '';
    const existingTechStack = currentFormData?.techStack || '';
    const existingFeatures = currentFormData?.features || '';
    const existingTechStackDetails = currentFormData?.techStackDetails || '';
    const existingDeploymentUrl = currentFormData?.deploymentUrl || '';
    const existingScreenshotUrl = currentFormData?.screenshotUrl || '';
    const existingInstallation = currentFormData?.installation || '';
    const existingPrerequisites = currentFormData?.prerequisites || '';
    const existingLicense = currentFormData?.license || '';

    const systemPrompt = `You are an expert README author. Analyze the user's description and intelligently extract or generate content for a README file.

User's description: "${userInput}"

Current form data (build on this, don't replace unless user asks to change):
- Project Name: ${projectName}
- Description: ${existingDescription || '(empty)'}
- Tech Stack (comma-separated, for badges): ${existingTechStack || '(empty)'}
- Features (one per line): ${existingFeatures || '(empty)'}
- Tech Stack Details (one per line, format "Category: Technology Version"): ${existingTechStackDetails || '(empty)'}
- Deployment URL: ${existingDeploymentUrl || '(empty)'}
- Screenshot URL: ${existingScreenshotUrl || '(empty)'}
- Prerequisites (one per line): ${existingPrerequisites || '(empty)'}
- Installation Steps (one per line, each step is a shell command or instruction): ${existingInstallation || '(empty)'}
- License: ${existingLicense || '(empty)'}

CRITICAL RULES:
1. ONLY update fields that are EXPLICITLY mentioned or directly inferable from the user's description
2. If user describes the project → update description
3. If user mentions technologies → update techStack (comma-separated) and techStackDetails (one "Category: Tech Version" per line)
4. If user mentions features or capabilities → update features (one per line)
5. If user mentions setup, installation, or how to run → update prerequisites and installation
6. If user mentions a deployment URL → update deploymentUrl
7. If user mentions a screenshot or demo image URL → update screenshotUrl
8. If user mentions a license → update license
9. If user mentions project name → update projectName
10. BUILD ON existing content — if a field already has content and the user doesn't ask to change it, omit it from the response
11. For installation steps, write each step as a concrete shell command or short instruction (e.g. "git clone https://..." or "npm install")

Output format (JSON only, no markdown, no code blocks):
{
  "projectName": "...",
  "description": "...",
  "techStack": "Tech1, Tech2, Tech3",
  "features": "Feature one\\nFeature two\\nFeature three",
  "techStackDetails": "Framework: Next.js 14\\nLanguage: TypeScript 5",
  "deploymentUrl": "...",
  "screenshotUrl": "...",
  "prerequisites": "Node.js v18+\\nnpm or yarn",
  "installation": "git clone https://github.com/...\\ncd project\\nnpm install\\nnpm run dev",
  "license": "MIT"
}

IMPORTANT: Only include fields that should be updated. Omit fields that shouldn't change.`;

    // Fallback models in order of preference (all free tier)
    // Using only confirmed valid model names for v1beta API
    const models = [
      'gemini-2.5-flash-lite',
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-2.0-flash-lite',
      'gemini-1.5-flash',
      'gemini-1.5-flash-8b',
    ];

    let lastError: Error | null = null;
    let generatedText = '';

    // Try each model until one succeeds
    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: systemPrompt,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
                topP: 0.95,
                topK: 40,
              },
            }),
          }
        );

        if (!response.ok) {
          let errorMessage = `Gemini API error: ${response.status}`;
          try {
            const errorData = await response.json();
            // Handle 429 (rate limit/quota exceeded) - try next model
            if (response.status === 429) {
              console.warn(`Rate limit/quota exceeded for ${model}, trying next model...`);
              lastError = new Error(`Rate limit exceeded for ${model}`);
              continue; // Try next model
            }
            errorMessage = errorData.error?.message || errorMessage;
          } catch {
            // If error response is not JSON, use status text
            errorMessage = `Gemini API error: ${response.status} ${response.statusText}`;
          }
          console.error(`Gemini API error for ${model}:`, response.status, errorMessage);
          lastError = new Error(errorMessage);
          continue; // Try next model
        }

        const data = await response.json();
        generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

        if (!generatedText) {
          lastError = new Error('Empty response from Gemini API');
          continue; // Try next model
        }

        // Success! Break out of loop
        console.log(`Successfully used model: ${model}`);
        break;
      } catch (error) {
        console.error(`Error with model ${model}:`, error);
        lastError = error instanceof Error ? error : new Error(String(error));
        continue; // Try next model
      }
    }

    // If all models failed, throw the last error
    if (!generatedText) {
      throw lastError || new Error('All fallback models failed');
    }

    // Parse JSON response
    try {
      // Extract JSON from response (might have markdown code blocks)
      let jsonText = generatedText;
      
      // Remove markdown code blocks if present
      if (generatedText.includes('```')) {
        const codeBlockMatch = generatedText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
        if (codeBlockMatch) {
          jsonText = codeBlockMatch[1];
        } else {
          // Try to extract JSON object
          const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            jsonText = jsonMatch[0];
          }
        }
      } else {
        // Try to extract JSON object
        const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonText = jsonMatch[0];
        }
      }
      
      const parsed = JSON.parse(jsonText);

      // Only return fields that were explicitly returned (safety check)
      // Ensure all values are strings to prevent type errors
      const result: Partial<{
        projectName: string;
        description: string;
        techStack: string;
        features: string;
        techStackDetails: string;
        deploymentUrl: string;
        screenshotUrl: string;
        installation: string;
        prerequisites: string;
        license: string;
      }> = {};

      if (parsed.projectName !== undefined) result.projectName = String(parsed.projectName);
      if (parsed.description !== undefined) result.description = String(parsed.description);
      if (parsed.techStack !== undefined) result.techStack = String(parsed.techStack);
      if (parsed.features !== undefined) result.features = String(parsed.features);
      if (parsed.techStackDetails !== undefined) result.techStackDetails = String(parsed.techStackDetails);
      if (parsed.deploymentUrl !== undefined) result.deploymentUrl = String(parsed.deploymentUrl);
      if (parsed.screenshotUrl !== undefined) result.screenshotUrl = String(parsed.screenshotUrl);
      if (parsed.installation !== undefined) result.installation = String(parsed.installation);
      if (parsed.prerequisites !== undefined) result.prerequisites = String(parsed.prerequisites);
      if (parsed.license !== undefined) result.license = String(parsed.license);

      return NextResponse.json(result);
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      throw new Error('Failed to parse response. Please try again with a clearer description.');
    }
  } catch (error) {
    console.error('Content generation error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to generate content. Please check your API key and try again.' 
      },
      { status: 500 }
    );
  }
}
