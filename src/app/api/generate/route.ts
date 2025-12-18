import { NextRequest, NextResponse } from 'next/server';

type GenerateField = 'description' | 'features' | 'chat';
type GenerateRequestBody = {
  prompt?: string;
  field: GenerateField;
  currentReadme?: string;
  projectData?: {
    projectName?: string;
    description?: string;
    features?: string;
    techStack?: string;
    liveLink?: string;
  };
};

export async function POST(request: NextRequest) {
  try {
    const { prompt, field, projectData } = (await request.json()) as GenerateRequestBody;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    let systemPrompt = '';
    const projectName = projectData?.projectName?.trim() || 'the project';

    if (field === 'description') {
      systemPrompt = `Role: Expert README author.
Task: Write a concise About section for "${projectName}".
Constraints:
- Max 2 sentences
- Explain what it does, who it's for, and the core value
- Professional, plain markdown text only
- No headings, lists, links, or extra commentary
Output: Only the paragraph text.`;
    } else if (field === 'features') {
      systemPrompt = `Role: Expert README author.
Task: List key features for "${projectName}".
Constraints:
- 4 to 6 bullets
- Start each bullet with a strong verb (e.g., Build, Track, Automate)
- One line per bullet; be specific; no trailing punctuation
- Plain markdown, bullets must start with "- "
Output: Only the bullet list.`;
    } else if (field === 'chat') {
      const currentReadme = (await request.clone().json()).currentReadme || '';
      systemPrompt = `Role: Expert README editor assistant.
You help developers refine their README files through natural language requests.

Current README:
\`\`\`markdown
${currentReadme}
\`\`\`

User request: ${prompt}

Instructions:
- Understand what the user wants to change/add/remove
- Apply the requested changes to the README
- Return the COMPLETE updated README wrapped in \`\`\`markdown code block
- After the code block, briefly explain what you changed (1-2 sentences)
- Keep the existing structure unless asked to change it
- Be helpful and make smart improvements based on the request`;
    } else {
      systemPrompt = prompt ?? '';
    }

    const maxOutputTokens = field === 'chat' ? 1500 : field === 'features' ? 180 : 140;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
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
            temperature: 0.4,
            maxOutputTokens,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

    return NextResponse.json({ text: generatedText });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
} 