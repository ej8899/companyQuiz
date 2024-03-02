// QuizApp.jsx
import { useState, useEffect } from 'react';

import Question from '../components/Question';
import Options from '../components/Options';
import Result from '../components/Result';

import { globalconfig } from '../config.js';

import  quizData from '../quizdata.js'; 

import { fetchImage } from '../utilities/imageSearch';
import ProgressBar from '../components/ProgressBar.jsx';

function QuizApp() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showRetryPrompt, setShowRetryPrompt] = useState(false);
  const [showPassMessage, setShowPassMessage] = useState(false);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [image, setImage] = useState(null);
  const [slideOut, setSlideOut] = useState(false);

  // Shuffle function to randomize questions
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    // Fetch an image for the current question's image keyword
    if (quizQuestions[currentQuestionIndex] && quizQuestions[currentQuestionIndex].image) {
      fetchImage(quizQuestions[currentQuestionIndex].image)
        .then((imageURL) => {
          setImage(imageURL);
        })
        .catch((error) => {
          console.error('Error fetching image:', error);
        });
    }
  }, [quizQuestions, currentQuestionIndex]);

  useEffect(() => {
    // Shuffle the quizData array to randomize the questions
    const shuffledQuestions = shuffleArray(quizData.qna);
    // Select the first 10 questions, excluding those that have already been asked
    const remainingQuestions = shuffledQuestions.filter(
      (question) => !askedQuestions.includes(question)
    );
    const selectedQuestions = remainingQuestions.slice(0, globalconfig.numQuestions);
    setQuizQuestions(selectedQuestions);
  }, [askedQuestions]);

  const getNextQuestion = () => {
    // Filter out questions that have already been asked
    const remainingQuestions = quizQuestions.filter(
      (question) => !askedQuestions.includes(question)
    );

    // If there are remaining questions, return the first one
    if (remainingQuestions.length > 0) {
      return remainingQuestions[0];
    } else {
      // If all questions have been asked, return null
      return null;
    }
  };

  const handleAnswerClick = (selectedAnswer) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  
    // Add the current question to the list of asked questions
    setAskedQuestions([...askedQuestions, currentQuestion]);
  
    // Slide out the current question
    setSlideOut(true);
  
    // Wait for the slide out animation to finish before moving to the next question
    setTimeout(() => {
      // Get the next question
      const nextQuestion = getNextQuestion();
    
      if (nextQuestion) {
        // Move to the next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        // Reset slide out state
        setSlideOut(false);
      }
    
      // End of the quiz (check if currentQuestionIndex is the last question)
      if (currentQuestionIndex >= quizQuestions.length - 1) {
        if (score >= (globalconfig.passingGrade / globalconfig.numQuestions)) {
          setShowPassMessage(true);
          setShowRetryPrompt(false);
        }
        else {
          setShowRetryPrompt(true); // Show the retry prompt
          setShowPassMessage(false); // Hide pass message
        }
      }
    }, 500); // Wait for the slide out animation duration
  };

  const handleRetryClick = () => {
    // Reset the quiz by shuffling questions again
    const shuffledQuestions = shuffleArray(quizData.qna);
    // Select the first 10 questions, excluding those that have already been asked
    const remainingQuestions = shuffledQuestions.filter(
      (question) => !askedQuestions.includes(question)
    );
    const selectedQuestions = remainingQuestions.slice(0, globalconfig.numQuestions);
    setQuizQuestions(selectedQuestions);

    // Reset state variables
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowRetryPrompt(false);
    setShowPassMessage(false);
    setAskedQuestions([]);
  };

  return (
      <>
      <ProgressBar currentQuestionIndex={currentQuestionIndex} totalQuestions={quizQuestions.length} />
      <div className={`flex flex-col justify-center h-svh z-50 overflow-hidden bg-[url(${quizData.backgroundImage})]`}>
      {showRetryPrompt ? (
        <div>
          <h2>Quiz Complete!</h2>
          <p>Your Score: {score} / {quizQuestions.length}</p>
          <p>Would you like to try the test again?</p>
          <button onClick={handleRetryClick}>Retry</button>
        </div>
      ) : currentQuestionIndex < quizQuestions.length ? (
        <div className={`quiz-container bg-black bg-opacity-20 rounded-xl p-4 m-2 z-0 ${slideOut ? 'slide-out' : 'slide-in'}`}>
          {/* {image && <img src={image} alt="Quiz" className="quiz-image" />} */}
          <div className="quiz-content w-4/5">
            <h2 className="text-2xl text-slate-300">Question {currentQuestionIndex + 1}:</h2>
            <Question question={quizQuestions[currentQuestionIndex].question} />
            <Options
              options={quizQuestions[currentQuestionIndex].options}
              onAnswerClick={handleAnswerClick}
            />
            <p className="text-2xl text-slate-400">Your Score: {score} / {quizQuestions.length}</p>
          </div>
        </div>
      ) : (
        <div className="quiz-container">
          {showPassMessage ? (
            <div>
              <h2>Congratulations, you passed!</h2>
              <p>Your Score: {score} / {quizQuestions.length}</p>
            </div>
          ) : (
            <Result score={score} totalQuestions={quizQuestions.length} />
          )}
        </div>
      )}
    </div>
    </>
  );
}

export default QuizApp;
