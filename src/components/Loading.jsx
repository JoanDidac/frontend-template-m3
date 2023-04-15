import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import './Loading.css';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loading = ({ loading, color = "#ffffff", size = 150 }) => {
  return (
    <div className="loading-container">
      <ClipLoader
        color={color}
        loading={loading}
        css={override}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loading;
