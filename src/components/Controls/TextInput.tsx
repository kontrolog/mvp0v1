import React from 'react';
import { Sparkles } from 'lucide-react';

interface TextInputProps {
  value: string;
  selectedFont: string | null;
  onTextChange: (text: string) => void;
  onAddText: () => void;
  onAddSymbol: () => void;
  disabled?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  selectedFont,
  onTextChange,
  onAddText,
  onAddSymbol,
  disabled = false
}) => {
  return (
    <div className="p-4">
      <textarea
        value={value}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Enter your text here..."
        className="w-full h-32 p-3 border rounded-lg resize-none mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        style={{ fontFamily: selectedFont || undefined }}
        disabled={disabled}
      />
      
      <div className="flex gap-4">
        <button 
          onClick={onAddText}
          disabled={disabled || !value || !selectedFont}
          className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add Text
        </button>
        <button 
          onClick={onAddSymbol}
          disabled={disabled}
          className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Sparkles size={16} />
          Add Symbol
        </button>
      </div>
    </div>
  );
};