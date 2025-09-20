'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious?.();
          break;
        case 'ArrowRight':
          onNext?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onClose, onNext, onPrevious]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.5, 1));
    if (scale <= 1.5) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = () => {
    if (scale > 1) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    resetZoom();
    setImageError(false);
    setIsLoading(true);
  }, [currentIndex]);

  const handleThumbnailClick = (index: number) => {
    if (index !== currentIndex) {
      // Assuming we need to create a navigation function for thumbnails
      const diff = index - currentIndex;
      if (diff > 0 && onNext) {
        for (let i = 0; i < diff; i++) {
          onNext();
        }
      } else if (diff < 0 && onPrevious) {
        for (let i = 0; i < Math.abs(diff); i++) {
          onPrevious();
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm animate-fade-in"
          onClick={onClose}
        >
          {/* Controls */}
          <div className="absolute top-0 left-0 right-0 p-4 z-10 bg-gradient-to-b from-white/90 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomOut();
                  }}
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors text-gray-700"
                  disabled={scale <= 1}
                >
                  <ZoomOut size={20} />
                </button>
                <span className="text-sm text-gray-700">{Math.round(scale * 100)}%</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomIn();
                  }}
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors text-gray-700"
                  disabled={scale >= 3}
                >
                  <ZoomIn size={20} />
                </button>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Image */}
          <div
            className="absolute inset-0 flex items-center justify-center p-16"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: isDragging ? 'grabbing' : scale > 1 ? 'grab' : 'default' }}
          >
            <div
              className="relative w-full h-full transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`
              }}
            >
              {imageError ? (
                <div className="w-full h-full flex items-center justify-center text-gray-700">
                  <div className="text-center bg-white/90 p-8 rounded-lg">
                    <div className="text-6xl mb-4 opacity-50">📷</div>
                    <p className="text-lg mb-2">Failed to load image</p>
                    <p className="text-sm opacity-70">Image may not exist or is not accessible</p>
                    <button
                      onClick={() => {
                        setImageError(false);
                        setIsLoading(true);
                      }}
                      className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                      <div className="text-center bg-white/90 p-6 rounded-lg">
                        <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-gray-700 rounded-full mb-4 mx-auto"></div>
                        <p className="text-sm opacity-70">Loading image...</p>
                      </div>
                    </div>
                  )}
                  <Image
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    fill
                    className="object-contain select-none"
                    sizes="100vw"
                    priority
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                      setIsLoading(false);
                      setImageError(true);
                    }}
                  />
                </>
              )}
            </div>
          </div>

          {/* Navigation */}
          {onPrevious && images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white/90 rounded-full transition-colors z-10 text-gray-700 shadow-lg"
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {onNext && images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white/90 rounded-full transition-colors z-10 text-gray-700 shadow-lg"
              disabled={currentIndex === images.length - 1}
            >
              <ChevronRight size={32} />
            </button>
          )}

          {/* Thumbnails */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/90 to-transparent">
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleThumbnailClick(index);
                  }}
                  className={`relative w-16 h-16 rounded overflow-hidden transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                    index === currentIndex
                      ? 'ring-2 ring-[#8B7D6B] ring-offset-2 ring-offset-white shadow-lg'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}