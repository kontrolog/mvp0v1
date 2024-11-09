import React from 'react';
import { FontData } from '../../utils/assetLoader';

interface FontPickerProps {
  fonts: FontData[];
  selectedFont: string | null;
  onSelect: (font: string) => void;
  isLoading?: boolean;
}

const FontPicker: React.FC<FontPickerProps> = ({
  fonts,
  selectedFont,
  onSelect,
  isLoading = false
}) => {
  // Auto-select first font when fonts are loaded
  React.useEffect(() => {
    if (fonts.length > 0 && !selectedFont) {
      onSelect(fonts[0].name);
    }
  }, [fonts, selectedFont, onSelect]);

  if (isLoading) {
    return (
      <div className="p-4 border-b">
        <div className="animate-pulse space-y-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-b">
      <div className="p-4">
        <h3 className="text-sm font-medium mb-2">Fonts</h3>
        <div className="space-y-2 overflow-y-auto max-h-[200px]">
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
    </div>
  );
};

export default FontPicker;