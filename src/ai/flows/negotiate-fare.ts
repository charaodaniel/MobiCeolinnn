'use server';

/**
 * @fileOverview Fare negotiation flow for destinations in rural areas.
 *
 * - negotiateFare - A function that handles the fare negotiation process.
 * - NegotiateFareInput - The input type for the negotiateFare function.
 * - NegotiateFareOutput - The return type for the negotiateFare function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NegotiateFareInputSchema = z.object({
  distance: z.number().describe('The distance to the destination in kilometers.'),
  initialFare: z.number().describe('The initial fare proposed by the system.'),
  passengerOffer: z.number().optional().describe('The passenger counter offer, if any.'),
  destinationType: z.enum(['rural', 'urban']).describe('The type of destination: rural or urban.'),
  passengerRating: z.number().optional().describe('The passenger rating from 1 to 5 stars, if available.'),
  driverRating: z.number().optional().describe('The driver rating from 1 to 5 stars, if available.'),
});
export type NegotiateFareInput = z.infer<typeof NegotiateFareInputSchema>;

const NegotiateFareOutputSchema = z.object({
  negotiatedFare: z.number().describe('The final negotiated fare.'),
  reasoning: z.string().describe('The AI reasoning behind the negotiated fare.'),
});
export type NegotiateFareOutput = z.infer<typeof NegotiateFareOutputSchema>;

export async function negotiateFare(input: NegotiateFareInput): Promise<NegotiateFareOutput> {
  return negotiateFareFlow(input);
}

const prompt = ai.definePrompt({
  name: 'negotiateFarePrompt',
  input: {schema: NegotiateFareInputSchema},
  output: {schema: NegotiateFareOutputSchema},
  prompt: `You are a fare negotiation expert, helping to determine a fair fare for rides, especially to rural destinations.

  The ride distance is {{distance}} km and the initial fare proposed is {{initialFare}}.
  The destination type is {{destinationType}}.

  Here's some additional information that you may find helpful:
  {{#if passengerOffer}}The passenger has offered a counter offer of {{passengerOffer}}.{{/if}}
  {{#if passengerRating}}The passenger has a rating of {{passengerRating}} stars.{{/if}}
  {{#if driverRating}}The driver has a rating of {{driverRating}} stars.{{/if}}

  Consider all factors to determine a fair negotiated fare. Explain your reasoning and provide the final negotiated fare.
  Be brief and concise with your response.

  Ensure that the ` + '`negotiatedFare`' + ` is a number and the ` + '`reasoning`' + ` is a string.
`,
});

const negotiateFareFlow = ai.defineFlow(
  {
    name: 'negotiateFareFlow',
    inputSchema: NegotiateFareInputSchema,
    outputSchema: NegotiateFareOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
