import { useState, useCallback } from 'react';

/**
 * A custom hook to manage the tutorial modal's state.
 * This makes it easy to integrate the tutorial into any component.
 *
 * @param {boolean} [initialState=false] - Whether the tutorial should be open initially.
 * @returns An object containing:
 *  - tutorialProps: An object with `isOpen` and `onClose` to be spread onto the TutorialModal.
 *  - openTutorial: A function to open the modal.
 *  - closeTutorial: A function to close the modal.
 *  - isTutorialOpen: The current visibility state of the modal.
 */
export const useTutorial = (initialState: boolean = false) => {
  const [isTutorialOpen, setIsTutorialOpen] = useState(initialState);

  const openTutorial = useCallback(() => {
    setIsTutorialOpen(true);
  }, []);

  const closeTutorial = useCallback(() => {
    setIsTutorialOpen(false);
  }, []);
  
  const tutorialProps = {
    isOpen: isTutorialOpen,
    onClose: closeTutorial,
  };

  return {
    isTutorialOpen,
    openTutorial,
    closeTutorial,
    tutorialProps,
  };
};