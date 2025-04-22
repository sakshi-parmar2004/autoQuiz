import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { McqContext } from '../context/McqContext';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Quiz = () => {
  const { state } = useLocation();
  const { McqCount } = useContext(McqContext);
 const{theme} =useContext(AppContext)
  const allMcqs = state?.mcqs || [];
  const mcqCount = allMcqs.length;

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [mcqsPerPage] = useState(5);
  const [formatted, setFormatted] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null); // ✅ to store score
  const navigate = useNavigate();
 
  useEffect(() => {
    if (allMcqs.length > 0) {
      const formattedMCQs = allMcqs.map((item) => {
        const parts = item.split('\n');
        const question = parts[0].replace(/^\d+\.\s*/, '');
        const options = parts.slice(1, 5);
        const answerLine = parts.find(line => line.toLowerCase().startsWith("correct answer"));
        const answer = answerLine?.split(':')[1]?.trim();

        return {
          question,
          options,
          answer,
        };
      });
      setFormatted(formattedMCQs);
      setLoading(false);
    }
  }, [allMcqs]);

  const handleSelect = (questionIndex, selectedOption) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedOption
    }));
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(mcqCount / mcqsPerPage)) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // ✅ Count correct answers on submit
  const handleSubmit = () => {
    const allAnswered = formatted.every((_, index) => selectedAnswers[index] !== undefined);

  if (!allAnswered) {
    // Display an error message if not all questions are answered
    toast.error('Please answer all questions before submitting!');
    return;
  }
    let count = 0;
    formatted.forEach((item, index) => {
      const questionNumber = index; // use index for total, not paginated one
      const userAnswer = selectedAnswers[questionNumber];
      if (userAnswer === item.answer) count++;
    });
  
    setScore(count);

    navigate('/result', {
      state: {
        score: count,
        total: mcqCount
      },
      replace: true
    });
  };

  // ✅ Paginate only the displayed questions
  const indexOfLastMcq = currentPage * mcqsPerPage;
  const indexOfFirstMcq = indexOfLastMcq - mcqsPerPage;
  const currentMcqs = formatted.slice(indexOfFirstMcq, indexOfLastMcq);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={`min-h-screen ${theme === 'day' ? 'bg-white text-black' : 'bg-black text-white'} flex flex-col items-center py-10`}>
          <h1 className="text-4xl font-bold text-blue-700 mb-6">Quiz</h1>

          <div className= {`max-w-3xl w-full ${theme === 'day' ? 'bg-white text-black' : 'bg-gray-700 text-white'}p-6 rounded-lg shadow-md`}
          >
            {currentMcqs.map((item, index) => {
              const questionNumber = (currentPage - 1) * mcqsPerPage + index;
              const userAnswer = selectedAnswers[questionNumber];
              const isCorrect = userAnswer === item.answer;

              return (
                <div key={index} className={`mb-6 p-4 border rounded-lg ${theme === 'day' ? 'bg-white text-black' : 'bg-gray-700 text-white'} shadow`}>
                  <h1 className="text-lg font-semibold mb-2">
                    {questionNumber + 1}. {item.question}
                  </h1>
                  <div className="grid grid-cols-1 gap-2">
                    {item.options.map((opt, i) => {
                      const isSelected = userAnswer === opt;
                      return (
                        <button
                          key={i}
                          className={`px-4 py-2 rounded border text-left cursor-pointer ${
                            isSelected
                              ? (isCorrect ? 'bg-green-300 border-green-600' : 'bg-red-400 border-red-600')
                              : ' border-gray-300 hover:bg-gray-600'
                          }`  }
                          onClick={() => handleSelect(questionNumber, opt)}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {userAnswer && (
                    <p className={`mt-3 text-sm font-medium ${
                      isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isCorrect ? '✅ Correct Answer!' : `❌ Wrong Answer. Correct: ${item.answer}`}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pagination + Submit */}
          <div className="flex justify-between mt-8 w-full max-w-3xl">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-6 py-2 rounded-lg text-white ${currentPage === 1 ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              Previous
            </button>

            {currentPage >= Math.ceil(mcqCount / mcqsPerPage) ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={nextPage}
                className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
              >
                Next
              </button>
            )}
          </div>

          {/* ✅ Show score after submit */}
          {/* {submitted && (
            <div className="mt-6 text-xl font-bold text-green-700">
              You scored {score} out of {formatted.length}
            </div>
          )} */}
        </div>
      )}
    </>
  );
};

export default Quiz;
