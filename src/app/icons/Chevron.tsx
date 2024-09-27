import React from 'react';

const Chevron = ({ color = 'currentColor', width = 14, height = 14, rotate = 270 }) => {

  const viewBox = "0 0 14 14";

  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform={`rotate(${rotate} 7 7)`}>
        <path 
          id="Vector" 
          d="M6.5 1.5L1.90684 6.02777C1.36439 6.56249 1.36439 7.43749 1.90684 7.97221L6.5 12.5"
          stroke={color}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default Chevron;