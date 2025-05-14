import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const apiKey = process.env.ELASTICEMAIL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing Elastic Email API key' }, { status: 500 });
  }

  // Elastic Email API endpoint
  const url = 'https://api.elasticemail.com/v4/contacts';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ElasticEmail-ApiKey': apiKey,
      },
      body: JSON.stringify({
        email,
        consentToTrack: 'Yes',
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error: error.message || 'Elastic Email error' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Unknown error' }, { status: 500 });
  }
}
