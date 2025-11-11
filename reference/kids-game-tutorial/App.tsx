import React from 'react';
import { useTutorial } from './hooks/useTutorial';
import TutorialModal from './components/TutorialModal';

/**
 * =======================================================================
 *  🚀 How to Integrate This Tutorial into Your Game 🚀
 * =======================================================================
 *
 * 1. COPY FILES:
 *    - `components/TutorialModal.tsx`
 *    - `hooks/useTutorial.ts`
 *    - `constants.ts`
 *    - `types.ts`
 *
 * 2. IMPORT:
 *    In your main game component, import the hook and the modal component.
 *
 *    `import { useTutorial } from './hooks/useTutorial';`
 *    `import TutorialModal from './components/TutorialModal';`
 *
 * 3. INITIALIZE:
 *    `const { openTutorial, tutorialProps } = useTutorial(true);` // `true` opens it on first load
 *
 * 4. PLACE THE COMPONENTS:
 *    - Add the `<TutorialModal {...tutorialProps} />` component in your layout.
 *      It will only be visible when opened.
 *    - Add a button or trigger that calls `openTutorial`.
 *
 *    `<button onClick={openTutorial}>Show Tutorial</button>`
 *    `<TutorialModal {...tutorialProps} />`
 *
 * That's it! You now have a reusable tutorial system.
 *
 * =======================================================================
 */

const App = () => {
  // Use the hook to control the tutorial.
  // Pass `true` to open it automatically when the app loads.
  const { openTutorial, tutorialProps } = useTutorial(true);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-200 to-blue-300 p-4 overflow-hidden">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white text-shadow mb-4">
          Burger Rush!
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8">
          게임 방법을 배우고 신나게 놀아봐요!
        </p>
        <button
          onClick={openTutorial}
          className="px-10 py-5 bg-yellow-400 text-yellow-900 font-bold text-xl rounded-full shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300"
        >
          튜토리얼 보기
        </button>
      </div>

      {/* Render the Tutorial component. It's only visible when open. */}
      <TutorialModal {...tutorialProps} />

      {/* Fun background elements for kids */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-red-400/30 rounded-full animate-bounce"></div>
      <div className="absolute bottom-20 right-16 w-32 h-32 bg-green-400/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/2 left-1/4 w-16 h-16 bg-amber-500/30 rounded-lg animate-spin-slow"></div>

      <style>{`
        .text-shadow {
          text-shadow: 3px 3px 0px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
};

export default App;