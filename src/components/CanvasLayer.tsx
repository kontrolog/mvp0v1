import React, { useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { useFontLoader } from '../hooks/useFontLoader';
import type { Layer } from '../types';

interface CanvasLayerProps {
  layer: Layer;
  index: number;
  isSelected: boolean;
  showEditingTools: boolean;
  onSelect: () => void;
  onMove: (x: number, y: number) => void;
}

export const CanvasLayer: React.FC<CanvasLayerProps> = ({
  layer,
  index,
  isSelected,
  showEditingTools,
  onSelect,
  onMove,
}) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const fontLoaded = useFontLoader(layer.font || '');

  useEffect(() => {
    if (layerRef.current && layer.type === 'text' && fontLoaded) {
      const rect = layerRef.current.getBoundingClientRect();
      layerRef.current.setAttribute('data-width', rect.width.toString());
      layerRef.current.setAttribute('data-height', rect.height.toString());
    }
  }, [layer.content, layer.font, fontLoaded]);

  const layerStyles = React.useMemo<React.CSSProperties>(() => ({
    fontFamily: layer.font,
    fontSize: `${layer.fontSize}px`,
    textAlign: layer.align,
    whiteSpace: 'pre-line',
    userSelect: 'none',
    opacity: isSelected ? 1 : 0.8,
    cursor: showEditingTools && isSelected ? 'move' : 'default',
    ...(layer.type === 'symbol' && {
      width: `${layer.width}px`,
      height: `${layer.height}px`,
      transform: `scale(${layer.scaleFactor})`,
    }),
  }), [layer, isSelected, showEditingTools]);

  return (
    <Draggable
      position={{ x: layer.x, y: layer.y }}
      disabled={!showEditingTools || !isSelected}
      onDrag={(e, data) => onMove(data.x, data.y)}
    >
      <div 
        ref={layerRef}
        className="absolute"
        onClick={() => showEditingTools && onSelect()}
        data-layer={`layer-${index}`}
        data-type={layer.type}
        data-x={layer.x}
        data-y={layer.y}
        style={layerStyles}
      >
        {layer.type === 'text' ? (
          layer.content
        ) : (
          <img
            src={layer.content}
            alt={layer.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        )}
      </div>
    </Draggable>
  );
};