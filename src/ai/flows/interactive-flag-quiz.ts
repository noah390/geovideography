'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating interactive flag quiz questions.
 *
 * - generateFlagQuizQuestion - A function that generates a single flag quiz question.
 * - GenerateFlagQuizQuestionInput - The input type for the generateFlagQuizQuestion function.
 * - GenerateFlagQuizQuestionOutput - The return type for the generateFlagQuizQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schemas
const CountrySchema = z.object({
  name: z.string().describe('The name of the country.'),
  flagDataUri: z
    .string()
    .describe(
      "A data URI of the country's flag image, including a MIME type and Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

const QuizOptionInternalSchema = z.object({
  id: z.string().describe('A unique identifier for the option, typically the country name.'),
  text: z.string().describe('The text to display for this option.'),
  flagDataUri: z
    .string()
    .optional()
    .describe(
      "Optional: Data URI of the flag image if the option itself is a flag. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

const GenerateFlagQuizQuestionInputSchema = z.object({
  quizType: z
    .enum(['flagToCountry', 'countryToFlag'])
    .describe(
      'The type of quiz question to generate: "flagToCountry" (identify country from flag) or "countryToFlag" (identify flag from country name).'
    ),
  correctCountry: CountrySchema.describe('The country that is the correct answer for the quiz question.'),
  distractorCountries: z
    .array(CountrySchema)
    .describe('A list of other countries to be used as incorrect options/distractors for the quiz.'),
});
export type GenerateFlagQuizQuestionInput = z.infer<
  typeof GenerateFlagQuizQuestionInputSchema
>;

// Output Schema
const GenerateFlagQuizQuestionOutputSchema = z.object({
  questionText: z.string().describe('The generated quiz question text.'),
  promptContent: z
    .array(z.union([z.string(), z.object({ media: z.object({ url: z.string() }) })]))
    .describe(
      'The primary content for the question display, which might include the flag image as a media part.'
    ),
  options: z
    .array(QuizOptionInternalSchema)
    .describe('A shuffled list of possible answers for the quiz question (including the correct one).'),
  correctOptionId: z.string().describe('The id of the correct answer among the options.'),
});
export type GenerateFlagQuizQuestionOutput = z.infer<
  typeof GenerateFlagQuizQuestionOutputSchema
>;

// Wrapper function
export async function generateFlagQuizQuestion(
  input: GenerateFlagQuizQuestionInput
): Promise<GenerateFlagQuizQuestionOutput> {
  return generateFlagQuizQuestionFlow(input);
}

// Prompt definition
const flagQuizQuestionGeneratorPrompt = ai.definePrompt({
  name: 'flagQuizQuestionGeneratorPrompt',
  input: {
    schema: z.object({
      quizType: z.enum(['flagToCountry', 'countryToFlag']),
      correctCountry: CountrySchema,
      options: z.array(QuizOptionInternalSchema),
    }),
  },
  output: {
    schema: z.object({
      questionText: z.string(),
      promptContent: z.array(z.union([z.string(), z.object({ media: z.object({ url: z.string() }) })])),
      correctOptionId: z.string(),
    }),
  },
  prompt: `You are an expert at generating engaging and educational flag quiz questions.\nYou will be provided with a quiz type, the correct country information, and a list of shuffled quiz options.\nYour task is to generate the quiz question text, identify the content to display (flag image or country name), and confirm the ID of the correct answer from the provided options.\n\nFollow these rules based on the 'quizType':\n\nIf 'quizType' is 'flagToCountry':\n- The 'questionText' should ask the user to identify the country from the provided flag image.\n- The 'promptContent' should be an array containing a single media object for the 'correctCountry.flagDataUri', for example: [{"media": {"url": "data:image/png;base64,..."}}].\n- The 'correctOptionId' must be the 'id' of the 'correctCountry' within the 'options' list.\n\nIf 'quizType' is 'countryToFlag':\n- The 'questionText' should ask the user to identify the flag for the provided country name.\n- The 'promptContent' should be an array containing a single string which is the 'correctCountry.name', for example: ["United States"].\n- The 'correctOptionId' must be the 'id' of the 'correctCountry' within the 'options' list.\n\nEnsure the 'correctOptionId' precisely matches one of the 'id' values in the 'options' array.\n\nHere is the input data:\nQuiz Type: {{{quizType}}}\nCorrect Country Name: {{{correctCountry.name}}}\nCorrect Country Flag: {{media url=correctCountry.flagDataUri}}\nAvailable Options (IDs and Texts):\n{{#each options}}\n- ID: {{{id}}}, Text: {{{text}}}\n{{#if flagDataUri}} (Flag: {{media url=flagDataUri}}) {{/if}}\n{{/each}}\n\nGenerate the JSON output according to the schema for 'questionText', 'promptContent', and 'correctOptionId'. Do not include 'options' in the LLM's direct output, as they are pre-generated by the flow.`,
});

// Flow definition
const generateFlagQuizQuestionFlow = ai.defineFlow(
  {
    name: 'generateFlagQuizQuestionFlow',
    inputSchema: GenerateFlagQuizQuestionInputSchema,
    outputSchema: GenerateFlagQuizQuestionOutputSchema,
  },
  async (input) => {
    // Combine correct and distractor countries
    const allCountriesForOptions = [input.correctCountry, ...input.distractorCountries];

    // Shuffle options to ensure random order in UI. This is done outside the prompt.
    const shuffledCountries = allCountriesForOptions
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    // Map to QuizOptionInternalSchema based on quizType
    const mappedOptions = shuffledCountries.map((country) => {
      if (input.quizType === 'flagToCountry') {
        return {
          id: country.name,
          text: country.name,
          // flagDataUri is not included for 'flagToCountry' options as they are country names.
        };
      } else { // countryToFlag
        return {
          id: country.name,
          text: country.name, // text could be country name, even if UI shows flag
          flagDataUri: country.flagDataUri,
        };
      }
    });

    const { output } = await flagQuizQuestionGeneratorPrompt({
      quizType: input.quizType,
      correctCountry: input.correctCountry,
      options: mappedOptions, // Pass the pre-generated options to the prompt
    });

    if (!output) {
      throw new Error('Failed to generate quiz question from prompt.');
    }

    // Combine LLM output with pre-generated options
    return {
      questionText: output.questionText,
      promptContent: output.promptContent,
      options: mappedOptions, // Attach the full, pre-generated options array
      correctOptionId: output.correctOptionId,
    };
  }
);
