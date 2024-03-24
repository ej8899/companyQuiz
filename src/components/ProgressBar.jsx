// ProgressBar.jsx
import React from 'react';

function ProgressBar({ totalQuestions, currentQuestionIndex }) {
  // Calculate the progress percentage
  const progress = (currentQuestionIndex / totalQuestions) * 100;
// console.log(progress);
// console.log(totalQuestions);
// console.log(currentQuestionIndex);
  return (
    <div className="progress-bar-container w-full bg-gray-700 h-6 overflow-hidden opacity-70 relative top-0">
      <div
        className="progress-bar bg-blue-500 h-full transition-width rounded-md opacity-100"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
