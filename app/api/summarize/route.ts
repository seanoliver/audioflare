
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  console.log('summarize > POST > req', req)
  const transcript = await req.text();
  console.log('summarize > POST > transcript', transcript)

  if (!transcript || typeof transcript !== 'string')
    return new Response('No transcript provided', { status: 400 });

  const prompt = `Please summarize the general ideas in this transcription as if you are sick and tired of having to do these summaries and you just wish people would stop asking you to do it: ${transcript} \n\nSummary:`
  const promptMessage: ChatCompletionMessageParam = {
    role: 'system',
    content: prompt,
  }
  console.log('summarize > POST > promptMessage', promptMessage)

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: [promptMessage],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}