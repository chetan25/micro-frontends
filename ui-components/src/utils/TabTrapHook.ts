import React, { useEffect, SyntheticEvent} from 'react';

export const useTabTrapHook = (parentId: string, firstFocusNodeIndex: number) => {
  const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  let focusableElements;
  let firstFocusEl;
  let lastFocusEl;

  useEffect(() => {
    focusableElements = document.getElementById(parentId).querySelectorAll(focusableElementsString);
    // console.log(focusableElements, 'focusableElements');

    // Convert NodeList to Array
    focusableElements = Array.prototype.slice.call(focusableElements);
    firstFocusEl = focusableElements[0];
    lastFocusEl = focusableElements[focusableElements.length - 1];

    // Focus first input child
    focusableElements[firstFocusNodeIndex].focus();
  }, []);

  const trapTabKey = (e: React.KeyboardEvent) => {
    // Check for TAB key press
    if (e.keyCode === 9) {
      // SHIFT + TAB
      if (e.shiftKey) {
        // if user pressed shift and tab and we are at first focusable element on drawer move to the last one
        if (document.activeElement === firstFocusEl) {
          e.preventDefault();
          lastFocusEl.focus();
        }
        // only TAB pressed
      } else {
        // if we are at the last focusable element on drawer move to the fist one
        if (document.activeElement === lastFocusEl) {
          e.preventDefault();
          firstFocusEl.focus();
        }
      }
    }
    // ESCAPE
    // if (e.keyCode === 27) {
    //   closeModal();
    // }
  }

  return {trapTabKey};
}
