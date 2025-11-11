import React from 'react';
import { INGREDIENTS } from '../constants';

interface IngredientLayerProps {
  ingredientKey: string;
  isWrong?: boolean;
  isNew?: boolean;
  style?: React.CSSProperties;
}

const IngredientLayer: React.FC<IngredientLayerProps> = ({ ingredientKey, isWrong = false, isNew = false, style }) => {
  let layerStyle: React.CSSProperties = {};
  let content = null;

  // 애니메이션 클래스 결정
  let animationClass = "";
  if (isWrong) {
    animationClass = "animate-bounce-wrong";
  } else if (isNew) {
    animationClass = "animate-slide-up";
  }

  const baseClasses = `w-full max-w-[200px] lg:max-w-[320px] absolute transition-all duration-200 ${animationClass}`;

  switch (ingredientKey) {
    case 'bun-top':
      layerStyle = { height: '40px', backgroundColor: '#D99B66', borderRadius: '25px 25px 5px 5px', border: '3px solid #BF8454' };
      // Sesame seeds
      content = (
        <div className="relative w-full h-full">
            <div className="absolute top-[15%] left-[18%] w-2 h-3 bg-white rounded-full transform rotate-45"></div>
            <div className="absolute top-[32%] left-[36%] w-2 h-3 bg-white rounded-full transform -rotate-45"></div>
            <div className="absolute top-[20%] left-[54%] w-2 h-3 bg-white rounded-full transform rotate-12"></div>
            <div className="absolute top-[40%] left-[72%] w-2 h-3 bg-white rounded-full transform -rotate-20"></div>
            <div className="absolute top-[18%] right-[12%] w-2 h-3 bg-white rounded-full transform rotate-30"></div>
        </div>
      );
      break;
    case 'lettuce':
      layerStyle = { height: '15px', backgroundColor: '#8BC34A', borderRadius: '10px', border: '2px solid #689F38' };
      break;
    case 'tomato':
      layerStyle = { height: '12px', backgroundColor: '#F44336', borderRadius: '5px', border: '2px solid #D32F2F' };
      break;
    case 'cheese':
      layerStyle = { height: '8px', backgroundColor: '#FFEB3B', borderRadius: '3px', border: '2px solid #FBC02D' };
      break;
    case 'patty':
      layerStyle = { height: '25px', backgroundColor: '#795548', borderRadius: '5px', border: '3px solid #5D4037' };
      break;
    case 'onion':
        layerStyle = { height: '12px', backgroundColor: '#FDFDFD', borderRadius: '5px', border: '2px solid #E0E0E0' };
        // Onion rings
        content = (
            <div className="relative w-full h-full flex justify-around items-center px-4">
                <div className="w-8 h-8 rounded-full border-2 border-purple-300 bg-purple-100/50"></div>
                <div className="w-10 h-10 rounded-full border-2 border-purple-300 bg-purple-100/50"></div>
                <div className="w-9 h-9 rounded-full border-2 border-purple-300 bg-purple-100/50"></div>
            </div>
        )
      break;
    case 'bun-bottom':
      layerStyle = { height: '25px', backgroundColor: '#D99B66', borderRadius: '5px 5px 15px 15px', border: '3px solid #BF8454' };
      break;
  }

  // 틀린 재료일 때 스타일 수정 (색상 변경 없이 애니메이션만)
  if (isWrong) {
      layerStyle.opacity = 0.8;
  }

  // CSS 애니메이션을 위한 스타일 태그
  const animationStyles = `
    @keyframes slide-up {
      0% {
        transform: translateY(50px) translateX(-50%);
        opacity: 0.7;
      }
      100% {
        transform: translateY(0) translateX(-50%);
        opacity: 1;
      }
    }

    @keyframes bounce-wrong {
      0% {
        transform: translateY(0) translateX(-50%) scale(1);
      }
      25% {
        transform: translateY(-20px) translateX(-50%) scale(1.1) rotate(5deg);
      }
      50% {
        transform: translateY(10px) translateX(-50%) scale(0.9) rotate(-3deg);
      }
      75% {
        transform: translateY(-10px) translateX(-50%) scale(1.05) rotate(2deg);
      }
      100% {
        transform: translateY(100px) translateX(-50%) scale(0.8) rotate(0deg);
        opacity: 0;
      }
    }

    .animate-slide-up {
      animation: slide-up 0.3s ease-out;
    }

    .animate-bounce-wrong {
      animation: bounce-wrong 0.8s ease-out forwards;
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <div style={{ ...style, ...layerStyle }} className={baseClasses}>
        {content}
      </div>
    </>
  );
};

export default IngredientLayer;