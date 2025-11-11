import React, { useState, useEffect } from 'react';
import { TUTORIAL_STEPS } from '../constants';
import { TutorialStep } from '../types';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TutorialModal = ({ isOpen, onClose }: TutorialModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Reset to first step when modal is re-opened
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const step: TutorialStep = TUTORIAL_STEPS[currentStep];
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose(); // On the last step, the button closes the modal
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 pt-10 w-full max-w-5xl mx-auto text-center transform transition-all duration-300 relative animate-modal-enter">
        <button
          onClick={onClose}
          className="absolute -top-6 -right-6 text-gray-500 bg-white rounded-full w-14 h-14 flex items-center justify-center hover:text-gray-800 hover:bg-gray-100 text-5xl leading-none font-bold shadow-md z-10"
          aria-label="Close"
        >
          ×
        </button>

        <img
          src={step.image}
          alt={step.title}
          className="w-full h-[32rem] object-contain mb-6 rounded-lg bg-gray-100"
        />
        <h2 className="text-6xl font-bold text-gray-800 mb-4">{step.title}</h2>
        <p className="text-2xl text-gray-600 mb-8 px-8">{step.description}</p>
        
        <div className="flex items-center justify-center space-x-4 mb-8">
          {TUTORIAL_STEPS.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-colors ${
                index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>

        <div className="flex justify-between items-center min-h-[44px]">
          <div>
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`px-10 py-4 text-xl bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition-transform transform hover:scale-105 ${currentStep > 0 ? 'visible' : 'invisible'}`}
            >
              Back
            </button>
          </div>
          <div>
            <button
              onClick={handleNext}
              className="px-10 py-4 text-xl bg-yellow-400 text-yellow-900 font-bold rounded-full hover:bg-yellow-500 transition-transform transform hover:scale-105 shadow-md"
            >
              {isLastStep ? "Close" : 'Next'}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes modal-enter {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-enter {
          animation: modal-enter 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TutorialModal;