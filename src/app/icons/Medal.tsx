import React from 'react';

const Medal = ({ color = 'currentColor', width = 80, height = 80 }) => {

  const viewBox = "0 0 80 80";

  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40.07 79.7559C25.7 79.7559 14 68.0659 14 53.6859C14 39.3059 25.69 27.6159 40.07 27.6159C54.45 27.6159 66.14 39.3059 66.14 53.6859C66.14 68.0659 54.45 79.7559 40.07 79.7559ZM40.07 31.3659C27.76 31.3659 17.75 41.3759 17.75 53.6859C17.75 65.9959 27.76 76.0059 40.07 76.0059C52.38 76.0059 62.39 65.9959 62.39 53.6859C62.39 41.3759 52.38 31.3659 40.07 31.3659Z" fill={color}/>
      <path d="M32.06 68.0959C31.42 68.0959 30.79 67.8959 30.25 67.5059C29.35 66.8559 28.88 65.8059 28.99 64.7059L29.72 57.3559L24.81 51.8359C24.07 51.0059 23.84 49.8859 24.18 48.8359C24.52 47.7859 25.37 47.0159 26.45 46.7759L33.66 45.1959L37.39 38.8259C37.95 37.8659 38.94 37.2959 40.05 37.2959C41.16 37.2959 42.15 37.8659 42.71 38.8259L46.44 45.1959L53.65 46.7759C54.73 47.0159 55.58 47.7859 55.92 48.8359C56.26 49.8859 56.03 51.0159 55.29 51.8359L50.38 57.3559L51.11 64.7059C51.22 65.8059 50.75 66.8559 49.85 67.5059C48.95 68.1559 47.81 68.2759 46.8 67.8359L40.04 64.8759L33.28 67.8359C32.88 68.0159 32.45 68.0959 32.04 68.0959H32.06ZM40.07 61.0559C40.49 61.0559 40.91 61.1359 41.3 61.3159L47.29 63.9359L46.65 57.4259C46.57 56.5659 46.85 55.7159 47.42 55.0659L51.76 50.1859L45.37 48.7859C44.53 48.6059 43.8 48.0759 43.37 47.3259L40.07 41.6859L36.77 47.3259C36.34 48.0659 35.61 48.5959 34.77 48.7859L28.38 50.1859L32.72 55.0659C33.29 55.7059 33.57 56.5659 33.48 57.4159L32.84 63.9259L38.83 61.3059C39.22 61.1359 39.65 61.0459 40.07 61.0459V61.0559Z" fill={color}/>
      <path d="M46.72 26.5259H33.41C32.69 26.5259 32.04 26.1159 31.73 25.4759C31.42 24.8359 31.49 24.0659 31.93 23.4959L48.87 1.72591C49.51 0.905914 50.68 0.765914 51.5 1.39591C52.32 2.03591 52.46 3.20591 51.83 4.02591L37.25 22.7759H45.81L62.18 1.72591C62.82 0.905914 63.99 0.765914 64.81 1.39591C65.63 2.03591 65.77 3.20591 65.14 4.02591L48.2 25.7959C47.84 26.2559 47.3 26.5159 46.72 26.5159V26.5259Z" fill={color}/>
      <path d="M37 14.0359C36.44 14.0359 35.89 13.7859 35.52 13.3159L28.31 4.03591C27.67 3.21591 27.82 2.03591 28.64 1.40591C29.46 0.775914 30.64 0.915914 31.27 1.73591L38.48 11.0159C39.12 11.8359 38.97 13.0159 38.15 13.6459C37.81 13.9159 37.4 14.0359 37 14.0359Z" fill={color}/>
      <path d="M30.34 22.5859C29.78 22.5859 29.23 22.3359 28.86 21.8659L15 4.03591C14.36 3.21591 14.51 2.03591 15.33 1.40591C16.15 0.775914 17.33 0.915914 17.96 1.73591L31.82 19.5659C32.46 20.3859 32.31 21.5659 31.49 22.1959C31.15 22.4659 30.74 22.5859 30.34 22.5859Z" fill={color}/>
      <path d="M30.39 33.3859C29.35 33.3859 28.51 32.5459 28.51 31.5059V28.2759C28.51 27.2359 29.35 26.3959 30.39 26.3959C31.43 26.3959 32.27 27.2359 32.27 28.2759V31.5059C32.27 32.5459 31.43 33.3859 30.39 33.3859Z" fill={color}/>
      <path d="M49.75 33.3859C48.71 33.3859 47.87 32.5459 47.87 31.5059V28.2759C47.87 27.2359 48.71 26.3959 49.75 26.3959C50.79 26.3959 51.63 27.2359 51.63 28.2759V31.5059C51.63 32.5459 50.79 33.3859 49.75 33.3859Z" fill={color}/>
    </svg>
  );
};

export default Medal;