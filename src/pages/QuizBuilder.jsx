import React, { useState } from 'react';
import { Button } from 'flowbite-react';

import { quizData } from '../quizdata.js';
import Navbar from '../components/Navbar'

const QuizBuilder = () => {
  const [formData, setFormData] = useState(quizData);

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

  return (
    <>
    <Navbar />
    <div className="mt-40 ml-8 pb-40">
      <h1 className="px-6 py-3 text-left text-xl font-bold font-sans text-gray-500 uppercase tracking-wider">Quiz Builder</h1>
      <form className="w-full border-2">
        <label>
          Quiz Name:
          <input
            type="text"
            name="quizName"
            value={formData.quizName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        {/* Add other form fields here */}
        <h2>Questions:</h2>
        {formData.qna.map((question, questionIndex) => (
          <div key={questionIndex} className="pt-4">
            <label>
              Question {questionIndex + 1}:
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
              />
            </label>
            <br />
            {/* Answer options */}
            {question.options.map((option, answerIndex) => (
              <div key={answerIndex} className="w-full flex flex-row">
                <label>
                  Answer {answerIndex + 1}:
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
                  />
                </label>
                <Button type="Button" onClick={() => deleteAnswer(questionIndex, answerIndex)}>Delete Answer</Button>
                <Button type="Button" onClick={() => handleCorrectAnswerChange(questionIndex, answerIndex)}>
                  {question.correctAnswer === answerIndex ? 'Correct Answer' : 'Mark as Correct Answer'}
                </Button>
              </div>
            ))}
            <Button type="Button" onClick={() => addAnswer(questionIndex)}>Add Answer</Button>
            <Button type="Button" onClick={() => deleteQuestion(questionIndex)}>Delete Question</Button>
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
