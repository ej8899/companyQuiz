import React, { useEffect, useState } from 'react';
import { Button, Modal, Label, TextInput, Select, RangeSlider, Spinner, Tooltip  } from 'flowbite-react';
import { HiSparkles } from "react-icons/hi2";
import Popover from './Popover';

function AiQuiz({ show, onClose }) {
  const [quizData, setQuizData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [numQuestions, setnumQuestions] = useState(10);
  const [numOptions, setnumOptions] = useState(4);
  const [loading, setLoading] = useState(false);

  const handleGenerateQuiz = async () => {
    setLoading(true);
    if (!searchTerm.trim()) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`https://erniejohnson.ca/apps/cquiz-api/users.php?numQuestions=${numQuestions}&numOptions=${numOptions}&subject=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
      }
      const data = await response.json();
      setQuizData(data[0]); // Accessing the first element of the array
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    } finally {
      setLoading(false); // Stop loading message
    }
  };

  const highlightOption = (isCorrect) => {
    return isCorrect === 'true' || isCorrect === true ? 'text-green-700 dark:text-green-500' : 'text-slate-700 dark:text-slate-400';
  };

  useEffect(() => {
    console.log('Quiz data changed:', quizData);
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
        <Modal.Header><span className="flex flex-row font-semibold text-2xl items-center font-sans"><HiSparkles className="h-8 w-8 mr-2" /> AI Quiz Builder <Popover content="AI responses can sometimes be a bit awkward to decipher.  To aid in this, please be relatively descriptive in providing a search term!" title="AI can be awkward..." />
   </span></Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
        
          <div className="flex flex-col">
  <div className="flex justify-between mb-2">
    <div className="mb-2 block">
      <Label htmlFor="searchTerm" value="What is your quiz about?" className="text-md" />
      <TextInput
        id="searchterm"
        placeholder="search term"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        required
        color={!searchTerm.trim() ? "failure" : "gray"} 
      />
    </div>
    
    <div className="mb-2 block">
      <Label htmlFor="numQuestions" value="# of Questions" className="text-md"/>
      <Select id="numQuestions" onChange={handleNumQuestionsChange} required value={numQuestions}>
        <option>5</option>
        <option>10</option>
        <option>15</option>
        <option>20</option>
        <option>25</option>
      </Select>
    </div>
    <div className="mb-2 block">
      <Label htmlFor="numOptions" value="# of Options" className="text-md"/>
      <Select id="numOptions" onChange={handleNumOptionsChange} required  value={numOptions}>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </Select>
    </div>
    <div className="flex justify-end mt-6 gap-y-4 mb-2 block ">      
      <Button onClick={handleGenerateQuiz} className="mr-4"><HiSparkles className="h-6 w-6 mr-2" />Generate Quiz</Button>
      <Button onClick={handleReset} color="failure">Reset</Button>
    </div>
  </div>

  
</div>





{loading ? (
  <div className="flex flex-col items-center justify-center">
    <div className="text-center pt-4"><Spinner size="xl" /></div>
    <p className="mb-4 pt-4 text-xl font-semibold text-gray-900 dark:text-white">Building a quiz... this can take several seconds, please be patient!</p>  
  </div>
) : (
  <>
    {quizData.length > 0 && (
      <div>
        {quizData.map((question, index) => (
          <div key={index} className="pt-2 pb-2 text-left border-t border-gray-400 dark:border-gray-200">
            <div>
              <h2 className="mb-2 text-md font-bold text-gray-900 dark:text-white">{question.question}</h2>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex} className={`py-1 ${highlightOption(option.isCorrect)}`}>
                    {option.option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="pt-2 pb-2 text-left border-t border-gray-400 dark:border-gray-200 flex justify-end">
          <Tooltip content="This feature is for enterprise subscribers!"><Button className="mr-4">Copy this quiz to Company</Button></Tooltip>
          <Button onClick={handleReset} color="failure">Reset</Button>
        </div>
      </div>
    )}
  </>
)}

          </div>
        </Modal.Body>
        <Modal.Footer>
          
          {/* <Button color="gray" onClick={onClose}>
            Abort
          </Button> */}
        </Modal.Footer>
      </Modal>
    
  );
}

export default AiQuiz;
