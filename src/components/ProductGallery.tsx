import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import { Instagram, Facebook, Twitter, Youtube, MessageCircle } from 'lucide-react';
import type { Product } from '../types';

interface ProductGalleryProps {
  products: Product[];
  onSelectTemplate: (template: string) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  products,
  onSelectTemplate,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    if (!selectedProduct) return;
    setCurrentImageIndex((prev) => 
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    if (!selectedProduct) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => {
              setSelectedProduct(product);
              setCurrentImageIndex(0);
            }}
            className="cursor-pointer group relative aspect-square"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-200 rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent text-white rounded-b-lg">
              <h3 className="text-sm font-medium">{product.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center items-center gap-6 border-t pt-6">
        <a
          href="https://instagram.com/goldenmelodyjewelry"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-[#E1306C] transition-colors"
          aria-label="Instagram"
        >
          <Instagram size={24} />
        </a>
        <a
          href="https://facebook.com/goldenmelodyjewelry"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-[#1877F2] transition-colors"
          aria-label="Facebook"
        >
          <Facebook size={24} />
        </a>
        <a
          href="https://twitter.com/GMelodyJewelry"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-[#1DA1F2] transition-colors"
          aria-label="Twitter"
        >
          <Twitter size={24} />
        </a>
        <a
          href="https://www.youtube.com/@GoldenMelodyJewelry"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-[#FF0000] transition-colors"
          aria-label="YouTube"
        >
          <Youtube size={24} />
        </a>
        <a
          href="https://www.tiktok.com/@goldenmelodyjewelry"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black transition-colors"
          aria-label="TikTok"
        >
          <MessageCircle size={24} />
        </a>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="relative">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute right-2 top-2 z-10 p-1 bg-white rounded-full shadow-md"
              >
                <X size={20} />
              </button>
              
              <div className="relative aspect-square">
                <img
                  src={selectedProduct.images[currentImageIndex]}
                  alt={`${selectedProduct.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                
                {selectedProduct.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full shadow-md"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <button
                      onClick={handleNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full shadow-md"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 space-y-4">
              <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
              <p className="text-gray-600">{selectedProduct.description}</p>
              
              <div className="flex gap-2">
                {selectedProduct.templates.primary && (
                  <button
                    onClick={() => {
                      onSelectTemplate(selectedProduct.templates.primary);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    {selectedProduct.templates.secondary ? 'Use Horizontal Template' : 'Use Template'}
                  </button>
                )}
                
                {selectedProduct.templates.secondary && (
                  <button
                    onClick={() => {
                      onSelectTemplate(selectedProduct.templates.secondary!);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  >
                    Use Vertical Template
                  </button>
                )}
                
                <a
                  href={selectedProduct.etsyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2 px-4 bg-[#F1641E] text-white rounded-lg hover:bg-[#E55B1A]"
                >
                  <ExternalLink size={16} />
                  View on Etsy
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};