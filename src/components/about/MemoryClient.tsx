'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OptimizedImage from '../ui/OptimizedImage';
import { useGalleryCMS } from '../../hooks/useSimpleCMS';
import { useSimpleAuth } from '../../hooks/useSimpleAuth';
import DirectCMS from '../cms/DirectCMS';

/**
 * Memory Page Component - 완전히 재설계된 버전
 * 네비게이션 문제를 해결하기 위해 모달 시스템을 개선하고
 * z-index 관리를 올바르게 수정
 */
export default function MemoryClient() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState<{[key: number]: boolean}>({});

  // CMS 설정
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

  const images = memoryCMS.currentImages;

  // 클라이언트 사이드 확인
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 모달 열기 함수
  const openModal = (image: string) => {
    setSelectedImage(image);
    // body 스크롤 방지
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${window.scrollY}px`;
  };

  // 모달 닫기 함수 - 개선된 버전
  const closeModal = () => {
    // 스크롤 위치 복원을 위한 계산
    const scrollY = document.body.style.top;

    // 모달 닫기
    setSelectedImage(null);

    // body 스타일 완전 초기화
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';

    // 스크롤 위치 복원
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        closeModal();
      }
    };

    if (selectedImage) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [selectedImage]);

  // 이미지 로드 상태 관리
  const handleImageLoad = (index: number) => {
    setImageLoadStates(prev => ({ ...prev, [index]: true }));
  };

  // 애니메이션 효과
  useEffect(() => {
    if (!isClient) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const galleryItems = document.querySelectorAll('.memory-gallery-item');
    galleryItems.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center h-screen">
          <div className="text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="memory-hero relative h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden pt-[80px]">
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            filter: 'contrast(120%)'
          }}
        />

        {/* Geometric decorations */}
        <div className="absolute top-[20%] left-[10%] w-[100px] h-[100px] border border-gray-200 rounded-full animate-pulse" />
        <div className="absolute bottom-[25%] right-[15%] w-[150px] h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <div
          className="absolute top-[60%] left-[80%] w-[80px] h-[80px] border border-gray-200"
          style={{ transform: 'rotate(45deg)' }}
        />

        {/* Main content */}
        <div className="relative z-10 text-center px-6">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-[0.3em] text-gray-900 mb-6 opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            MEMORY
          </h1>
          <p
            className="text-lg md:text-xl tracking-[4px] text-gray-600 opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            COLLECTIVE MOMENTS
          </p>
          <div
            className="mt-12 text-sm text-gray-500 tracking-wider opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            OUR JOURNEY CAPTURED IN TIME
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent animate-bounce" />
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 px-6 md:px-10 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl font-light leading-relaxed text-gray-700 mb-8">
            순간은 <span className="text-[#8B7D6B] font-medium">기억</span>이 되고,
          </p>
          <p className="text-2xl font-light leading-relaxed text-gray-700 mb-8">
            기억은 우리의 <span className="text-[#8B7D6B] font-medium">이야기</span>가 됩니다.
          </p>
          <p className="text-lg text-gray-600 italic">
            "Every moment we share becomes a thread in our collective story."
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 md:px-10 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Gallery header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-gray-900 mb-4">
              OUR ARCHIVES
            </h2>
            <div className="w-20 h-[1px] bg-gray-400 mx-auto" />
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="memory-gallery-item relative group opacity-0 transition-all duration-700"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className="aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]"
                  onClick={() => openModal(image)}
                >
                  {/* Loading skeleton */}
                  {!imageLoadStates[index] && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  )}

                  <OptimizedImage
                    src={image}
                    alt={`Memory ${index + 1}`}
                    width={400}
                    height={533}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    onLoad={() => handleImageLoad(index)}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-light tracking-wider">#{index + 1}</p>
                    </div>
                  </div>
                </div>

                {/* CMS Controls */}
                {isAuthenticated && (
                  <div
                    className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DirectCMS
                      slotId={`memory-${index}`}
                      currentUrl={image}
                      type="image"
                      onUpload={(url) => {
                        const newImages = [...images];
                        newImages[index] = url;
                        memoryCMS.updateGallery(newImages);
                      }}
                      onDelete={() => {
                        const newImages = images.filter((_, i) => i !== index);
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

          {/* Add new image - Admin only */}
          {isAuthenticated && (
            <div className="mt-12 flex justify-center">
              <div className="w-64 h-80 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                <DirectCMS
                  slotId="memory-new"
                  type="image"
                  onUpload={(url) => {
                    const newImages = [...images, url];
                    memoryCMS.updateGallery(newImages);
                  }}
                  isAdminMode={true}
                  placeholder="새 이미지 추가"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-white text-center">
        <h3 className="text-2xl font-light tracking-wider text-gray-900 mb-8">
          Want to be part of our story?
        </h3>
        <button
          onClick={() => router.push('/contact')}
          className="px-10 py-4 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 tracking-wider text-sm uppercase"
        >
          Get in Touch
        </button>
      </section>

      {/* Lightbox Modal - 완전히 개선된 버전 */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 animate-fadeIn"
          style={{
            zIndex: 9999,
            isolation: 'isolate'
          }}
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Image container */}
          <div
            className="relative z-10 max-w-5xl max-h-[90vh] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors duration-200"
              aria-label="Close image"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <OptimizedImage
              src={selectedImage}
              alt="Selected memory"
              width={1200}
              height={900}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              priority
            />
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .memory-gallery-item.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .memory-gallery-item {
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* Ensure navigation stays on top but modal is above it */
        .redux-nav {
          z-index: 1000 !important;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .memory-hero {
            min-height: 100vh;
            padding-top: 60px;
          }

          .memory-gallery-item {
            animation-delay: 0ms !important;
          }
        }
      `}</style>
    </>
  );
}