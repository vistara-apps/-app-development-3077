import { useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export interface LegalAdviceRequest {
  query: string;
  jurisdiction: string;
  requestType: 'summary' | 'template' | 'steps';
}

export interface LegalAdviceResponse {
  summary: string;
  actionableSteps: string[];
  templates?: string[];
  sources?: string[];
}

export function useOpenAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateLegalAdvice = async (request: LegalAdviceRequest): Promise<LegalAdviceResponse> => {
    setLoading(true);
    setError(null);

    try {
      const prompt = `You are a legal assistant providing plain-language explanations for ${request.jurisdiction}. 
      
User Query: "${request.query}"
Request Type: ${request.requestType}

Please provide:
1. A clear, plain-language summary (max 150 words)
2. 3-5 actionable next steps
3. If template requested, provide a basic template
4. Relevant law references if applicable

Format as JSON with fields: summary, actionableSteps, templates, sources.
Keep language simple and accessible. Include disclaimers about consulting qualified legal professionals.`;

      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from AI');
      }

      try {
        const parsed = JSON.parse(content);
        return parsed;
      } catch {
        // Fallback if JSON parsing fails
        return {
          summary: content,
          actionableSteps: ['Consult with a qualified legal professional', 'Review relevant local laws', 'Document your situation'],
          templates: [],
          sources: []
        };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate legal advice';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    generateLegalAdvice,
    loading,
    error
  };
}