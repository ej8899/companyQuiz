// QuizApp.jsx
import { useState, useEffect } from 'react';

import Question from '../components/Question';
import Options from '../components/Options';
import Result from '../components/Result';
import { Button } from 'flowbite-react';

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
    // Wait for a brief pause before starting the slide out animation
    setTimeout(() => {
      // Slide out the current question
      setSlideOut(true);
  
      // Wait for a brief pause before moving to the next question
      setTimeout(() => {
        // Add the current question to the list of asked questions
        setAskedQuestions([...askedQuestions, currentQuestion]);
        // Reset slide out state
        setSlideOut(false);
  
        // Get the next question
        const nextQuestion = getNextQuestion();
  
        if (nextQuestion) {
          // Move to the next question after the pause
          setTimeout(() => {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          }, 500); // Adjust the duration of the pause before moving to the next question
        }
  
        // End of the quiz (check if currentQuestionIndex is the last question)
        if (currentQuestionIndex >= quizQuestions.length - 1) {
          if (score >= globalconfig.passingGrade / globalconfig.numQuestions) {
            setShowPassMessage(true);
            setShowRetryPrompt(false);
          } else {
            setShowRetryPrompt(true); // Show the retry prompt
            setShowPassMessage(false); // Hide pass message
          }
        }
      }, 700); // Wait for the slide out animation duration
    }, 900); // Wait for the brief pause before starting the slide out animation
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
      <div className={`flex flex-col  h-dvh z-50 overflow-hidden bg-[url(${quizData.backgroundImage})]`}>
      <ProgressBar currentQuestionIndex={currentQuestionIndex } totalQuestions={quizQuestions.length} />
      <div className="sticky top-0 text-5xl text-slate-300 font-extrabold z-50 p-4 font-sans">{quizData.quizName}</div>
      
      <div className='flex flex-col justify-center h-full'>
      {showRetryPrompt ? (
        <div className="bg-black bg-opacity-20 rounded-xl w-1/2 flex flex-col items-center">
          <h2 className="text-4xl text-slate-300 font-bold ">Quiz Complete!</h2>
          <p className="text-2xl text-slate-400">Your Score: {score} / {quizQuestions.length}</p>
          <p className="text-2xl text-slate-400">Would you like to try the test again?</p>
          <Button onClick={handleRetryClick}>Retry</Button>
        </div>
      ) : currentQuestionIndex < quizQuestions.length ? (
        <div className={`quiz-container flex flex-col bg-black bg-opacity-20 rounded-xl p-4 m-2 z-0 ${slideOut ? 'slide-out' : 'slide-in'}`}>
          {/* {image && <img src={image} alt="Quiz" className="quiz-image" />} */}
          <div className="quiz-content w-4/5">
            <h2 className="text-2xl text-slate-300">Question {currentQuestionIndex + 1}:</h2>
            <Question question={quizQuestions[currentQuestionIndex].question} />
            <div className="flex flex-col">
              <div className="flex flex-col">
                <Options
                  options={quizQuestions[currentQuestionIndex].options}
                  onAnswerClick={handleAnswerClick}
                  correctAnswer={quizQuestions[currentQuestionIndex].correctAnswer}
                />
              </div>
              <p className="text-2xl text-slate-400">Your Score: {score} / {quizQuestions.length} (hint)</p>
            </div>
          </div>

        </div>
      ) : (
        <div className="quiz-container">
          {showPassMessage ? (
            <div>
              <h2>Congratulations, you passed!</h2>
              <p>Your Score: {score} / {quizQuestions.length}</p>
              <Button>select a new exam</Button>
            </div>
          ) : (
            <Result score={score} totalQuestions={quizQuestions.length} />
          )}
        </div>
      )}
      </div>
    </div>
    </>
  );
}

export default QuizApp;
