import { NextRequest, NextResponse } from 'next/server';

type GenerateField = 'description' | 'features' | 'techStack';
type GenerateRequestBody = {
  field: GenerateField;
  projectData?: {
    projectName?: string;
    techStack?: string;
  };
  tone?: 'concise' | 'professional' | 'friendly';
  depth?: 'minimal' | 'standard' | 'detailed';
};

export async function POST(request: NextRequest) {
  try {
    const { field, projectData, tone = 'professional', depth = 'standard' } = (await request.json()) as GenerateRequestBody;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please set GEMINI_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    const projectName = projectData?.projectName?.trim() || 'the project';
    let systemPrompt = '';
    let maxOutputTokens = 200;

    if (field === 'description') {
      const toneInstruction = tone === 'concise' 
        ? 'Be concise and direct.' 
        : tone === 'professional' 
        ? 'Use a professional, formal tone.' 
        : 'Use a friendly, approachable tone.';
      
      const depthInstruction = depth === 'minimal'
        ? 'Keep it brief - 1-2 sentences.'
        : depth === 'standard'
        ? 'Provide a balanced description - 2-3 sentences.'
        : 'Provide a comprehensive description - 3-4 sentences with details.';

      systemPrompt = `You are an expert README author. Write an "About" section for a project called "${projectName}".

${toneInstruction}
${depthInstruction}

Requirements:
- Explain what the project does, who it's for, and its core value
- Use plain markdown text only (no headings, lists, links, or code blocks)
- Start with "**${projectName}**" in bold
- Be specific and engaging

Output only the paragraph text, nothing else.`;
      maxOutputTokens = depth === 'minimal' ? 100 : depth === 'standard' ? 150 : 200;
    } 
    else if (field === 'features') {
      const count = depth === 'minimal' ? '3-4' : depth === 'standard' ? '5-6' : '7-8';
      
      systemPrompt = `You are an expert README author. List key features for "${projectName}".

Requirements:
- Generate ${count} features
- Each feature should be one line
- Start each bullet with a strong verb (e.g., "Build", "Track", "Automate", "Create", "Enable")
- Be specific and technical
- No trailing punctuation
- Format as plain markdown bullets starting with "- "

Output only the bullet list, one feature per line, nothing else.`;
      maxOutputTokens = depth === 'minimal' ? 150 : depth === 'standard' ? 200 : 250;
    }
    else if (field === 'techStack') {
      const techStack = projectData?.techStack || '';
      const count = depth === 'minimal' ? '3-4' : depth === 'standard' ? '5-6' : '7-8';
      
      systemPrompt = `You are an expert README author. Create a detailed technology stack section for "${projectName}".

${techStack ? `The project uses: ${techStack}` : ''}

Requirements:
- Generate ${count} technology stack items
- Format: "Category: Technology Version" (e.g., "Framework: Next.js 14")
- One item per line
- Include versions when relevant
- Be specific and accurate

Output only the technology stack items, one per line, nothing else.`;
      maxOutputTokens = depth === 'minimal' ? 150 : depth === 'standard' ? 200 : 250;
    }

    // Use Gemini 1.5 Flash - the best free model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
            maxOutputTokens,
            topP: 0.95,
            topK: 40,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', response.status, errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

    if (!generatedText) {
      throw new Error('Empty response from Gemini API');
    }

    return NextResponse.json({ text: generatedText });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to generate content. Please check your API key and try again.' 
      },
      { status: 500 }
    );
  }
}
