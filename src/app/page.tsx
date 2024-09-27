'use client'
 
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
 
export default function Home() {
  const searchParams = useSearchParams()
  const debug = searchParams.get('debug')
  const theme = searchParams.get('theme')
  

  useEffect(() => {
  
  if(debug){
    console.log("Theme: " + theme);
    
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    console.log(`User prefers ${colorScheme} color scheme`);
  }

    // Check localStorage for user's preference on initial load
    //const storedTheme = localStorage.getItem('theme');
    //if (storedTheme) {
    //  setTheme(storedTheme);
    //}

    // Update the HTML element's `data-theme` attribute
    document.documentElement.setAttribute('data-theme', theme); 
  }, [theme]);
  

  return <>
  </>
}