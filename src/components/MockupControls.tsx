import React from 'react';
import { Download, Eye, EyeOff } from 'lucide-react';
import type { Layer, GeneratedMockup } from '../types';
import ScaleSlider from './ScaleSlider';
import LayerControls from './LayerControls';
import FontPicker from './FontPicker';
import MockupCarousel from './MockupCarousel';
import ProductGallery from './ProductGallery';

interface MockupControlsProps {
  layers: Layer[];
  selectedLayerIndex: number | null;
  showEditingTools: boolean;
  textInput: string;
  selectedFont: string | null;
  fonts: { name: string; path: string }[];
  generatedMockups: GeneratedMockup[];
  onTextInputChange: (text: string) => void;
  onFontSelect: (font: string) => void;
  onAddTextLayer: () => void;
  onShowSymbolModal: () => void;
  onToggleEditingTools: () => void;
  onGenerateMockup: () => void;
  onDeleteMockup: (id: string) => void;
  onScaleChange: (scale: number) => void;
  onLayerMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onDeleteLayer: (index: number) => void;
}

const MockupControls: React.FC<MockupControlsProps> = ({
  layers,
  selectedLayerIndex,
  showEditingTools,
  textInput,
  selectedFont,
  fonts,
  generatedMockups,
  onTextInputChange,
  onFontSelect,
  onAddTextLayer,
  onShowSymbolModal,
  onToggleEditingTools,
  onGenerateMockup,
  onDeleteMockup,
  onScaleChange,
  onLayerMove,
  onDeleteLayer,
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
        <button 
          onClick={onGenerateMockup}
          className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 flex items-center gap-2"
        >
          <Download size={20} />
          Create Mockup
        </button>
        
        <button 
          onClick={onToggleEditingTools}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          {showEditingTools ? <Eye size={24} /> : <EyeOff size={24} />}
        </button>
      </div>

      {/* Controls Area */}
      <div className="flex-1 flex">
        <ScaleSlider
          value={selectedLayerIndex !== null ? layers[selectedLayerIndex]?.scaleFactor : 1}
          onChange={onScaleChange}
          min={selectedLayerIndex !== null && layers[selectedLayerIndex]?.type === 'symbol' ? 0.1 : 10}
          max={selectedLayerIndex !== null && layers[selectedLayerIndex]?.type === 'symbol' ? 3 : 60}
          disabled={selectedLayerIndex === null}
        />

        {selectedLayerIndex !== null && showEditingTools && (
          <LayerControls
            onMove={onLayerMove}
            disabled={selectedLayerIndex === null}
          />
        )}
      </div>

      {/* Text Controls */}
      <div className="p-4 flex gap-4">
        <div className="flex-1">
          <textarea
            value={textInput}
            onChange={(e) => onTextInputChange(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full h-32 p-3 border rounded-lg resize-none"
            style={{ fontFamily: selectedFont || undefined }}
          />
          <div className="flex gap-4 mt-4">
            <button 
              onClick={onAddTextLayer}
              className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Text
            </button>
            <button 
              onClick={onShowSymbolModal}
              className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Symbol
            </button>
          </div>
        </div>

        <FontPicker
          fonts={fonts}
          selectedFont={selectedFont}
          onSelect={onFontSelect}
        />
      </div>

      {/* Layers List */}
      <div className="w-48 bg-white border-l p-4">
        <h3 className="text-sm font-medium mb-2">Layers</h3>
        <div className="space-y-2">
          {layers.map((layer, index) => (
            <div 
              key={index}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                index === selectedLayerIndex ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
              onClick={() => onDeleteLayer(index)}
            >
              <span className="font-medium truncate flex-1">
                {layer.type === 'text' ? layer.content : layer.name}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteLayer(index);
                }}
                className="p-1 text-white bg-red-500 rounded text-sm hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Mockups */}
      <MockupCarousel
        mockups={generatedMockups}
        onDelete={onDeleteMockup}
      />
    </div>
  );
};

export default MockupControls;