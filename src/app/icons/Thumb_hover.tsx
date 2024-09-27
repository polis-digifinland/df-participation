import React from 'react';

const Thumb_hover = ({ color = 'currentColor', width = 43, height = 43, rotate = 0 }) => {

  const viewBox = "0 0 43 43";

  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Peukku" transform={`rotate(${rotate} 21.5 21.5)`}>
        <circle
          id="Ellipse 20"
          cx="21.5"
          cy="21.5"
          r="20.75"
          fill={color}
          stroke={color}
          stroke-width="1.5"
        />
        <g id="Peukku_2">
          <path
            id="Vector"
            fill="white"
            d="M11.5849 30L14.868 30C15.2785 30 15.6113 29.6672 15.6113 29.2567L15.6113 17.0704C15.6113 16.6599 15.2785 16.3271 14.868 16.3271L11.5849 16.3271C11.1744 16.3271 10.8416 16.6599 10.8416 17.0704L10.8416 29.2567C10.8416 29.6672 11.1744 30 11.5849 30Z"
          />
          <path
            id="Vector_2"
            fill="white"
            d="M31.0134 16.3272L25.9002 16.3272C24.8694 16.3272 24.0337 15.4915 24.0337 14.4606L24.0337 11.238C24.0337 8.54101 22.2945 8.26802 21.3889 8.30873C21.0825 8.3223 20.8283 8.54884 20.7813 8.8521L20.6221 9.88716C20.4462 11.0313 20.0735 12.1358 19.5208 13.1526L18.7128 14.6386C18.2414 15.5061 17.9935 16.4775 17.9914 17.465L17.9914 28.8695C17.9914 29.4937 18.4972 29.9995 19.1215 29.9995L29.7409 29.9995C30.8344 29.9995 31.7285 29.1054 31.7285 28.0124L33 18.3138C33 17.2213 32.1059 16.3266 31.0129 16.3266L31.0134 16.3272Z"
          />
        </g>
      </g>
    </svg>
  );
};

export default Thumb_hover;