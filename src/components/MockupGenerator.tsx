import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Gamepad2, Eye, Download } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import { CanvasArea } from './Canvas/CanvasArea';
import { TextInput } from './Controls/TextInput';
import FontPicker from './Controls/FontPicker';
import { LayersPanel } from './LayersPanel';
import { SymbolPicker } from './SymbolPicker';
import { ProductGallery } from './ProductGallery';
import { JoystickControls } from './Controls/JoystickControls';
import MockupCarousel from './MockupCarousel';
import { Notification } from './Notification';
import { useAssets } from '../hooks/useAssets';
import { PRODUCTS } from '../data/products';
import type { Layer, GeneratedMockup, Product } from '../types';

const CANVAS_WIDTH = 200;
const BASE_SYMBOL_SIZE = 50;
const JOYSTICK_SPEED = 0.10;
const MAX_FONT_SIZE = 72;

export const MockupGenerator: React.FC = () => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null);
  const [showJoystick, setShowJoystick] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [selectedFont, setSelectedFont] = useState<string | null>(null);
  const [showSymbolModal, setShowSymbolModal] = useState(false);
  const [generatedMockups, setGeneratedMockups] = useState<GeneratedMockup[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showEditingTools, setShowEditingTools] = useState(true);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success' as const
  });

  const canvasRef = useRef<HTMLDivElement>(null);
  const { fonts } = useAssets();

  useEffect(() => {
    if (PRODUCTS.length > 0 && !selectedProduct) {
      const defaultProduct = PRODUCTS[0];
      setSelectedProduct(defaultProduct);
      setSelectedTemplate(defaultProduct.templates.primary);
    }
  }, []);

  useEffect(() => {
    if (fonts.length > 0 && !selectedFont) {
      setSelectedFont(fonts[0].name);
    }
  }, [fonts]);

  const handleScaleChange = useCallback((value: number) => {
    if (selectedLayerIndex === null) return;
    
    setLayers(prevLayers => {
      const newLayers = [...prevLayers];
      const layer = newLayers[selectedLayerIndex];
      
      if (layer.type === 'text') {
        newLayers[selectedLayerIndex] = {
          ...layer,
          fontSize: Math.min(value, MAX_FONT_SIZE)
        };
      } else if (layer.type === 'symbol') {
        const scale = value;
        newLayers[selectedLayerIndex] = {
          ...layer,
          width: BASE_SYMBOL_SIZE * scale,
          height: BASE_SYMBOL_SIZE * scale,
          scaleFactor: scale
        };
      }
      
      return newLayers;
    });
  }, [selectedLayerIndex]);

  const handleJoystickMove = useCallback((x: number, y: number) => {
    if (selectedLayerIndex === null) return;
    
    setLayers(prevLayers => {
      const newLayers = [...prevLayers];
      const layer = { ...newLayers[selectedLayerIndex] };
      
      layer.x += x * JOYSTICK_SPEED;
      layer.y += y * JOYSTICK_SPEED;
      
      newLayers[selectedLayerIndex] = layer;
      return newLayers;
    });
  }, [selectedLayerIndex]);

  const handleAddTextLayer = useCallback(() => {
    if (!textInput || !selectedFont) return;
    
    const newLayer: Layer = {
      type: 'text',
      content: textInput,
      font: selectedFont,
      fontSize: 25,
      x: CANVAS_WIDTH / 2 - 50,
      y: CANVAS_WIDTH / 2 - 25,
      scaleFactor: 1,
      visible: true,
      align: 'center',
      opacity: 1,
    };
    
    setLayers(prev => [newLayer, ...prev]);
    setTextInput('');
    setSelectedLayerIndex(0);
  }, [textInput, selectedFont]);

  const handleAddSymbolLayer = useCallback((symbolPath: string, symbolName: string) => {
    const newLayer: Layer = {
      type: 'symbol',
      content: symbolPath,
      name: symbolName,
      x: CANVAS_WIDTH / 2 - BASE_SYMBOL_SIZE / 2,
      y: CANVAS_WIDTH / 2 - BASE_SYMBOL_SIZE / 2,
      width: BASE_SYMBOL_SIZE,
      height: BASE_SYMBOL_SIZE,
      scaleFactor: 1,
      visible: true,
      opacity: 1,
    };
    
    setLayers(prev => [newLayer, ...prev]);
    setShowSymbolModal(false);
    setSelectedLayerIndex(0);
  }, []);

  const generateMockup = async () => {
    if (!canvasRef.current) return;
    
    try {
      const originalLayers = [...layers];
      
      setLayers(layers.map(layer => ({
        ...layer,
        opacity: 1
      })));
      
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const scale = 2;
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: null,
        scale: scale,
        useCORS: true,
        allowTaint: true,
        logging: false,
        onclone: (clonedDoc) => {
          const clonedLayers = clonedDoc.querySelectorAll('[data-layer]');
          clonedLayers.forEach((layer) => {
            (layer as HTMLElement).style.opacity = '1';
          });
        }
      });
      
      setLayers(originalLayers);
      
      const mockup: GeneratedMockup = {
        id: uuidv4(),
        imageUrl: canvas.toDataURL('image/png'),
        createdAt: new Date(),
        productId: selectedProduct?.id
      };
      
      setGeneratedMockups(prev => [mockup, ...prev]);
      
      let message = 'Mockup generated successfully!';
      const mockupCount = generatedMockups.length;

      if (mockupCount === 0) {
        message = '🎉 Congrats on your first mockup! 🎉 🎁 FREE BACKSIDE ENGRAVING for first-time users! 🎁 👉 Create your backside engraving mockup now! ✨';
      } else if (mockupCount === 4) {
        message = "Great job! You've created 5 mockups. Keep going!";
      } else if (mockupCount === 9) {
        message = "Amazing! You've created 10 mockups. You're a pro!";
      }
      
      setNotification({
        show: true,
        message,
        type: 'success'
      });
      
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 3000);
    } catch (error) {
      console.error('Error generating mockup:', error);
      setNotification({
        show: true,
        message: "Error generating mockup. Please try again.",
        type: 'error'
      });
    }
  };

  const canUseJoystick = selectedLayerIndex !== null && layers.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <button 
            onClick={generateMockup}
            className="px-6 py-2.5 text-white bg-green-500 rounded-lg hover:bg-green-600 flex items-center gap-2 shadow-sm"
          >
            <Download size={20} />
            Create Mockup
          </button>
          
          <button 
            onClick={() => setShowJoystick(!showJoystick)}
            className={`p-2.5 hover:bg-gray-100 rounded-full transition-opacity ${
              canUseJoystick ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!canUseJoystick}
            title={showJoystick ? "Switch to text input" : "Switch to joystick control"}
          >
            {showJoystick ? <Eye size={24} /> : <Gamepad2 size={24} />}
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 flex">
          <div className="w-12 bg-white border-r p-2 flex items-center justify-center">
            <input
              type="range"
              min={selectedLayerIndex !== null && layers[selectedLayerIndex]?.type === 'symbol' ? 0.1 : 10}
              max={selectedLayerIndex !== null && layers[selectedLayerIndex]?.type === 'symbol' ? 3 : MAX_FONT_SIZE}
              step="0.1"
              value={selectedLayerIndex !== null ? 
                layers[selectedLayerIndex]?.type === 'text' ? 
                  layers[selectedLayerIndex]?.fontSize : 
                  layers[selectedLayerIndex]?.scaleFactor 
                : 1
              }
              onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
              className="h-full w-3 appearance-none bg-transparent cursor-pointer"
              style={{
                writingMode: 'bt-lr',
                WebkitAppearance: 'slider-vertical',
                transform: 'rotate(180deg)'
              }}
            />
          </div>

          <div className="flex-1">
            <CanvasArea
              canvasRef={canvasRef}
              layers={layers}
              selectedLayerIndex={selectedLayerIndex}
              showEditingTools={!showJoystick}
              selectedProduct={selectedProduct}
              selectedTemplate={selectedTemplate}
              onLayerSelect={setSelectedLayerIndex}
              onLayerMove={(index, x, y) => {
                const newLayers = [...layers];
                newLayers[index] = { ...newLayers[index], x, y };
                setLayers(newLayers);
              }}
            />
          </div>

          <div className="w-64 bg-white border-l">
            <LayersPanel
              layers={layers}
              selectedLayerIndex={selectedLayerIndex}
              onSelectLayer={setSelectedLayerIndex}
              onDeleteLayer={(index) => {
                setLayers(layers.filter((_, i) => i !== index));
                setSelectedLayerIndex(null);
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border-t">
        <div className="flex">
          {showJoystick && canUseJoystick ? (
            <JoystickControls
              onMove={handleJoystickMove}
              onClose={() => setShowJoystick(false)}
            />
          ) : (
            <TextInput
              value={textInput}
              selectedFont={selectedFont}
              onTextChange={setTextInput}
              onAddText={handleAddTextLayer}
              onAddSymbol={() => setShowSymbolModal(true)}
              disabled={false}
            />
          )}

          <FontPicker
            fonts={fonts}
            selectedFont={selectedFont}
            onSelect={setSelectedFont}
          />
        </div>
      </div>

      <div className="border-t">
        <MockupCarousel
          mockups={generatedMockups}
          onDelete={(id) => setGeneratedMockups(prev => prev.filter(m => m.id !== id))}
          etsyLink={selectedProduct?.etsyLink}
          isFirstMockup={generatedMockups.length === 1}
        />
      </div>

      <div className="bg-white border-t">
        <div className="max-w-screen-xl mx-auto p-4">
          <h3 className="text-lg font-medium mb-4">Choose a Template</h3>
          <ProductGallery 
            products={PRODUCTS} 
            onSelectTemplate={(template) => {
              const product = PRODUCTS.find(p => 
                p.templates.primary === template || p.templates.secondary === template
              );
              if (product) {
                setSelectedProduct(product);
                setSelectedTemplate(template);
              }
            }}
          />
        </div>
      </div>

      <SymbolPicker
        isOpen={showSymbolModal}
        onClose={() => setShowSymbolModal(false)}
        onSelectSymbol={handleAddSymbolLayer}
      />

      <Notification
        show={notification.show}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
};