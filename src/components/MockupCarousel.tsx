import React from 'react';
import { Download, Trash2, ExternalLink } from 'lucide-react';
import type { GeneratedMockup } from '../types';

interface MockupCarouselProps {
  mockups: GeneratedMockup[];
  onDelete: (id: string) => void;
  etsyLink?: string;
  isFirstMockup: boolean;
}

const MockupCarousel: React.FC<MockupCarouselProps> = ({
  mockups,
  onDelete,
  etsyLink,
  isFirstMockup
}) => {
  if (!mockups.length) return null;

  return (
    <div className="bg-white p-4">
      <div className="max-w-screen-xl mx-auto">
        <h3 className="text-lg font-medium mb-4">Generated Mockups</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
          {mockups.map((mockup) => (
            <div key={mockup.id} className="relative group flex-none w-48 aspect-square snap-start">
              <img
                src={mockup.imageUrl}
                alt={`Mockup ${mockup.id}`}
                className="w-full h-full object-contain border rounded-lg"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-200 rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <a
                  href={mockup.imageUrl}
                  download={`mockup-${mockup.id}.png`}
                  className="p-2 bg-white rounded-full hover:bg-gray-100"
                  title="Download mockup"
                >
                  <Download size={20} />
                </a>
                {etsyLink && (
                  <a
                    href={etsyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full hover:bg-gray-100 text-[#F1641E]"
                    title="View on Etsy"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
                <button
                  onClick={() => onDelete(mockup.id)}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 text-red-500"
                  title="Delete mockup"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MockupCarousel;