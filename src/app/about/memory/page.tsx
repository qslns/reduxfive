'use client';

import { useState, useEffect } from 'react';
import OptimizedImage from '../../../components/ui/OptimizedImage';

export default function MemoryPage() {
  const [images] = useState([
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
  ]);

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

        {/* Gallery Grid - CMS 제거 버전 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-[3/4] overflow-hidden bg-gray-100 group">
              <OptimizedImage
                src={image}
                alt={`Memory ${index + 1}`}
                fill={true}
                priority={index < 4}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
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