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
      systemPrompt = `You are a professional README writer. Write a concise, engaging "About" section for a project called "${projectData.projectName}". 
      
The description should:
- Be 2-3 sentences long
- Explain what the project does and its main purpose
- Use bold text for key technologies/concepts
- Be professional but approachable
- Focus on the value/benefit to users

Format as markdown with proper bold formatting.`;
    } else if (field === "features") {
      systemPrompt = `You are a professional README writer. Create a "Features" section for a project called "${projectData.projectName}".
      
The features should:
- Be 4-6 bullet points
- Use markdown bullet points (- )
- Be specific and actionable
- Highlight key capabilities
- Be concise but informative

Format as markdown bullet points.`;
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