'use client';

import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable'
import { useEffect } from 'react';

interface CookieProps {
    conversation_id: string;
    locale: string;
}

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then(res => {
    if (!res.ok) {
        throw new Error('Failed to fetch');
    }
    return res.json();
});

export default function Cookies({ conversation_id, locale }: CookieProps) {
    const apiUrl = process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL;
    if (!apiUrl) {
        throw new Error('NEXT_PUBLIC_EXTERNAL_API_BASE_URL is not defined');
    }

    const { data: cookieTestData, error: cookieTestError } = useSWRImmutable('/api/ct', fetcher);
    const { data: participationData, error: participationError } = useSWR(
        `${apiUrl}/api/v3/participationInit?conversation_id=${conversation_id}&pid=mypid&lang=${locale}`,
        fetcher,
        {
            //refreshInterval: 60000, // Refresh every 60 seconds
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOnReconnect: true
        }
    );

    // There is no need to render anything, just log the data
    // Also the order of calling is not important, so we can use two useEffects, because the real user is generated at first interaction
    useEffect(() => {
        if (cookieTestError) {
            console.error('Error fetching Cookie test:', cookieTestError);
        } else if (cookieTestData) {
            console.log('Fetched Cookie test:', cookieTestData);
        }
    }, [cookieTestData, cookieTestError]);

    useEffect(() => {
        if (participationError) {
            console.error('Error fetching participation data:', participationError);
        } else if (participationData) {
            console.log('Fetched participation data:', participationData);
        }
    }, [participationData, participationError]);

    return (<></>);
}

