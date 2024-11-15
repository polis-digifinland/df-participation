'use client'

import { useState, useRef } from 'react';

interface SuggestionsProps {
  is_active: boolean;
  write_type: boolean;
  conversation_id: string;
}

export default function Suggestions({ is_active, write_type, conversation_id }: SuggestionsProps) {

  const [inputValue, setInputValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto'; // Reset height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    setIsSubmitted(false); // Reset submission status when input changes
    autoResizeTextarea(event.target);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (inputValue.trim() === '') {
      console.log('Input is empty. Submission not allowed.');
      return;
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


  if (!is_active) {
    return (<></>)
  } else if (!write_type) {
    return (
      <>
        <h1 className="text-primary text-3xl font-primary font-bold select-none">
          Uusien väittämien lähettäminen on suljettu.
        </h1>
      </>
    )
  } else {
  return (
    <>
      <div id="Suggestions" className="text-primary font-secondary flex flex-col mt-lg select-none">
        <div className="text-xl font-bold font-primary">Puuttuuko kyselystä keskeinen väittämä?</div>
        <p className="mt-md mb-0">Ehdota kyselyyn omaa väittämääsi</p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <textarea
            ref={textareaRef}
            className="placeholder-placeholder bg-theme-surface-primary rounded-2xl mt-xs px-4 pt-[13px] pb-3.5 border border-theme-border-primary"
            value={inputValue}
            onChange={handleChange}
            placeholder="Kirjoita tähän"
            rows={1}
            maxLength={140}
            style={{ overflow: 'hidden', resize: 'none', height: "51px" }} // Ensure the textarea can grow
          />
          <div className="text-right">{140 - inputValue.length} merkkiä jäljellä</div>
          <button id='suggest-button' type="submit" className="h-[44px] w-[107px] px-5 py-2.5 bg-primary rounded-[22px] text-invert text-xl leading-none font-semibold transform transition-transform duration-200 ease-in-out hover:scale-105">
              Ehdota
          </button>
          <div>{isSubmitted && ("Väittämäsi on lähetetty!")}</div>
        </form>
      </div>
    </>
  )
}
}

