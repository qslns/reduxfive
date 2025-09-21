'use client';

import { useState, useEffect } from 'react';
import OptimizedImage from '../../../components/ui/OptimizedImage';
import { useSimpleAuth } from '../../../hooks/useSimpleAuth';
import { useSimpleCMS } from '../../../hooks/useSimpleCMS';
import DirectCMS from '../../../components/cms/DirectCMS';

export default function MemoryPage() {
  // CMS integration
  const { isAuthenticated } = useSimpleAuth();

  // CMS 슬롯들 - 16개 메모리 이미지
  const memoryCMS1 = useSimpleCMS('about-memory-1', '/images/about/memory/IMG_3452.JPG');
  const memoryCMS2 = useSimpleCMS('about-memory-2', '/images/about/memory/IMG_3454.JPG');
  const memoryCMS3 = useSimpleCMS('about-memory-3', '/images/about/memory/IMG_3455.JPG');
  const memoryCMS4 = useSimpleCMS('about-memory-4', '/images/about/memory/IMG_3481.JPG');
  const memoryCMS5 = useSimpleCMS('about-memory-5', '/images/about/memory/IMG_3491.JPG');
  const memoryCMS6 = useSimpleCMS('about-memory-6', '/images/about/memory/IMG_3492.JPG');
  const memoryCMS7 = useSimpleCMS('about-memory-7', '/images/about/memory/IMG_3493.JPG');
  const memoryCMS8 = useSimpleCMS('about-memory-8', '/images/about/memory/IMG_4339.JPG');
  const memoryCMS9 = useSimpleCMS('about-memory-9', '/images/about/memory/IMG_4345.JPG');
  const memoryCMS10 = useSimpleCMS('about-memory-10', '/images/about/memory/IMG_4348.JPG');
  const memoryCMS11 = useSimpleCMS('about-memory-11', '/images/about/memory/IMG_4367.JPG');
  const memoryCMS12 = useSimpleCMS('about-memory-12', '/images/about/memory/IMG_5380.JPG');
  const memoryCMS13 = useSimpleCMS('about-memory-13', '/images/about/memory/IMG_5381.JPG');
  const memoryCMS14 = useSimpleCMS('about-memory-14', '/images/about/memory/IMG_5382.JPG');
  const memoryCMS15 = useSimpleCMS('about-memory-15', '/images/about/memory/IMG_5383.JPG');
  const memoryCMS16 = useSimpleCMS('about-memory-16', '/images/about/memory/0C22A68E-AADF-4A8D-B5E7-44DDBA2EE64F.jpeg');

  // 이미지 데이터 배열로 정리
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
  ];

  // 클라이언트 사이드 확인
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // SSR 시 렌더링 안 함
  }

  return (
    <div className="memory-page-wrapper"> {/* Fragment 대신 div 사용 */}
      {/* Hero Section */}
      <section className="hero-section min-h-[50vh] relative flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden pt-[120px]">
        <div className="hero-content text-center relative z-10">
          <h1 className="hero-title font-thin uppercase text-gray-900 opacity-0 transform translate-y-[50px] animate-[heroFade_1.5s_ease_forwards] tracking-[0.2em]"
              style={{ fontSize: 'clamp(60px, 10vw, 160px)', textShadow: '0 0 30px rgba(0,0,0,0.1)' }}>
            Memory
          </h1>
        </div>
      </section>

      {/* Memory Grid Section */}
      <section className="memory-grid-section py-[120px] px-10 bg-white relative">
        <div className="section-intro max-w-[800px] mx-auto mb-[120px] text-center">
          <h2 className="text-4xl font-light tracking-[3px] text-gray-900 mb-[30px]">
            순간은 기억이 되고
          </h2>
          <p className="text-base leading-[2] text-gray-600">
            기억은 우리의 이야기가 됩니다.
          </p>
        </div>

        {/* Gallery Grid with CMS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
          {memoryImages.map((imageData, index) => (
            <div key={imageData.id} className="relative aspect-[3/4] overflow-hidden bg-gray-100 group">
              <OptimizedImage
                src={imageData.cms.currentUrl || `/images/about/memory/memory-${imageData.id}.jpg`}
                alt={`Memory ${imageData.id}`}
                fill={true}
                priority={index < 4}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />

              {/* CMS 버튼 for admin */}
              {isAuthenticated && (
                <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
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
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes heroFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}