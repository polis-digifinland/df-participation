"use client"

import useSWR from 'swr';
import Root from "./vis2.js";
import { Suspense } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

function Visualization() {
  //let randomNumber = (Math.random() * 1e9 >> 0);
  const conversation_id = '7cyducbwmr';
  const { data: pcaData, error: pcaError, isLoading: pcaLoading } = useSWR(
    //`https://polis.local/api/v3/math/pca2?conversation_id=${conversation_id}&cacheBust=${randomNumber}`,
    `https://polis.local/api/v3/math/pca2?conversation_id=${conversation_id}`,
    fetcher,
    {
      refreshInterval: 5000, // Refresh every 5 seconds
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true
  }
  );
  const { data: commentsData, error: commentsError, isLoading: commentsLoading } = useSWR('https://polis.local/api/v3/comments?conversation_id=7cyducbwmr&include_social=true&translate=true&lang=fi', fetcher);

  if (pcaError || commentsError) return <div>Failed to load</div>;
  if (pcaLoading || commentsLoading) return null;

  return (
    <div id="visualization_parent_div">
      <Root math_main={pcaData} comments={commentsData} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div id="visualization_parent_div">Ladataan...</div>}>
      <Visualization />
    </Suspense>
  );
}