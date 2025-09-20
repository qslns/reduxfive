'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGalleryCMS } from '../../../hooks/useSimpleCMS';
import { useSimpleAuth } from '../../../hooks/useSimpleAuth';
import DirectCMS from '../../../components/cms/DirectCMS';
import OptimizedImage from '../../../components/ui/OptimizedImage';

// HTML redux6 about-memory.html과 완전 동일한 Memory 페이지 구현
export default function MemoryPage() {
  const router = useRouter();
  // Client-side only state
  const [isClient, setIsClient] = useState(false);
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

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);

    // Cleanup on unmount
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      }
    };
  }, []);

  // Gallery images are now managed by CMS - fallback to empty array if not loaded
  // CMS will populate galleryImages from the 'about-memory-gallery' slot

  // 키보드 네비게이션 - 클라이언트에서만
  useEffect(() => {
    if (!isClient) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isLightboxOpen) {
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
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isClient, isLightboxOpen]);

  // 이미지 프리로딩
  useEffect(() => {
    if (!isClient || !galleryImages.length) return;

    const preloadImages = () => {
      galleryImages.slice(0, 6).forEach(src => {
        if (src) {
          const img = new Image();
          img.src = src;
        }
      });
    };

    const timeoutId = setTimeout(preloadImages, 100);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isClient, galleryImages]);


  // 라이트박스 함수들 - 클라이언트 체크 포함
  const openLightbox = (index: number) => {
    if (!isClient || !galleryImages || galleryImages.length === 0) return;

    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    setLightboxImageError(false);
    setLightboxImageLoading(true);
    // body 스크롤 비활성화 제거 - 네비게이션 문제 방지
    // document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    // body 스크롤 복원
    if (isClient && typeof document !== 'undefined') {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  };

  const nextImage = () => {
    if (!isClient || !galleryImages || galleryImages.length === 0) return;
    
    setCurrentImageIndex(prev => (prev + 1) % galleryImages.length);
    setLightboxImageError(false);
    setLightboxImageLoading(true);
  };

  const prevImage = () => {
    if (!isClient || !galleryImages || galleryImages.length === 0) return;
    
    setCurrentImageIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
    setLightboxImageError(false);
    setLightboxImageLoading(true);
  };

  const handleLightboxClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  // 블랙스크린 방지 - SSR에서도 콘텐츠 렌더링

  return (
    <main className="memory-page-wrapper">
      {/* Professional Gallery - White theme version */}
      <div className="gallery-container min-h-screen pt-[100px] pr-5 pb-[60px] pl-5 relative bg-gradient-to-br from-white via-gray-50 to-gray-100">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")'
          }}
        />

        <div className="gallery-header text-center mb-20 opacity-0 transform translate-y-10 animate-[fadeInUp_1.2s_cubic-bezier(0.25,0.8,0.25,1)_forwards] relative z-[5]">
          <h1 className="gallery-title font-['Playfair_Display'] font-bold text-gray-900 mb-5"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.02em', lineHeight: 0.9, textShadow: '0 0 30px rgba(0,0,0,0.1)' }}>
            Memory
          </h1>
          <p className="gallery-subtitle font-['Inter'] font-extralight text-[#8B7D6B] uppercase"
             style={{ fontSize: 'clamp(0.875rem, 2vw, 1.25rem)', letterSpacing: '0.3em' }}>
            Collective Moments
          </p>
        </div>
        
        <div className="gallery-grid max-w-[1800px] mx-auto px-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="gallery-item overflow-hidden opacity-0 cursor-pointer transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.25,0.8,0.25,1)] hover:transform hover:scale-[1.02] hover:z-10 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] rounded-md"
              style={{
                '--index': index,
                animation: `fadeInSequential 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards`,
                animationDelay: `${index * 50}ms`,
                position: 'relative',
                zIndex: 1
              } as React.CSSProperties}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openLightbox(index);
              }}
            >
              <OptimizedImage 
                src={image}
                alt={`Memory ${index + 1}`}
                width={400}
                height={600}
                priority={index < 6}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-full object-cover transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.25,0.8,0.25,1)] [filter:brightness(0.9)_contrast(1.1)] hover:[filter:brightness(1)_contrast(1.2)_saturate(1.1)] hover:transform hover:scale-105"
              />
              <div className="gallery-overlay absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent opacity-0 transition-opacity duration-[400ms] [transition-timing-function:cubic-bezier(0.25,0.8,0.25,1)] flex items-end p-5 hover:opacity-100 shadow-lg">
                <p className="gallery-caption font-['Inter'] text-xs font-light tracking-[0.1em] text-gray-800 uppercase bg-white/80 backdrop-blur-sm px-3 py-2 rounded-md shadow-sm">
                  Moment {String(index + 1).padStart(2, '0')}
                </p>
              </div>
              
              {/* CMS 버튼 for admin */}
              {isAuthenticated && (
                <div
                  className="absolute top-2 right-2 z-[15]"
                  onClick={(e) => {
                    e.preventDefault();
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

        {/* New image addition slot - White theme version */}
        {isAuthenticated && (
          <div className="max-w-[1800px] mx-auto mt-10 px-5">
            <div
              className="relative aspect-[3/4] overflow-hidden bg-white/70 border-2 border-dashed border-[#8B7D6B] hover:border-[#8B7D6B]/80 hover:bg-white/90 transition-all duration-300 flex items-center justify-center rounded-lg shadow-sm backdrop-blur-sm"
              style={{
                animation: `fadeInSequential 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards`,
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

      {/* Professional Lightbox - White theme version */}
      {isLightboxOpen && (
        <div
          className="lightbox fixed inset-0 bg-black/90 backdrop-blur-[20px] opacity-100 transition-opacity duration-[400ms] [transition-timing-function:cubic-bezier(0.25,0.8,0.25,1)]"
          onClick={handleLightboxClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            zIndex: 9998,
            pointerEvents: 'auto'
        >
          <div className="lightbox-content max-w-[90vw] max-h-[90vh] relative">
            <button
              className="lightbox-close absolute -top-[50px] right-0 bg-transparent border-none text-white text-[30px] cursor-pointer transition-all duration-300 ease-in-out w-10 h-10 flex items-center justify-center hover:text-[#8B7D6B] hover:transform hover:scale-120 z-[9999]"
              onClick={closeLightbox}
            >
              ×
            </button>

            <button
              className="lightbox-nav lightbox-prev absolute top-1/2 left-[-80px] transform -translate-y-1/2 bg-white/80 backdrop-blur-[10px] border border-gray-200 rounded-full w-[60px] h-[60px] flex items-center justify-center text-gray-700 text-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#8B7D6B] hover:text-white hover:transform hover:-translate-y-1/2 hover:scale-110 max-[1024px]:hidden shadow-md z-[9999]"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              ‹
            </button>
            
            <div className="relative">
              {lightboxImageError ? (
                <div className="flex items-center justify-center text-gray-700 min-h-[50vh]">
                  <div className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                    <div className="text-6xl mb-4 opacity-50">📷</div>
                    <p className="text-lg mb-2 text-gray-900">Failed to load image</p>
                    <p className="text-sm opacity-70 mb-4 text-gray-600">Image may not exist or is not accessible</p>
                    <button
                      onClick={() => {
                        setLightboxImageError(false);
                        setLightboxImageLoading(true);
                      }}
                      className="px-4 py-2 bg-[#8B7D6B] hover:bg-[#8B7D6B]/80 text-white rounded-md transition-colors shadow-md"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {lightboxImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-700 min-h-[50vh]">
                      <div className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                        <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-[#8B7D6B] rounded-full mb-4 mx-auto"></div>
                        <p className="text-sm opacity-70 text-gray-600">Loading image...</p>
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
                    className="lightbox-image max-w-full max-h-[90vh] object-contain shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                    onLoad={() => setLightboxImageLoading(false)}
                    onError={() => {
                      setLightboxImageLoading(false);
                      setLightboxImageError(true);
                    }}
                  />
                </>
              )}
            </div>
            
            <button
              className="lightbox-nav lightbox-next absolute top-1/2 right-[-80px] transform -translate-y-1/2 bg-white/80 backdrop-blur-[10px] border border-gray-200 rounded-full w-[60px] h-[60px] flex items-center justify-center text-gray-700 text-xl cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#8B7D6B] hover:text-white hover:transform hover:-translate-y-1/2 hover:scale-110 max-[1024px]:hidden shadow-md z-[9999]"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* CSS for animations matching HTML version */}
      <style jsx>{`
        /* Fix for navigation blocking */
        .memory-page-wrapper {
          position: relative;
          z-index: 1;
        }

        .gallery-container {
          position: relative;
          z-index: 1;
          pointer-events: auto;
        }

        .lightbox {
          position: fixed;
          z-index: 9998;
          pointer-events: auto;
        }

        @keyframes fadeInUp {
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
        
        /* CSS variables - White theme version */
        :root {
          --primary-black: #1f2937;
          --primary-white: #ffffff;
          --accent-mocha: #8B7D6B;
          --accent-warm: #D4CCC5;
          --accent-deep: #6B5B73;
          --accent-neutral: #F9FAFB;
        }

        /* Gallery Grid - Responsive Grid Layout */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
        }

        .gallery-item {
          position: relative;
          aspect-ratio: 3/4;
          width: 100%;
        }

        @media (max-width: 1400px) {
          .gallery-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        
        /* Enhanced Mobile Responsive adjustments */
        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 0.75rem !important;
            padding: 0 1rem !important;
          }
        }

        @media (max-width: 768px) {
          nav {
            padding: 15px 20px !important;
          }
          
          .page-title {
            display: none !important;
          }
          
          .gallery-container {
            padding: 100px 15px 40px !important;
          }
          
          .gallery-header {
            margin-bottom: 30px !important;
            text-align: center !important;
          }
          
          .gallery-header h1 {
            font-size: 2.5rem !important;
            margin-bottom: 1rem !important;
          }
          
          .gallery-header p {
            font-size: 0.9rem !important;
            padding: 0 20px !important;
          }
          
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.5rem !important;
            padding: 0 0.75rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .gallery-container {
            padding: 90px 10px 30px !important;
          }
          
          .gallery-header h1 {
            font-size: 2rem !important;
          }
          
          .gallery-header p {
            font-size: 0.85rem !important;
            padding: 0 10px !important;
          }
          
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.4rem !important;
            padding: 0 0.5rem !important;
          }
        }
        
        @media (max-width: 375px) {
          .gallery-container {
            padding: 80px 8px 25px !important;
          }
          
          .gallery-header h1 {
            font-size: 1.8rem !important;
          }
          
          .gallery-header p {
            font-size: 0.8rem !important;
          }
        }
        
        /* CMS Admin Section Styles */
        .cms-admin-section {
          animation: slideUpFade 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        .memory-cms-slot :global(.media-slot-admin) {
          background: rgba(255, 255, 255, 0.03) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
        }

        .memory-cms-slot :global(.media-slot-admin h4) {
          color: var(--accent-mocha) !important;
        }

        .memory-cms-slot :global(.media-slot-admin p) {
          color: rgba(255, 255, 255, 0.6) !important;
        }

        @keyframes slideUpFade {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Motion Reduction */
        @media (prefers-reduced-motion: reduce) {
          .gallery-item,
          .gallery-header,
          .cms-admin-section {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </main>
  );
}

// Framer Motion 애니메이션으로 마이그레이션 완료