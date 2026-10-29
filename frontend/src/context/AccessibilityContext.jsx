import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState('base'); // 'sm' | 'base' | 'lg'
  const [screenReaderActive, setScreenReaderActive] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.body.classList.remove('font-size-sm', 'font-size-base', 'font-size-lg');
    document.body.classList.add(`font-size-${fontSize}`);
  }, [fontSize]);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleScreenReader = () => {
    const newState = !screenReaderActive;
    setScreenReaderActive(newState);
    if (newState) {
      speak("Screen reader mode enabled on FixMyCity civic portal.");
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        screenReaderActive,
        toggleScreenReader,
        highContrast,
        setHighContrast,
        speak
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
