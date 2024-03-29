// Options.jsx
import { useState, useEffect, useRef } from 'react';

function Options({ options, onAnswerClick, correctAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Shuffle the answer options
  const shuffledOptions = [...options];
  // TODO how to allow shuffle of items, but not after click? -perhaps shuffle when data is loaded - not now when data is being presented - would need to take into account a survey quiz with fixed position options
  // for (let i = shuffledOptions.length - 1; i > 0; i--) {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
  // }


  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
    onAnswerClick(option);
  };

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
    <div className="options flex flex-col">
      {shuffledOptions.map((option, index) => (
        <button
          key={index}
          ref={index === 0 ? firstButtonRef : null}
          className={`option text-2xl text-sky-600 p-2 m-2 border-2 border-slate-500 rounded-lg hover:bg-slate-500 hover:text-white text-left bg-slate-800 opacity-70 focus:outline-none ${
            selectedAnswer === option
              ? option === correctAnswer
                ? 'border-green-500'
                : 'border-red-500'
              : 'border-slate-500'
          }`}
          onClick={() => handleOptionClick(option)}
          onKeyDown={(event) => {
            // Check if the pressed key is a valid option
            if (validKeyCodes.includes(event.keyCode)) {
              // Convert the keyCode back to its corresponding option index
              const selectedOptionIndex = event.keyCode - 65;
              // Ensure the selected index is within the range of options
              if (selectedOptionIndex < shuffledOptions.length) {
                const selectedOption = shuffledOptions[selectedOptionIndex];
                // Call the onAnswerClick function with the selected option
                handleOptionClick(selectedOption);
              }
            }
          }}
          tabIndex={0}
        >
          <span className="border-2 border-slate-600 bg-slate-700 border-2 border-slate-600 mr-2 pl-2 pr-2 rounded-lg">{indexToLetter(index)}</span> {option}
          {/* <br/>
          {selectedAnswer}<br/>
          {correctAnswer} */}
        </button>
      ))}
    </div>
  );
}

export default Options;
