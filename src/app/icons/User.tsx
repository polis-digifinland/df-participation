import React from 'react';

const User = ({ color = 'currentColor', width = 24, height = 24, rotate = 0 }) => {

  const viewBox = "0 0 24 24";

  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="user-icon" transform={`rotate(${rotate} 12 12)`}>
        <g id="Vector">
          <path
            d="M8.54682 13.5789C8.42119 13.4965 8.27767 13.441 8.1274 13.441C5.85458 13.441 4.01209 15.2835 4.01209 17.5563C4.01209 17.5563 3.98489 17.1432 4.01209 18.2825C4.03929 19.4218 4.77195 20.6181 5.9487 20.7033C7.12544 20.7885 18.0526 20.7033 18.0526 20.7033C19.236 20.6236 19.9648 19.4207 19.9892 18.2825C20.0135 17.1444 19.9892 17.5563 19.9892 17.5563C19.9892 15.2835 18.1467 13.441 15.8739 13.441C15.7236 13.441 15.5801 13.4965 15.4544 13.5789C14.7208 14.0603 13.448 14.2883 12.0006 14.2883C10.5533 14.2883 9.28048 14.0603 8.54682 13.5789Z"
            fill={color}
          />
          <path
            d="M15.8739 7.87323C15.8739 10.0124 14.1398 11.7465 12.0006 11.7465C9.8615 11.7465 8.1274 10.0124 8.1274 7.87323C8.1274 5.7341 9.8615 4 12.0006 4C14.1398 4 15.8739 5.7341 15.8739 7.87323Z"
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
};

export default User;