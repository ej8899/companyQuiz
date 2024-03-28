import React, { useEffect, useState } from 'react';
import { Button, Modal, Label, TextInput, Select, RangeSlider, Spinner, Tooltip  } from 'flowbite-react';
import { HiSparkles } from "react-icons/hi2";
import Popover from './Popover';
import { FaRegFileAlt } from "react-icons/fa";

function PreviewQuiz({ show, onClose, qid, qname }) {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const highlightOption = (isCorrect) => {
    return isCorrect === 'true' || isCorrect === true ? 'text-green-700 dark:text-green-500' : 'text-slate-700 dark:text-slate-400';
  };


  useEffect(() => {
    if(!show) return;
    setLoading(true);
    console.log('in useEffect');
    console.log('quizId in previewQuiz:', qid);
    
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`https://erniejohnson.ca/apps/cquiz-api/users.php?qid=${qid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        const data = await response.json();
        setTimeout(() => {
          console.log('Quiz data for preview:', data.qna);
          setQuizData(data.qna);
          setLoading(false);
        }, 800);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, [show,qid]);




  useEffect(() => {
    // console.log('Quiz data changed:', quizData);
  }, [quizData]);

  const handleNumQuestionsChange = (event) => {
    setnumQuestions(parseInt(event.target.value));
  };
  
  const handleNumOptionsChange = (event) => {
    setnumOptions(parseInt(event.target.value));
  };

  const handleReset = () => {
    setSearchTerm('');
    setnumQuestions(10);
    setnumOptions(4);
    setQuizData([]);
  };


  return (
    <Modal show={show} onClose={onClose} size="4xl">
        <Modal.Header><span className="flex flex-row font-semibold text-2xl items-center font-sans"><FaRegFileAlt className="h-8 w-8  hover:text-sky-700 mr-2"/>Preview Quiz: {qname}
   </span></Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
        
          <div className="flex flex-col">
  <div className="flex justify-between mb-2">
    
  </div>
</div>





{loading ? (
  <div className="flex flex-col items-center justify-center">
    <div className="text-center pt-4"><Spinner size="xl" /></div>
    <p className="mb-4 pt-4 text-xl font-semibold text-gray-900 dark:text-white">Loading Quiz for Preview</p>  
  </div>
) : (
  <>
  
  <div>
  {quizData.map((question, index) => (
    <div key={index} className="pt-2 pb-2 text-left border-t border-gray-400 dark:border-gray-200">
      <div>
        <h2 className="mb-2 text-md font-bold text-gray-900 dark:text-white">{index+1}. {question.question}</h2>
        <ul>
          {question.options.map((option, optionIndex) => (
            <li key={optionIndex} className={`py-1 ${option === question.correctAnswer ? 'text-green-700 dark:text-green-500' : 'text-slate-700 dark:text-slate-400'}`}>
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ))}
</div>

    
  </>
)}

          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-row justify-end w-full">
          <Button  onClick={onClose}>
            Close Preview
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
    
  );
}

export default PreviewQuiz;
