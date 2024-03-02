// Options.jsx
import { useState, useEffect, useRef } from 'react';

function Options({ options, onAnswerClick }) {
  // Shuffle the answer options
  const shuffledOptions = [...options];
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
  }

  // Function to convert index to letter (A, B, C, ...)
  const indexToLetter = (index) => {
    return String.fromCharCode(65 + index); // 65 is ASCII code for 'A'
  };
  const letterToIndex = (letter) => {
    return letter.charCodeAt(0) - 65; // Convert ASCII code to index
  };

  // Reference to the first button element
  const firstButtonRef = useRef(null);

  // Effect to focus on the first button when the component mounts
  useEffect(() => {
    if (firstButtonRef.current) {
      firstButtonRef.current.focus();
    }
  }, []);

  // Array to store valid key presses
  const validKeyCodes = shuffledOptions.map((option, index) => {
    return 65 + index; // ASCII code for 'A' + index
  });
  

  return (
    <div className="options">
      {shuffledOptions.map((option, index) => (
        <button
          key={index}
          ref={index === 0 ? firstButtonRef : null}
          className="option text-2xl text-sky-600 p-2 m-2 border-2 border-slate-500 rounded-lg hover:bg-slate-500 hover:text-white text-left bg-slate-800 opacity-70 focus:outline-none"
          onClick={() => onAnswerClick(option)}
          onKeyDown={(event) => {
            // Check if the pressed key is a valid option
            if (validKeyCodes.includes(event.keyCode)) {
              // Convert the keyCode back to its corresponding option index
              const selectedOptionIndex = event.keyCode - 65;
              // Ensure the selected index is within the range of options
              if (selectedOptionIndex < shuffledOptions.length) {
                const selectedOption = shuffledOptions[selectedOptionIndex];
                // Call the onAnswerClick function with the selected option
                onAnswerClick(selectedOption);
              }
            }
          }}
          tabIndex={0}
        >
          <span className="border-2 border-slate-600 bg-slate-700 border-2 border-slate-600 mr-2 pl-2 pr-2 rounded-lg">{indexToLetter(index)}</span> {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
