import { NextRequest, NextResponse } from 'next/server';

type GenerateRequestBody = {
  userInput: string;
  currentFormData: {
    projectName?: string;
    description?: string;
    techStack?: string;
    features?: string;
    techStackDetails?: string;
    deploymentUrl?: string;
  };
};

export async function POST(request: NextRequest) {
  try {
    const { userInput, currentFormData } = (await request.json()) as GenerateRequestBody;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please set GEMINI_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    if (!userInput || !userInput.trim()) {
      return NextResponse.json(
        { error: 'User input is required' },
        { status: 400 }
      );
    }

    const projectName = currentFormData?.projectName || 'the project';
    const existingDescription = currentFormData?.description || '';
    const existingTechStack = currentFormData?.techStack || '';
    const existingFeatures = currentFormData?.features || '';
    const existingTechStackDetails = currentFormData?.techStackDetails || '';
    const existingDeploymentUrl = currentFormData?.deploymentUrl || '';

    // Create a comprehensive prompt that analyzes user input and fills form fields
    const systemPrompt = `You are an expert README author. Analyze the user's description and intelligently extract or generate content for a README file.

User's description: "${userInput}"

Current form data (build on this, don't replace unless user asks to change):
- Project Name: ${projectName}
- Description: ${existingDescription || '(empty)'}
- Tech Stack (comma-separated): ${existingTechStack || '(empty)'}
- Features (one per line): ${existingFeatures || '(empty)'}
- Tech Stack Details (one per line, format "Category: Technology Version"): ${existingTechStackDetails || '(empty)'}
- Deployment URL: ${existingDeploymentUrl || '(empty)'}

CRITICAL RULES:
1. ONLY update fields that are EXPLICITLY mentioned or directly inferable from the user's description
2. If user describes the project → update description field
3. If user mentions technologies or "tech stack" → update techStack and techStackDetails
4. If user mentions features, capabilities, or "what it does" → update features field
5. If user mentions a URL or "deployed at" → update deploymentUrl
6. If user mentions project name → update projectName
7. BUILD ON existing content - if a field has content and user doesn't explicitly mention changing it, DO NOT include it in the response
8. Only fill empty fields if the user's description provides relevant information for that field

Output format (JSON only, no markdown, no code blocks):
{
  "projectName": "only if mentioned or needs to be extracted",
  "description": "only if user describes the project or asks to update description",
  "techStack": "only if technologies are mentioned",
  "features": "only if user asks for features or describes capabilities",
  "techStackDetails": "only if technologies are mentioned",
  "deploymentUrl": "only if URL is mentioned"
}

IMPORTANT: Only include fields in the JSON that should be updated based on the user's input. Omit any field that shouldn't change. If a field is empty and user doesn't provide info for it, omit it.`;

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
      }> = {};
      
      if (parsed.projectName !== undefined) result.projectName = String(parsed.projectName);
      if (parsed.description !== undefined) result.description = String(parsed.description);
      if (parsed.techStack !== undefined) result.techStack = String(parsed.techStack);
      if (parsed.features !== undefined) result.features = String(parsed.features);
      if (parsed.techStackDetails !== undefined) result.techStackDetails = String(parsed.techStackDetails);
      if (parsed.deploymentUrl !== undefined) result.deploymentUrl = String(parsed.deploymentUrl);

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
