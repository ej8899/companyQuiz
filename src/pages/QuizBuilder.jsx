import  { useState, useEffect } from 'react';
import { Button, Spinner, Select } from 'flowbite-react';

// import { quizData } from '../quizdata.js';
import Navbar from '../components/Navbar'
import { setPageTitle } from '../utilities/helpers.js';
import ImageSearch from '../components/ImageSearch'; // Import the ImageSearch component
import { ToggleSwitch } from 'flowbite-react';
import { useParams, useLocation } from 'react-router-dom';
import { generateUUID } from '../utilities/helpers.js'
import { GiCheckMark } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";

const QuizBuilder = ({adminId}) => {
  const { quizId } = useParams();
  const [formData, setFormData] = useState({
    quizID: '',
    quizName: '',
    passingGrade: 0,
    qna: []
  });
  const [switch2, setSwitch2] = useState(true);
  const [loading, setLoading] = useState(false);  // loading message state
  const location = useLocation();
  const data = location;

  console.log('data (state) in qbuilder:', data.state);
  console.log('userId in qbuilder (state):',data.state.userId)
console.log('company in quizbuilder (state):',data.state.company)
console.log('industry in quizbuilder: (state)',data.state.industry)


  useEffect(() => {
    // Scroll to the top when the component mounts - not sure why it's not default starting at top
    // TODO why do we need to do this?  why is it starting on "Questions" h2 tag??
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (quizId !== 'new' && quizId !== null) {
      const fetchQuizData = async () => {
        try {
          setLoading(true);
          const response = await fetch(`https://erniejohnson.ca/apps/cquiz-api/users.php?qid=${quizId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch quiz data');
          }
          const data = await response.json();
          setTimeout(() => {
            setLoading(false);
          }, 500);
          
          console.log('Quiz data:', data);
          setFormData(data);
        } catch (error) {
          console.error('Error fetching quiz data:', error);
          setLoading(false);
        }
      };
      fetchQuizData();
    } else if (quizId === 'new') {
      const newQuizData = {
        quizID: generateUUID(),
        quizName: 'New Quiz',
        passingGrade: 80,
        qna: []
      };
      setFormData(newQuizData);
      setPageTitle('Quiz Builder: New Quiz');
    }
  }, [quizId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.qna];
    updatedQuestions[index][field] = value;
    setFormData({
      ...formData,
      qna: updatedQuestions
    });
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedQuestions = [...formData.qna];
    updatedQuestions[questionIndex].options[answerIndex] = value; // Update value directly
    setFormData({
      ...formData,
      qna: updatedQuestions,
    });
  };
  

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...formData.qna];
    updatedQuestions[questionIndex].correctAnswer = updatedQuestions[questionIndex].options[optionIndex];
    setFormData({
      ...formData,
      qna: updatedQuestions,
    });
  };

  const addQuestion = () => {
    const newQuestion = {
      question: '',
      options: ['', '', ''], // Initialize options with empty strings
      correctAnswer: null,
      image: ''
    };
    setFormData({
      ...formData,
      qna: [...formData.qna, newQuestion]
    });
  };
  

  const deleteQuestion = (index) => {
    const updatedQuestions = [...formData.qna];
    updatedQuestions.splice(index, 1);
    setFormData({
      ...formData,
      qna: updatedQuestions
    });
  };

  const addAnswer = (questionIndex) => {
    const updatedQuestions = [...formData.qna];
    updatedQuestions[questionIndex].options.push('');
    setFormData({
      ...formData,
      qna: updatedQuestions,
    });
  };
  
  
  

  const deleteAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...formData.qna];
    updatedQuestions[questionIndex].options.splice(answerIndex, 1);
    setFormData({
      ...formData,
      qna: updatedQuestions
    });
  };

  // const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
  //   const updatedQuestions = [...formData.qna];
  //   updatedQuestions[questionIndex].correctAnswer = optionIndex;
  //   setFormData({
  //     ...formData,
  //     qna: updatedQuestions
  //   });
  // };

  const handleImageSelect = (imageUrl) => {
    // Set the selected image URL to the current question
    // You can implement this according to your data structure
    console.log('Selected image:', imageUrl);
  };

  return (
    <>
    <Navbar home={`/admin/${data.state.userId}`}/>
    <div className="mt-20 ml-8 pb-40">
      <h1 className="px-6 py-0 text-center text-3xl font-bold font-sans text-gray-500 tracking-wider">Quiz Builder</h1>
      {loading ? ( // Show loading message if loading is true
          <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center pt-40"><Spinner size="xl" /></div>
          <p className="mb-4 pt-4 text-xl font-semibold text-gray-900 dark:text-white">Loading Quiz Builder</p>  
        </div>
        ) : (
      <div className="w-full  font-sans p-2">
        
        <table className="table-auto w-full border-spacing-2 border-separate">
  <tbody>
    <tr>
      <td className="text-black dark:text-gray-200 text-lg font-sans whitespace-nowrap ">Quiz ID:</td>
      <td className="w-full dark:text-gray-300">{formData.quizID}</td>
    </tr>
    <tr>
      <td className="text-black dark:text-gray-200 text-lg font-sans whitespace-nowrap">Quiz Name:</td>
      <td>
        <input
          type="text"
          name="quizName"
          value={formData.quizName}
          onChange={handleInputChange}
          className="w-1/2 mt-4 rounded-md border-2 border-gray-200 mb-4 text-black dark:text-gray-700  w-full"
        />
      </td>
    </tr>
    <tr>
      <td className="text-black dark:text-gray-200 text-lg font-sans whitespace-nowrap">Passing Grade:</td>
      <td>
        <input
          type="number"
          name="passingGrade"
          value={formData.passingGrade}
          onChange={handleInputChange}
          className="rounded-md border-2 border-gray-200 mb-4 text-black dark:black"
        />
      </td>
    </tr>
    <tr>
      <td className="text-black dark:text-gray-200 text-lg font-sans whitespace-nowrap">Allow Quiz Retries:</td>
      <td>
        <div className="relative inline-flex items-center me-5 cursor-pointer">
          <Select id="allowretries" required>
          <option selected>Yes</option>
          <option>No</option>
        </Select>
        </div>
      </td>
    </tr>
  </tbody>
</table>


        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
        <h2 className="text-black dark:text-gray-200 text-2xl font-semibold font-sans text-center">Quiz Background Image:</h2>
        <ImageSearch onImageSelect={handleImageSelect} company={data.state.company} quizname={formData.quizName}/>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
        
        {/* Add other form fields here */}
        <h2 className="text-black dark:text-gray-200 text-2xl font-semibold font-sans text-center">Quiz Questions:</h2>
        {formData.qna.map((question, questionIndex) => (
          <div key={questionIndex} className="pt-4 border-2 rounded-xl m-2 p-2">
            <label >
              <div className="text-black dark:text-gray-200 text-lg font-semibold font-sans">Question {questionIndex + 1}:</div>
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                className="w-full rounded-md border-2 border-gray-200 mb-4"
              />
            </label>
            <br />
            {/* Answer options */}
            
  {question.options.map((option, answerIndex) => (
  <div key={answerIndex} className="w-full flex flex-row border-0">
    <table className="w-full">
      <tr>
        <td>
        <span className="text-black dark:text-gray-200">Answer {answerIndex + 1}:</span>
        </td>
      <td className="border-0 w-1/2">
      
    
      <input
        type="text"
        value={option} // Ensure option is treated as string
        onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
        className={`w-full rounded-md border-2 border-gray-200 ${
          option === question.correctAnswer ? 'border-green-500' : ''
        }`}
      />
    
    </td>
    <td className="w-full flex flex-row place-items-end border-0 items-end justify-end">
    <Button
      className=" whitespace-nowrap"
      size="sm"
      type="Button"
      onClick={() => handleCorrectAnswerChange(questionIndex, answerIndex)}
    >
    {option === question.correctAnswer ? (
      <>
        <GiCheckMark className="mr-2 h-4 w-4" /> Correct Answer
      </>
    ) : (
      'Set as Correct Answer'
    )}
    </Button>
    <Button
      className="ml-4 whitespace-nowrap"
      size="sm"
      type="Button"
      onClick={() => deleteAnswer(questionIndex, answerIndex)}
    >
      Delete Answer
    </Button>
    </td>
    </tr>
    </table>
  </div>
))}

            <span className="flex flex-row space-between">
            <Button className="mr-4" type="Button" onClick={() => addAnswer(questionIndex)}>Add Answer</Button>
            <Button type="Button" onClick={() => deleteQuestion(questionIndex)}>Delete Question</Button>
            </span>
          </div>
        ))}
        <div className="w-full flex flex-col items-center justify-center border-0">
        <Button type="Button" onClick={addQuestion}>Add New Question</Button>
        <br />
        <span className="flex flex-row"><Button  className="mr-4">Save this Quiz</Button> <Button  color="failure">Abort Changes</Button></span>
        <span className="dark:text-white">(disabled for demo)</span>
        </div>
        </div>
        )}
    </div>
    </>
  );
};

export default QuizBuilder;
