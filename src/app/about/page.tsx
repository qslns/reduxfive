'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { aboutGalleries } from '../../data/aboutGallery';
import OptimizedImage from '../../components/ui/OptimizedImage';
// HydrationSafe import 제거
import { useSimpleAuth } from '../../hooks/useSimpleAuth';
import { useSimpleCMS } from '../../hooks/useSimpleCMS';
import DirectCMS from '../../components/cms/DirectCMS';

// 최적화된 About 페이지 - HydrationSafe 제거
export default function AboutPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  
  // CMS integration
  const { isAuthenticated } = useSimpleAuth();
  
  // CMS 슬롯들 - 각 카테고리별 프리뷰 이미지
  const fashionFilmCMS = useSimpleCMS('about-preview-fashion-film', '/images/designers/choieunsol/cinemode/IMG_8617.jpeg');
  const visualArtCMS = useSimpleCMS('about-preview-visual-art', '/images/about/visual-art/Metamorphosis.png');
  const memoryCMS = useSimpleCMS('about-preview-memory', '/images/about/memory/IMG_3452.JPG');
  const installationCMS = useSimpleCMS('about-preview-installation', '/images/about/process/공간  연출.png');
  const collectiveCMS = useSimpleCMS('about-preview-collective', '/images/profile/Kim Bomin.webp');
  
  // CMS 매핑
  const categoryCMSMap: { [key: string]: any } = {
    'fashion-film': fashionFilmCMS,
    'visual-art': visualArtCMS,
    'memory': memoryCMS,
    'installation': installationCMS,
    'collective': collectiveCMS
  };

  // 클라이언트 상태 관리
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('grid-revealed');
            }, index * 100);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const gridItems = document.querySelectorAll('.about-grid-item');
    gridItems.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [isClient]);

  const goHome = () => {
    router.push('/');
  };

  // 카테고리 그리드 설정
  const categoryConfigs: Record<string, { gridColumn: string; gridRow: string }> = {
    'fashion-film': { gridColumn: 'span 7', gridRow: 'span 2' },
    'memory': { gridColumn: 'span 5', gridRow: 'span 3' },
    'visual-art': { gridColumn: 'span 4', gridRow: 'span 2' },
    'installation': { gridColumn: 'span 4', gridRow: 'span 2' },
    'collective': { gridColumn: 'span 8', gridRow: 'span 2' }
  };

  // HydrationSafe 컴포넌트가 클라이언트 렌더링을 보장

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section - Navigation 제거, 메인 Navigation 사용 */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-[80px]">
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
          className="absolute bottom-[20%] left-[8%] w-[50px] h-[50px] border border-gray-200"
          style={{ transform: 'rotate(30deg)', borderRadius: '25%' }}
        />
        
        <div className="text-center z-10 px-6">
          <h1 
            className="font-['Playfair_Display'] font-bold text-gray-900 mb-8 tracking-[-0.02em] leading-[0.85]"
            style={{ 
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              textShadow: '0 0 30px rgba(255,255,255,0.1)'
            }}
          >
            WHO REDUX?
          </h1>
          <p className="text-gray-700 text-xl tracking-[0.3em] uppercase">
            Creative Collective
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 
                className="font-['Playfair_Display'] font-bold text-gray-900 mb-8 tracking-[-0.02em] leading-[0.9]"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
              >
                The Room<br />of<br />REDUX
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Five distinct creative minds converge as REDUX.
                  A collective exploring the boundaries between fashion, art, and human expression.
                </p>
                <p>
                  Through moving images, spatial installations, and material explorations,
                  we craft moments that transcend the temporal.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-['Playfair_Display'] font-light text-[#8B7D6B] mb-4 tracking-[0.1em]">
                  MANIFESTO
                </h3>
                <div className="space-y-4 text-gray-500">
                  <p>Boundaries exist to be questioned.</p>
                  <p>Individual voices unite in collective resonance.</p>
                  <p>Ephemeral moments become eternal memories.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-20 px-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-4xl font-light text-gray-900 mb-4 tracking-[0.05em]">
              DIMENSIONS
            </h2>
            <div className="w-20 h-[1px] bg-[#8B7D6B] mx-auto"></div>
          </div>
          
          {/* Responsive Grid */}
          <div className="about-categories-grid">
            {aboutGalleries.length > 0 ? (
              aboutGalleries.map((category, index) => {
                const config = categoryConfigs[category.id] || { gridColumn: 'span 6', gridRow: 'span 2' };
                const cms = categoryCMSMap[category.id];
                const imageUrl = cms?.currentUrl || category.previewImages[0]?.src || '/images/default-preview.jpg';
                
                return (
                  <div
                    key={category.id}
                    className="about-grid-item relative overflow-hidden cursor-pointer group opacity-0 transform translate-y-[30px]"
                    style={{
                      gridColumn: config.gridColumn,
                      gridRow: config.gridRow,
                      animation: `revealItem 0.8s ease forwards`,
                      animationDelay: `${index * 200}ms`
                    }}
                    onClick={() => router.push(`/about/${category.id}`)}
                  >
                    <OptimizedImage
                      src={imageUrl}
                      alt={category.name}
                      fill={true}
                      priority={index < 3}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-all duration-[800ms] group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-lg">
                      <div className="absolute bottom-6 left-6 right-6 text-gray-800">
                        <h3 className="text-2xl font-['Playfair_Display'] font-medium tracking-[0.1em] mb-2 text-[#8B7D6B]">
                          {category.name}
                        </h3>
                        <p className="text-sm opacity-90 leading-relaxed text-gray-700">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 border border-gray-700 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm">
                        <span className="text-sm text-gray-700">→</span>
                      </div>
                    </div>
                    
                    {/* CMS 버튼 for admin */}
                    {isAuthenticated && cms && (
                      <div 
                        className="absolute top-2 right-2 z-20"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <DirectCMS
                          slotId={`about-preview-${category.id}`}
                          currentUrl={cms.currentUrl}
                          type="image"
                          onUpload={cms.handleUpload}
                          onDelete={cms.handleDelete}
                          isAdminMode={true}
                          placeholder={category.name}
                        />
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500">
                <p>Loading dimensions...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-categories-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: 200px;
          gap: 1rem;
          min-height: 600px;
        }
        
        @keyframes revealItem {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .about-grid-item.grid-revealed {
          animation: revealItem 0.8s ease forwards;
        }
        
        /* Responsive grid adjustments */
        @media (max-width: 1024px) {
          .about-categories-grid {
            grid-template-columns: repeat(8, 1fr);
            grid-auto-rows: 180px;
          }
          
          .about-grid-item[style*="span 7"] {
            grid-column: span 8 !important;
          }
          
          .about-grid-item[style*="span 5"] {
            grid-column: span 8 !important;
          }
          
          .about-grid-item[style*="span 4"] {
            grid-column: span 4 !important;
          }
          
          .about-grid-item[style*="span 8"] {
            grid-column: span 8 !important;
          }
        }
        
        @media (max-width: 768px) {
          .about-categories-grid {
            grid-template-columns: 1fr !important;
            grid-auto-rows: 280px !important;
            gap: 1rem !important;
            padding: 0 10px !important;
          }
          
          .about-grid-item {
            grid-column: 1 !important;
            grid-row: span 1 !important;
            border-radius: 12px !important;
            overflow: hidden !important;
          }
          
          .about-grid-item h3 {
            font-size: 1.5rem !important;
            margin-bottom: 0.5rem !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            hyphens: auto !important;
          }
          
          .about-grid-item p {
            font-size: 0.85rem !important;
            line-height: 1.4 !important;
            word-wrap: break-word !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
            white-space: normal !important;
            text-overflow: unset !important;
            max-width: 100% !important;
          }
        }
        
        @media (max-width: 480px) {
          .about-categories-grid {
            grid-auto-rows: 260px !important;
            gap: 0.75rem !important;
            padding: 0 5px !important;
          }
          
          .about-grid-item h3 {
            font-size: 1.25rem !important;
          }
          
          .about-grid-item p {
            font-size: 0.8rem !important;
          }
        }
        
        @media (max-width: 375px) {
          .about-categories-grid {
            grid-auto-rows: 240px !important;
            gap: 0.5rem !important;
          }
          
          .about-grid-item h3 {
            font-size: 1.1rem !important;
          }
          
          .about-grid-item p {
            font-size: 0.75rem !important;
          }
        }
        
        /* Performance optimizations */
        .about-grid-item img {
          will-change: transform;
        }
        
        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .about-grid-item {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          
          .about-grid-item img {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
