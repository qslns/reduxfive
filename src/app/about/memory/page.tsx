'use client';

import { useState, useEffect } from 'react';
import OptimizedImage from '../../../components/ui/OptimizedImage';
import { useSimpleAuth } from '../../../hooks/useSimpleAuth';
import { useSimpleCMS } from '../../../hooks/useSimpleCMS';
import DirectCMS from '../../../components/cms/DirectCMS';

export default function MemoryPage() {
  const { isAuthenticated } = useSimpleAuth();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  // 전체 44개 이미지 목록
  const allMemoryImages = [
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
    '/images/about/memory/IMG_3452(1).JPG',
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
    '/images/about/memory/KakaoTalk_Photo_2025-06-29-18-44-01 005.jpeg',
    '/images/about/memory/스크린샷 2025-06-29 오후 6.34.28.png',
    '/images/about/memory/스크린샷 2025-06-29 오후 6.34.54.png',
    '/images/about/memory/스크린샷 2025-06-29 오후 6.35.10.png'
  ];

  // 44개 모든 이미지에 대한 CMS 슬롯 생성
  const memoryCMS1 = useSimpleCMS('about-memory-1', allMemoryImages[0]);
  const memoryCMS2 = useSimpleCMS('about-memory-2', allMemoryImages[1]);
  const memoryCMS3 = useSimpleCMS('about-memory-3', allMemoryImages[2]);
  const memoryCMS4 = useSimpleCMS('about-memory-4', allMemoryImages[3]);
  const memoryCMS5 = useSimpleCMS('about-memory-5', allMemoryImages[4]);
  const memoryCMS6 = useSimpleCMS('about-memory-6', allMemoryImages[5]);
  const memoryCMS7 = useSimpleCMS('about-memory-7', allMemoryImages[6]);
  const memoryCMS8 = useSimpleCMS('about-memory-8', allMemoryImages[7]);
  const memoryCMS9 = useSimpleCMS('about-memory-9', allMemoryImages[8]);
  const memoryCMS10 = useSimpleCMS('about-memory-10', allMemoryImages[9]);
  const memoryCMS11 = useSimpleCMS('about-memory-11', allMemoryImages[10]);
  const memoryCMS12 = useSimpleCMS('about-memory-12', allMemoryImages[11]);
  const memoryCMS13 = useSimpleCMS('about-memory-13', allMemoryImages[12]);
  const memoryCMS14 = useSimpleCMS('about-memory-14', allMemoryImages[13]);
  const memoryCMS15 = useSimpleCMS('about-memory-15', allMemoryImages[14]);
  const memoryCMS16 = useSimpleCMS('about-memory-16', allMemoryImages[15]);
  const memoryCMS17 = useSimpleCMS('about-memory-17', allMemoryImages[16]);
  const memoryCMS18 = useSimpleCMS('about-memory-18', allMemoryImages[17]);
  const memoryCMS19 = useSimpleCMS('about-memory-19', allMemoryImages[18]);
  const memoryCMS20 = useSimpleCMS('about-memory-20', allMemoryImages[19]);
  const memoryCMS21 = useSimpleCMS('about-memory-21', allMemoryImages[20]);
  const memoryCMS22 = useSimpleCMS('about-memory-22', allMemoryImages[21]);
  const memoryCMS23 = useSimpleCMS('about-memory-23', allMemoryImages[22]);
  const memoryCMS24 = useSimpleCMS('about-memory-24', allMemoryImages[23]);
  const memoryCMS25 = useSimpleCMS('about-memory-25', allMemoryImages[24]);
  const memoryCMS26 = useSimpleCMS('about-memory-26', allMemoryImages[25]);
  const memoryCMS27 = useSimpleCMS('about-memory-27', allMemoryImages[26]);
  const memoryCMS28 = useSimpleCMS('about-memory-28', allMemoryImages[27]);
  const memoryCMS29 = useSimpleCMS('about-memory-29', allMemoryImages[28]);
  const memoryCMS30 = useSimpleCMS('about-memory-30', allMemoryImages[29]);
  const memoryCMS31 = useSimpleCMS('about-memory-31', allMemoryImages[30]);
  const memoryCMS32 = useSimpleCMS('about-memory-32', allMemoryImages[31]);
  const memoryCMS33 = useSimpleCMS('about-memory-33', allMemoryImages[32]);
  const memoryCMS34 = useSimpleCMS('about-memory-34', allMemoryImages[33]);
  const memoryCMS35 = useSimpleCMS('about-memory-35', allMemoryImages[34]);
  const memoryCMS36 = useSimpleCMS('about-memory-36', allMemoryImages[35]);
  const memoryCMS37 = useSimpleCMS('about-memory-37', allMemoryImages[36]);
  const memoryCMS38 = useSimpleCMS('about-memory-38', allMemoryImages[37]);
  const memoryCMS39 = useSimpleCMS('about-memory-39', allMemoryImages[38]);
  const memoryCMS40 = useSimpleCMS('about-memory-40', allMemoryImages[39]);
  const memoryCMS41 = useSimpleCMS('about-memory-41', allMemoryImages[40]);
  const memoryCMS42 = useSimpleCMS('about-memory-42', allMemoryImages[41]);
  const memoryCMS43 = useSimpleCMS('about-memory-43', allMemoryImages[42]);
  const memoryCMS44 = useSimpleCMS('about-memory-44', allMemoryImages[43]);

  // CMS 배열로 정리
  const memoryImages = [
    { id: 1, cms: memoryCMS1 },
    { id: 2, cms: memoryCMS2 },
    { id: 3, cms: memoryCMS3 },
    { id: 4, cms: memoryCMS4 },
    { id: 5, cms: memoryCMS5 },
    { id: 6, cms: memoryCMS6 },
    { id: 7, cms: memoryCMS7 },
    { id: 8, cms: memoryCMS8 },
    { id: 9, cms: memoryCMS9 },
    { id: 10, cms: memoryCMS10 },
    { id: 11, cms: memoryCMS11 },
    { id: 12, cms: memoryCMS12 },
    { id: 13, cms: memoryCMS13 },
    { id: 14, cms: memoryCMS14 },
    { id: 15, cms: memoryCMS15 },
    { id: 16, cms: memoryCMS16 },
    { id: 17, cms: memoryCMS17 },
    { id: 18, cms: memoryCMS18 },
    { id: 19, cms: memoryCMS19 },
    { id: 20, cms: memoryCMS20 },
    { id: 21, cms: memoryCMS21 },
    { id: 22, cms: memoryCMS22 },
    { id: 23, cms: memoryCMS23 },
    { id: 24, cms: memoryCMS24 },
    { id: 25, cms: memoryCMS25 },
    { id: 26, cms: memoryCMS26 },
    { id: 27, cms: memoryCMS27 },
    { id: 28, cms: memoryCMS28 },
    { id: 29, cms: memoryCMS29 },
    { id: 30, cms: memoryCMS30 },
    { id: 31, cms: memoryCMS31 },
    { id: 32, cms: memoryCMS32 },
    { id: 33, cms: memoryCMS33 },
    { id: 34, cms: memoryCMS34 },
    { id: 35, cms: memoryCMS35 },
    { id: 36, cms: memoryCMS36 },
    { id: 37, cms: memoryCMS37 },
    { id: 38, cms: memoryCMS38 },
    { id: 39, cms: memoryCMS39 },
    { id: 40, cms: memoryCMS40 },
    { id: 41, cms: memoryCMS41 },
    { id: 42, cms: memoryCMS42 },
    { id: 43, cms: memoryCMS43 },
    { id: 44, cms: memoryCMS44 },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 라이트박스 열기/닫기
  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % memoryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + memoryImages.length) % memoryImages.length);
    }
  };

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Intersection Observer for animations
  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.memory-item');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="memory-page-wrapper min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="hero-section relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-[80px]">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-200 to-transparent rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-rose-200 to-transparent rounded-full filter blur-3xl animate-pulse animation-delay-2000" />
          </div>
        </div>

        <div className="hero-content text-center relative z-10">
          <h1
            className="font-thin uppercase text-gray-900 tracking-[0.3em] mb-6 opacity-0 animate-fadeInDown"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            Memory
          </h1>
          <p className="text-gray-600 text-lg md:text-xl tracking-[0.2em] opacity-0 animate-fadeInUp animation-delay-300">
            Moments Captured in Time
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="intro-section py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-[0.1em] opacity-0 animate-fadeInUp">
            순간은 기억이 되고
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed opacity-0 animate-fadeInUp animation-delay-200">
            기억은 우리의 이야기가 됩니다.<br/>
            REDUX의 여정을 담은 순간들을 공유합니다.
          </p>
        </div>
      </section>

      {/* Masonry Gallery Grid */}
      <section className="gallery-section px-4 md:px-6 lg:px-10 pb-20">
        <div className="max-w-[1800px] mx-auto">
          {/* Masonry grid with varying sizes */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-[200px]">
            {memoryImages.map((imageData, index) => {
              // 다양한 크기 패턴 생성
              const sizePatterns = [
                'row-span-2',
                'row-span-1',
                'row-span-3',
                'row-span-2',
                'row-span-1',
                'row-span-2',
                'row-span-1',
                'row-span-2',
              ];
              const spanClass = sizePatterns[index % sizePatterns.length];

              return (
                <div
                  key={imageData.id}
                  className={`memory-item relative overflow-hidden bg-gray-100 group cursor-pointer opacity-0 ${spanClass}`}
                  onClick={() => openLightbox(index)}
                >
                  <OptimizedImage
                    src={imageData.cms.currentUrl || allMemoryImages[index]}
                    alt={`Memory ${imageData.id}`}
                    fill={true}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-light tracking-wider">
                        #{imageData.id}
                      </p>
                    </div>
                  </div>

                  {/* CMS 버튼 */}
                  {isAuthenticated && (
                    <div
                      className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <DirectCMS
                        slotId={`about-memory-${imageData.id}`}
                        currentUrl={imageData.cms.currentUrl}
                        type="image"
                        onUpload={imageData.cms.handleUpload}
                        onDelete={imageData.cms.handleDelete}
                        isAdminMode={true}
                        placeholder={`Memory ${imageData.id}`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center cursor-pointer"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-50"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            ×
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>

          <div
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <OptimizedImage
              src={memoryImages[selectedImage].cms.currentUrl || allMemoryImages[selectedImage]}
              alt={`Memory ${memoryImages[selectedImage].id}`}
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {selectedImage + 1} / {memoryImages.length}
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        .animate-fadeInDown {
          animation: fadeInDown 1s ease forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </div>
  );
}