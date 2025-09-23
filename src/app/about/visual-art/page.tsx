'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSimpleAuth } from '../../../hooks/useSimpleAuth';
import { useSimpleCMS } from '../../../hooks/useSimpleCMS';
import DirectCMS from '../../../components/cms/DirectCMS';
import OptimizedImage from '../../../components/ui/OptimizedImage';

// HTML redux5 about-visual-art.html과 완전 동일한 Visual Art 페이지 구현
export default function VisualArtPage() {
  const router = useRouter();
  // Client-side only state
  const [isClient, setIsClient] = useState(false);
  
  
  // Visual art item metadata (titles and descriptions)
  const visualArtMeta = [
    { title: 'METAMORPHOSIS', description: '변화와 진화의 순간을 포착한 비주얼 시리즈', gridClass: 'col-span-8' },
    { title: 'SHADOW PLAY', description: '빛과 그림자의 대비', gridClass: 'col-span-4' },
    { title: 'TEXTURE STUDY', description: '질감의 깊이를 탐구', gridClass: 'col-span-4' },
    { title: 'COLOR THEORY', description: '색채의 감정적 표현', gridClass: 'col-span-4' },
    { title: 'FORM & VOID', description: '형태와 공간의 관계', gridClass: 'col-span-4' },
    { title: 'DIGITAL DREAMS', description: '디지털 매체의 가능성', gridClass: 'col-span-6' },
    { title: 'ANALOG MEMORIES', description: '아날로그의 따뜻함', gridClass: 'col-span-6' },
    { title: 'COLLECTIVE VISION', description: '5인 5색의 시각적 하모니', gridClass: 'col-span-12' }
  ];

  // Client-side state management
  const { isAuthenticated } = useSimpleAuth();

  // CMS 슬롯들 - 8개 Visual Art 이미지
  const visualArtCMS1 = useSimpleCMS('about-visualart-metamorphosis', '/images/about/visual-art/Metamorphosis.png');
  const visualArtCMS2 = useSimpleCMS('about-visualart-shadowplay', '/images/about/visual-art/Shadow Play.png');
  const visualArtCMS3 = useSimpleCMS('about-visualart-texturestudy', '/images/about/visual-art/Texture Study.png');
  const visualArtCMS4 = useSimpleCMS('about-visualart-colortheory', '/images/about/visual-art/Color Theory.png');
  const visualArtCMS5 = useSimpleCMS('about-visualart-formvoid', '/images/about/visual-art/Form & Void.png');
  const visualArtCMS6 = useSimpleCMS('about-visualart-digitaldreams', '/images/about/visual-art/Digital Dreams.png');
  const visualArtCMS7 = useSimpleCMS('about-visualart-analogmemories', '/images/about/visual-art/Analog Memories.png');
  const visualArtCMS8 = useSimpleCMS('about-visualart-collectivevision', '/images/about/visual-art/Collective Vision.png');

  // Visual Art 이미지 데이터 배열로 정리
  const visualArtImages = [
    { cms: visualArtCMS1 },
    { cms: visualArtCMS2 },
    { cms: visualArtCMS3 },
    { cms: visualArtCMS4 },
    { cms: visualArtCMS5 },
    { cms: visualArtCMS6 },
    { cms: visualArtCMS7 },
    { cms: visualArtCMS8 },
  ];

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Intersection Observer 애니메이션 - 클라이언트에서만
  useEffect(() => {
    if (!isClient) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const visualObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, index * 50);
        }
      });
    }, observerOptions);
    
    const processObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-fade-in-up');
          }, index * 200);
        }
      });
    }, { threshold: 0.2 });

    const visualItems = document.querySelectorAll('.visual-item');
    const processItems = document.querySelectorAll('.process-item');
    
    visualItems.forEach(item => visualObserver.observe(item));
    processItems.forEach(item => processObserver.observe(item));

    return () => {
      visualObserver.disconnect();
      processObserver.disconnect();
    };
  }, [isClient]);


  // 블랙스크린 방지 - SSR에서도 실제 콘텐츠 렌더링

  return (
    <>

      {/* Hero Section - White theme version */}
      <section className="hero-section h-screen relative flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden pt-[80px]">
        <div className="hero-bg absolute top-0 left-0 w-full h-full opacity-[0.03]">
          <div className="hero-pattern absolute w-[200%] h-[200%] -top-1/2 -left-1/2 animate-[patternMove_20s_linear_infinite]"
               style={{
                 backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #666666 35px, #666666 70px)'
               }}>
          </div>
        </div>

        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")'
          }}
        />

        <div className="hero-content text-center z-[1]">
          <h1
            className="hero-title font-thin uppercase text-gray-900 tracking-[0.2em]"
            style={{ fontSize: 'clamp(60px, 10vw, 160px)', textShadow: '0 0 30px rgba(0,0,0,0.1)' }}
          >
            Visual Art
          </h1>
          <p className="hero-subtitle text-base tracking-[3px] text-[#8B7D6B] mt-5">
            Beyond Fashion, Into Art
          </p>
        </div>
      </section>

      {/* Visual Grid Section - HTML 버전과 완전 동일 */}
      <section className="visual-grid-section py-[120px] px-10 bg-white">
        <div className="section-intro max-w-[800px] mx-auto mb-[120px] text-center">
          <h2 className="text-4xl font-light tracking-[3px] text-gray-900 mb-[30px]">
            시각적 경험의 확장
          </h2>
          <p className="text-base leading-[2] text-gray-600">
            REDUX는 패션을 넘어 다양한 시각 예술로 표현의 영역을 확장합니다.
            각 작품은 우리의 철학과 감성을 담아 새로운 시각적 언어를 만들어냅니다.
          </p>
        </div>
        
        <div className="visual-grid grid grid-cols-12 gap-10 max-w-[1600px] mx-auto max-[1024px]:grid-cols-6 max-[1024px]:gap-5 max-[768px]:grid-cols-1 max-[768px]:gap-5">
          {/* Dynamic Visual Art Items with Individual CMS */}
          {visualArtImages.map((imageData, index) => {
            const meta = visualArtMeta[index] || {
              title: `VISUAL ART ${index + 1}`,
              description: '시각적 표현의 새로운 가능성',
              gridClass: 'col-span-6'
            };

            return (
              <div
                key={index}
                className={`visual-item ${meta.gridClass} [aspect-ratio:16/9] relative overflow-hidden bg-[--gray-light] cursor-pointer opacity-0 transform translate-y-[50px] revealed:animate-[revealItem_0.8s_ease_forwards] max-[1024px]:col-span-6 max-[768px]:col-span-1 max-[768px]:[aspect-ratio:4/3] group`}
              >
                <OptimizedImage
                  src={imageData.cms.currentUrl || `/images/about/visual-art/${meta.title.replace(/ /g, ' ')}.png`}
                  alt={`Visual Art ${index + 1}`}
                  fill={true}
                  priority={index < 4}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 67vw"
                  className="object-cover transition-transform duration-[1s] ease-in-out [filter:contrast(0.9)] hover:transform hover:scale-105 hover:[filter:contrast(1.1)]"
                />
                <div className="visual-overlay absolute top-0 left-0 w-full h-full bg-white/95 backdrop-blur-sm flex flex-col justify-center items-center text-gray-800 opacity-0 transition-opacity duration-500 ease-in-out p-10 text-center hover:opacity-100 shadow-lg">
                  <h3 className="visual-title text-2xl font-light tracking-[2px] mb-[10px] text-[#8B7D6B]">
                    {meta.title}
                  </h3>
                  <p className="visual-description text-sm leading-[1.6] opacity-80 text-gray-600">
                    {meta.description}
                  </p>
                </div>

                {/* CMS 버튼 for admin */}
                {isAuthenticated && (
                  <div className="absolute top-2 right-2 z-20">
                    <DirectCMS
                      slotId={`about-visualart-${meta.title.toLowerCase().replace(/[^a-z]/g, '')}`}
                      currentUrl={imageData.cms.currentUrl}
                      type="image"
                      onUpload={imageData.cms.handleUpload}
                      onDelete={imageData.cms.handleDelete}
                      isAdminMode={true}
                      placeholder={meta.title}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Process Section - White theme version */}
      <section className="process-section py-[120px] px-10 bg-gradient-to-b from-gray-50 to-white">
        <h2 className="process-title text-5xl font-light tracking-[4px] text-center mb-20 text-gray-900">
          CREATIVE PROCESS
        </h2>
        <div className="process-grid grid grid-cols-3 gap-[60px] max-w-[1200px] mx-auto max-[1024px]:grid-cols-1 max-[1024px]:gap-[60px]">
          
          <div className="process-item text-center bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <div className="process-number text-[80px] font-thin text-[#8B7D6B] opacity-40 mb-5">
              01
            </div>
            <h3 className="process-name text-2xl font-light tracking-[2px] mb-5 text-gray-900">
              CONCEPT
            </h3>
            <p className="process-description text-sm leading-[1.8] text-gray-600">
              아이디어의 시작부터 컨셉 정립까지,
              끊임없는 대화와 실험을 통해
              우리만의 시각적 언어를 만듭니다.
            </p>
          </div>

          <div className="process-item text-center bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <div className="process-number text-[80px] font-thin text-[#8B7D6B] opacity-40 mb-5">
              02
            </div>
            <h3 className="process-name text-2xl font-light tracking-[2px] mb-5 text-gray-900">
              CREATION
            </h3>
            <p className="process-description text-sm leading-[1.8] text-gray-600">
              다양한 매체와 기법을 활용하여
              컨셉을 시각적으로 구현하고
              새로운 표현의 가능성을 탐구합니다.
            </p>
          </div>

          <div className="process-item text-center bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <div className="process-number text-[80px] font-thin text-[#8B7D6B] opacity-40 mb-5">
              03
            </div>
            <h3 className="process-name text-2xl font-light tracking-[2px] mb-5 text-gray-900">
              CONNECTION
            </h3>
            <p className="process-description text-sm leading-[1.8] text-gray-600">
              작품을 통해 관객과 소통하고
              감정적 연결을 만들어내며
              기억에 남을 순간을 디자인합니다.
            </p>
          </div>
        </div>
      </section>


      {/* CSS for animations matching HTML version */}
      <style jsx>{`
        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(70px, 70px); }
        }
        
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
        
        .visual-item.revealed {
          animation: revealItem 0.8s ease forwards;
        }
        
        /* Process items animation */
        .process-item {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        .process-item.animate-fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
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
          
          .visual-grid-section {
            padding: 80px 20px;
          }
          
          .process-section {
            padding: 80px 20px;
          }
        }
      `}</style>
    </>
  );
}

// Framer Motion 애니메이션으로 마이그레이션 완료