'use client'

import { useState, useEffect, useRef } from 'react';
import Modal from "@/components/Modal";
import InfoIcon from '@/icons/Info';
import ErrorIcon from '@/icons/Error';
import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url, { credentials: 'include' }).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
    return res.json();
  });

interface SuggestionsProps {
  is_active: boolean;
  write_type: boolean;
  conversation_id: string;
}

export default function Suggestions({ is_active, write_type, conversation_id }: SuggestionsProps) {

  const [inputValue, setInputValue] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [hasQuestionMark, setHasQuestionMark] = useState<boolean>(false);
  const [hasExclamationMark, setHasExclamationMark] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [conversationActive, setConversationActive] = useState<boolean>(is_active);
  const [writeType, setWriteType] = useState<boolean>(write_type);

  const { data: participationData, error: participationError } = useSWR(
    `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/api/v3/participationInit?conversation_id=${conversation_id}&pid=mypid&lang=acceptLang`,
    fetcher
  );

  useEffect(() => {
    if (participationError) {
      console.error('Error fetching init data:', participationError);
    } else if (participationData) {
      setConversationActive(participationData.conversation.is_active);
      setWriteType(participationData.conversation.write_type);
    }
  }, [participationData, participationError]);

  const [showModal, setShowModal] = useState(false);
  function toggleModal() {
    setShowModal(!showModal);
  }

  const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto'; // Reset height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHasError(false);
    const value = event.target.value;
    setInputValue(value);
    setHasQuestionMark(value.includes('?'));
    setHasExclamationMark(value.includes('!'));
    setHasError(value.includes('?') || value.includes('!'));
    setIsSubmitted(false); // Reset submission status when input changes
    setIsEmpty(false); // Reset status when form is submitted
    setIsDuplicate(false); // Reset status when form is submitted
    autoResizeTextarea(event.target);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setHasError(false); // Reset status when form is submitted
    setIsDuplicate(false); // Reset status when form is submitted
    setHasQuestionMark(false); // Reset status when form is submitted
    setHasExclamationMark(false); // Reset status when form is submitted

    if (inputValue.trim() === '') {
      setIsEmpty(true);
      setHasError(true);
      console.log('Input is empty. Submission not allowed.');
      return;
    } else {
      setIsEmpty(false); // Reset status when form is submitted
    }

    try {
      const externalApiUrl = `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/api/v3/comments`; //
      const response = await fetch(externalApiUrl, {
        method: 'POST',
        credentials: 'include', // This will include cookies in the request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          txt: inputValue,
          pid: "mypid",
          conversation_id: conversation_id,
          vote: -1,
          agid: 1,
        }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          setIsDuplicate(true);
          setHasError(true);
          console.error('Error submitting vote: Duplicate comment');
          return;
        }
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Form submitted:', data);

      setInputValue(''); // Reset the form after submission
      setIsSubmitted(true); // Set submission status to true
      if (textareaRef.current) {
        textareaRef.current.style.height = '51px'; // Reset height to initial value
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };


  if (!conversationActive) {
    return (<></>)  // If conversation is not active, don't render anything here, Voting component will handle it
  } else if (!writeType) {
    return (
      <>
        <div id="Suggestions" className="text-primary font-secondary font-semibold flex flex-row items-center gap-sm mt-lg select-none">
          <InfoIcon fg="var(--text-primary)" width={32} height={32} />
          <h1>Uusien väittämien lisääminen on suljettu.</h1>
        </div>
      </>
    )
  } else {
  return (
    <>
      <div id="Suggestions" className="text-primary font-secondary flex flex-col mt-lg select-none">
        <h2 className="text-xl font-bold font-primary">Puuttuuko kyselystä keskeinen väittämä?</h2>
        <div className="flex flex-row justify-between mt-md mb-0">
          <label htmlFor="suggest-textarea" className="">Ehdota kyselyyn omaa väittämääsi</label>
            <button onClick={toggleModal} className='rounded-md hover:lg:scale-110 active:scale-110' aria-label="Lisätietoa"><InfoIcon fg="var(--text-primary)" /></button>
          <Modal header="Millainen on hyvä kannanotto?" open={showModal} onClose={toggleModal}>
            <div>
              <ul className='pl-6 list-disc '>
                <li>Itsenäinen ajatus</li>
                <li>Tuo esiin uusia näkökulmia tai kokemuksia</li>
                <li>Selkeä ja ytimekäs (rajoitettu 140 merkkiin)</li>
              </ul>
              <p className='mt-sm'>Muistathan, että kannanotot näytetään satunnaisesti, etkä vastaa suoraan muiden osallistujien kannanottoihin.</p>
            </div>
          </Modal>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col relative">
          {hasError &&
            <div className="select-none absolute top-[25px] right-[12px]">
            <ErrorIcon fg="var(--error)" />
            </div>
          }
          <textarea
            id='suggest-textarea'
            ref={textareaRef}
            className={`placeholder-placeholder bg-theme-surface-primary rounded-2xl mt-xs px-4 pt-[13px] pb-3.5 border
            ${hasError ? 'border-theme-border-error' : 'border-theme-border-primary'}
            `}
            value={inputValue}
            onChange={handleChange}
            placeholder="Kirjoita tähän"
            rows={1}
            maxLength={140}
            style={{ overflow: 'hidden', resize: 'none', height: "51px" }} // Ensure the textarea can grow
          />
          <div className='flex flex-row justify-between mt-md'>
            <button
              id='suggest-button'
              type="submit"
              className="h-[44px] w-[107px] px-5 py-2.5 bg-primary rounded-[22px] text-invert text-xl leading-none font-semibold transform transition-transform duration-200 ease-in-out lg:hover:scale-105 active:scale-105">
                Ehdota
            </button>
            <div className={`text-right ${hasError ? 'text-error' : ''}
            `}>
              {!hasError && !isSubmitted && <div>{140 - inputValue.length} merkkiä jäljellä</div>}
              {isSubmitted && <div>Väittämäsi on lähetetty!</div>}
              {hasQuestionMark && <div>Vältä kysymysmerkkiä</div>}
              {hasExclamationMark && <div>Vältä huutomerkkiä</div>}
              {isEmpty && <div>Tyhjää väittämää ei voi lähettää</div>}
              {isDuplicate && <div>Sama väite on jo lisätty keskusteluun</div>}
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
}

