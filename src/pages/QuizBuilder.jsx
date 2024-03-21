import  { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';

// import { quizData } from '../quizdata.js';
import Navbar from '../components/Navbar'
import { setPageTitle } from '../utilities/helpers.js';
import ImageSearch from '../components/ImageSearch'; // Import the ImageSearch component
import { ToggleSwitch } from 'flowbite-react';
import { useParams } from 'react-router-dom';
import { generateUUID } from '../utilities/helpers.js'
import { GiCheckMark } from "react-icons/gi";

const QuizBuilder = () => {
  const { quizId } = useParams();
  const [formData, setFormData] = useState({
    quizID: '',
    quizName: '',
    passingGrade: 0,
    qna: []
  });
  const [switch2, setSwitch2] = useState(true);

  useEffect(() => {
    if (quizId !== 'new' && quizId !== null) {
      const fetchQuizData = async () => {
        try {
          const response = await fetch(`https://erniejohnson.ca/apps/cquiz-api/users.php?qid=${quizId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch quiz data');
          }
          const data = await response.json();
          console.log('Quiz data:', data);
          setFormData(data);
        } catch (error) {
          console.error('Error fetching quiz data:', error);
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
    updatedQuestions[questionIndex].options[answerIndex] = value;
    setFormData({
      ...formData,
      qna: updatedQuestions
    });
  };

  const addQuestion = () => {
    const newQuestion = {
      question: '',
      options: ['', '', ''],
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
      qna: updatedQuestions
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

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...formData.qna];
    updatedQuestions[questionIndex].correctAnswer = optionIndex;
    setFormData({
      ...formData,
      qna: updatedQuestions
    });
  };

  const handleImageSelect = (imageUrl) => {
    // Set the selected image URL to the current question
    // You can implement this according to your data structure
    console.log('Selected image:', imageUrl);
  };

  return (
    <>
    <Navbar />
    <div className="mt-40 ml-8 pb-40">
      <h1 className="px-6 py-3 text-center text-2xl font-bold font-sans text-gray-500 uppercase tracking-wider">Quiz Builder</h1>
      <form className="w-full border-2 font-sans p-2">
        <label className="text-black dark:text-gray-200 text-lg font-sans">
          Quiz ID: {formData.quizID} <br/>
          Quiz Name:
          <input
            type="text"
            name="quizName"
            value={formData.quizName}
            onChange={handleInputChange}
            className="w-1/2 mt-4 rounded-md border-2 border-gray-200 mb-4 text-black dark:text-gray-700"
          />
        </label>
        <br />
        <label className="text-black dark:text-gray-200 text-lg font-sans">
          Passing Grade:
          <input
            type="number"
            name="passingGrade"
            value={formData.passingGrade}
            onChange={handleInputChange}
            className="rounded-md border-2 border-gray-200 mb-4 text-black dark:black"
          />
        </label>
        <div className="flex max-w-md flex-col gap-4">
          
          <label className="relative inline-flex items-center me-5 cursor-pointer text-black dark:text-gray-200 text-lg font-sans">
                  <input
                    type="checkbox"
                    value=""
                    checked={switch2}
                    className="sr-only peer"
                    onChange={setSwitch2}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-lg font-sans text-gray-900 dark:text-gray-300">allow quiz retries</span>
          </label>
        </div>
        <ImageSearch onImageSelect={handleImageSelect} />

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
        
        {/* Add other form fields here */}
        <h2 className="text-black dark:text-gray-200 text-xl font-sans">Questions:</h2>
        {formData.qna.map((question, questionIndex) => (
          <div key={questionIndex} className="pt-4 border-2 rounded-xl m-2 p-2">
            <label >
              <div className="text-black dark:text-gray-200 text-lg font-sans">Question {questionIndex + 1}:</div>
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                className="w-3/4 rounded-md border-2 border-gray-200 mb-4"
              />
            </label>
            <br />
            {/* Answer options */}
            {question.options.map((option, answerIndex) => (
              <div key={answerIndex} className="w-full flex flex-row border-0">
                <label className="w-3/4">
                  <span className="text-black dark:text-gray-200">Answer {answerIndex + 1}:</span>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
                    className="w-full rounded-md border-2 border-gray-200 mb-4"
                  />
                </label>
                <Button className="ml-4 mb-2 whitespace-nowrap" type="Button" onClick={() => deleteAnswer(questionIndex, answerIndex)}>Delete Answer</Button>
                <Button className="ml-4 mb-2 whitespace-nowrap" type="Button" onClick={() => handleCorrectAnswerChange(questionIndex, answerIndex)}>
                  {question.correctAnswer === answerIndex ? <><GiCheckMark className="mr-2 h-4 w-4"/> Correct Answer</> : 'Mark as Correct Answer'}

                </Button>
              </div>
            ))}
            <span className="flex flex-row space-between">
            <Button className="mr-4" type="Button" onClick={() => addAnswer(questionIndex)}>Add Answer</Button>
            <Button type="Button" onClick={() => deleteQuestion(questionIndex)}>Delete Question</Button>
            </span>
          </div>
        ))}
        <Button type="Button" onClick={addQuestion}>Add Question</Button>
        <br />
        <Button type="submit">Save</Button>
      </form>
    </div>
    </>
  );
};

export default QuizBuilder;
