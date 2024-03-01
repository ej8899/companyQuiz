// Result.jsx
import React from 'react';

function Result({ score, totalQuestions }) {
  const percentage = ((score / totalQuestions) * 100).toFixed(2);

  return (
    <div>
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score} / {totalQuestions}</p>
      <p>Percentage: {percentage}%</p>
    </div>
  );
}

export default Result;
