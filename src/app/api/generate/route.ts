import { NextRequest, NextResponse } from 'next/server';

type GenerateField = 'description' | 'features';
type GenerateRequestBody = {
  prompt?: string;
  field: GenerateField;
  projectData?: {
    projectName?: string;
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
    } else {
      systemPrompt = prompt ?? '';
    }

    const maxOutputTokens = field === 'features' ? 180 : 140;
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