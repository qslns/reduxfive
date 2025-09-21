'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OptimizedImage from '../../../components/ui/OptimizedImage';
import { useGalleryCMS } from '../../../hooks/useSimpleCMS';
import { useSimpleAuth } from '../../../hooks/useSimpleAuth';
import DirectCMS from '../../../components/cms/DirectCMS';

export default function MemoryPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

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

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Intersection Observer animation - client only
  useEffect(() => {
    if (!isClient) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const memoryObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, index * 50);
        }
      });
    }, observerOptions);

    const memoryItems = document.querySelectorAll('.memory-item');
    memoryItems.forEach(item => memoryObserver.observe(item));

    return () => {
      memoryObserver.disconnect();
    };
  }, [isClient]);

  return (
    <>
      {/* Hero Section - Matching Visual Art style */}
      <section className="hero-section h-screen relative flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden pt-[80px]">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")'
          }}
        />

        <div className="hero-content text-center z-[1]">
          <h1
            className="hero-title font-thin uppercase text-gray-900 opacity-0 transform translate-y-[50px] animate-[heroFade_1.5s_ease_forwards] tracking-[0.2em]"
            style={{ fontSize: 'clamp(60px, 10vw, 160px)', textShadow: '0 0 30px rgba(0,0,0,0.1)' }}
          >
            Memory
          </h1>
          <p className="hero-subtitle text-base tracking-[3px] text-[#8B7D6B] mt-5 opacity-0 animate-[heroFade_1.5s_ease_forwards] [animation-delay:0.3s]">
            Collective Moments
          </p>
        </div>
      </section>

      {/* Gallery Section - Matching Visual Art structure */}
      <section className="memory-grid-section py-[120px] px-10 bg-white">
        <div className="section-intro max-w-[800px] mx-auto mb-[120px] text-center">
          <h2 className="text-4xl font-light tracking-[3px] text-gray-900 mb-[30px]">
            우리의 순간들
          </h2>
          <p className="text-base leading-[2] text-gray-600">
            REDUX의 여정 속에서 만들어진 소중한 순간들을 기록합니다.
            각각의 사진은 우리의 이야기를 담고 있습니다.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="memory-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1600px] mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="memory-item relative group opacity-0 transform translate-y-[50px] revealed:animate-[revealItem_0.8s_ease_forwards]"
            >
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                <OptimizedImage
                  src={image}
                  alt={`Memory ${index + 1}`}
                  fill={true}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* CMS Controls for Admin */}
              {isAuthenticated && isClient && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

        {/* Add New Image - Admin Only */}
        {isAuthenticated && isClient && (
          <div className="mt-16 flex justify-center">
            <div className="w-64 h-80 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
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
      </section>

      {/* CSS Animations - Matching Visual Art */}
      <style jsx>{`
        @keyframes heroFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes revealItem {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .memory-item.revealed {
          animation: revealItem 0.8s ease forwards;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(40px, 8vw, 80px) !important;
            letter-spacing: 0.1em !important;
          }

          .memory-grid-section {
            padding: 80px 20px;
          }
        }
      `}</style>
    </>
  );
}