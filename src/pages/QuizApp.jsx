// QuizApp.jsx
import { useState, useEffect } from 'react';
import Question from '../components/Question';
import Options from '../components/Options';
import Result from '../components/Result';
import { Button } from 'flowbite-react';
import { Link, useParams } from 'react-router-dom';
import { globalconfig } from '../config.js';
import { fetchImage } from '../utilities/imageSearch';
import ProgressBar from '../components/ProgressBar.jsx';
import Navbar from '../components/Navbar';

function QuizApp() {
  const { quizId } = useParams();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showRetryPrompt, setShowRetryPrompt] = useState(false);
  const [showPassMessage, setShowPassMessage] = useState(false);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [image, setImage] = useState(null);
  const [slideOut, setSlideOut] = useState(false);
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    console.log('in useEffect');
    console.log('qid', quizId);
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`https://erniejohnson.ca/apps/cquiz-api/users.php?qid=${quizId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        const data = await response.json();
        console.log('Quiz data:', data);
        setQuizData(data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, []);

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
    if (!quizData) return;
    // Set all questions from quizData.qna
    setQuizQuestions(quizData.qna);
  }, [quizData]);

  const handleAnswerClick = (selectedAnswer) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
  
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  
    // Slide out the current question
    
    // setSlideOut(true);
  
    // // Wait for a brief pause before moving to the next question
    // setTimeout(() => {
    //   // Add the current question to the list of asked questions
    //   if (!askedQuestions.includes(currentQuestion)) {
    //     setAskedQuestions([...askedQuestions, currentQuestion]);
    //   }
      
    //   // Reset slide out state
    //   setSlideOut(false);
  
    //   // Move to the next question after the pause
    //   setTimeout(() => {
    //     setCurrentQuestionIndex(currentQuestionIndex + 1);
    //   }, 500); // Adjust the duration of the pause before moving to the next question
  
    //   // End of the quiz (check if all questions have been asked)
    //   if (askedQuestions.length === quizQuestions.length) {
    //     if (score >= globalconfig.passingGrade / globalconfig.numQuestions) {
    //       setShowPassMessage(true);
    //       setShowRetryPrompt(false);
    //     } else {
    //       setShowRetryPrompt(true); // Show the retry prompt
    //       setShowPassMessage(false); // Hide pass message
    //     }
    //   }
    // }, 900); // Wait for the brief pause before starting the slide out animation

    const slideOutDelay = new Promise((resolve) => setTimeout(resolve, 800));
    
    slideOutDelay.then(() => {
      setSlideOut(true);  

      // Rest of the logic within handleAnswerClick...
      if (!askedQuestions.includes(currentQuestion)) {
          setAskedQuestions([...askedQuestions, currentQuestion]);
      }
      setTimeout(() => {
        setSlideOut(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (askedQuestions.length === quizQuestions.length) {
        if (score >= globalconfig.passingGrade / globalconfig.numQuestions) {
          setShowPassMessage(true);
          setShowRetryPrompt(false);
        } else {
          setShowRetryPrompt(true); // Show the retry prompt
          setShowPassMessage(false); // Hide pass message
        }
      }
      }, 500);
  });
};

  const handleRetryClick = () => {
    // Reset state variables
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowRetryPrompt(false);
    setShowPassMessage(false);
    setAskedQuestions([]);
  };

  return (
    <div className='h-full z-0'>
      {quizData ? (
        <div className={`flex flex-col h-full overflow-hidden bg-[url(${quizData.backgroundImage})]`}>
          <div className="dark flex flex-col items-center justify-center h-screen w-screen bg-black bg-opacity-40">
            <Navbar />
            <ProgressBar currentQuestionIndex={currentQuestionIndex} totalQuestions={quizQuestions.length} />
            <div className="relative top-[45px] text-5xl text-slate-300 font-extrabold p-4 font-sans">{quizData.quizName} ({quizId})</div>
            
            <div className='flex flex-col items-center justify-center h-full w-full'>
              {showRetryPrompt ? (
                <div className="bg-black bg-opacity-20 rounded-xl w-1/2 flex flex-col items-center">
                  <h2 className="text-4xl text-slate-300 font-bold ">Quiz Complete!!</h2>
                  <p className="text-2xl text-slate-400">Your Score: {score} / {quizQuestions.length}</p>
                  <p className="text-2xl text-slate-400">Would you like to try the test again?</p>
                  <span className="flex flex-row justify-center mt-4">
                    <Button className="mr-8" onClick={handleRetryClick}>Retry</Button>
                    <Button color="light" onClick={handleRetryClick}>Quit</Button>
                  </span>
                </div>
              ) : currentQuestionIndex < quizQuestions.length ? (
                <div className={`quiz-container flex flex-col w-full ml-12 bg-black bg-opacity-20 rounded-xl p-4 m-2 z-0 ${slideOut ? 'slide-out' : 'slide-in'}`}>
                  {/* {image && <img src={image} alt="Quiz" className="quiz-image" />} */}
                  <div className="quiz-content w-4/5">
                    <h2 className="text-2xl text-slate-400">Question {currentQuestionIndex + 1} of {quizQuestions.length} :</h2>
                    <Question question={quizQuestions[currentQuestionIndex].question} />
                    <div className="flex flex-col">
                      <div className="flex flex-col">
                        <Options
                          options={quizQuestions[currentQuestionIndex].options}
                          onAnswerClick={handleAnswerClick}
                          correctAnswer={quizQuestions[currentQuestionIndex].correctAnswer}
                        />
                      </div>
                      <p className="text-2xl text-slate-400">Your current score: {score} / {quizQuestions.length}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="quiz-container rounded-xl p-8 m-8">
                  {showPassMessage ? (
                    <div>
                      <h2>Congratulations, you passed!</h2>
                      <p>Your Score: {score} / {quizQuestions.length}</p>
                      <Button>select a new exam</Button>
                    </div>
                  ) : (
                    <Result score={score} totalQuestions={quizQuestions.length} handleRetryClick={handleRetryClick} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading quiz data...</div>
      )}
    </div>
  );
}

export default QuizApp;
