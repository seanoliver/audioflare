import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const apiKey = process.env.CLOUDFLARE_REST_API_KEY;
  if (!apiKey)
    return NextResponse.json({ error: 'No Cloudflare API key provided' }, { status: 500 });

  const authToken = process.env.CLOUDFLARE_AUTH_TOKEN;
  if (!authToken)
    return NextResponse.json({ error: 'No Cloudflare auth token provided' }, { status: 500 });

  const headers = {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json'
  };

  const data = await req.formData();
	const text = data.get('text');

  if (!text || typeof text !== 'string')
    return NextResponse.json({ error: 'No transcript provided' }, { status: 400 });

  const prompt = `Briefly summarize the key takeaways from this transcript without directly repeating any of its content verbatim. Please only provide the summary without any additional information.\n\nTranscript: ${text}\n\nSummary:`;

  const url = `https://api.cloudflare.com/client/v4/accounts/${apiKey}/ai/run/@cf/meta/llama-2-7b-chat-int8`;
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ prompt })
  })

  const result = await response.json();
  return NextResponse.json(result);
}
