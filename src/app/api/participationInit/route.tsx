'use server'

import { NextResponse } from 'next/server'

interface ExternalApiResponse {
  externalApiResponse: object
}

export async function GET(request: Request): Promise<Response> {
  try {
    // 1. Extract relevant data for the external API call
    const url = new URL(request.url);
    const conversation_id = url.searchParams.get('conversation_id'); 

    if (!conversation_id) {
      throw new Error('Missing conversation_id parameter');
    }

    // 2. Construct the URL for the external API request
    const externalApiUrl = `${process.env.EXTERNAL_API_BASE_URL}/api/v3/participationInit?conversation_id=${conversation_id}`;
    console.log(`External API URL: ${externalApiUrl}`);

    // 3. Make the external API request
    if (process.env.NODE_ENV === 'development') {
      //process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disable SSL certificate validation for local development
    }

    const response = await fetch(externalApiUrl, {
      method: 'GET',
      headers: {'Content-Type': 'application/json',
                //'Origin': 'https://beta.polis-test-gke.digifinland.dev',
      },
    });

    // 4. Handle the response from the external API
    if (!response.ok) {
      const errorText = await response.text(); // Get error message if available
      throw new Error(`External API request failed: ${response.status} - ${errorText}`);
    }
    const externalApiResponse: ExternalApiResponse = await response.json();

    // 5. Process the data and return a response with revalidation headers
    const revalidateTime = parseInt(process.env.REVALIDATE_TIME || '60', 10); // Time in seconds for revalidation
    const nextResponse = NextResponse.json(
      { externalApiResponse },
      { status: 200 }
    );
    if (process.env.NODE_ENV === 'development') {
      console.log(externalApiResponse);
    }
    nextResponse.headers.set('Cache-Control', `s-maxage=${revalidateTime}, stale-while-revalidate`);
    // Log the Cache-Control header for debugging purposes
    console.log('Cache-Control header set to:', nextResponse.headers.get('Cache-Control'));

    return nextResponse;

  } catch (error) {
    console.error("Fetch error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}