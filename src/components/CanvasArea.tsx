import React from 'react';
import Draggable from 'react-draggable';
import type { Layer, Product } from '../types';

interface CanvasAreaProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  layers: Layer[];
  selectedLayerIndex: number | null;
  showEditingTools: boolean;
  selectedProduct: Product | null;
  onLayerSelect: (index: number) => void;
  onLayerMove: (index: number, x: number, y: number) => void;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  canvasRef,
  layers,
  selectedLayerIndex,
  showEditingTools,
  selectedProduct,
  onLayerSelect,
  onLayerMove,
}) => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-100 p-8">
      <div className="relative">
        <div 
          ref={canvasRef}
          className="relative w-[300px] h-[300px] bg-white rounded-lg shadow-md"
          style={{
            backgroundImage: selectedProduct ? `url(${selectedProduct.template})` : 'none',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          data-canvas="mockup"
        >
          {layers.map((layer, index) => (
            <Draggable
              key={index}
              position={{ x: layer.x, y: layer.y }}
              disabled={!showEditingTools || selectedLayerIndex !== index}
              onDrag={(e, data) => onLayerMove(index, data.x, data.y)}
            >
              <div 
                className={`absolute cursor-${showEditingTools && selectedLayerIndex === index ? 'move' : 'default'} ${
                  !showEditingTools ? 'opacity-100' : 
                  selectedLayerIndex === index ? 'opacity-100' : 'opacity-50'
                }`}
                onClick={() => showEditingTools && onLayerSelect(index)}
                data-layer={`layer-${index}`}
                data-x={layer.x}
                data-y={layer.y}
              >
                {layer.type === 'text' ? (
                  <div
                    style={{
                      fontFamily: layer.font,
                      fontSize: layer.fontSize,
                      textAlign: layer.align,
                      whiteSpace: 'pre-line',
                      userSelect: 'none',
                    }}
                  >
                    {layer.content}
                  </div>
                ) : (
                  <img
                    src={layer.content}
                    alt={layer.name}
                    style={{
                      width: layer.width,
                      height: layer.height,
                      transform: `scale(${layer.scaleFactor})`,
                      userSelect: 'none',
                    }}
                  />
                )}
              </div>
            </Draggable>
          ))}
        </div>
      </div>
    </div>
  );
};