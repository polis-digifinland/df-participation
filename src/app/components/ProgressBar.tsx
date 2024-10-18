'use client'

import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  total: number;
  remaining: number;
}

export default function ProgressBar({ total, remaining }: ProgressBarProps) {

  const current = total - remaining + 1;
  const progresspercentage = current / total * 100;

  const [progress, setProgress] = useState(progresspercentage);

  const firstBarWidth = Math.min(progress * 2, 100);
  const secondBarWidth = Math.max(0, Math.min((progress - 50) * 2, 100));

  
  useEffect(() => {
    // Simulate progress update until real system is implemented
    const timer = setTimeout(() => {
      setProgress(progresspercentage);
    }, 1000); //ms

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [progresspercentage]);

  return (
    <>
      <div id="ProgressBar" className="flex text-primary font-primary">
        <div className="bg-theme-surface-card-1 mt-10 w-full h-1.5 rounded">
          <div
            className="bg-theme-surface-brand h-1.5 rounded duration-200"
            style={{ width: `${firstBarWidth}%` }}
          />
        </div>
        <div className="text-xl mt-7 mx-5 w-[42px] text-center font-bold leading-tight">
          {current}/{total}
        </div>
        <div className="bg-theme-surface-card-1 mt-10 w-full h-1.5 rounded">
          <div
            className="bg-theme-surface-brand h-1.5 rounded duration-200"
            style={{ width: `${secondBarWidth}%` }}
          />
        </div>
      </div>
    </>
  );
}

