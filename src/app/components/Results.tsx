'use client';

import { useState, useEffect } from 'react';
import User from '../icons/User';
import Chevron from '../icons/Chevron';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { getApiBaseUrl } from '@/lib/apiConfig'

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
  locale: string;
}

export default function Results({ is_active, vis_type, conversation_id, locale }: ResultsProps) {

  const { t } = useTranslation();
  const baseUrl = getApiBaseUrl();

  const [conversationActive, setConversationActive] = useState<boolean>(is_active);
  const [visualizationActive, setVisualizationActive] = useState<boolean>(vis_type);
  const { data: participationData, error: participationError } = useSWR(
    `${baseUrl}/api/v3/participationInit?conversation_id=${conversation_id}&pid=mypid&lang=${locale}`,
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
    `${baseUrl}/api/v3/comments?conversation_id=${conversation_id}&lang=${locale}&translate=true&moderation=true&mod_gt=0&include_voting_patterns=true`,
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
  );
  interface Comment {
    tid: number;
    txt: string;
    lang: string;
    agree_count: number;
    disagree_count: number;
    pass_count: number;
    count: number;
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
    `${baseUrl}/api/v3/votes?conversation_id=${conversation_id}&pid=mypid`,
    fetcher,
    {
      refreshInterval: 10000, // Refresh every 10 seconds
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
  );
  interface Vote {
    tid: number;
    vote: number;
    modified: number;
  }

  const [votesMap, setVotesMap] = useState<Map<number, Vote>>(new Map());
  useEffect(() => {
    if (votesError) {
      console.error('Error fetching data:', votesError);
    } else if (votesData) {
      const newVotesMap = new Map();
      //console.log('Before sorting:', votesData);
      votesData.sort((a: Vote, b: Vote) => a.modified - b.modified);
      //console.log('After sorting:', votesData);
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
const [comment, setComment] = useState<string>(t('results.notYetVoted'));
const [commentLang, setCommentLang] = useState<string>('und');
const [vote, setVote] = useState<string>(t('results.notYetVoted'));
const [voteValue, setVoteValue] = useState<number>(-2);
const [voteFor, setVoteFor] = useState<number>(0);
const [voteAgainst, setVoteAgainst] = useState<number>(0);
const [voteSkip, setVoteSkip] = useState<number>(0);
const [voteTotal, setVoteTotal] = useState<number>(-1);

useEffect(() => {
  //const tid = votesMap && votesMap.get(currentVoteIndex) ? votesMap.get(currentVoteIndex)?.tid : undefined;
  const tid = Array.from(votesMap.values())[currentVoteIndex]?.tid;
  const comment = tid !== undefined ? commentsMap.get(tid)?.txt : t('results.notYetVoted');
  const voteValue = tid !== undefined ? votesMap.get(tid)?.vote : undefined;
  let vote = t('results.notYetVoted');

  if (voteValue === 1) {
    vote = t('results.disagree');
  } else if (voteValue === -1) {
    vote = t('results.agree');
  } else if (voteValue === 0) {
    vote = t('results.pass');
  }

  //setTid(tid || ''); count
  setVoteFor(tid !== undefined ? commentsMap.get(tid)?.agree_count ?? 0 : 0);
  setVoteAgainst(tid !== undefined ? commentsMap.get(tid)?.disagree_count ?? 0 : 0);
  setVoteSkip(tid !== undefined ? commentsMap.get(tid)?.pass_count ?? 0 : 0);
  setVoteTotal(tid !== undefined ? commentsMap.get(tid)?.count ?? -1 : -1);
  setComment(comment || '');
  setCommentLang(tid !== undefined ? commentsMap.get(tid)?.lang ?? 'und' : 'und');
  setVote(vote);
  setVoteValue(voteValue ?? -2);

  console.log('voteFor:', voteFor);
  console.log('voteAgainst:', voteAgainst);
  console.log('voteSkip:', voteSkip);
  console.log('voteTotal:', voteTotal);
  console.log('currentVoteIndex', currentVoteIndex);
  console.log('votesData.length', votesData ? votesData.length : 0);
  console.log('tid:', tid);
  console.log('comment:', comment);
  console.log('vote:', vote);
}, [currentVoteIndex, commentsMap, votesData, votesMap, commentsData, voteAgainst, voteFor, voteSkip, voteTotal, t]);



  if (!conversationActive || !visualizationActive) {
    return <></>; // There is no need to render anything if the conversation is not active or the visualization is not active
  } else {
    return (
      <>
        <div
          id="Results"
          className="text-primary font-primary mt-xl flex flex-col select-none"
        >
          <div className="font-bold text-3xl">{t('results.title')}</div>
          <div className="font-bold min-h-[130px] flex items-center justify-start">
            <p lang={commentLang}>&quot;{comment}&quot;</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="flex flex-row">
              <User /> {t('results.your_vote')}: {vote}
            </div>
            <div id='pagination' className="flex flex-row justify-end items-center gap-sm">
              <button aria-label={t('results.previous')} className='w-8 h-8 flex justify-center items-center disabled:opacity-50 enabled:hover:scale-110 enabled:active:scale-110 duration-200' onClick={() => handleVoteIndexChange(currentVoteIndex - 1)} disabled={currentVoteIndex === 0}><Chevron /></button>
              <div aria-current="true" className='w-9 h-9  text-invert font-bold bg-primary rounded-full flex items-center justify-center'>{currentVoteIndex + 1}</div>
              <div className={`w-9 h-9 flex justify-center items-center ${((currentVoteIndex + 1) === (votesMap.size ? votesMap.size : 1)) ? 'opacity-50' : ''}`}>{currentVoteIndex + 2}</div>
              <button aria-label={t('results.next')} className='w-8 h-8 flex justify-center items-center disabled:opacity-50 enabled:hover:scale-110 enabled:active:scale-110 duration-200' onClick={() => handleVoteIndexChange(currentVoteIndex + 1)} disabled={(currentVoteIndex + 1) === (votesMap.size ? votesMap.size : 1)}><Chevron rotate={180}/></button>
            </div>
          </div>




          <div className='px-md lg:px-[66px]'>
            <div className="flex h-[279px] sm:h-[255px] px-sm lg:px-8 gap-5 items-end text-center">

              <div className="flex flex-1 flex-col justify-end items-center">
                <div className={`flex flex-col items-center duration-200 ${voteTotal < 0 || ((voteFor / voteTotal) * 100) < 20 ? 'translate-y-0' : 'translate-y-7 gap-2'}`}>
                  <div className=''>{voteValue === -1 && <User />}</div>
                  <div className='' aria-describedby="agree_label">{voteTotal > 0 ? Math.round((voteFor / voteTotal) * 100) : 0} %</div>
                </div>
                <div className={`flex flex-col justify-start self-stretch ${voteValue === -1 ? 'bg-theme-surface-graph-secondary' : 'bg-theme-surface-graph-primary'} rounded-tl-[10px] rounded-tr-[10px] duration-200`} style={{ height: `${voteTotal > 0 ? Math.round((voteFor / voteTotal) * 188) : 0}px` }}></div>
                <div className="w-[154%] h-[5px] bg-primary rounded-[3px]"></div>
                <label id="agree_label" className="mt-xxs font-light min-h-12 sm:min-h-6">{t('results.agree')}</label>
              </div>

              <div aria-describedby="disagree_label" className="flex flex-1 flex-col justify-start items-center">
                <div className={`flex flex-col items-center duration-200 ${voteTotal < 0 || ((voteAgainst / voteTotal) * 100) < 20 ? 'translate-y-0' : 'translate-y-7 gap-2'}`}>
                  <div className=''>{voteValue === 1 && <User />}</div>
                  <div className=''>{voteTotal > 0 ? Math.round((voteAgainst / voteTotal) * 100) : 0} %</div>
                </div>
                <div className={`flex flex-col justify-start self-stretch ${voteValue === 1 ? 'bg-theme-surface-graph-secondary' : 'bg-theme-surface-graph-primary'} rounded-tl-[10px] rounded-tr-[10px] duration-200`} style={{ height: `${voteTotal > 0 ? Math.round((voteAgainst / voteTotal) * 188) : 0}px` }}></div>
                <div className="w-[154%] h-[5px] bg-primary rounded-[3px]"></div>
                <label id="disagree_label" className="mt-xxs font-light min-h-12 sm:min-h-6">{t('results.disagree')}</label>
              </div>

              <div aria-describedby="pass_label" className="flex flex-1 flex-col justify-start items-center">
                <div className={`flex flex-col items-center duration-200 ${voteTotal < 0 || ((voteSkip / voteTotal) * 100) < 20 ? 'translate-y-0' : 'translate-y-7 gap-2'}`}>
                  <div className=''>{voteValue === 0 && <User />}</div>
                  <div className=''>{voteTotal > 0 ? Math.round((voteSkip / voteTotal) * 100) : 0} %</div>
                </div>
                <div className={`flex flex-col justify-start self-stretch ${voteValue === 0 ? 'bg-theme-surface-graph-secondary' : 'bg-theme-surface-graph-primary'} rounded-tl-[10px] rounded-tr-[10px] duration-200`} style={{ height: `${voteTotal > 0 ? Math.round((voteSkip / voteTotal) * 188) : 0}px` }}></div>
                <div className="w-[154%] h-[5px] bg-primary rounded-[3px]"></div>
                <label id="pass_label" className="mt-xxs font-light min-h-12 sm:min-h-6">{t('results.pass')}</label>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }
}
