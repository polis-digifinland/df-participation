'use client'

import { useState, useEffect } from 'react';
import Thumb from '../icons/Thumb';
import Pass from '../icons/Pass';
//import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable'

interface VotingProps {
  failed_to_load: boolean;
  is_active: boolean;
  tid: number;
  pid: number;
  txt: string;
  conversation_id: string;
  InitialTotal: number;
  remaining: number;
  //participationData: object;
}

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then(res => {
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
});

export default function Voting({ failed_to_load, is_active, tid: initialTid, pid, txt: initialTxt, conversation_id, InitialTotal, remaining }: VotingProps) {
  const InitialCurrent = InitialTotal - remaining + 1
  const progresspercentage = InitialCurrent / InitialTotal * 100;
  const initialCompletedStatus = false;

  const [hoveredThumb, setHoveredThumb] = useState<null | 'agree' | 'disagree' | 'pass'>(null);
  //const [PreviousVoteValue, setVote] = useState<null | number>(null);
  const [txt, setTxt] = useState(initialTxt);
  const [tid, setTid] = useState(initialTid);
  const [total, setTotal] = useState(InitialTotal);
  const [current, setCurrent] = useState(InitialCurrent);
  const [progress, setProgress] = useState(progresspercentage);
  const [completedStatus, setCompleted] = useState<boolean>(initialCompletedStatus);

  const firstBarWidth = Math.min(progress * 2, 100);
  const secondBarWidth = Math.max(0, Math.min((progress - 50) * 2, 100));

  const externalApiUrl = `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/api/v3/votes`;

  const { data: participationData, error: participationError } = useSWRImmutable(
    `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/api/v3/participationInit?conversation_id=${conversation_id}&pid=mypid&lang=acceptLang`,
    fetcher
);

  useEffect(() => {
    if (participationError) {
      console.error('Error fetching vote data:', participationError);
    } else if (participationData) {
      setTxt(participationData.nextComment.txt || 'Olet äänestänyt kaikkia väitteitä.');
      if (!participationData.nextComment.txt){setCompleted(true);}
      setTid(participationData.nextComment.tid);
      setTotal(participationData.nextComment.total || 0);
      setCurrent(participationData.nextComment.total - participationData.nextComment.remaining || 0);
      setProgress((participationData.nextComment.total - participationData.nextComment.remaining) / participationData.nextComment.total * 100);
    }
  }, [participationData, participationError]);

  const handleVote = async (voteValue: number) => {
    try {
      const response = await fetch(externalApiUrl, {
        method: 'POST',
        credentials: 'include', // This will include cookies in the request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tid, // topic id
          conversation_id: conversation_id, // the id from URL
          vote: voteValue,
          //starred: false, // Example value, replace as needed
          //weight: 0, // Example value, replace as needed
          //xid: 'your_xid', // Replace with actual xid
          pid: "mypid", // participant id, This seems not to be used but still needed. Check why here "mypid" is used instead of the real value.
          lang: 'fi', // Example value, replace as needed
          agid: 1, // Enable Auto Gen user ID
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit vote with pid:tid ${pid}:${tid}`);
      }

      const data = await response.json();

      if (data.nextComment) {
        setTxt(data.nextComment.txt);
        setTid(data.nextComment.tid);
        setTotal(data.nextComment.total);
        setCurrent(data.nextComment.total - data.nextComment.remaining);
        setProgress((data.nextComment.total - data.nextComment.remaining) / data.nextComment.total * 100);
        console.log(`Vote by ${data.currentPid} submitted successfully:`, data);
      } else if (data.nextComment == null) {
        setTxt('Olet äänestänyt kaikkia väitteitä.');
        setCurrent(total);
        setProgress(100);
        setCompleted(true);
        console.log('No more comments to vote on');
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };



  if (failed_to_load) {
    return (<></>) // If the data failed to load, don't render anything here, Conversation component will handle the error
}else if (!is_active) {
    return (
      <>
        <h1 className="text-primary text-3xl font-primary font-bold select-none">Keskustelu on suljettu.</h1>
      </>
    )
}else{
  return (
    <>
      <div id="ProgressBar" className="flex text-primary font-primary mt-md select-none">
        <div className="bg-theme-surface-card-1 my-auto w-full h-1.5 rounded">
          <div
            className="bg-theme-surface-brand h-1.5 rounded duration-200"
            style={{ width: `${firstBarWidth}%` }}
          />
        </div>
        <div className="text-xl mx-5 w-[42px] text-center font-bold leading-tight">
          {current}/{total}
        </div>
        <div className="bg-theme-surface-card-1 my-auto w-full h-1.5 rounded">
          <div
            className="bg-theme-surface-brand h-1.5 rounded duration-200"
            style={{ width: `${secondBarWidth}%` }}
          />
        </div>
      </div>

      <div id="cards" className="text-primary font-secondary select-none min-w-full mt-sm px-lg bg-theme-surface-card-1 rounded-[40px] flex-col justify-center items-center inline-flex">
        <div className="text-xl mt-lg my-auto min-h-[150px] flex justify-center items-center">{txt}</div>
        {!completedStatus && (
        <div className="w-full my-md flex flex-wrap justify-around">
            <button
            className="flex flex-col items-center text-center gap-3.5 max-w-[33%]"
            onMouseEnter={() => setHoveredThumb('disagree')}
            onMouseLeave={() => setHoveredThumb(null)}
            onClick={() => {
              //setVote(1);
              handleVote(1);
              setHoveredThumb(null);
            }}
            >
            <Thumb fg="var(--surface-brand)" bg="var(--surface-primary)" rotate={180} />
            <p className={hoveredThumb === 'disagree' ? 'font-semibold' : 'font-normal'}>Eri mieltä</p>
            </button>
          <button
            className="flex flex-col items-center text-center gap-3.5 max-w-[33%]"
            onMouseEnter={() => setHoveredThumb('pass')}
            onMouseLeave={() => setHoveredThumb(null)}
            onClick={() => {
              //setVote(0);
              handleVote(0);
              setHoveredThumb(null);
            }}
          >
            <Pass fg="var(--surface-brand)" bg="var(--surface-primary)" />
            <p className={hoveredThumb === 'pass' ? 'font-semibold' : 'font-normal'}>
              Ohita/<span className="block sm:hidden">neutraali</span><span className="hidden sm:inline">neutraali</span>
            </p>
          </button>
          <button
            className="flex flex-col items-center text-center gap-3.5 max-w-[33%]"
            onMouseEnter={() => setHoveredThumb('agree')}
            onMouseLeave={() => setHoveredThumb(null)}
            onClick={() => {
              //setVote(-1);
              handleVote(-1);
              setHoveredThumb(null);
            }}
          >
            <Thumb fg="var(--surface-brand)" bg="var(--surface-primary)" />
            <p className={hoveredThumb === 'agree' ? 'font-semibold' : 'font-normal'}>
            Samaa <span className="block sm:hidden">mieltä</span><span className="hidden sm:inline">mieltä</span>
              </p>
          </button>
        </div>
      )}
      </div>
    </>

  )
}
}