import React from 'react';
import { Sparkles } from 'lucide-react';

interface TextControlsProps {
  value: string;
  onChange: (value: string) => void;
  onAddText: () => void;
  onAddSymbol: () => void;
  selectedFont: string | null;
}

const TextControls: React.FC<TextControlsProps> = ({
  value,
  onChange,
  onAddText,
  onAddSymbol,
  selectedFont,
}) => {
  return (
    <div className="flex-1 space-y-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your text here..."
        className="w-full h-32 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        style={{ fontFamily: selectedFont || undefined }}
      />
      
      <div className="flex gap-4">
        <button
          onClick={onAddText}
          className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Add Text
        </button>
        <button
          onClick={onAddSymbol}
          className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <Sparkles size={16} />
          Add Symbol
        </button>
      </div>
    </div>
  );
};

export default TextControls;