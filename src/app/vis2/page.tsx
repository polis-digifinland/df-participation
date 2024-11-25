"use client"

import useSWR from 'swr';
import Root from "./vis2";
import { Suspense } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

function Visualization() {
  const { data: pcaData, error: pcaError, isLoading: pcaLoading } = useSWR('https://polis.local/api/v3/math/pca2?conversation_id=7cyducbwmr&cacheBust=617755623', fetcher);
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