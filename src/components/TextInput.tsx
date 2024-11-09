import React from 'react';
import { Sparkles } from 'lucide-react';

interface TextInputProps {
  value: string;
  selectedFont: string | null;
  fonts: Array<{ name: string; path: string }>;
  onTextChange: (text: string) => void;
  onFontSelect: (font: string) => void;
  onAddText: () => void;
  onAddSymbol: () => void;
  disabled?: boolean;
}

export default function TextInput({
  value,
  selectedFont,
  fonts,
  onTextChange,
  onFontSelect,
  onAddText,
  onAddSymbol,
  disabled = false
}: TextInputProps) {
  return (
    <div className="p-4 bg-white border-t">
      <div className="flex gap-4">
        <div className="flex-1">
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

        <div className="w-48 border-l pl-4">
          <h3 className="text-sm font-medium mb-2">Fonts</h3>
          <div className="h-[180px] overflow-y-auto space-y-2">
            {fonts.map((font) => (
              <button
                key={font.name}
                onClick={() => onFontSelect(font.name)}
                className={`w-full text-left p-2 rounded-lg transition-colors ${
                  selectedFont === font.name 
                    ? 'bg-blue-50 border-2 border-blue-200' 
                    : 'hover:bg-gray-50 active:bg-gray-100 border border-gray-100'
                }`}
              >
                <span 
                  className="block text-base truncate"
                  style={{ fontFamily: font.name }}
                >
                  {font.name.replace(/^Font-\d+-/, '')}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}