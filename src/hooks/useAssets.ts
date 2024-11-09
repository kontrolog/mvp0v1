import { useState, useEffect } from 'react';

export const useAssets = () => {
  const [fonts, setFonts] = useState<Array<{ name: string; path: string }>>([]);
  const [symbols, setSymbols] = useState<Array<{ name: string; path: string }>>([]);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        const fontFiles = import.meta.glob('../fonts/*.{ttf,otf}', { eager: true });
        const loadedFonts = await Promise.all(
          Object.entries(fontFiles).map(async ([path, module]) => {
            const name = path.split('/').pop()?.split('.')[0] ?? '';
            const fontUrl = (module as any).default;

            try {
              const fontFace = new FontFace(name, `url(${fontUrl})`);
              const loadedFont = await fontFace.load();
              document.fonts.add(loadedFont);
              return { name, path: fontUrl };
            } catch (error) {
              console.warn(`Error loading font ${name}:`, error);
              return null;
            }
          })
        );

        setFonts(loadedFonts.filter((font): font is { name: string; path: string } => font !== null));
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFonts([]);
      }
    };

    const loadSymbols = async () => {
      try {
        const symbolFiles = import.meta.glob('../vectors/*.png', { eager: true });
        const loadedSymbols = Object.entries(symbolFiles).map(([path, module]) => {
          const name = path.split('/').pop()?.split('.')[0] ?? '';
          return { name, path: (module as any).default };
        });
        setSymbols(loadedSymbols);
      } catch (error) {
        console.error('Error loading symbols:', error);
        setSymbols([]);
      }
    };

    loadFonts();
    loadSymbols();
  }, []);

  return { fonts, symbols };
};