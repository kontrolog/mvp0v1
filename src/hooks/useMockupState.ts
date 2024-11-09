import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { v4 as uuidv4 } from 'uuid';
import type { Layer, GeneratedMockup } from '../types';

export const useMockupState = () => {
  // ... diğer state tanımlamaları aynı ...

  const addTextLayer = () => {
    if (!textInput || !selectedFont) return;
    
    // Canvas boyutlarını al
    const canvasWidth = canvasRef.current?.offsetWidth || 300;
    const canvasHeight = canvasRef.current?.offsetHeight || 300;
    
    const newLayer: Layer = {
      type: 'text',
      content: textInput,
      font: selectedFont,
      fontSize: 25,
      // Merkeze konumlandır
      x: (canvasWidth / 2) - ((textInput.length * 25) / 4),
      y: (canvasHeight / 2) - 12.5,
      scaleFactor: 25,
      visible: true,
      align: 'center',
      multiline: textInput.includes('\n'),
    };
    
    setLayers(prevLayers => [newLayer, ...prevLayers]);
    setTextInput('');
    setSelectedLayerIndex(0);
  };

  const addSymbolLayer = (symbol: { name: string; path: string }) => {
    // Canvas boyutlarını al
    const canvasWidth = canvasRef.current?.offsetWidth || 300;
    const canvasHeight = canvasRef.current?.offsetHeight || 300;
    
    const newLayer: Layer = {
      type: 'symbol',
      content: symbol.path,
      name: symbol.name,
      // Merkeze konumlandır
      x: (canvasWidth / 2) - 25,
      y: (canvasHeight / 2) - 25,
      width: 50,
      height: 50,
      scaleFactor: 1,
      visible: true,
    };
    
    setLayers(prevLayers => [newLayer, ...prevLayers]);
    setShowSymbolModal(false);
    setSelectedLayerIndex(0);
  };

  const generateMockup = async () => {
    if (!canvasRef.current) return;
    
    try {
      // Canvas ve generated image oranını hesapla
      const scale = 2;
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: null,
        scale: scale,
        useCORS: true,
        allowTaint: true,
        logging: false,
        onclone: (clonedDoc) => {
          const clonedCanvas = clonedDoc.querySelector('[data-canvas="mockup"]');
          if (clonedCanvas) {
            // Layer pozisyonlarını oranla
            const layers = clonedCanvas.querySelectorAll('[data-layer]');
            layers.forEach((layer) => {
              const x = parseFloat(layer.getAttribute('data-x') || '0');
              const y = parseFloat(layer.getAttribute('data-y') || '0');
              (layer as HTMLElement).style.transform = 
                `translate(${x * scale}px, ${y * scale}px)`;
            });
          }
        }
      });
      
      const mockup: GeneratedMockup = {
        id: uuidv4(),
        imageUrl: canvas.toDataURL('image/png'),
        createdAt: new Date(),
      };
      
      setGeneratedMockups(prev => [mockup, ...prev]);
      setShowNotification(true);
      
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } catch (error) {
      console.error('Error generating mockup:', error);
    }
  };

  // ... diğer fonksiyonlar aynı ...

  return {
    // ... diğer return değerleri aynı ...
  };
};