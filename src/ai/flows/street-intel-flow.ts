
'use server';
/**
 * @fileOverview A flow to enrich street-level telemetry data using AI.
 * 
 * - getStreetIntel - Generates road condition and health intelligence for a specific street location.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const StreetIntelInputSchema = z.object({
  streetName: z.string().describe('The name of the street to analyze.'),
  locationContext: z.string().describe('The town and country context.'),
});
export type StreetIntelInput = z.infer<typeof StreetIntelInputSchema>;

const StreetIntelOutputSchema = z.object({
  analysis: z.object({
    roadCondition: z.string().describe('Description of the road health.'),
    greeneryScore: z.number().describe('Estimated tree density score 1-100.'),
    healthFacilityAccess: z.string().describe('Summary of nearby health facilities.'),
    safetyTelemetry: z.string().describe('General infrastructure safety report.'),
  }),
});
export type StreetIntelOutput = z.infer<typeof StreetIntelOutputSchema>;

export async function getStreetIntel(input: StreetIntelInput): Promise<StreetIntelOutput> {
  return streetIntelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'streetIntelPrompt',
  input: { schema: StreetIntelInputSchema },
  output: { schema: StreetIntelOutputSchema },
  prompt: `You are a high-tech infrastructure intelligence agent. 
Analyze the following street: "{{{streetName}}}" in "{{{locationContext}}}".

Provide a simulated high-fidelity intelligence report on its physical condition. 
Focus on:
- Road condition (pavement quality, drainage)
- Greenery/Tree density
- Proximity to health facilities
- Infrastructure safety

Be professional, concise, and futuristic in your reporting.`,
});

const streetIntelFlow = ai.defineFlow(
  {
    name: 'streetIntelFlow',
    inputSchema: StreetIntelInputSchema,
    outputSchema: StreetIntelOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
