import React from 'react';

const Google = ({ color = 'currentColor', width = 12, height = 14 }) => {

  const viewBox = "0 0 12 14";

  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Google-icon">
        <g id="Vector">
          <path
            id="Vector"
            d="M12 7.14909C12 10.7864 9.61721 13.375 6.09836 13.375C2.72459 13.375 0 10.5268 0 7C0 3.47319 2.72459 0.625 6.09836 0.625C7.74098 0.625 9.12295 1.25479 10.1877 2.2933L8.52787 3.96159C6.35656 1.77147 2.31885 3.41663 2.31885 7C2.31885 9.22354 4.01803 11.0255 6.09836 11.0255C8.51311 11.0255 9.41803 9.21583 9.56066 8.27757H6.09836V6.08488H11.9041C11.9607 6.41134 12 6.72495 12 7.14909Z"
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
};

export default Google;

