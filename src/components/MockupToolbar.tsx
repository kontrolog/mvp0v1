import React from 'react';
import { Eye, EyeOff, Download } from 'lucide-react';

interface MockupToolbarProps {
  onGenerate: () => void;
  showEditingTools: boolean;
  onToggleEditingTools: () => void;
}

export const MockupToolbar: React.FC<MockupToolbarProps> = ({
  onGenerate,
  showEditingTools,
  onToggleEditingTools,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
      <button 
        onClick={onGenerate}
        className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 flex items-center gap-2"
      >
        <Download size={20} />
        Create Mockup
      </button>
      <button 
        onClick={onToggleEditingTools}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        {showEditingTools ? <Eye size={24} /> : <EyeOff size={24} />}
      </button>
    </div>
  );
};