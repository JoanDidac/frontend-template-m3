// components/Loading.jsx
import React from 'react';
import './Loading.css';

export default function Loading() {
  return (
    <div className="loading-container">
      <div style={{width:'100%',height:'0',paddingBottom:'56%',position:'relative'}}>
        <iframe
          title='loading-gif'  
          src="https://giphy.com/embed/5xTJuwonEY1aPz3BIc"
          width="100%"
          height="100%"
          style={{position:'absolute'}}
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        />
      </div>
      <img src="https://giphy.com/embed/5xTJuwonEY1aPz3BIc" alt='loading-gif'>
      <p>
        Loading...{/* <a href="https://giphy.com/gifs/drone-drones-autel-5xTJuwonEY1aPz3BIc">via GIPHY</a> */}
      </p>
      </img>
    </div>
  );
}
