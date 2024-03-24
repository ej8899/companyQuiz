// Result.jsx
import React, { useEffect } from 'react';
import { Button } from 'flowbite-react';

function Result({ score, totalQuestions, allData, passingGrade, handleRetryClick, handleQuitClick }) {
  const percentage = ((score / totalQuestions) * 100).toFixed(0);

  // console.log('allData',allData)
  // console.log('passingGrade',passingGrade)
  // console.log('allData',allData)


  //
  // send score data back to API for updating
  //
  useEffect(() => {
    // send score data back to API for updating
    const sendScoreData = async () => {
      try {
        console.log('saving score');
        const currentDate = new Date().toISOString().slice(0, 10);

        const userData = JSON.parse(localStorage.getItem('userData'));
        const index = userData.scores.findIndex(score => score.qid === allData.quizId);

        if (index !== -1) {
          // Update score, date, etc. in the found score object
          userData.scores[index].score = parseInt(percentage);
          userData.scores[index].date = currentDate;

          // Save updated userData back to localStorage
          localStorage.setItem('userData', JSON.stringify(userData));
        }

        const response = await fetch('https://erniejohnson.ca/apps/cquiz-api/users.php?', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            qid: allData.quizId,
            uid: allData.userId,
            score: percentage,
            passingGrade: passingGrade,
            date: currentDate,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to update score data');
        }
        console.log('Score data updated successfully');
      } catch (error) {
        console.error('Error updating score data:', error);
      }
    };

    // Call sendScoreData function once after component mounts
    if (score > 0)
      sendScoreData();
  }, []);



  return (
    <div className="bg-black bg-opacity-20 rounded-xl flex flex-col items-center w-full m-8 p-8">
    <h2 className="text-5xl text-slate-300 font-bold font-sans ">Quiz Complete!</h2>
    <p className={`text-3xl mt-4 font-sans ${percentage >= passingGrade ? 'text-green-500' : 'text-red-500'}`}>
      Your Score: {score} / {totalQuestions} ({percentage}%)
    </p>
    <p className="text-2xl text-slate-400 mt-4 font-sans">{passingGrade}% required to pass.</p>
    <p className="text-2xl text-slate-400 mt-8 font-sans">Would you like to try the test again?</p>
    <span className="flex flex-row justify-center mt-4">
      <Button className="mr-8" onClick={handleRetryClick}>Retry</Button>
      <Button color="light" onClick={handleQuitClick}>Quit</Button>
    </span>
  </div>
  );
}

export default Result;
