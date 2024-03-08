import React, { useState } from 'react';
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
      correctAnswer: '',
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

  return (
    <>
    <Navbar />
    <div className="mt-40">
      <h1 className="px-6 py-3 text-left text-xl font-bold font-sans text-gray-500 uppercase tracking-wider">Quiz Builder</h1>
      <form>
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
              Question:
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
              />
            </label>
            <br />
            {/* Answer options */}
            {question.options.map((option, answerIndex) => (
              <div key={answerIndex}>
                <label>
                  Answer {answerIndex + 1}:
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
                  />
                </label>
                <button type="button" onClick={() => deleteAnswer(questionIndex, answerIndex)}>Delete Answer</button>
              </div>
            ))}
            <button type="button" onClick={() => addAnswer(questionIndex)}>Add Answer</button>
            <button type="button" onClick={() => deleteQuestion(questionIndex)}>Delete Question</button>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
    </>
  );
};

export default QuizBuilder;