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
          className="option"
          onClick={() => onAnswerClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
