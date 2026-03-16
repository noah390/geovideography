'use server';
/**
 * @fileOverview A flow to fetch country historical context.
 *
 * - getCountryHistory - A function that generates a historical summary of a country.
 * - GetCountryHistoryInput - The input type for the function.
 * - GetCountryHistoryOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetCountryHistoryInputSchema = z.object({
  countryName: z.string().describe('The name of the country to get history for.'),
});
export type GetCountryHistoryInput = z.infer<typeof GetCountryHistoryInputSchema>;

const GetCountryHistoryOutputSchema = z.object({
  history: z.string().describe('The historical summary of the country.'),
});
export type GetCountryHistoryOutput = z.infer<typeof GetCountryHistoryOutputSchema>;

export async function getCountryHistory(input: GetCountryHistoryInput): Promise<GetCountryHistoryOutput> {
  return getCountryHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getCountryHistoryPrompt',
  input: {schema: GetCountryHistoryInputSchema},
  output: {schema: GetCountryHistoryOutputSchema},
  prompt: `You are a world-class historian. Provide a concise, engaging, and accurate summary of how the nation of "{{{countryName}}}" came to be. 
Focus on key milestones such as:
- Ancient origins or indigenous roots
- Major turning points or conflicts
- The path to independence or unification
- Establishment of the modern state

Keep the response between 2 and 3 paragraphs. Use clear, educational language.`,
});

const getCountryHistoryFlow = ai.defineFlow(
  {
    name: 'getCountryHistoryFlow',
    inputSchema: GetCountryHistoryInputSchema,
    outputSchema: GetCountryHistoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
