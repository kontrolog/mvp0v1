import React from 'react';
import { X } from 'lucide-react';
import { useAssets } from '../hooks/useAssets';

interface SymbolPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (symbolPath: string, symbolName: string) => void;
}

export const SymbolPicker: React.FC<SymbolPickerProps> = ({
  isOpen,
  onClose,
  onSelectSymbol,
}) => {
  const { symbols } = useAssets();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Choose a Symbol</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 p-4 overflow-y-auto">
          {symbols.map((symbol) => (
            <button
              key={symbol.name}
              onClick={() => {
                onSelectSymbol(symbol.path, symbol.displayName);
                onClose();
              }}
              className="aspect-square p-4 border rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <img
                src={symbol.path}
                alt={symbol.displayName}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};