import { useState } from 'react';
import OpenAI from 'openai';
import { LegalTopicExtractor, LegalResourceService, LegalCitationService } from '../services/legalResources';
import { TemplateService } from '../services/templates';

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
  resources?: Array<{
    title: string;
    url: string;
    description: string;
    isOfficial: boolean;
  }>;
  citations?: Array<{
    title: string;
    citation: string;
    url?: string;
    summary: string;
  }>;
}

export function useOpenAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateLegalAdvice = async (request: LegalAdviceRequest): Promise<LegalAdviceResponse> => {
    setLoading(true);
    setError(null);

    try {
      // Extract relevant legal resources and citations
      const { resources, citations } = LegalTopicExtractor.getRelevantResourcesForQuery(
        request.query, 
        request.jurisdiction
      );

      // Get relevant templates if template is requested
      const availableTemplates = request.requestType === 'template' 
        ? TemplateService.getTemplatesByJurisdiction(request.jurisdiction)
        : [];

      // Build enhanced prompt with context
      const resourceContext = resources.length > 0 
        ? `\n\nRelevant Legal Resources:\n${resources.map(r => `- ${r.title}: ${r.description}`).join('\n')}`
        : '';

      const citationContext = citations.length > 0
        ? `\n\nRelevant Laws:\n${citations.map(c => `- ${c.title} (${c.citation}): ${c.summary}`).join('\n')}`
        : '';

      const templateContext = availableTemplates.length > 0
        ? `\n\nAvailable Templates:\n${availableTemplates.slice(0, 3).map(t => `- ${t.title}: ${t.description}`).join('\n')}`
        : '';

      const prompt = `You are a legal assistant providing plain-language explanations for ${request.jurisdiction}. 
      
User Query: "${request.query}"
Request Type: ${request.requestType}
${resourceContext}${citationContext}${templateContext}

Please provide:
1. A clear, plain-language summary (max 200 words)
2. 3-5 specific actionable next steps
3. If template requested, suggest specific template names from the available templates
4. Relevant law references if applicable

Format as JSON with fields: summary, actionableSteps, templates, sources.
Keep language simple and accessible. Include disclaimers about consulting qualified legal professionals.
Focus on practical, actionable advice specific to the user's jurisdiction.`;

      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from AI');
      }

      let aiResponse;
      try {
        aiResponse = JSON.parse(content);
      } catch {
        // Fallback if JSON parsing fails
        aiResponse = {
          summary: content,
          actionableSteps: ['Consult with a qualified legal professional', 'Review relevant local laws', 'Document your situation'],
          templates: [],
          sources: []
        };
      }

      // Enhance response with actual resources and citations
      const enhancedResponse: LegalAdviceResponse = {
        ...aiResponse,
        resources: resources.slice(0, 5).map(r => ({
          title: r.title,
          url: r.url,
          description: r.description,
          isOfficial: r.isOfficial
        })),
        citations: citations.slice(0, 3).map(c => ({
          title: c.title,
          citation: c.citation,
          url: c.url,
          summary: c.summary
        }))
      };

      return enhancedResponse;
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
