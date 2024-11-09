import { useState, useEffect } from 'react';
import { FontData } from '../utils/assetLoader';

export const useFonts = () => {
  const [fonts, setFonts] = useState<FontData[]>([]);
  const [selectedFont, setSelectedFont] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeFonts = async () => {
      try {
        setIsLoading(true);
        
        // List all available fonts
        const fontFiles = {
          'Font-01-Rock': '/fonts/Font-01-Rock.ttf',
          'Font-02-Lond': '/fonts/Font-02-Lond.ttf',
          'Font-03-Poir': '/fonts/Font-03-Poir.ttf',
          'Font-04-Auto': '/fonts/Font-04-Auto.otf',
          'Font-05-Scri': '/fonts/Font-05-Scri.ttf',
          'Font-06-Hug': '/fonts/Font-06-Hug.ttf',
          'Font-07-KG': '/fonts/Font-07-KG.ttf',
          'Font-08-East': '/fonts/Font-08-East.ttf',
          'Font-09-Coun': '/fonts/Font-09-Coun.ttf',
          'Font-10-Autu': '/fonts/Font-10-Autu.ttf',
          'Font-11-Bein': '/fonts/Font-11-Bein.otf',
          'Font-12-Cook': '/fonts/Font-12-Cook.ttf',
          'Font-13-Marm': '/fonts/Font-13-Marm.ttf',
          'Font-14-Time': '/fonts/Font-14-Time.ttf',
          'Font-15-Walk': '/fonts/Font-15-Walk.otf',
          'Font-16-Skin': '/fonts/Font-16-Skin.ttf',
          'Font-17-Sund': '/fonts/Font-17-Sund.ttf',
          'Font-18-Runa': '/fonts/Font-18-Runa.ttf',
          'Font-19-Gabr': '/fonts/Font-19-Gabr.ttf',
          'Font-20-Velo': '/fonts/Font-20-Velo.ttf',
          'Font-21-Aria': '/fonts/Font-21-Aria.ttf',
          'Font-22-Gold': '/fonts/Font-22-Gold.ttf',
          'Font-23-Natu': '/fonts/Font-23-Natu.ttf',
          'Font-24-Shel': '/fonts/Font-24-Shel.otf',
          'Font-25-Harv': '/fonts/Font-25-Harv.ttf',
          'Font-26-Mich': '/fonts/Font-26-Mich.otf'
        };
        
        const loadedFonts = await Promise.all(
          Object.entries(fontFiles).map(async ([name, path]) => {
            try {
              const font = new FontFace(name, `url(${path})`);
              await font.load();
              document.fonts.add(font);
              return { name, path, loaded: true };
            } catch (error) {
              console.error(`Failed to load font ${name}:`, error);
              return { name, path, loaded: false };
            }
          })
        );

        const validFonts = loadedFonts
          .filter(font => font.loaded)
          .sort((a, b) => a.name.localeCompare(b.name));

        setFonts(validFonts);
        
        if (validFonts.length > 0) {
          setSelectedFont(validFonts[0].name);
        }
      } catch (error) {
        console.error('Error initializing fonts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeFonts();
  }, []);

  return {
    fonts,
    selectedFont,
    setSelectedFont,
    isLoading
  };
};