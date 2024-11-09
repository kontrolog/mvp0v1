import React from 'react';
import { CanvasLayer } from './CanvasLayer';
import type { Layer, Product } from '../../types';

interface CanvasAreaProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  layers: Layer[];
  selectedLayerIndex: number | null;
  showEditingTools: boolean;
  selectedProduct: Product | null;
  selectedTemplate: string | null;
  onLayerSelect: (index: number) => void;
  onLayerMove: (index: number, x: number, y: number) => void;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  canvasRef,
  layers,
  selectedLayerIndex,
  showEditingTools,
  selectedProduct,
  selectedTemplate,
  onLayerSelect,
  onLayerMove,
}) => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-100 p-8">
      <div className="relative">
        <div 
          ref={canvasRef}
          className="relative w-[200px] h-[200px] bg-white rounded-lg shadow-md"
          style={{
            backgroundImage: selectedTemplate ? `url(${selectedTemplate})` : 'none',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          data-canvas="mockup"
        >
          {layers.map((layer, index) => (
            <CanvasLayer
              key={index}
              layer={layer}
              index={index}
              isSelected={selectedLayerIndex === index}
              showEditingTools={showEditingTools}
              onSelect={() => onLayerSelect(index)}
              onMove={(x, y) => onLayerMove(index, x, y)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};