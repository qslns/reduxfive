'use client';

import { useEffect, useState } from 'react';
import { useGalleryCMS } from '../../../hooks/useSimpleCMS';
import { useSimpleAuth } from '../../../hooks/useSimpleAuth';
import DirectCMS from '../../../components/cms/DirectCMS';
import OptimizedImage from '../../../components/ui/OptimizedImage';

export default function MemoryPage() {
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
  ]);

  const images = memoryCMS.currentImages;

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section h-screen relative flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden pt-[80px]">
        <div className="hero-content text-center z-[1]">
          <h1
            className="hero-title font-thin uppercase text-gray-900 opacity-0 transform translate-y-[50px] animate-[heroFade_1.5s_ease_forwards] tracking-[0.2em]"
            style={{ fontSize: 'clamp(60px, 10vw, 160px)' }}
          >
            Memory
          </h1>
          <p className="hero-subtitle text-base tracking-[3px] text-[#8B7D6B] mt-5 opacity-0 animate-[heroFade_1.5s_ease_forwards] [animation-delay:0.3s]">
            COLLECTIVE MOMENTS
          </p>
        </div>
      </section>

      {/* Memory Grid Section */}
      <section className="memory-grid-section py-[120px] px-10 bg-white">
        <div className="section-intro max-w-[800px] mx-auto mb-[120px] text-center">
          <h2 className="text-4xl font-light tracking-[3px] text-gray-900 mb-[30px]">
            순간은 기억이 되고
          </h2>
          <p className="text-base leading-[2] text-gray-600">
            기억은 우리의 이야기가 됩니다.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] overflow-hidden bg-gray-100 group"
            >
              <OptimizedImage
                src={image}
                alt={`Memory ${index + 1}`}
                fill={true}
                priority={index < 4}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />

              {/* CMS Button for Admin */}
              {isAuthenticated && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
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

        {/* Add New Image Button for Admin */}
        {isAuthenticated && (
          <div className="mt-12 flex justify-center">
            <div className="w-64 h-80 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
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

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes heroFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive adjustments */
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