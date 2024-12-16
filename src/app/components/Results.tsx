'use client';

import { useState, useEffect } from 'react';
import User from '../icons/User';
import Chevron from '../icons/Chevron';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then(res => {
  if (!res.ok) {
      throw new Error('Failed to fetch');
  }
  return res.json();
});

interface ResultsProps {
  is_active: boolean;
  vis_type: boolean;
  conversation_id: string;
}

export default function Results({ is_active, vis_type, conversation_id }: ResultsProps) {
  const [conversationActive, setConversationActive] = useState<boolean>(is_active);
  const [visualizationActive, setVisualizationActive] = useState<boolean>(vis_type);
  const { data: participationData, error: participationError } = useSWR(
    `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/api/v3/participationInit?conversation_id=${conversation_id}&pid=mypid&lang=acceptLang`,
    fetcher
  );
  useEffect(() => {
    if (participationError) {
      console.error('Error fetching data:', participationError);
    } else if (participationData) {
      setConversationActive(participationData.conversation.is_active);
      setVisualizationActive(participationData.conversation.vis_type);
    }
  }, [participationData, participationError]);





  const { data: commentsData, error: commentsError } = useSWR(
    `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/api/v3/comments?conversation_id=${conversation_id}&translate=true&moderation=true&mod_gt=0&include_voting_patterns=true`,
    fetcher
  );
  interface Comment {
    tid: number;
    txt: string;
  }
  const [commentsMap, setCommentsMap] = useState<Map<number, Comment>>(new Map());
  useEffect(() => {
    if (commentsError) {
      console.error('Error fetching data:', commentsError);
    } else if (commentsData) {
      const newCommentsMap = new Map();
      commentsData.forEach((comment: Comment) => {
        newCommentsMap.set(comment.tid, comment);
      });
      setCommentsMap(newCommentsMap);
      console.log('commentsData:', commentsData);
      console.log('commentsMap:', newCommentsMap);
    }
  }, [commentsData, commentsError]);






  const { data: votesData, error: votesError } = useSWR(
    `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/api/v3/votes?conversation_id=${conversation_id}&pid=mypid`,
    fetcher
  );
  interface Vote {
    tid: number;
    vote: number;
  }

  const [votesMap, setVotesMap] = useState<Map<number, Vote>>(new Map());
  useEffect(() => {
    if (votesError) {
      console.error('Error fetching data:', votesError);
    } else if (votesData) {
      const newVotesMap = new Map();
      votesData.forEach((vote: Vote) => {
      if (commentsMap.has(vote.tid)) {
        newVotesMap.set(vote.tid, vote);
      } else {
        //console.log('Vote with tid', vote.tid, 'has no corresponding comment');
      }
      });
      setVotesMap(newVotesMap);
      console.log('votesData:', votesData);
      console.log('votesMap:', newVotesMap);
    }
  }, [votesData, votesError, commentsMap]);
















  const [currentVoteIndex, setCurrentVoteIndex] = useState<number>(0);
  const handleVoteIndexChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < (votesMap ? votesMap.size : 0)) {
      setCurrentVoteIndex(newIndex);
    }
  };

//const [tid, setTid] = useState<string>('');
const [comment, setComment] = useState<string>('');
const [vote, setVote] = useState<string>('');
const [voteFor, setVoteFor] = useState<number>(0);
const [voteAgainst, setVoteAgainst] = useState<number>(0);
const [voteSkip, setVoteSkip] = useState<number>(0);
const [voteTotal, setVoteTotal] = useState<number>(0);

useEffect(() => {
  //const tid = votesMap && votesMap.get(currentVoteIndex) ? votesMap.get(currentVoteIndex)?.tid : undefined;
  const tid = Array.from(votesMap.values())[currentVoteIndex]?.tid;
  const comment = tid !== undefined ? commentsMap.get(tid)?.txt : '';
  const voteValue = tid !== undefined ? votesMap.get(tid)?.vote : undefined;
  let vote = "";

  if (voteValue === 1) {
    vote = "Eri mieltä";
  } else if (voteValue === -1) {
    vote = "Samaa mieltä";
  } else if (voteValue === 0) {
    vote = "Ohita";
  }

  //setTid(tid || ''); count
  setVoteFor(tid !== undefined && commentsData && commentsData[currentVoteIndex] ? commentsData[currentVoteIndex].agree_count : 0);
  setVoteAgainst(tid !== undefined && commentsData && commentsData[currentVoteIndex] ? commentsData[currentVoteIndex].disagree_count : 0);
  setVoteSkip(tid !== undefined && commentsData && commentsData[currentVoteIndex] ? commentsData[currentVoteIndex].pass_count : 0);
  setVoteTotal(tid !== undefined && commentsData && commentsData[currentVoteIndex] ? commentsData[currentVoteIndex].count : 0);
  setComment(comment || '');
  setVote(vote);

  console.log('voteFor:', voteFor);
  console.log('voteAgainst:', voteAgainst);
  console.log('voteSkip:', voteSkip);
  console.log('voteTotal:', voteTotal);
  console.log('currentVoteIndex', currentVoteIndex);
  console.log('votesData.length', votesData ? votesData.length : 0);
  console.log('tid:', tid);
  console.log('comment:', comment);
  console.log('vote:', vote);
}, [currentVoteIndex, commentsMap, votesData, votesMap, commentsData, voteAgainst, voteFor, voteSkip, voteTotal]);



  if (!conversationActive || !visualizationActive) {
    return <></>; // There is no need to render anything if the conversation is not active or the visualization is not active
  } else {
    return (
      <>
        <div
          id="Results"
          className="text-primary font-primary mt-xl flex flex-col gap-[23px] select-none"
        >
          <div className="font-bold text-3xl">Tutustu tuloksiin</div>
          <div className="font-bold min-h-[130px] flex items-center justify-start">
            <p>&quot;{comment}&quot;</p>
          </div>
          <div className="flex">
            <User /> Vastasit: {vote}
          </div>

          <div id='pagination' className="flex flex-row justify-end items-center gap-sm">
            <button className='disabled:opacity-50' onClick={() => handleVoteIndexChange(currentVoteIndex - 1)} disabled={currentVoteIndex === 0}><Chevron /></button>
            <div className='font-bold bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center'>{currentVoteIndex + 1}</div>
            <div className='font-light'>{currentVoteIndex + 2}</div>
            <button className='disabled:opacity-50' onClick={() => handleVoteIndexChange(currentVoteIndex + 1)} disabled={(currentVoteIndex +1 ) === (votesMap ? votesMap.size : 0)}><Chevron rotate={180}/></button>
          </div>






          <div className="h-[218px] px-4 justify-start items-end gap-6 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-center gap-1.5 inline-flex">
              <div className="w-6 h-6 justify-center items-center inline-flex">
              {vote === "Samaa mieltä" && <User />}
              </div>
                <div className="self-stretch px-5 py-3 bg-[#f1eef9] rounded-tl-[10px] rounded-tr-[10px] justify-center items-start gap-2.5 inline-flex duration-200" style={{ height: `${voteTotal > 0 ? ((voteFor / voteTotal) * 188) : 0}px` }}>
                <div className="text-center text-[#003f71] text-base font-normal font-['TT Hoves'] leading-[20.88px]">
                  {voteTotal > 0 ? ((voteFor / voteTotal) * 100).toFixed(2) : 0} %
                </div>
                </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-center inline-flex">
            <div className="w-6 h-6 justify-center items-center inline-flex">
              {vote === "Eri mieltä" && <User />}
              </div>
              <div className="self-stretch h-[188px] px-5 py-3 bg-[#e6f3f9] rounded-tl-[10px] rounded-tr-[10px] justify-center items-start gap-2.5 inline-flex duration-200" style={{ height: `${voteTotal > 0 ? ((voteAgainst / voteTotal) * 188) : 0}px` }}>
                <div className="text-center text-[#003f71] text-base font-normal font-['TT Hoves'] leading-[20.88px]">
                {voteTotal > 0 ? ((voteAgainst / voteTotal) * 100).toFixed(2) : 0} %
                </div>
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-center inline-flex">
            <div className="w-6 h-6 justify-center items-center inline-flex">
              {vote === "Ohita" && <User />}
              </div>
              <div className="self-stretch h-[188px] px-5 py-3 bg-[#e6f3f9] rounded-tl-[10px] rounded-tr-[10px] justify-center items-start gap-2.5 inline-flex duration-200" style={{ height: `${voteTotal > 0 ? ((voteSkip / voteTotal) * 188) : 0}px` }}>
                <div className="text-center text-[#003f71] text-base font-normal font-['TT Hoves'] leading-[20.88px]">
                {voteTotal > 0 ? ((voteSkip / voteTotal) * 100).toFixed(2) : 0} %
                </div>
              </div>
            </div>
          </div>

          <div className="h-[38px] px-4 justify-start items-start gap-6 inline-flex">
            <div className="grow shrink basis-0 text-center text-[#003f71] text-base font-light font-['TT Hoves'] leading-tight">
              Samaa mieltä: {voteFor}
            </div>
            <div className="grow shrink basis-0 text-center text-[#003f71] text-base font-light font-['TT Hoves'] leading-tight">
              Eri mieltä: {voteAgainst}
            </div>
            <div className="grow shrink basis-0 text-center text-[#003f71] text-base font-light font-['TT Hoves'] leading-tight">
              Ohita: {voteSkip}
            </div>
          </div>
        </div>
      </>
    );
  }
}
