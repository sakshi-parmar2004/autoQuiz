import React, {  useState } from 'react';

const QuizComponent = ({ formatted ,currentPage,mcqsPerPage}) => {
    // console.log(formatted)
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleSelect = (questionIndex, selectedOption) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedOption
    }));
  };

  return (
    <div >
      {formatted.map((item, index) => {
        const userAnswer = selectedAnswers[index];
        
        const isCorrect = userAnswer === item.answer;
        
        const questionNumber = (currentPage - 1) * mcqsPerPage + index + 1;


        return (
          <div key={index} className="mb-6 p-4 border rounded-lg bg-white shadow">
            <h1 className="text-lg font-semibold mb-2">{questionNumber}. {item.question}</h1>
            <div>
              <select
                className="border p-2 rounded w-full"
                value={userAnswer || ""}
                onChange={(e) => handleSelect(index, e.target.value)}
              >
                <option value="" disabled>Select your answer</option>
                {item.options.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
             

            {userAnswer && (
              <p className={`mt-2 text-sm font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? '✅ Correct Answer!' : `❌ Wrong Answer. Correct: ${item.answer}`}
              </p>
            )}
          </div>
          
        );
      })}
    </div>
  );
};

export default QuizComponent;
