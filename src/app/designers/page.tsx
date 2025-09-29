'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OptimizedImage from '../../components/ui/OptimizedImage';
import { designers } from '../../data/designers';
import { useSimpleAuth } from '../../hooks/useSimpleAuth';
import { useSimpleCMS } from '../../hooks/useSimpleCMS';
import DirectCMS from '../../components/cms/DirectCMS';

export default function DesignersPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // CMS integration
  const { isAuthenticated } = useSimpleAuth();

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Intersection Observer animation
  useEffect(() => {
    if (!isClient) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, index * 100);
        }
      });
    }, observerOptions);

    const designerCards = document.querySelectorAll('.designer-card');
    designerCards.forEach(card => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, [isClient]);

  const handleDesignerClick = (designerId: string) => {
    router.push(`/designers/${designerId}`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="hero-section h-screen relative flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden pt-[80px]">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")'
          }}
        />

        {/* Decorative elements */}
        <div
          className="absolute top-[15%] right-[10%] w-[120px] h-[1px] bg-gradient-to-r from-transparent via-gray-900/30 to-transparent"
          style={{ transform: 'rotate(-20deg)' }}
        />
        <div
          className="absolute bottom-[20%] left-[8%] w-[50px] h-[50px] border border-gray-300"
          style={{ transform: 'rotate(30deg)', borderRadius: '25%' }}
        />

        <div className="text-center z-10 px-4">
          <h1
            className="font-['Playfair_Display'] font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 tracking-[-0.02em] leading-[0.85]"
            style={{
              fontSize: 'clamp(3rem, 8vw, 10rem)',
              textShadow: '0 0 30px rgba(255,255,255,0.1)'
            }}
          >
            DESIGNERS
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase">
            FIVE MINDS, ONE VISION
          </p>
        </div>
      </section>

      {/* Designers Grid Section */}
      <section className="py-20 px-6 sm:px-10 md:px-16 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {designers.map((designer, index) => {
              // Use CMS for each designer's profile image
              const DesignerCMS = () => {
                const cms = useSimpleCMS(
                  `designer-${designer.id}-main-profile`,
                  designer.profileImage
                );
                return { ...cms };
              };

              const designerCMS = DesignerCMS();

              return (
                <div
                  key={designer.id}
                  className="designer-card group cursor-pointer opacity-0 transform translate-y-10 transition-all duration-700 ease-out"
                  onClick={() => handleDesignerClick(designer.id)}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden mb-6 aspect-[3/4] bg-gray-100 rounded-lg">
                    {/* Number Overlay */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-5xl md:text-6xl font-light text-white/80 drop-shadow-lg">
                        {String(designer.order).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Designer Image */}
                    <OptimizedImage
                      src={designerCMS.currentUrl || designer.profileImage}
                      alt={designer.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={index < 3}
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                    {/* CMS Controls for Admin */}
                    {isAuthenticated && (
                      <div
                        className="absolute top-4 right-4 z-20"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <DirectCMS
                          slotId={`designer-${designer.id}-main-profile`}
                          currentUrl={designerCMS.currentUrl}
                          type="image"
                          onUpload={designerCMS.handleUpload}
                          onDelete={designerCMS.handleDelete}
                          isAdminMode={true}
                          placeholder={designer.name}
                        />
                      </div>
                    )}
                  </div>

                  {/* Designer Info */}
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-['Playfair_Display'] font-light tracking-wide text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                      {designer.name}
                    </h3>

                    <div className="space-y-1">
                      <p className="text-sm uppercase tracking-[0.15em] text-gray-600">
                        {designer.mainRole}
                      </p>
                      <p className="text-xs uppercase tracking-[0.1em] text-gray-500">
                        {designer.role}
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {designer.bio}
                    </p>

                    {/* Instagram Handle */}
                    {designer.instagramHandle && (
                      <p className="text-xs text-gray-500">
                        {designer.instagramHandle}
                      </p>
                    )}

                    {/* View Profile Button */}
                    <div className="pt-4">
                      <span className="inline-flex items-center text-sm uppercase tracking-[0.15em] text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                        View Profile
                        <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Section with Philosophy */}
      <section className="py-20 px-6 sm:px-10 md:px-16 lg:px-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1000px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-light text-gray-900 mb-8">
            우리의 철학
          </h2>
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>
              REDUX는 개별적 창의성과 집단적 시너지가 만나는 지점에서 탄생합니다.
            </p>
            <p>
              5인의 디자이너는 각자의 독특한 시각과 기술을 바탕으로
              패션과 예술의 새로운 경계를 탐구합니다.
            </p>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 pt-4">
              Fashion Beyond Fashion
            </p>
          </div>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        .designer-card.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}