import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Layer } from '../types';

interface LayersPanelProps {
  layers: Layer[];
  selectedLayerIndex: number | null;
  onSelectLayer: (index: number) => void;
  onDeleteLayer: (index: number) => void;
}

export const LayersPanel: React.FC<LayersPanelProps> = ({
  layers,
  selectedLayerIndex,
  onSelectLayer,
  onDeleteLayer,
}) => {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="p-4 border-b">
        <h3 className="text-sm font-medium">Layers</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {layers.map((layer, index) => (
            <div 
              key={index}
              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
                index === selectedLayerIndex ? 'bg-blue-50 border-2 border-blue-200' : 'hover:bg-gray-50 active:bg-gray-100 border border-gray-100'
              }`}
              onClick={() => onSelectLayer(index)}
            >
              <span className="font-medium truncate flex-1">
                {layer.type === 'text' 
                  ? layer.content 
                  : layer.name?.replace(/\.[^/.]+$/, '') || 'Symbol'
                }
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteLayer(index);
                }}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                aria-label="Delete layer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};