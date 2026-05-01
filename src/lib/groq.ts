import Groq from 'groq-sdk';

// Initialize Groq client with environment variable
// Set VITE_GROQ_API_KEY in your .env.local file
const apiKey = import.meta.env.VITE_GROQ_API_KEY || '';

export const groq = new Groq({
  apiKey,
  dangerouslyAllowBrowser: true
});

export async function chat(message: string): Promise<string> {
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: message }],
      max_tokens: 1024,
    });
    return completion.choices[0]?.message?.content || 'No response';
  } catch (error) {
    console.error('Groq chat error:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}