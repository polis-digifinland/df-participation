import React from 'react';

const InfoIcon = ({ fg = 'black', width = 24, height = 24 }) => {

  const viewBox = "0 0 24 24";

  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="info_icon">
        <circle cx="12" cy="12" r="11.5" stroke={fg}/>
        <rect x="10.7998" y="6" width="2.4" height="2.4" fill={fg}/>
        <rect x="10.7998" y="10.8" width="2.4" height="7.2" fill={fg}/>
      </g>
    </svg>
  );
};

export default InfoIcon;

