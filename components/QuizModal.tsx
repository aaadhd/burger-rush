import React, { useState } from 'react';
import type { Quiz } from '../types';

interface QuizModalProps {
  quiz: Quiz | null;
  onAnswer: (answer: string) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ quiz, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) return null;

  const handleOptionClick = (option: string) => {
    if (submitted) return;
    setSelectedAnswer(option);
    setSubmitted(true);
    setTimeout(() => {
        onAnswer(option);
        setSelectedAnswer(null);
        setSubmitted(false);
    }, 1200);
  };

  const getButtonClass = (option: string) => {
    if (!submitted) {
      return 'bg-gray-200 border-gray-400 hover:bg-gray-300 hover:-translate-y-1 active:translate-y-0 active:border-b-4';
    }
    if (option === quiz.answer) {
      return 'bg-green-400 text-white border-green-600 animate-pulse';
    }
    if (option === selectedAnswer && option !== quiz.answer) {
      return 'bg-red-400 text-white border-red-600';
    }
    return 'bg-gray-200 border-gray-400 opacity-60';
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[1002]">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-11/12 max-w-4xl flex flex-col items-center gap-6 animate-pop-in">
        <p className="text-6xl text-gray-800 text-center tracking-wide">{quiz.question}</p>
        <div className="grid grid-cols-2 gap-6 w-full mt-4">
          {quiz.options.map(option => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              disabled={submitted}
              className={`border-b-8 p-6 rounded-2xl text-4xl cursor-pointer transition-all duration-200 ease-in-out text-center text-gray-700 ${getButtonClass(option)}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;