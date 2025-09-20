'use client';

import { useState, useEffect } from 'react';
import { useGalleryCMS } from '../../hooks/useSimpleCMS';
import { useSimpleAuth } from '../../hooks/useSimpleAuth';
import DirectCMS from '../cms/DirectCMS';
import OptimizedImage from '../ui/OptimizedImage';

export default function MemoryGallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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

  // 라이트박스 열기/닫기
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // 이미지 네비게이션
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // 키보드 네비게이션
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') nextImage();
      if (event.key === 'ArrowLeft') prevImage();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, currentImageIndex, galleryImages.length]);

  return (
    <>
      {/* Main Gallery */}
      <div className="min-h-screen pt-[100px] px-5 pb-[60px] bg-gradient-to-br from-white via-gray-50 to-gray-100">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
            Memory
          </h1>
          <p className="text-base lg:text-lg font-light text-gray-600 uppercase tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>
            Collective Moments
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] overflow-hidden rounded-md cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <div className="w-full h-full transition-transform duration-300 group-hover:scale-105">
                  <OptimizedImage
                    src={image}
                    alt={`Memory ${index + 1}`}
                    width={400}
                    height={600}
                    priority={index < 6}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-xs font-light uppercase tracking-wider">
                    Moment {String(index + 1).padStart(2, '0')}
                  </p>
                </div>

                {/* CMS Button */}
                {isAuthenticated && (
                  <div
                    className="absolute top-2 right-2 z-10"
                    onClick={(e) => e.stopPropagation()}
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
            <div className="relative aspect-[3/4] max-w-[300px] mx-auto overflow-hidden bg-white/50 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors rounded-lg flex items-center justify-center">
              <DirectCMS
                slotId="memory-gallery-new"
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

      {/* Lightbox - 간소화된 버전 */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[9000]"
          onClick={closeLightbox}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 transition-colors"
              onClick={closeLightbox}
              aria-label="Close"
            >
              ×
            </button>

            {/* Image */}
            <OptimizedImage
              src={galleryImages[currentImageIndex] || ''}
              alt={`Memory ${currentImageIndex + 1}`}
              width={1200}
              height={800}
              priority={true}
              sizes="90vw"
              className="max-w-full max-h-[90vh] object-contain"
            />

            {/* Navigation Buttons */}
            <button
              className="absolute top-1/2 -left-12 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              className="absolute top-1/2 -right-12 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
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
      )}
    </>
  );
}