'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useGalleryCMS } from '../../hooks/useSimpleCMS';
import { useSimpleAuth } from '../../hooks/useSimpleAuth';
import DirectCMS from '../cms/DirectCMS';
import OptimizedImage from '../ui/OptimizedImage';

// Lightbox Component using Portal
function LightboxPortal({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0" style={{ zIndex: 9999 }}>
      {children}
    </div>,
    document.body
  );
}

export default function MemoryGallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageError, setLightboxImageError] = useState(false);
  const [lightboxImageLoading, setLightboxImageLoading] = useState(true);

  // CMS integration
  const { isAuthenticated } = useSimpleAuth();
  const memoryCMS = useGalleryCMS('about-memory-gallery', [
    '/images/about/memory/IMG_3452.JPG',
    '/images/about/memory/IMG_3454.JPG',
    '/images/about/memory/IMG_3455.JPG',
    '/images/about/memory/IMG_3481.JPG',
    '/images/about/memory/IMG_3491.JPG',
    '/images/about/memory/IMG_3492.JPG',
    '/images/about/memory/IMG_3493.JPG',
    '/images/about/memory/IMG_4339.JPG',
    '/images/about/memory/IMG_4345.JPG',
    '/images/about/memory/IMG_4348.JPG',
    '/images/about/memory/IMG_4367.JPG',
    '/images/about/memory/IMG_5380.JPG',
    '/images/about/memory/IMG_5381.JPG',
    '/images/about/memory/IMG_5382.JPG',
    '/images/about/memory/IMG_5383.JPG',
    '/images/about/memory/0C22A68E-AADF-4A8D-B5E7-44DDBA2EE64F.jpeg',
    '/images/about/memory/83C1CE7D-97A9-400F-9403-60E89979528A.jpg',
    '/images/about/memory/IMG_1728.jpeg',
    '/images/about/memory/IMG_7103.jpeg',
    '/images/about/memory/IMG_7146.jpeg',
    '/images/about/memory/IMG_7272.jpeg',
    '/images/about/memory/KakaoTalk_20250626_002430368.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_01.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_02.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_03.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_04.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_05.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_06.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_07.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_08.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_09.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_10.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_11.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_12.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_13.jpg',
    '/images/about/memory/KakaoTalk_Photo_2025-06-29-18-44-00 001.jpeg',
    '/images/about/memory/KakaoTalk_Photo_2025-06-29-18-44-01 002.jpeg',
    '/images/about/memory/KakaoTalk_Photo_2025-06-29-18-44-01 003.jpeg',
    '/images/about/memory/KakaoTalk_Photo_2025-06-29-18-44-01 004.jpeg',
    '/images/about/memory/KakaoTalk_Photo_2025-06-29-18-44-01 005.jpeg'
  ]);
  const galleryImages = memoryCMS.currentImages;

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch(event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, currentImageIndex]);

  // Image preloading
  useEffect(() => {
    if (!galleryImages.length) return;

    const preloadImages = () => {
      galleryImages.slice(0, 6).forEach(src => {
        if (src) {
          const img = new Image();
          img.src = src;
        }
      });
    };

    const timeoutId = setTimeout(preloadImages, 100);
    return () => clearTimeout(timeoutId);
  }, [galleryImages]);

  // Lightbox functions
  const openLightbox = useCallback((index: number) => {
    if (!galleryImages || galleryImages.length === 0) return;
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    setLightboxImageError(false);
    setLightboxImageLoading(true);
  }, [galleryImages]);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setLightboxImageError(false);
    setLightboxImageLoading(false);
  }, []);

  const nextImage = useCallback(() => {
    if (!galleryImages || galleryImages.length === 0) return;
    setCurrentImageIndex(prev => (prev + 1) % galleryImages.length);
    setLightboxImageError(false);
    setLightboxImageLoading(true);
  }, [galleryImages]);

  const prevImage = useCallback(() => {
    if (!galleryImages || galleryImages.length === 0) return;
    setCurrentImageIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
    setLightboxImageError(false);
    setLightboxImageLoading(true);
  }, [galleryImages]);

  const handleLightboxClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  }, [closeLightbox]);

  return (
    <>
      {/* Main Gallery Section */}
      <div className="min-h-screen pt-[100px] px-5 pb-[60px] bg-gradient-to-br from-white via-gray-50 to-gray-100 relative">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")',
            zIndex: 1
          }}
        />

        {/* Content container */}
        <div className="relative" style={{ zIndex: 2 }}>
          {/* Header */}
          <div className="text-center mb-20 relative">
            <h1
              className="font-['Playfair_Display'] font-bold text-gray-900 mb-5 animate-fadeInUp"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                letterSpacing: '-0.02em',
                lineHeight: 0.9,
                textShadow: '0 0 30px rgba(0,0,0,0.1)'
              }}
            >
              Memory
            </h1>
            <p
              className="font-['Inter'] font-extralight text-[#8B7D6B] uppercase animate-fadeInUp delay-200"
              style={{
                fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
                letterSpacing: '0.3em'
              }}
            >
              Collective Moments
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="max-w-[1800px] mx-auto px-4">
            <div className="grid grid-cols-5 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[3/4] overflow-hidden rounded-md cursor-pointer group animate-fadeInSequential"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                  onClick={() => openLightbox(index)}
                >
                  <div className="w-full h-full transition-all duration-600 group-hover:scale-105">
                    <OptimizedImage
                      src={image}
                      alt={`Memory ${index + 1}`}
                      width={400}
                      height={600}
                      priority={index < 6}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="w-full h-full object-cover filter brightness-90 contrast-110 group-hover:brightness-100 group-hover:contrast-120"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                    <p className="font-['Inter'] text-xs font-light tracking-[0.1em] text-gray-800 uppercase bg-white/80 backdrop-blur-sm px-3 py-2 rounded-md shadow-sm">
                      Moment {String(index + 1).padStart(2, '0')}
                    </p>
                  </div>

                  {/* CMS Button */}
                  {isAuthenticated && (
                    <div
                      className="absolute top-2 right-2 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <DirectCMS
                        slotId={`memory-gallery-${index}`}
                        currentUrl={image}
                        type="image"
                        onUpload={(url) => {
                          const newImages = [...galleryImages];
                          newImages[index] = url;
                          memoryCMS.updateGallery(newImages);
                        }}
                        onDelete={() => {
                          const newImages = galleryImages.filter((_, i) => i !== index);
                          memoryCMS.updateGallery(newImages);
                        }}
                        isAdminMode={true}
                        placeholder={`메모리 ${index + 1}`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add New Image - Admin Only */}
          {isAuthenticated && (
            <div className="max-w-[1800px] mx-auto mt-10 px-4">
              <div
                className="relative aspect-[3/4] max-w-[300px] mx-auto overflow-hidden bg-white/70 border-2 border-dashed border-[#8B7D6B] hover:border-[#8B7D6B]/80 hover:bg-white/90 transition-all duration-300 flex items-center justify-center rounded-lg shadow-sm backdrop-blur-sm animate-fadeInSequential"
                style={{
                  animationDelay: `${galleryImages.length * 50}ms`
                }}
              >
                <DirectCMS
                  slotId={`memory-gallery-new`}
                  type="image"
                  onUpload={(url) => {
                    const newImages = [...galleryImages, url];
                    memoryCMS.updateGallery(newImages);
                  }}
                  isAdminMode={true}
                  placeholder="새 메모리 추가"
                  className="w-full h-full flex items-center justify-center"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox using Portal */}
      <LightboxPortal isOpen={isLightboxOpen}>
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-[20px] flex items-center justify-center"
          onClick={handleLightboxClick}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            {/* Close Button */}
            <button
              className="absolute -top-12 right-0 text-white text-3xl w-10 h-10 flex items-center justify-center hover:text-[#8B7D6B] transition-colors"
              onClick={closeLightbox}
              aria-label="Close"
            >
              ×
            </button>

            {/* Previous Button */}
            <button
              className="absolute top-1/2 -left-16 transform -translate-y-1/2 bg-white/80 backdrop-blur-[10px] border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-gray-700 text-xl hover:bg-[#8B7D6B] hover:text-white transition-all hidden lg:flex"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous"
            >
              ‹
            </button>

            {/* Image Container */}
            <div className="relative">
              {lightboxImageError ? (
                <div className="flex items-center justify-center min-h-[50vh]">
                  <div className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-lg">
                    <div className="text-6xl mb-4 opacity-50">📷</div>
                    <p className="text-lg mb-2 text-gray-900">Failed to load image</p>
                    <button
                      onClick={() => {
                        setLightboxImageError(false);
                        setLightboxImageLoading(true);
                      }}
                      className="px-4 py-2 bg-[#8B7D6B] hover:bg-[#8B7D6B]/80 text-white rounded-md transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {lightboxImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center min-h-[50vh]">
                      <div className="text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-[#8B7D6B] rounded-full mx-auto"></div>
                      </div>
                    </div>
                  )}
                  <OptimizedImage
                    src={galleryImages[currentImageIndex] || ''}
                    alt={`Memory ${currentImageIndex + 1}`}
                    width={1200}
                    height={800}
                    priority={true}
                    sizes="90vw"
                    className="max-w-full max-h-[90vh] object-contain"
                    onLoad={() => setLightboxImageLoading(false)}
                    onError={() => {
                      setLightboxImageLoading(false);
                      setLightboxImageError(true);
                    }}
                  />
                </>
              )}
            </div>

            {/* Next Button */}
            <button
              className="absolute top-1/2 -right-16 transform -translate-y-1/2 bg-white/80 backdrop-blur-[10px] border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-gray-700 text-xl hover:bg-[#8B7D6B] hover:text-white transition-all hidden lg:flex"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      </LightboxPortal>

      {/* CSS Styles */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInSequential {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1.2s cubic-bezier(0.25,0.8,0.25,1) forwards;
        }

        .animate-fadeInUp.delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animate-fadeInSequential {
          opacity: 0;
          animation: fadeInSequential 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        /* Responsive Grid */
        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 480px) {
          .grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </>
  );
}