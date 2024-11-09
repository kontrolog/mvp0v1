import { useState, useEffect } from 'react';

export const useFontLoader = (fontFamily: string) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      try {
        await document.fonts.load(`16px "${fontFamily}"`);
        setIsLoaded(true);
      } catch (error) {
        console.error(`Error loading font ${fontFamily}:`, error);
        setIsLoaded(false);
      }
    };

    loadFont();
  }, [fontFamily]);

  return isLoaded;
};