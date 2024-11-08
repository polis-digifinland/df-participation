import { NextResponse } from 'next/server';

export async function GET() {
  const controller = new AbortController();
  const timeoutDuration = 10000; // Set timeout to 10000ms (10 seconds)
  const timeoutId = setTimeout(() => {
    console.log('Fetch request timed out');
    controller.abort();
  }, timeoutDuration);

  try {
    //console.log(`Starting fetch with timeout set to ${timeoutDuration}ms`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/api/v3/testConnection`, {
      signal: controller.signal,
      cache: 'no-store', // Disable caching
    });
    clearTimeout(timeoutId); // Clear the timeout if the request completes in time

    if (!res.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await res.json();
    return NextResponse.json({ status: 'ok', data }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Fetch error: ${errorMessage}`);
    return NextResponse.json({ status: 'error', message: errorMessage }, { status: 500 });
  }
}

