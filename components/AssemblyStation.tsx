import React from 'react';
import type { Team } from '../types';
import { INGREDIENTS, INGREDIENT_STYLES } from '../constants';
import IngredientLayer from './IngredientLayer';
import { resumeAudioContext } from '../utils/audioUtils';

interface AssemblyStationProps {
  team: Team;
  stackedIngredients: string[];
  onIngredientClick: (ingredient: string) => void;
  isLocked: boolean;
  wrongIngredient: string | null;
  isTeamFinished?: boolean;
  newlyAddedIngredient?: string | null;
}

const AssemblyStation: React.FC<AssemblyStationProps> = ({
  team,
  stackedIngredients,
  onIngredientClick,
  isLocked,
  wrongIngredient,
  isTeamFinished = false,
  newlyAddedIngredient = null
}) => {
  const calculateBottomOffset = (index: number) => {
    return stackedIngredients
      .slice(0, index)
      .reduce((totalHeight, ingKey) => totalHeight + (INGREDIENT_STYLES[ingKey]?.height || 0), 0);
  };
  
  const totalBurgerHeight = stackedIngredients.reduce((total, ingKey) => total + (INGREDIENT_STYLES[ingKey]?.height || 0), 0);

  // 동시 터치를 위해 라운드가 활성화되어 있으면 모든 팀이 클릭 가능
  const isTeamLocked = isLocked;

  const handleClick = async (ingredient: string) => {
    // 오디오 컨텍스트 활성화 (사용자 상호작용 필요)
    await resumeAudioContext();

    // 게임 로직 처리 (사운드는 게임 로직에서 처리)
    onIngredientClick(ingredient);
  };

  return (
    <div
      className={`bg-amber-200 border-8 border-amber-400 rounded-3xl h-full flex flex-col items-center p-5 shadow-2xl transition-all duration-500 ${
        isTeamFinished ? 'border-green-500 bg-green-100' : ''
      }`}
      style={{ width: '43.2%' }}
    >
      <div className="bg-amber-500 rounded-2xl relative flex flex-col-reverse items-center justify-start pt-1 mt-3 border-4 border-amber-600 shadow-inner overflow-hidden px-2" style={{ width: '384px', aspectRatio: '3/2' }}>
        {/* Container for the stacked burger */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2" style={{ width: 'calc(100% - 8px)' }}>
            {stackedIngredients.map((ingredient, index) => {
              const isNew = newlyAddedIngredient === ingredient && index === stackedIngredients.length - 1;
              return (
                <IngredientLayer
                  key={`${index}-${ingredient}`}
                  ingredientKey={ingredient}
                  isNew={isNew}
                  style={{
                    zIndex: index + 1,
                    position: 'absolute',
                    bottom: `${calculateBottomOffset(index)}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    maxWidth: '320px'
                  }}
                />
              );
            })}
            {wrongIngredient && (
                <IngredientLayer
                    ingredientKey={wrongIngredient}
                    isWrong={true}
                    style={{
                        zIndex: stackedIngredients.length + 1,
                        position: 'absolute',
                        bottom: `${totalBurgerHeight}px`,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100%',
                        maxWidth: '320px'
                    }}
                />
            )}
        </div>
      </div>

      {/* 완성 상태 표시 */}
      {isTeamFinished && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
          완성! ✅
        </div>
      )}

      <div className={`mt-auto w-full flex flex-col items-center gap-3 pt-3 ${isTeamLocked ? 'pointer-events-none opacity-50' : ''}`}>
        {/* 첫 번째 행: 3개 */}
        <div className="flex justify-center gap-3">
          {Object.keys(INGREDIENTS).slice(0, 3).map(key => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              onTouchStart={() => handleClick(key)}
              disabled={isTeamLocked}
              className={`bg-white/80 rounded-xl flex justify-center items-center cursor-pointer border-b-8 border-gray-300 hover:-translate-y-1 active:translate-y-0 active:border-b-4 transition-all shadow-md ${
                isTeamLocked ? 'cursor-not-allowed' : ''
              } ${isTeamFinished ? 'opacity-60' : ''}`}
              style={{ width: '5.4rem', height: '5.4rem', fontSize: '3.15rem', touchAction: 'manipulation' }}
            >
              {INGREDIENTS[key].emoji}
            </button>
          ))}
        </div>
        {/* 두 번째 행: 4개 */}
        <div className="flex justify-center gap-3">
          {Object.keys(INGREDIENTS).slice(3).map(key => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              onTouchStart={() => handleClick(key)}
              disabled={isTeamLocked}
              className={`bg-white/80 rounded-xl flex justify-center items-center cursor-pointer border-b-8 border-gray-300 hover:-translate-y-1 active:translate-y-0 active:border-b-4 transition-all shadow-md ${
                isTeamLocked ? 'cursor-not-allowed' : ''
              } ${isTeamFinished ? 'opacity-60' : ''}`}
              style={{ width: '5.4rem', height: '5.4rem', fontSize: '3.15rem', touchAction: 'manipulation' }}
            >
              {INGREDIENTS[key].emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssemblyStation;