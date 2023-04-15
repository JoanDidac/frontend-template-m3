import React from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";
import './Loading.css';

// const override = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };

const Loading = ({ loading, color = "#ffffff", size = 150 }) => {
  return (
    <div className="loading-container">
      <PropagateLoader
        color="rgba(130, 0, 151, 1)"
        speedMultiplier={0.9}
      />
    </div>
  );
}

export default Loading;
