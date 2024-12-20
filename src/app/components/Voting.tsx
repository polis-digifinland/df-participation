'use client';

import { useState, useEffect } from 'react';
import Thumb from '@/icons/Thumb';
import Pass from '@/icons/Pass';
import Chevron from '@/icons/Chevron';
import InfoIcon from '@/icons/Info';
import Google from '@/icons/Google';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

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
  locale: string;
}

export default function Voting({
  failed_to_load,
  is_active,
  conversation_id,
  InitialTotal,
  locale,
}: VotingProps) {
  const { t } = useTranslation();
  const [enableTranslations, setEnableTranslations] = useState<boolean>(false);
  const [disableTranslationButton, setDisableTranslationButton] = useState<boolean>(false);

  const [conversationActive, setConversationActive] = useState<boolean>(is_active);

  const [currentTxt, setCurrentTxt] = useState<string>('');
  const [currentTxtTranslated, setCurrentTxtTranslated] = useState<string>('');
  const [currentTid, setCurrentTid] = useState<number>(-1);
  const [currentLang, setCurrentLang] = useState<string>('und');
  const [currentBg, setCurrentBg] = useState<number>(1);
  const [previousBg, setPreviousBg] = useState<number>(1);
  const [previousLang, setPreviousLang] = useState<string>('und');
  const [previousTxt, setPreviousTxt] = useState<string>(currentTxt);
  const [previousTxtTranslated, setPreviousTxtTranslated] = useState<string>(currentTxtTranslated);
  const [previousTid, setPreviousTid] = useState<number>(currentTid);
  const [disablePreviousButton, setDisablePreviousButton] = useState<boolean>(true);
  const [disableVotingButtons, setDisableVotingButtons] = useState<boolean>(false);

  const [progressTotal, setProgressTotal] = useState<number>(InitialTotal);
  const [progressCurrent, setProgressCurrent] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [progressCompletedStatus, setProgressCompleted] = useState<boolean>(false);

  const [cardAnimateCenterToLeft, setCardAnimateCenterToLeft] = useState(false);
  const [cardAnimateLeftToCenter, setCardAnimateLeftToCenter] = useState(false);

  const firstBarWidth = Math.min(progressPercentage * 2, 100);
  const secondBarWidth = Math.max(0,Math.min((progressPercentage - 50) * 2, 100));

  const externalApiBaseUrl = `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}`;

  const { data: participationData, error: participationError } = useSWR(
    `${externalApiBaseUrl}/api/v3/participationInit?conversation_id=${conversation_id}&pid=mypid&lang=${locale}`,
    fetcher
  );

  useEffect(() => {
    if (participationError) {
      console.error('Error fetching vote data:', participationError);
    } else if (participationData) {
      setConversationActive(participationData.conversation.is_active);
      setCurrentTid(participationData.nextComment.tid);
      setCurrentLang(participationData.nextComment.lang || 'und');
      setCurrentTxt(participationData.nextComment.txt || '');
      setCurrentTxtTranslated(participationData.nextComment.translations?.find((translation: { lang: string; txt: string }) => translation.lang === locale)?.txt || participationData.nextComment.txt || '');

      if (!participationData.nextComment.txt) {
        setProgressCompleted(true);
        setDisableVotingButtons(true);
        setDisableTranslationButton(true);
      } else {
        setProgressCompleted(false);
        setDisableVotingButtons(false);
        setDisableTranslationButton(false);
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
  }, [participationData, participationError, InitialTotal, locale]);

  const animateCardThrowLeftToCenter = () => {
    setDisablePreviousButton(true);
    setCardAnimateLeftToCenter(true);
    console.log(`Going back to:`, previousTid);
  };

  const animateCardThrowCenterToLeft = () => {
    setPreviousBg(currentBg);
    setCurrentBg(currentBg === 4 ? 1 : currentBg + 1);
    setCardAnimateCenterToLeft(true);
  };

  useEffect(() => {
    let resetTimeout: NodeJS.Timeout | undefined;

    if (cardAnimateCenterToLeft) {
      resetTimeout = setTimeout(() => {
        setCardAnimateCenterToLeft(false);
        setDisableVotingButtons(false);
        setDisableTranslationButton(false);
        setDisablePreviousButton(false);
      }, 820);
    } else if (cardAnimateLeftToCenter) {
      resetTimeout = setTimeout(() => {
        setCardAnimateLeftToCenter(false);
        setCurrentBg(previousBg);
        setCurrentTxt(previousTxt);
        setCurrentLang(previousLang);
        setCurrentTxtTranslated(previousTxtTranslated);
        setCurrentTid(previousTid);
        setProgressCompleted(false);
        setDisableVotingButtons(false);
        setDisableTranslationButton(false);
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
    previousLang,
    previousTxt,
    previousTxtTranslated,
  ]);

  const handleVote = async (voteValue: number) => {
    try {
      const response = await fetch(`${externalApiBaseUrl}/api/v3/votes`, {
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
          pid: 'mypid', // participant id, This seems not to be used but still needed. TODO Check why here "mypid" is used instead of the real value.
          lang: locale, // Get current locale prop
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
        setPreviousLang(currentLang);
        setPreviousTxtTranslated(currentTxtTranslated);
        setCurrentTid(data.nextComment.tid);
        setCurrentTxt(data.nextComment.txt || '');
        setCurrentLang(data.nextComment.lang || 'und');
        setCurrentTxtTranslated(data.nextComment.translations.find((translation: { lang: string; txt: string }) => translation.lang === locale)?.txt || data.nextComment.txt || '');


        setProgressTotal(data.nextComment.total || InitialTotal);
        setProgressCurrent(data.nextComment.total - data.nextComment.remaining);
        setProgressPercentage(
          ((data.nextComment.total - data.nextComment.remaining) /
            data.nextComment.total) *
            100
        );
        animateCardThrowCenterToLeft();
        document.getElementById('ProgressBar')?.focus(); // For screen readers reset to context beginning
        console.log(
          `Vote by ${data.currentPid} for ${currentTid} submitted successfully:`,
          data
        );
      } else if (data.nextComment == null) {
        setPreviousTxt(currentTxt);
        setPreviousTid(currentTid);
        setPreviousLang(currentLang);
        setCurrentTxt('');
        setCurrentTxtTranslated('');
        setProgressCurrent(progressTotal);
        setProgressPercentage(100);
        setProgressCompleted(true);
        setDisableVotingButtons(true);
        setDisableTranslationButton(true);
        animateCardThrowCenterToLeft();
        console.log('No more comments to vote on');
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  const toggleTranslation = async (toggleValue: boolean) => {
    try {
    setEnableTranslations(toggleValue);
    const response = await fetch(`${externalApiBaseUrl}/api/v3/participants_extended`, {
      method: 'PUT',
      credentials: 'include', // This will include cookies in the request
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: conversation_id, // the id from URL
        show_translation_activated: toggleValue,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to PUT participants_extended: ${response.status}`
      );
    }

    await response.json();

    console.log('Translation toggle: ', toggleValue);
    } catch (error) {
      console.error('Error PUT participants_extended:', error);
    }
  };

  if (failed_to_load) {
    return <></>; // If the data failed to load, don't render anything here, Conversation component will handle the error
  } else if (!conversationActive) {
    return (
      <>
        <div id="Voting" className="text-primary font-secondary font-semibold flex flex-row items-center gap-sm mt-lg select-none">
          <InfoIcon fg="var(--text-primary)" width={32} height={32} />
          <h1>{t('voting.closed')}</h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          id="ProgressBar"
          className="flex text-primary font-primary mt-md select-none"
          aria-label={t('voting.progress')}
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

        <div id="css_variables_load" className="hidden" aria-disabled="true">
          <div className="bg-theme-surface-card-1"></div>
          <div className="bg-theme-surface-card-2"></div>
          <div className="bg-theme-surface-card-3"></div>
          <div className="bg-theme-surface-card-4"></div>
        </div>







        <div id="cards" className="relative">

          <div id="feather" aria-disabled="true" className="shadow-theme-surface-primary shadow-[0px_0px_8px_8px] left-[-116%;] min-h-full min-w-[110%;] mt-xxs absolute select-none z-30 bg-theme-surface-primary"></div>


          <div
            id="previousCard"
            aria-disabled="true"
            className={`
          absolute z-10 text-primary font-secondary select-none pointer-events-none min-w-full mt-sm px-lg rounded-[40px] flex-col justify-center items-center inline-flex
          bg-theme-surface-card-${previousBg}
          ${cardAnimateCenterToLeft ? 'card-animate-center-to-left' : ''}
          ${cardAnimateLeftToCenter ? 'card-animate-left-to-center' : ''}

          `}
          >
            <div className="flex justify-between w-full mt-lg mx-md">
              <button
                className="flex items-center justify-start gap-1 disabled:opacity-50"
                disabled
              >
                <Chevron />
                <span>{t('voting.buttons.back')}</span>
              </button>
              <button
                  className="flex items-center justify-start gap-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  <span>{enableTranslations ? t('voting.buttons.disableTranslate') : t('voting.buttons.enableTranslate') }</span>
                  <Google />
              </button>
            </div>
            <div className="text-xl mt-lg my-auto min-h-[150px] flex justify-center items-center">
              {enableTranslations ? previousTxtTranslated : previousTxt }
            </div>

              <div className="w-full my-md flex flex-wrap justify-around">
                <div className="w-[33%] flex justify-center">
                  <button
                    className="flex flex-col justify-start items-center text-center gap-3.5  font-normal"
                    disabled
                  >
                    <div className="h-[66px] w-[66px]">
                      <Thumb
                        fg="var(--surface-brand)"
                        bg="var(--surface-primary)"
                        rotate={180}
                      />
                    </div>
                    <div className="no-scale">{t('voting.buttons.disagree')}</div>
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
                      {t('voting.buttons.pass')}
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
                    {t('voting.buttons.agree')}
                    </div>
                  </button>
                </div>
              </div>
          </div>













          <div
            id="currentCard"
            className={`bg-theme-surface-card-${currentBg} relative text-primary font-secondary select-none min-w-full mt-sm px-lg rounded-[40px] flex-col justify-center items-center inline-flex`}
          >
            <div className="flex justify-between w-full mt-lg mx-md">
              <button
                className="flex items-center justify-start gap-1 rounded-md lg:hover:underline active:underline disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  animateCardThrowLeftToCenter();
                  setDisablePreviousButton(true);
                }}
                disabled={disablePreviousButton}
              >
                <Chevron />
                <span>{t('voting.buttons.back')}</span>
              </button>
              <button
                className="flex items-center justify-start gap-1 rounded-md lg:hover:underline active:underline disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  toggleTranslation(!enableTranslations);
                }}
                disabled={disableTranslationButton || locale == currentLang || currentLang === 'und'}
              >
                <span>{enableTranslations ? t('voting.buttons.disableTranslate') : t('voting.buttons.enableTranslate') }</span>
                {enableTranslations ? currentLang : locale}
                <Google />
              </button>
            </div>
            {progressCompletedStatus && (
              <div className="mt-lg min-h-[150px]">
                <div className="text-xl font-primary font-semibold my-auto flex justify-center items-center">
                {t('voting.thanks.title')}
                </div>
                <div className="text-base font-secondary mt-sm my-auto flex justify-center items-center text-center">
                {t('voting.thanks.desc')}
                </div>
              </div>
            )}
            {!progressCompletedStatus && (
              <div
                lang={enableTranslations ? locale : currentLang}
                className="text-xl mt-lg my-auto min-h-[150px] flex justify-center items-center">
                {enableTranslations ? currentTxtTranslated : currentTxt}
              </div>
            )}

              <div className="w-full mt-md mb-lg flex flex-wrap justify-around">
                <div className="w-[33%] flex justify-center">
                  <button
                    className={`flex flex-col items-center text-center gap-3.5 rounded-md font-normal group disabled:cursor-not-allowed ${progressCompletedStatus ? 'disabled:opacity-50' : ''}`}
                    disabled={cardAnimateCenterToLeft || progressCompletedStatus || disableVotingButtons}
                    onClick={() => {
                      handleVote(1);
                      setDisableVotingButtons(true);
                      setDisablePreviousButton(true);
                      setDisableTranslationButton(true);
                    }}
                  >
                    <div className={`h-[66px] w-[66px] transition-transform duration-300 ease-in-out transform ${!disableVotingButtons ? 'group-hover:lg:scale-110 group-active:scale-110' : ''}`}>
                      <Thumb
                        fg="var(--surface-brand)"
                        bg="var(--surface-primary)"
                        rotate={180}
                      />
                    </div>
                    <div className={`no-scale ${!disableVotingButtons ? 'group-hover:lg:font-semibold group-active:font-semibold' : ''}`}>
                      {t('voting.buttons.disagree')}
                    </div>
                  </button>
                </div>

                <div className="w-[33%] flex justify-center">
                  <button
                    className={`flex flex-col items-center text-center gap-3.5 rounded-md font-normal group disabled:cursor-not-allowed ${progressCompletedStatus ? 'disabled:opacity-50' : ''}`}
                    disabled={cardAnimateCenterToLeft || progressCompletedStatus || disableVotingButtons}
                    onClick={() => {
                      handleVote(0);
                      setDisableVotingButtons(true);
                      setDisablePreviousButton(true);
                      setDisableTranslationButton(true);
                    }}
                  >
                    <div className={`h-[66px] w-[66px] transition-transform duration-300 ease-in-out transform ${!disableVotingButtons ? 'group-hover:lg:scale-110 group-active:scale-110' : ''}`}>
                      <Pass
                        fg="var(--surface-brand)"
                        bg="var(--surface-primary)"
                      />
                    </div>
                    <div className={`no-scale ${!disableVotingButtons ? 'group-hover:lg:font-semibold group-active:font-semibold' : ''}`}>
                      {t('voting.buttons.pass')}
                    </div>
                  </button>
                </div>

                <div className="w-[33%] flex justify-center">
                  <button
                    className={`flex flex-col items-center text-center gap-3.5 rounded-md font-normal group disabled:cursor-not-allowed ${progressCompletedStatus ? 'disabled:opacity-50' : ''}`}
                    disabled={cardAnimateCenterToLeft || progressCompletedStatus || disableVotingButtons}
                    onClick={() => {
                      handleVote(-1);
                      setDisableVotingButtons(true);
                      setDisablePreviousButton(true);
                      setDisableTranslationButton(true);
                    }}
                    >
                    <div className={`h-[66px] w-[66px] transition-transform duration-300 ease-in-out transform ${!disableVotingButtons ? 'group-hover:lg:scale-110 group-active:scale-110' : ''}`}>
                      <Thumb
                        fg="var(--surface-brand)"
                        bg="var(--surface-primary)"
                      />
                    </div>
                    <div className={`no-scale ${!disableVotingButtons ? 'group-hover:lg:font-semibold group-active:font-semibold' : ''}`}>
                      {t('voting.buttons.agree')}
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

