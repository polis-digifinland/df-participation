import React from 'react';

const Thumb = ({ color = 'currentColor', width = 66, height = 66, rotate = 0, darkMode = 0 }) => {

  const viewBox = "0 0 70 70";

  // Conditionally set the size based on isHovered
  //const svgWidth = isHovered ? 70 : width;
  //const svgHeight = isHovered ? 70 : height;

  return (
    <svg id='svg-button' width={width} height={height} viewBox={viewBox} fill="none" style={{minHeight:"70px"}} xmlns="http://www.w3.org/2000/svg">
      <g id="Peukku" transform={`rotate(${rotate} 35 35)`}>
        <path
          d="M66 33C66 51.2254 51.2254 66 33 66C14.7746 66 0 51.2254 0 33C0 14.7746 14.7746 0 33 0C51.2254 0 66 14.7746 66 33Z"
          fill={color}
          />
        <path
          d="M42.6333 28.3271H37.5201C36.4892 28.3271 35.6536 27.4914 35.6536 26.4606V23.2379C35.6536 20.5409 33.9144 20.268 33.0088 20.3087C32.7024 20.3222 32.4482 20.5488 32.4012 20.852L32.242 21.8871C32.0661 23.0312 31.6934 24.1357 31.1406 25.1525L30.3326 26.6385C29.8613 27.506 29.6134 28.4774 29.6113 29.465L29.6113 40.8694C29.6113 41.4937 30.1171 41.9995 30.7413 41.9995H41.3607C42.4542 41.9995 43.3484 41.1053 43.3484 40.0123L44.6199 30.3137C44.6199 29.2212 43.7263 28.3271 42.6333 28.3271Z"
          fill={darkMode ? 'black' : 'white'}
          />
        <path
          d="M23.5849 41.9995H26.868C27.2785 41.9995 27.6113 41.6667 27.6113 41.2562L27.6113 29.0699C27.6113 28.6594 27.2785 28.3266 26.868 28.3266H23.5849C23.1744 28.3266 22.8416 28.6594 22.8416 29.0699L22.8416 41.2562C22.8416 41.6667 23.1744 41.9995 23.5849 41.9995Z"
          fill={darkMode ? 'black' : 'white'}
          />
      </g>
    </svg>
  );
};

export default Thumb;



