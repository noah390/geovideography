'use server';
/**
 * @fileOverview A high-precision AI intelligence flow for street-level infrastructure.
 *
 * - getStreetIntelligence - Extracts bus stop counts and road conditions using AI search.
 * - GetStreetIntelligenceInput - Input schema (streetName, lgaName).
 * - GetStreetIntelligenceOutput - Output schema (busStops, roadHealth, status).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GetStreetIntelligenceInputSchema = z.object({
  streetName: z.string().describe('The name of the street to analyze.'),
  lgaName: z.string().describe('The Local Government Area (LGA) or administrative district context.'),
});
export type GetStreetIntelligenceInput = z.infer<typeof GetStreetIntelligenceInputSchema>;

const GetStreetIntelligenceOutputSchema = z.object({
  busStops: z.union([z.number(), z.string()]).describe('Number of bus stops or a descriptive count.'),
  roadHealth: z.string().describe('Description of road health (e.g., paved, unpaved, good condition).'),
  status: z.string().describe('The search result status message.'),
  isDataAvailable: z.boolean().describe('Whether specific data was found for this street.'),
});
export type GetStreetIntelligenceOutput = z.infer<typeof GetStreetIntelligenceOutputSchema>;

export async function getStreetIntelligence(input: GetStreetIntelligenceInput): Promise<GetStreetIntelligenceOutput> {
  return getStreetIntelligenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getStreetIntelligencePrompt',
  input: { schema: GetStreetIntelligenceInputSchema },
  output: { schema: GetStreetIntelligenceOutputSchema },
  prompt: `You are a high-fidelity infrastructure intelligence agent with access to Google Maps Grounding data.
Analyze the street "{{{streetName}}}" located in "{{{lgaName}}}".

Task:
1. Search specifically for this street within its administrative context.
2. Extract the number of bus stops detected on this specific street segment.
3. Determine the general 'health' of the road (specifically if it is paved or unpaved).
4. Return the data in a clean JSON format.

CRITICAL INSTRUCTION:
If specific data for this exact street cannot be verified, set "isDataAvailable" to false and set the "status" field to exactly "Data currently unavailable for this specific street". DO NOT guess or provide generic data.

If data is found, set "isDataAvailable" to true and provide details.`,
});

const getStreetIntelligenceFlow = ai.defineFlow(
  {
    name: 'getStreetIntelligenceFlow',
    inputSchema: GetStreetIntelligenceInputSchema,
    outputSchema: GetStreetIntelligenceOutputSchema,
  },
  async (input) => {
    // We use the configured AI model which supports grounding capabilities
    const { output } = await prompt(input);
    return output!;
  }
);
