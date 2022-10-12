import React from "react";

const ProgressBar = ({ width, backgroundColor }) => {
  return (
    <div class="progress">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-label="Animated striped"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{
          width: width,
          backgroundColor: backgroundColor,
        }}
      >
        {/* 65% */}
      </div>
    </div>
  );
};

export default ProgressBar;
