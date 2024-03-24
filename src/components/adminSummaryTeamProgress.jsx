

export function SummaryTeamProgress({summaryData}) {
const passingRate = parseInt((summaryData.totalQuizzesPassed/summaryData.totalQuizzesDeployed)*100);

  return (
<div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4">
  <div className="flex justify-between mb-3">
    <div className="flex items-center">
      <div className="flex justify-center items-center">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">Your team progress:</h5>
        
      </div>
    </div>
  </div>

  <div className="bg-gray-300 dark:bg-gray-700 p-3 rounded-lg">
    <div className="grid grid-cols-3 gap-3 mb-2">
      <dl className="bg-gray-200 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[88px]">
        <dt className="w-8 h-8 rounded-full bg-orange-100 dark:bg-gray-500 text-orange-600 dark:text-orange-300 text-md font-medium flex items-center justify-center mb-1">{summaryData.totalQuizzesDeployed}</dt>
        <dd className="text-orange-600 dark:text-orange-300 text-sm font-medium font-sans">Quizzes Deployed</dd>
      </dl>
      <dl className="bg-gray-200  dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[88px]">
        <dt className="w-8 h-8 rounded-full bg-teal-100 dark:bg-gray-500 text-teal-600 dark:text-teal-300 text-md font-medium flex items-center justify-center mb-1">{summaryData.totalQuizzesPassed}</dt>
        <dd className="text-teal-600 dark:text-teal-300 text-sm font-medium font-sans">Quizzes Passed</dd>
      </dl>
      <dl className="bg-gray-200  dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[88px]">
        <dt className="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-500 text-blue-600 dark:text-blue-300 text-md font-medium flex items-center justify-center mb-1">{summaryData.totalQuizzesNotPassed}</dt>
        <dd className="text-blue-600 dark:text-blue-300 text-sm font-medium font-sans">Quizzes<br/>Failed</dd>
      </dl>
    </div>
    
    <div id="more-details" className="border-gray-200 border-t dark:border-gray-600 pt-3 mt-3 space-y-2">
      <dl className="flex items-center justify-between">
        <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal">Average quiz pass rate:</dt>
        <dd className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
          {/*  */} 
          {passingRate}%
        </dd>
      </dl>
      <dl className="flex items-center justify-between">
        <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal">Total members:</dt>
        <dd className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-gray-600 dark:text-gray-300">{summaryData.totalUsers}</dd>
      </dl>
      <dl className="flex items-center justify-between">
        <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal">Assigned but NOT taken:</dt>
        <dd className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-gray-600 dark:text-gray-300">{summaryData.quizzesNotTaken}</dd>
      </dl>
      <dl className="flex items-center justify-between">
        <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal">Users assigned quizzes:</dt>
        <dd className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-gray-600 dark:text-gray-300">{summaryData.userCountWithQuiz}</dd>
      </dl>
      <dl className="flex items-center justify-between">
        <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal">Users without quizzes:</dt>
        <dd className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-gray-600 dark:text-gray-300">{summaryData.userCountNoQuiz}</dd>
      </dl>
    </div>
  </div>
</div>
  );
  }
