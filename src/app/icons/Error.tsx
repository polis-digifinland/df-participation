import React from 'react';

const ErrorIcon = ({ fg = 'black', width = 24, height = 24 }) => {

  const viewBox = "0 0 24 24";

  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="error_icon">
      <path
        id="Subtract"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11 7.5C11 7.22386 11.2239 7 11.5 7H12.5C12.7761 7 13 7.22386 13 7.5V12.5C13 12.7761 12.7761 13 12.5 13H11.5C11.2239 13 11 12.7761 11 12.5V7.5ZM11.5 15C11.2239 15 11 15.2239 11 15.5V16.5C11 16.7761 11.2239 17 11.5 17H12.5C12.7761 17 13 16.7761 13 16.5V15.5C13 15.2239 12.7761 15 12.5 15H11.5Z"
        fill={fg}/>
      </g>
    </svg>
  );
};

export default ErrorIcon;