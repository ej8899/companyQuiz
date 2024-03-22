// Result.jsx
import React from 'react';
import { Button } from 'flowbite-react';

function Result({ score, totalQuestions, handleRetryClick }) {
  const percentage = ((score / totalQuestions) * 100).toFixed(0);

  return (
    <div className="bg-black bg-opacity-20 rounded-xl flex flex-col items-center w-full m-8 p-8">
    <h2 className="text-4xl text-slate-300 font-bold ">Quiz Complete!</h2>
    <p className="text-2xl text-slate-400 mt-4">Your Score: {score} / {totalQuestions} ({percentage}%)</p>
    <p className="text-2xl text-slate-400 mt-4">Would you like to try the test again?</p>
    <span className="flex flex-row justify-center mt-4">
      <Button className="mr-8" onClick={handleRetryClick}>Retry</Button>
      <Button color="light" onClick={handleRetryClick}>Quit</Button>
    </span>
  </div>
  );
}

export default Result;
