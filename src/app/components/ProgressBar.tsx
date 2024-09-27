'use client'

import React, { useState } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const firstBarWidth = Math.min(progress * 2, 100);
  const secondBarWidth = Math.max(0,Math.min((progress-50) * 2, 100));

  // Simulate progress update
  setTimeout(() => {
    setProgress(70);
  }, 2000);

  return (
    <>
        <div id="ProgressBar" className="flex text-primary font-primary">
            <div className="bg-theme-surface-card-1 mt-10 w-full h-1.5 rounded">
              <div
                className="bg-theme-surface-brand h-1.5 rounded  duration-200" 
                style={{ width: `${firstBarWidth}%` }}
              />
            </div>
            <div className=" text-xl mt-7 mx-5 w-[42px] text-center font-bold leading-tight">7/10</div>
            <div className="bg-theme-surface-card-1 mt-10 w-full h-1.5 rounded">
              <div 
                className="bg-theme-surface-brand h-1.5 rounded duration-200" 
                style={{ width: `${secondBarWidth}%` }}
              />
            </div>
        </div>
    </>
  )
}