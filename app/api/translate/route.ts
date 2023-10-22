import { NextRequest, NextResponse } from 'next/server';
import { getGatewayUrl } from '../../../lib/utils';

// https://developers.cloudflare.com/workers-ai/models/translation/

export async function POST(req: NextRequest) {
	const { CLOUDFLARE_AUTH_TOKEN: authToken } = process.env;

	if (!authToken)
		return NextResponse.json(
			{ error: 'No Cloudflare auth token provided' },
			{ status: 500 }
		);

	const headers = {
		'Authorization': `Bearer ${authToken}`,
		'Content-Type': 'application/json',
	};

	const data = await req.formData();
	const text = data.get('text');
  const target_lang = data.get('target_lang')

	if (!text || typeof text !== 'string')
		return NextResponse.json(
			{ error: 'No transcript provided' },
			{ status: 400 }
		);

  if (!target_lang || typeof target_lang !== 'string')
    return NextResponse.json(
      { error: 'No target language provided' },
      { status: 400 }
    );

	const url = getGatewayUrl('translation');

	const response = await fetch(url, {
		method: 'POST',
		headers,
		body: JSON.stringify({ text, target_lang }),
	});

	const result = await response.json();
	return NextResponse.json(result);
}
