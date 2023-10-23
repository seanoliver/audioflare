import { NextRequest, NextResponse } from 'next/server';
import { getGatewayUrl } from '../../../lib/utils';

export async function POST(req: NextRequest) {
  const startTime = process.hrtime.bigint();
	const { CLOUDFLARE_AUTH_TOKEN: authToken } = process.env;

	if (!authToken)
		return NextResponse.json(
			{ error: 'No Cloudflare auth token provided' },
			{ status: 500 }
		);

	const headers = {
		'Authorization': `Bearer ${authToken}`,
		'Content-Type': 'application/octet-stream',
	};

	const data = await req.formData();
	const file = data.get('file');

	if (!file || typeof file === 'string')
		return NextResponse.json({ error: 'No file provided' }, { status: 400 });

	const buffer = Buffer.from(await file.arrayBuffer());

	const url = getGatewayUrl('speechRecognition');
	const response = await fetch(url, {
		method: 'POST',
		headers,
		body: buffer,
	});
	const result = await response.json();
  const endTime = process.hrtime.bigint();
  const timeTaken = Number(endTime - startTime) / 1e6;
  result.timeTaken = timeTaken;
	return NextResponse.json(result);
}
