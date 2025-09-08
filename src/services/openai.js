import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'demo-key',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateLegalAdvice(query, jurisdiction = 'United States') {
  try {
    const prompt = `You are a helpful legal assistant. Provide plain-language legal information for the following situation in ${jurisdiction}:

Query: ${query}

Please provide:
1. A clear summary of the relevant legal rights
2. Step-by-step actionable guidance
3. Important disclaimers
4. When to seek professional help

Keep the response concise, accessible, and include appropriate legal disclaimers.`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.3,
    });

    return completion.choices[0]?.message?.content || 'Unable to generate advice at this time.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    return 'Sorry, I cannot provide legal advice at the moment. Please try again later.';
  }
}

export async function generateTemplate(templateType, details, jurisdiction = 'United States') {
  try {
    const prompt = `Generate a ${templateType} template for ${jurisdiction} with the following details: ${JSON.stringify(details)}. 
    
    Make it professional, legally appropriate, and include placeholders for customization. Add appropriate disclaimers.`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400,
      temperature: 0.2,
    });

    return completion.choices[0]?.message?.content || 'Unable to generate template at this time.';
  } catch (error) {
    console.error('Template generation error:', error);
    return 'Sorry, I cannot generate the template at the moment. Please try again later.';
  }
}