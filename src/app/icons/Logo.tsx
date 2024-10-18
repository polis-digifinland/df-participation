import React from 'react';

const Logo = ({ fg = 'white', bg = 'black', width = 64, height = 70 }) => {

  const viewBox = "0 0 64 70";

  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="logo_hexagon">
        <g id="Vector">
            <path
              fill={bg}
              d="M28.3882 0.967765C30.6232 -0.322588 33.3768 -0.322588 35.6117 0.967765L59.6669 14.856C61.9018 16.1464 63.2786 18.531 63.2786 21.1117V48.8883C63.2786 51.469 61.9018 53.8536 59.6669 55.144L35.6117 69.0322C33.3768 70.3226 30.6232 70.3226 28.3882 69.0322L4.33306 55.144C2.0981 53.8536 0.721313 51.469 0.721313 48.8883V21.1117C0.721313 18.531 2.0981 16.1464 4.33306 14.856L28.3882 0.967765Z"
            />
            <path
              fill={fg}
              d="M32.632 42.5245C31.3278 42.5245 30.154 42.1834 29.1106 41.5011C28.0872 40.8189 27.2746 39.9762 26.6726 38.9729V48.6343H24.626V26.5425H26.462V29.5824C27.084 28.5992 27.9167 27.8066 28.9601 27.2046C30.0035 26.5826 31.1171 26.2716 32.3009 26.2716C33.3845 26.2716 34.3777 26.5024 35.2806 26.9639C36.1836 27.4053 36.9661 28.0073 37.6283 28.7697C38.2904 29.5322 38.8021 30.4051 39.1633 31.3883C39.5445 32.3514 39.7351 33.3546 39.7351 34.398C39.7351 35.8628 39.4342 37.2172 38.8322 38.4613C38.2503 39.6852 37.4276 40.6684 36.3642 41.4109C35.3007 42.1533 34.0567 42.5245 32.632 42.5245ZM32.0602 40.7186C32.923 40.7186 33.6955 40.548 34.3777 40.2069C35.0599 39.8458 35.6418 39.3642 36.1234 38.7622C36.625 38.1603 37.0063 37.4881 37.2671 36.7457C37.5279 35.9832 37.6584 35.2007 37.6584 34.398C37.6584 33.5553 37.5079 32.7527 37.2069 31.9902C36.926 31.2277 36.5147 30.5555 35.9729 29.9737C35.4311 29.3918 34.8091 28.9303 34.1068 28.5891C33.4045 28.248 32.6421 28.0775 31.8194 28.0775C31.2977 28.0775 30.7559 28.1778 30.1941 28.3785C29.6323 28.5791 29.0905 28.8701 28.5688 29.2513C28.0672 29.6125 27.6458 30.0238 27.3047 30.4853C26.9636 30.9468 26.7529 31.4384 26.6726 31.9601V36.7758C26.9937 37.5182 27.4251 38.1904 27.9668 38.7923C28.5086 39.3742 29.1306 39.8458 29.8329 40.2069C30.5553 40.548 31.2977 40.7186 32.0602 40.7186Z"
            />
            <path
              fill={fg}
              d="M42.8352 40.1166C42.8352 39.618 43.2395 39.2137 43.7381 39.2137C44.2368 39.2137 44.6411 39.618 44.6411 40.1166C44.6411 40.6153 44.2368 41.0196 43.7381 41.0196C43.2395 41.0196 42.8352 40.6153 42.8352 40.1166Z"
            />
        </g>
      </g>
    </svg>  
  );
};

export default Logo;