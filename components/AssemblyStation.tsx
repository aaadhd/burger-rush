import React from 'react';
import type { Team } from '../types';
import { INGREDIENTS, INGREDIENT_STYLES } from '../constants';
import IngredientLayer from './IngredientLayer';
import { playSound } from '../utils/audioUtils';

interface AssemblyStationProps {
  team: Team;
  stackedIngredients: string[];
  onIngredientClick: (ingredient: string) => void;
  isLocked: boolean;
  wrongIngredient: string | null;
  isTeamFinished?: boolean;
}

const AssemblyStation: React.FC<AssemblyStationProps> = ({ 
  team, 
  stackedIngredients, 
  onIngredientClick, 
  isLocked, 
  wrongIngredient,
  isTeamFinished = false 
}) => {
  const calculateBottomOffset = (index: number) => {
    return stackedIngredients
      .slice(0, index)
      .reduce((totalHeight, ingKey) => totalHeight + (INGREDIENT_STYLES[ingKey]?.height || 0), 0);
  };
  
  const totalBurgerHeight = stackedIngredients.reduce((total, ingKey) => total + (INGREDIENT_STYLES[ingKey]?.height || 0), 0);

  // 동시 터치를 위해 라운드가 활성화되어 있으면 모든 팀이 클릭 가능
  const isTeamLocked = isLocked;

  const handleClick = (ingredient: string) => {
    // 재료 클릭 피드백 사운드
    playSound.ingredientClick();
    // 즉시 클릭 처리
    onIngredientClick(ingredient);
  };

  return (
    <div
      className={`bg-amber-200 border-4 lg:border-8 border-amber-400 rounded-2xl lg:rounded-3xl w-[48%] h-full flex flex-col items-center p-2 lg:p-5 shadow-xl lg:shadow-2xl transition-all duration-500 ${
        isTeamFinished ? 'border-green-500 bg-green-100' : ''
      }`}
    >
      <div className="w-48 lg:w-80 h-32 lg:h-48 bg-amber-500 rounded-xl lg:rounded-2xl relative flex flex-col-reverse items-center justify-start pt-2 mt-2 lg:mt-[20px] border-2 lg:border-4 border-amber-600 shadow-inner overflow-hidden">
        {/* Container for the stacked burger */}
        <div className="absolute bottom-2">
            {stackedIngredients.map((ingredient, index) => (
              <IngredientLayer
                key={index}
                ingredientKey={ingredient}
                style={{
                  zIndex: index + 1,
                  position: 'absolute',
                  bottom: `${calculateBottomOffset(index)}px`,
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              />
            ))}
            {wrongIngredient && (
                <IngredientLayer
                    ingredientKey={wrongIngredient}
                    isWrong={true}
                    style={{
                        zIndex: stackedIngredients.length + 1,
                        position: 'absolute',
                        bottom: `${totalBurgerHeight}px`,
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}
                />
            )}
        </div>
      </div>

      {/* 완성 상태 표시 */}
      {isTeamFinished && (
        <div className="absolute top-2 lg:top-4 right-2 lg:right-4 bg-green-500 text-white px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-bold animate-pulse">
          완성! ✅
        </div>
      )}

      <div className={`mt-auto w-full flex flex-wrap justify-center gap-2 lg:gap-3 pt-2 lg:pt-5 ${isTeamLocked ? 'pointer-events-none opacity-50' : ''}`}>
        {Object.keys(INGREDIENTS).map(key => (
          <button
            key={key}
            onClick={() => handleClick(key)}
            onTouchStart={() => handleClick(key)} // 터치 이벤트 추가
            disabled={isTeamLocked}
            className={`w-16 h-16 lg:w-24 lg:h-24 bg-white/80 rounded-xl lg:rounded-2xl flex justify-center items-center cursor-pointer border-b-4 lg:border-b-8 border-gray-300 hover:-translate-y-1 active:translate-y-0 active:border-b-2 lg:active:border-b-4 transition-all text-4xl lg:text-6xl shadow-md ${
              isTeamLocked ? 'cursor-not-allowed' : ''
            } ${isTeamFinished ? 'opacity-60' : ''}`}
            style={{ touchAction: 'manipulation' }} // 터치 최적화
          >
            {INGREDIENTS[key].emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AssemblyStation;