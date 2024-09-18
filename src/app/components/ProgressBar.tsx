'use client'

import React, { useState } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  // Simulate progress update (replace with your actual logic)
  setTimeout(() => {
    setProgress(75);
  }, 2000);

  return (
    <>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
    </>
  )
}