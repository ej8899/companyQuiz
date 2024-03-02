// Options.jsx
import React, { useState, useEffect } from 'react';

function Options({ options, onAnswerClick }) {
  // Shuffle the answer options
  const shuffledOptions = [...options];
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
  }

  return (
    <div className="options">
      {shuffledOptions.map((option, index) => (
        <button
          key={index}
          className="option text-2xl text-sky-700 p-2 m-2 border-2 border-slate-500 rounded-lg hover:bg-slate-500 hover:text-white"
          onClick={() => onAnswerClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
