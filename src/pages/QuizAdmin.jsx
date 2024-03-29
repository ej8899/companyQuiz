


import Navbar from '../components/Navbar'

function QuizAdmin() {

  return (
    <>
    <Navbar />
    
    <section className="bg-white dark:bg-gray-900 h-full items-center justify-center flex">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center text-slate-400">
                admin page for QUIZ abc
            </div>   
            <div>show individual quiz options (image, etc)</div>
            <div>list the questions and possible ansers</div>
        </div>
    </section>
    </>
  );
}

export default QuizAdmin;
