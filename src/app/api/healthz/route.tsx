import { NextResponse } from 'next/server';

// Handle GET request
export async function GET() {
  return NextResponse.json({ status: 'ok' }, { status: 200 });
}

