import React from 'react';

interface IngredientLayerProps {
  ingredientKey: string;
  isWrong?: boolean;
  style?: React.CSSProperties;
}

const IngredientLayer: React.FC<IngredientLayerProps> = ({ ingredientKey, isWrong = false, style }) => {
  let layerStyle: React.CSSProperties = {};
  let content = null;

  const baseClasses = "w-64 absolute transition-all duration-200";
  const wrongClasses = isWrong ? "stacked-ingredient wrong" : "stacked-ingredient";

  switch (ingredientKey) {
    case 'bun-top':
      layerStyle = { height: '40px', backgroundColor: '#D99B66', borderRadius: '25px 25px 5px 5px', border: '3px solid #BF8454' };
      // Sesame seeds
      content = (
        <div className="relative w-full h-full">
            <div className="absolute top-2 left-10 w-2 h-3 bg-white rounded-full transform rotate-45"></div>
            <div className="absolute top-5 left-20 w-2 h-3 bg-white rounded-full transform -rotate-45"></div>
            <div className="absolute top-3 left-32 w-2 h-3 bg-white rounded-full transform rotate-12"></div>
            <div className="absolute top-6 left-48 w-2 h-3 bg-white rounded-full transform -rotate-20"></div>
            <div className="absolute top-2 left-52 w-2 h-3 bg-white rounded-full transform rotate-30"></div>
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

  if (isWrong) {
      layerStyle.animation = 'bounce-off 0.5s ease-out forwards';
      layerStyle.backgroundColor = '#FFCDD2';
      layerStyle.borderColor = '#E57373';
  }

  return (
    <div style={{ ...style, ...layerStyle }} className={baseClasses}>
      {content}
    </div>
  );
};

export default IngredientLayer;