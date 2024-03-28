import React from 'react';

const HorizontalBarGraph = ({ passPercent = 0 }) => {
  const progress = Math.min(Math.max(passPercent, 0), 100); // Clamp between 0 and 100

  return (
    <div className="h-4 relative rounded-lg overflow-hidden">
      {/* Red bar */}
      <div className="h-full w-full bg-red-500" />
      {/* Green progress bar */}
      <div
        className="absolute top-0 left-0 bottom-0 bg-green-500"
        style={{ width: `${progress}%` }}
      />
      {/* Pass percentage text */}
      <div className="absolute top-0 left-0 bottom-0 w-full flex items-center justify-center text-slate-800 pointer-events-none">
        {passPercent}%
      </div>
    </div>
  );
};

export default HorizontalBarGraph;
