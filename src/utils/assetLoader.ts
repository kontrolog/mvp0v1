import { useState, useEffect } from 'react';

const FALLBACK_FONT = 'Arial';

export interface FontData {
  name: string;
  path: string;
  loaded: boolean;
}

export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const loadFont = async (name: string, path: string): Promise<FontData> => {
  try {
    const font = new FontFace(name, `local("${name}"), url(${path})`);
    const loadedFont = await font.load();
    document.fonts.add(loadedFont);
    return { name, path, loaded: true };
  } catch (error) {
    console.warn(`Font ${name} failed to load, using fallback font`, error);
    return { name, path, loaded: false };
  }
};

export const loadFonts = async (fontFiles: Record<string, any>): Promise<FontData[]> => {
  const loadedFonts: FontData[] = [];

  for (const [path, module] of Object.entries(fontFiles)) {
    const name = path.split('/').pop()?.split('.')[0] ?? '';
    try {
      const fontData = await loadFont(name, (module as any).default);
      loadedFonts.push(fontData);
    } catch (error) {
      console.warn(`Failed to load font ${name}, using fallback`, error);
      loadedFonts.push({ name, path: '', loaded: false });
    }
  }

  return loadedFonts;
};