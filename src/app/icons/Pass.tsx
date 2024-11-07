import React from 'react';

const Pass = ({ fg = 'white', bg = 'black', width = 66, height = 66 }) => {

  const viewBox = "0 0 66 66";

  // Conditionally set the size based on isHovered
  //const svgWidth = isHovered ? 70 : width;
  //const svgHeight = isHovered ? 70 : height;

  return (
    <svg id='svg-button' width={width} height={height} viewBox={viewBox} fill="none" style={{minHeight:"70px"}} xmlns="http://www.w3.org/2000/svg">
      <g id="Vector">
        <path
          d="M66 33C66 51.2254 51.2254 66 33 66C14.7746 66 0 51.2254 0 33C0 14.7746 14.7746 0 33 0C51.2254 0 66 14.7746 66 33Z"
          fill={fg}
          />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32.5368 25.2929C32.9273 24.9024 33.5605 24.9024 33.951 25.2929L41.7071 33.049C41.8954 33.2373 42.0009 33.493 42 33.7594C41.9991 34.0257 41.892 34.2807 41.7025 34.4678L33.9464 42.1229C33.5533 42.5109 32.9201 42.5067 32.5322 42.1136C32.1442 41.7206 32.1484 41.0874 32.5415 40.6995L38.5632 34.7561H25C24.4477 34.7561 24 34.3084 24 33.7561C24 33.2038 24.4477 32.7561 25 32.7561H38.5858L32.5368 26.7071C32.1463 26.3166 32.1463 25.6834 32.5368 25.2929Z"
          fill={bg}
          />
      </g>
    </svg>
  );
};

export default Pass;
