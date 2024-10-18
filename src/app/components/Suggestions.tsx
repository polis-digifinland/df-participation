'use client'

import { useState } from 'react';

export default function Suggestions() {

  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    console.log('inputValue: ', { inputValue });
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Process the form data (e.g., send it to an API)
    console.log('Form submitted:', { inputValue });

    // reset the form after submission
    setInputValue('');
  };

  return (
    <>
<div id="Suggestions" className="text-primary font-primary flex flex-col gap-6 mt-10">
    <div className="text-xl font-bold">Puuttuuko kyselystä keskeinen väittämä?</div>
    <p>Ehdota kyselyyn omaa väittämääsi</p>
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        className="text-placeholder rounded-2xl p-4 border border-theme-border-primary"
        value={inputValue} 
        onChange={handleChange}   
        placeholder="Kirjoita tähän" 
      />
      <button type="submit" className="max-w-[107px] px-5 py-2.5 bg-primary rounded-[22px] text-invert text-xl font-semibold">
        Ehdota
      </button>
    </form>
</div> 
    </>
  )
}