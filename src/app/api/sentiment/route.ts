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

  

  // const data = await req.formData();
	// const file = data.get('file');

  // if (!file || typeof file === 'string')
  // return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  // const buffer = Buffer.from(await file.arrayBuffer())

  // const url = `https://api.cloudflare.com/client/v4/accounts/${apiKey}/ai/run/@cf/openai/whisper`;
  // const response = await fetch(url, {
  //   method: 'POST',
  //   headers,
  //   body: buffer
  // })

  const result = await response.json();
  return NextResponse.json(result);
}
