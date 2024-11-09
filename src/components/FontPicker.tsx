import React from 'react';

interface FontPickerProps {
  fonts: Array<{ name: string; path: string }>;
  selectedFont: string | null;
  onSelect: (font: string) => void;
}

const FontPicker: React.FC<FontPickerProps> = ({ fonts, selectedFont, onSelect }) => {
  if (!fonts?.length) return null;

  return (
    <div className="w-48 border-l pl-4">
      <div className="h-32 overflow-y-auto space-y-2">
        {fonts.map((font) => (
          <button
            key={font.name}
            onClick={() => onSelect(font.name)}
            className={`w-full text-left p-2 rounded ${
              selectedFont === font.name ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`}
            style={{ fontFamily: font.name }}
          >
            {font.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontPicker;