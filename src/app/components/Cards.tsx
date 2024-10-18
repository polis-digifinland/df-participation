'use client'

// /api/v3/votes

import { useState } from 'react';
import Thumb from '../icons/Thumb';
import Thumb_hover from '../icons/Thumb_hover';

interface CardProps {
  tid: string;
  txt: string;
}

export default function Cards({ tid, txt }: CardProps) {
  const [hoveredThumb, setHoveredThumb] = useState<null | 'agree' | 'disagree'>(null);
  const [vote, setVote] = useState<null | number>(null);

  const externalApiUrl = `${process.env.EXTERNAL_API_BASE_URL}/api/v3/votes`;

  const handleVote = async (voteValue: number) => {
    try {
      const response = await fetch(externalApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tid,
          conversation_id: 'your_conversation_id', // Replace with actual conversation_id
          vote: voteValue,
          starred: false, // Example value, replace as needed
          weight: 0, // Example value, replace as needed
          xid: 'your_xid', // Replace with actual xid
          lang: 'en', // Example value, replace as needed
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }

      const data = await response.json();
      console.log('Vote submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  return (
    <>
      <div id="cards" className="text-primary font-secondary min-w-full mt-5 p-8 pt-12 bg-theme-surface-card-1 rounded-[40px] flex-col justify-center items-center gap-4 inline-flex">
        <div className="text-xl">{txt}</div>
        <div className="w-full flex flex-wrap justify-around font-semibold">
          <div
            className="flex flex-col items-center gap-3.5"
            onMouseEnter={() => setHoveredThumb('disagree')}
            onMouseLeave={() => setHoveredThumb(null)}
            onClick={() => {
              setVote(-1);
              handleVote(-1);
            }}
          >
            {hoveredThumb === 'disagree' ? <Thumb_hover rotate={180} /> : <Thumb rotate={180} />}
            <p>Eri mieltä</p>
          </div>
          <div
            className="flex flex-col items-center gap-3.5"
            onMouseEnter={() => setHoveredThumb('agree')}
            onMouseLeave={() => setHoveredThumb(null)}
            onClick={() => {
              setVote(1);
              handleVote(1);
            }}
          >
            {hoveredThumb === 'agree' ? <Thumb_hover /> : <Thumb />}
            <p>Samaa mieltä</p>
          </div>
          
        </div>
        {vote !== null && <p>Your vote: {vote === 1 ? 'Agree' : 'Disagree'}</p>}
      </div>
    </>
  );
}