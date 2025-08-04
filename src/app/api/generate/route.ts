import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, field, projectData } = await request.json();
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    let systemPrompt = "";
    if (field === "description") {
      systemPrompt = `You are a professional README writer. Write a concise "About" section for a project called "${projectData.projectName}". 

Follow this exact format:
- Write 2-3 sentences explaining what the project does
- Use **bold** for key technologies and concepts
- Be professional and clear
- Focus on the main purpose and value

Example format:
**ProjectName** is a [type of application] that [main purpose]. It uses **technology1** and **technology2** to [what it accomplishes]. [Additional context or benefit].

Return only the description text, no additional formatting.`;
    } else if (field === "features") {
      systemPrompt = `You are a professional README writer. Create a "Features" section for a project called "${projectData.projectName}".

Follow this exact format:
- Write 4-6 bullet points using markdown format (- )
- Each bullet should be specific and actionable
- Focus on key capabilities and functionality
- Be concise but informative

Example format:
- **Feature 1**: Brief description of what it does
- **Feature 2**: Brief description of what it does
- **Feature 3**: Brief description of what it does
- **Feature 4**: Brief description of what it does

Return only the bullet points, no additional formatting.`;
    } else {
      systemPrompt = prompt;
    }

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
                  text: systemPrompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 256,
          }
        })
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