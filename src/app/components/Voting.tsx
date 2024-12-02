'use client';

import { useState, useEffect } from 'react';
import Thumb from '../icons/Thumb';
import Pass from '../icons/Pass';
import Chevron from '../icons/Chevron';
import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url, { credentials: 'include' }).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
    return res.json();
  });

interface VotingProps {
  failed_to_load: boolean;
  is_active: boolean;
  conversation_id: string;
  InitialTotal: number;
}

export default function Voting({
  failed_to_load,
  is_active,
  conversation_id,
  InitialTotal,
}: VotingProps) {
  const [currentTxt, setCurrentTxt] = useState<string>('');
  const [currentTid, setCurrentTid] = useState<number>(-1);
  const [currentBg, setCurrentBg] = useState<number>(1);
  const [previousBg, setPreviousBg] = useState<number>(1);
  const [previousTxt, setPreviousTxt] = useState<string>(currentTxt);
  const [previousTid, setPreviousTid] = useState<number>(currentTid);
  const [disablePreviousButton, setDisablePreviousButton] = useState<boolean>(true);

  const [progressTotal, setProgressTotal] = useState<number>(InitialTotal);
  const [progressCurrent, setProgressCurrent] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [progressCompletedStatus, setProgressCompleted] = useState<boolean>(false);

  const [cardAnimateCenterToLeft, setCardAnimateCenterToLeft] = useState(false);
  const [cardAnimateLeftToCenter, setCardAnimateLeftToCenter] = useState(false);

  const firstBarWidth = Math.min(progressPercentage * 2, 100);
  const secondBarWidth = Math.max(0,Math.min((progressPercentage - 50) * 2, 100));

  const externalApiUrl = `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/api/v3/votes`;

  const { data: participationData, error: participationError } = useSWR(
    `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/api/v3/participationInit?conversation_id=${conversation_id}&pid=mypid&lang=acceptLang`,
    fetcher
  );

  useEffect(() => {
    if (participationError) {
      console.error('Error fetching vote data:', participationError);
    } else if (participationData) {
      setCurrentTid(participationData.nextComment.tid);
      setCurrentTxt(
        participationData.nextComment.txt ||
        'Tässä oli kaikki väittämät tällä kertaa. Keskustelu kuitenkin jatkuu, joten palaathan vielä myöhemmin vastaamaan uusiin väitteisiin!'
      );
      if (!participationData.nextComment.txt) {
        setProgressCompleted(true);
      } else {
        setProgressCompleted(false);
      }
      setProgressTotal(participationData.nextComment.total || InitialTotal);
      setProgressCurrent(
        participationData.nextComment.total -
          participationData.nextComment.remaining || 0
      );
      setProgressPercentage(
        ((participationData.nextComment.total -
          participationData.nextComment.remaining) /
          participationData.nextComment.total) *
          100
      );
    }
  }, [participationData, participationError, InitialTotal]);

  const animateCardThrowLeftToCenter = () => {
    setDisablePreviousButton(true);
    setCardAnimateLeftToCenter(true);
    console.log(`Going back to:`, previousTid);
  };

  const animateCardThrowCenterToLeft = () => {
    setDisablePreviousButton(false);
    setPreviousBg(currentBg);
    setCurrentBg(currentBg === 4 ? 1 : currentBg + 1);
    setCardAnimateCenterToLeft(true);
  };

  useEffect(() => {
    let resetTimeout: NodeJS.Timeout | undefined;

    if (cardAnimateCenterToLeft) {
      resetTimeout = setTimeout(() => {
        setCardAnimateCenterToLeft(false);
      }, 820);
    } else if (cardAnimateLeftToCenter) {
      resetTimeout = setTimeout(() => {
        setCardAnimateLeftToCenter(false);
        setCurrentBg(previousBg);
        setCurrentTxt(previousTxt);
        setCurrentTid(previousTid);
        setProgressCompleted(false);
      }, 920);
    }
    return () => {
      if (resetTimeout) clearTimeout(resetTimeout);
    };
  }, [
    cardAnimateCenterToLeft,
    cardAnimateLeftToCenter,
    previousBg,
    previousTid,
    previousTxt,
  ]);

  const handleVote = async (voteValue: number) => {
    try {
      const response = await fetch(externalApiUrl, {
        method: 'POST',
        credentials: 'include', // This will include cookies in the request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tid: currentTid, // topic id
          conversation_id: conversation_id, // the id from URL
          vote: voteValue,
          //starred: false, // Example value, replace as needed
          //weight: 0, // Example value, replace as needed
          //xid: 'your_xid', // Replace with actual xid
          pid: 'mypid', // participant id, This seems not to be used but still needed. Check why here "mypid" is used instead of the real value.
          lang: 'fi', // Example value, replace as needed
          agid: 1, // Enable Auto Gen user ID
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to submit vote with status: ${response.status}`
        );
      }

      const data = await response.json();

      if (data.nextComment) {
        setPreviousTxt(currentTxt);
        setPreviousTid(currentTid);
        setCurrentTxt(data.nextComment.txt);
        setCurrentTid(data.nextComment.tid);
        setProgressTotal(data.nextComment.total || InitialTotal);
        setProgressCurrent(data.nextComment.total - data.nextComment.remaining);
        setProgressPercentage(
          ((data.nextComment.total - data.nextComment.remaining) /
            data.nextComment.total) *
            100
        );
        animateCardThrowCenterToLeft();
        console.log(
          `Vote by ${data.currentPid} for ${currentTid} submitted successfully:`,
          data
        );
      } else if (data.nextComment == null) {
        setPreviousTxt(currentTxt);
        setPreviousTid(currentTid);
        setCurrentTxt('Tässä oli kaikki väittämät tällä kertaa. Keskustelu kuitenkin jatkuu, joten palaathan vielä myöhemmin vastaamaan uusiin väitteisiin!');
        setProgressCurrent(progressTotal);
        setProgressPercentage(100);
        setProgressCompleted(true);
        animateCardThrowCenterToLeft();
        console.log('No more comments to vote on');
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  if (failed_to_load) {
    return <></>; // If the data failed to load, don't render anything here, Conversation component will handle the error
  } else if (!is_active) {
    return (
      <>
        <h1 className="text-primary text-3xl font-primary font-bold select-none">
          Keskustelu on suljettu.
        </h1>
      </>
    );
  } else {
    return (
      <>
        <div
          id="ProgressBar"
          className="flex text-primary font-primary mt-md select-none"
        >
          <div className="bg-theme-progress-background my-auto w-full h-1.5 rounded">
            <div
              className="bg-theme-progress-bar h-1.5 rounded duration-200"
              style={{ width: `${firstBarWidth}%` }}
            />
          </div>
          <div className="text-base mx-5 text-center font-bold leading-tight">
            <p className="mb-0">{`${progressCurrent}/${progressTotal}`}</p>
          </div>
          <div className="bg-theme-progress-background my-auto w-full h-1.5 rounded">
            <div
              className="bg-theme-progress-bar h-1.5 rounded duration-200"
              style={{ width: `${secondBarWidth}%` }}
            />
          </div>
        </div>

        <div id="css_variables_load" className="hidden">
          <div className="bg-theme-surface-card-1"></div>
          <div className="bg-theme-surface-card-2"></div>
          <div className="bg-theme-surface-card-3"></div>
          <div className="bg-theme-surface-card-4"></div>
        </div>







        <div id="cards" className="relative">

          <div id="feather" className="shadow-theme-surface-primary shadow-[0px_0px_8px_8px] left-[-107%;] min-h-full min-w-full mt-xxs absolute select-none z-50 bg-theme-surface-primary"></div>


          <div
            id="previousCard"
            className={`
          absolute z-10 text-primary font-secondary select-none pointer-events-none min-w-full mt-sm px-lg rounded-[40px] flex-col justify-center items-center inline-flex
          bg-theme-surface-card-${previousBg}
          ${cardAnimateCenterToLeft ? 'card-animate-center-to-left' : ''}
          ${cardAnimateLeftToCenter ? 'card-animate-left-to-center' : ''}

          `}
          >
            <button
              className="w-full flex items-center justify-start gap-1 hover:underline mt-md ml-md disabled:opacity-50"
              disabled
            >
              <Chevron />
              <span>Takaisin</span>
            </button>

            <div className="text-xl mt-lg my-auto min-h-[150px] flex justify-center items-center">
              {previousTxt}
            </div>

              <div className="w-full my-md flex flex-wrap justify-around">
                <div className="w-[33%] flex justify-center">
                  <button
                    className="flex flex-col justify-start items-center text-center gap-3.5  font-normal"
                    disabled
                  >
                    <svg
                      id="svg-button"
                      className="h-[66px] w-[66px]"
                      viewBox="0 0 66 66"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Peukku" transform="rotate(180 33 33)">
                        <path
                          d="M66 33C66 51.2254 51.2254 66 33 66C14.7746 66 0 51.2254 0 33C0 14.7746 14.7746 0 33 0C51.2254 0 66 14.7746 66 33Z"
                          fill="var(--surface-brand)"
                        />
                        <path
                          d="M42.6333 28.3271H37.5201C36.4892 28.3271 35.6536 27.4914 35.6536 26.4606V23.2379C35.6536 20.5409 33.9144 20.268 33.0088 20.3087C32.7024 20.3222 32.4482 20.5488 32.4012 20.852L32.242 21.8871C32.0661 23.0312 31.6934 24.1357 31.1406 25.1525L30.3326 26.6385C29.8613 27.506 29.6134 28.4774 29.6113 29.465L29.6113 40.8694C29.6113 41.4937 30.1171 41.9995 30.7413 41.9995H41.3607C42.4542 41.9995 43.3484 41.1053 43.3484 40.0123L44.6199 30.3137C44.6199 29.2212 43.7263 28.3271 42.6333 28.3271Z"
                          fill="var(--surface-primary)"
                        />
                        <path
                          d="M23.5849 41.9995H26.868C27.2785 41.9995 27.6113 41.6667 27.6113 41.2562L27.6113 29.0699C27.6113 28.6594 27.2785 28.3266 26.868 28.3266H23.5849C23.1744 28.3266 22.8416 28.6594 22.8416 29.0699L22.8416 41.2562C22.8416 41.6667 23.1744 41.9995 23.5849 41.9995Z"
                          fill="var(--surface-primary)"
                        />
                      </g>
                    </svg>
                    <div className="no-scale">Eri mieltä</div>
                  </button>
                </div>

                <div className="w-[33%] flex justify-center">
                  <button
                    className="flex flex-col items-center text-center gap-3.5  font-normal"
                    disabled
                  >
                    <div className="h-[66px] w-[66px]">
                      <Pass
                        fg="var(--surface-brand)"
                        bg="var(--surface-primary)"
                      />
                    </div>
                    <div>
                      Ohita/<span className="block sm:hidden">neutraali</span>
                      <span className="hidden sm:inline">neutraali</span>
                    </div>
                  </button>
                </div>

                <div className="w-[33%] flex justify-center">
                  <button
                    className="flex flex-col items-center text-center gap-3.5  font-normal"
                    disabled
                  >
                    <div className="h-[66px] w-[66px]">
                      <Thumb
                        fg="var(--surface-brand)"
                        bg="var(--surface-primary)"
                      />
                    </div>
                    <div>
                      Samaa <span className="block sm:hidden">mieltä</span>
                      <span className="hidden sm:inline">mieltä</span>
                    </div>
                  </button>
                </div>
              </div>
          </div>













          <div
            id="currentCard"
            className={`bg-theme-surface-card-${currentBg} relative text-primary font-secondary select-none min-w-full mt-sm px-lg rounded-[40px] flex-col justify-center items-center inline-flex`}
          >
            <button
              className="w-full flex items-center justify-start gap-1 lg:hover:underline active:underline mt-md ml-md disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                animateCardThrowLeftToCenter();
              }}
              disabled={disablePreviousButton}
            >
              <Chevron />
              <span>Takaisin</span>
            </button>
            {progressCompletedStatus && (
              <div>
                <div className="text-xl font-primary font-semibold mt-md my-auto flex justify-center items-center">
                  Kiitos osallistumisestasi!
                </div>
                <div className="text-base font-secondary mt-sm my-auto flex justify-center items-center text-center">
                  Tässä oli kaikki väittämät tällä kertaa. Keskustelu kuitenkin jatkuu, joten palaathan vielä myöhemmin vastaamaan uusiin väitteisiin!
                </div>
              </div>
            )}
            {!progressCompletedStatus && (
              <div className="text-xl mt-lg my-auto min-h-[150px] flex justify-center items-center">
                {currentTxt}
              </div>
            )}

              <div className="w-full my-md flex flex-wrap justify-around">
                <div className="w-[33%] flex justify-center">
                  <button
                    className={`flex flex-col items-center text-center gap-3.5 font-normal enabled:lg:hover:font-semibold enabled:active:font-semibold disabled:cursor-not-allowed ${progressCompletedStatus ? 'disabled:opacity-50' : ''}`}
                    disabled={cardAnimateCenterToLeft || progressCompletedStatus}
                    onClick={() => {
                      handleVote(1);
                    }}
                  >
                    <svg
                      id="svg-button"
                      className="h-[66px] w-[66px] enabled:lg:hover:scale-110 enabled:active:scale-110 transition-transform duration-300 ease-in-out transform"
                      viewBox="0 0 66 66"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Peukku" transform="rotate(180 33 33)">
                        <path
                          d="M66 33C66 51.2254 51.2254 66 33 66C14.7746 66 0 51.2254 0 33C0 14.7746 14.7746 0 33 0C51.2254 0 66 14.7746 66 33Z"
                          fill="var(--surface-brand)"
                        />
                        <path
                          d="M42.6333 28.3271H37.5201C36.4892 28.3271 35.6536 27.4914 35.6536 26.4606V23.2379C35.6536 20.5409 33.9144 20.268 33.0088 20.3087C32.7024 20.3222 32.4482 20.5488 32.4012 20.852L32.242 21.8871C32.0661 23.0312 31.6934 24.1357 31.1406 25.1525L30.3326 26.6385C29.8613 27.506 29.6134 28.4774 29.6113 29.465L29.6113 40.8694C29.6113 41.4937 30.1171 41.9995 30.7413 41.9995H41.3607C42.4542 41.9995 43.3484 41.1053 43.3484 40.0123L44.6199 30.3137C44.6199 29.2212 43.7263 28.3271 42.6333 28.3271Z"
                          fill="var(--surface-primary)"
                        />
                        <path
                          d="M23.5849 41.9995H26.868C27.2785 41.9995 27.6113 41.6667 27.6113 41.2562L27.6113 29.0699C27.6113 28.6594 27.2785 28.3266 26.868 28.3266H23.5849C23.1744 28.3266 22.8416 28.6594 22.8416 29.0699L22.8416 41.2562C22.8416 41.6667 23.1744 41.9995 23.5849 41.9995Z"
                          fill="var(--surface-primary)"
                        />
                      </g>
                    </svg>
                    <div className="no-scale">Eri mieltä</div>
                  </button>
                </div>

                <div className="w-[33%] flex justify-center">
                  <button
                    className={`flex flex-col items-center text-center gap-3.5 font-normal enabled:lg:hover:font-semibold enabled:active:font-semibold disabled:cursor-not-allowed ${progressCompletedStatus ? 'disabled:opacity-50' : ''}`}
                    disabled={cardAnimateCenterToLeft || progressCompletedStatus}
                    onClick={() => {
                      handleVote(0);
                    }}
                  >
                    <div className="h-[66px] w-[66px] enabled:lg:hover:scale-110 enabled:active:scale-110 transition-transform duration-300 ease-in-out transform">
                      <Pass
                        fg="var(--surface-brand)"
                        bg="var(--surface-primary)"
                      />
                    </div>
                    <div className="no-scale">
                      Ohita/<span className="block sm:hidden">neutraali</span>
                      <span className="hidden sm:inline">neutraali</span>
                    </div>
                  </button>
                </div>

                <div className="w-[33%] flex justify-center">
                  <button
                    className={`flex flex-col items-center text-center gap-3.5 font-normal enabled:lg:hover:font-semibold enabled:active:font-semibold disabled:cursor-not-allowed ${progressCompletedStatus ? 'disabled:opacity-50' : ''}`}
                    disabled={cardAnimateCenterToLeft || progressCompletedStatus}
                    onClick={() => {
                      handleVote(-1);
                    }}
                    >
                    <div className="h-[66px] w-[66px] enabled:lg:hover:scale-110 enabled:active:scale-110 transition-transform duration-300 ease-in-out transform">
                      <Thumb
                        fg="var(--surface-brand)"
                        bg="var(--surface-primary)"
                      />
                    </div>
                    <div className="no-scale">
                      Samaa <span className="block sm:hidden">mieltä</span>
                      <span className="hidden sm:inline">mieltä</span>
                    </div>
                  </button>
                </div>
              </div>
          </div>
        </div>
      </>
    );
  }
}

