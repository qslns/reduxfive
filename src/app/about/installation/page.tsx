'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OptimizedImage from '../../../components/ui/OptimizedImage';
import { useSimpleAuth } from '../../../hooks/useSimpleAuth';
import { useSimpleCMS } from '../../../hooks/useSimpleCMS';
import DirectCMS from '../../../components/cms/DirectCMS';

// HTML redux6 about-installation.html과 완전 동일한 Process 페이지 구현
export default function InstallationPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // CMS integration
  const { isAuthenticated } = useSimpleAuth();
  
  // CMS 슬롯들 - 설치 과정 이미지들
  const directingCMS = useSimpleCMS('about-installation-directing', '/images/process/디렉팅.png');
  const videoCMS = useSimpleCMS('about-installation-video', '/images/process/영상 & 편집.png');
  const spaceCMS = useSimpleCMS('about-installation-space', '/images/process/공간  연출.png');
  const promoCMS = useSimpleCMS('about-installation-promo', '/images/process/홍보  브랜딩.png');
  const artGraphicCMS = useSimpleCMS('about-installation-artgraphic', '/images/process/아트 그래픽.png');
  const digitalCMS = useSimpleCMS('about-installation-digital', '/images/process/디지털  웹 디자인.png');
  
  // CMS 슬롯들 - 갤러리 슬라이드 이미지들
  const gallerySlide1CMS = useSimpleCMS('about-installation-gallery1', '/images/exhibitions/cinemode/behind.jpg');
  const gallerySlide2CMS = useSimpleCMS('about-installation-gallery2', '/images/exhibitions/cinemode/exhibition.jpg');
  const gallerySlide3CMS = useSimpleCMS('about-installation-gallery3', '/images/exhibitions/cinemode/opening.jpg');

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 클라이언트 이벤트 처리 - 스크롤, 키보드, 자동재생
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => (prev - 1 + 3) % 3);
      }
      if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => (prev + 1) % 3);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleKeyDown);

    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(slideInterval);
    };
  }, [isClient]);

  // Intersection Observer - 클라이언트에서만
  useEffect(() => {
    if (!isClient) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);
    
    const installationItems = document.querySelectorAll('.installation-item');
    installationItems.forEach(item => {
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, [isClient]);


  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + 3) % 3);
  };

  // 설치 과정 데이터 - CMS 통합
  const installations = [
    {
      number: '01',
      title: '디렉팅',
      description: '전체적인 전시의 방향성을 설정하고 이끌어갑니다. 패션 디자이너의 시선으로 공간과 작품, 관객의 경험을 하나로 연결하는 스토리를 만듭니다.',
      details: ['전시 컨셉 기획', '작품 배치 및 동선 설계', '팀원 역할 조율', '전체 일정 관리'],
      image: directingCMS.currentUrl || '/images/process/디렉팅.png',
      cms: directingCMS
    },
    {
      number: '02',
      title: '영상 & 편집',
      description: '패션 필름과 전시 영상을 제작합니다. 의상의 움직임과 감정을 영상 언어로 번역하여 관객에게 전달합니다.',
      details: ['패션 필름 촬영', '전시 영상 편집', '음향 및 색보정', '영상 설치 기술 지원'],
      image: videoCMS.currentUrl || '/images/process/영상 & 편집.png',
      cms: videoCMS
    },
    {
      number: '03',
      title: '공간 / 연출',
      description: '전시 공간을 디자인하고 작품을 배치합니다. 패션의 시각적 언어를 공간으로 확장하여 몰입감 있는 경험을 만듭니다.',
      details: ['공간 구성 및 설계', '조명 연출', '작품 디스플레이', '관람 동선 디자인'],
      image: spaceCMS.currentUrl || '/images/process/공간  연출.png',
      cms: spaceCMS
    },
    {
      number: '04',
      title: '홍보 / 브랜딩',
      description: '전시의 아이덴티티를 만들고 관객과 소통합니다. 패션 브랜드의 감성으로 전시를 알리고 기억에 남을 이미지를 구축합니다.',
      details: ['전시 아이덴티티 개발', 'SNS 콘텐츠 제작', '프레스 자료 준비', '관객 소통 전략'],
      image: promoCMS.currentUrl || '/images/process/홍보  브랜딩.png',
      cms: promoCMS
    },
    {
      number: '05',
      title: '아트 그래픽',
      description: '전시의 시각적 요소를 디자인합니다. 패션의 미학을 그래픽으로 표현하여 전시의 분위기를 완성합니다.',
      details: ['포스터 및 인쇄물 디자인', '전시 그래픽 요소 제작', '타이포그래피 작업', '시각 아이덴티티 통합'],
      image: artGraphicCMS.currentUrl || '/images/process/아트 그래픽.png',
      cms: artGraphicCMS
    },
    {
      number: '06',
      title: '디지털 / 웹 디자인',
      description: '온라인 공간에서의 전시 경험을 디자인합니다. 디지털 매체를 통해 전시를 확장하고 더 많은 관객과 만납니다.',
      details: ['전시 웹사이트 제작', '디지털 아카이브 구축', '인터랙티브 콘텐츠 개발', '온라인 전시 경험 디자인'],
      image: digitalCMS.currentUrl || '/images/process/디지털  웹 디자인.png',
      cms: digitalCMS
    }
  ];

  // 갤러리 슬라이드 데이터 - CMS 통합
  const gallerySlides = [
    { 
      title: 'CINE MODE - Behind', 
      location: '전시 준비 과정', 
      image: gallerySlide1CMS.currentUrl || '/images/exhibitions/cinemode/behind.jpg',
      cms: gallerySlide1CMS 
    },
    { 
      title: 'CINE MODE - Exhibition', 
      location: '전시 공간', 
      image: gallerySlide2CMS.currentUrl || '/images/exhibitions/cinemode/exhibition.jpg',
      cms: gallerySlide2CMS 
    },
    { 
      title: 'CINE MODE - Opening', 
      location: '오프닝 현장', 
      image: gallerySlide3CMS.currentUrl || '/images/exhibitions/cinemode/opening.jpg',
      cms: gallerySlide3CMS 
    }
  ];

  // 블랙스크린 방지 - SSR에서도 콘텐츠 렌더링

  return (
    <>

      {/* Hero Section - HTML 버전과 완전 동일한 3D 효과 */}
      <section className="hero-section h-screen relative overflow-hidden bg-[linear-gradient(45deg,#1a1a1a_0%,#2a2a2a_50%,#1a1a1a_100%)] pt-[80px]">
        <div className="hero-3d-container absolute top-0 left-0 w-full h-full [perspective:1000px]">
          <div className="hero-3d-element absolute w-[150px] h-[150px] bg-white/5 border border-white/10 [transform-style:preserve-3d] animate-[float3d_20s_infinite_ease-in-out] [animation-delay:0s] top-[20%] left-[10%]"></div>
          <div className="hero-3d-element absolute w-[200px] h-[200px] bg-white/5 border border-white/10 [transform-style:preserve-3d] animate-[float3d_20s_infinite_ease-in-out] [animation-delay:5s] top-[60%] right-[20%]"></div>
          <div className="hero-3d-element absolute w-[100px] h-[100px] bg-white/5 border border-white/10 [transform-style:preserve-3d] animate-[float3d_20s_infinite_ease-in-out] [animation-delay:10s] bottom-[20%] left-[30%]"></div>
        </div>
        
        <div className="hero-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-[1]">
          <h1 
            className="hero-title font-thin uppercase text-white opacity-0 transform translate-y-[50px] animate-[heroFade_1.5s_ease_forwards] tracking-[0.3em]"
            style={{ fontSize: 'clamp(60px, 10vw, 180px)' }}
          >
            Process
          </h1>
          <p className="hero-subtitle text-base tracking-[3px] text-[--gray-medium] mt-5 opacity-0 animate-[heroFade_1.5s_ease_forwards] [animation-delay:0.3s]">
            Five Roles, One Exhibition
          </p>
        </div>
      </section>

      {/* Installation Showcase Section - HTML 버전과 완전 동일 */}
      <section className="showcase-section py-[120px] bg-black">
        <div className="showcase-intro max-w-[800px] mx-auto mb-[120px] text-center px-10">
          <h2 className="text-4xl font-light tracking-[3px] text-white mb-[30px]">
            전시를 만드는 6가지 방법
          </h2>
          <p className="text-base leading-[2] text-[--gray-medium]">
            REDUX는 5명의 디자이너가 각자의 역할을 맡아 하나의 전시를 만들어갑니다.
            패션 디자이너로서 완벽하지 않지만, 우리만의 방식으로 새로운 경험을 디자인합니다.
          </p>
        </div>
        
        {installations.map((installation, index) => (
          <div 
            key={index}
            className={`installation-item relative mb-[120px] opacity-0 transform translate-y-[100px] revealed:animate-[revealInstallation_1.5s_ease_forwards] ${
              index % 2 === 1 ? 'bg-white/[0.02]' : ''
            }`}
          >
            <div className={`installation-content grid grid-cols-2 min-h-[80vh] ${
              index % 2 === 1 ? '[direction:rtl]' : ''
            }`}>
              <div className={`installation-visual relative overflow-hidden bg-[--gray-dark] ${
                index % 2 === 1 ? '[direction:ltr]' : ''
              }`}>
                <OptimizedImage 
                  src={installation.image}
                  alt={installation.title}
                  fill={true}
                  priority={index < 2}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.5s] ease-in-out hover:transform hover:scale-110"
                />
                
                {/* CMS 버튼 for admin */}
                {isAuthenticated && installation.cms && (
                  <div 
                    className="absolute top-4 right-4 z-20"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <DirectCMS
                      slotId={`about-installation-${installation.title.toLowerCase().replace(/[^a-z]/g, '')}`}
                      currentUrl={installation.cms.currentUrl}
                      type="image"
                      onUpload={installation.cms.handleUpload}
                      onDelete={installation.cms.handleDelete}
                      isAdminMode={true}
                      placeholder={installation.title}
                    />
                  </div>
                )}
              </div>
              <div className={`installation-info flex flex-col justify-center py-20 px-20 bg-transparent ${
                index % 2 === 1 ? '[direction:ltr]' : ''
              }`}>
                <div className="installation-number text-[120px] font-thin text-white/10 leading-[1] mb-10">
                  {installation.number}
                </div>
                <h3 className="installation-title text-5xl font-light tracking-[3px] text-white mb-[30px]">
                  {installation.title}
                </h3>
                <p className="installation-description text-base leading-[2] text-[--gray-medium] mb-10">
                  {installation.description}
                </p>
                <ul className="installation-details list-none">
                  {installation.details.map((detail, detailIndex) => (
                    <li 
                      key={detailIndex}
                      className="text-sm text-[--gray-medium] mb-[10px] pl-5 relative before:content-['—'] before:absolute before:left-0"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Immersive Gallery - HTML 버전과 완전 동일 */}
      <section className="immersive-gallery relative h-screen overflow-hidden bg-black">
        <div 
          className="gallery-slider flex h-full transition-transform duration-[800ms] ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {gallerySlides.map((slide, index) => (
            <div 
              key={index}
              className="gallery-slide min-w-full h-full relative bg-[--gray-dark]"
            >
              <OptimizedImage 
                src={slide.image}
                alt={slide.title}
                fill={true}
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="gallery-overlay absolute bottom-[60px] left-[60px] text-white max-[768px]:left-5 max-[768px]:bottom-10">
                <h3 className="gallery-title text-4xl font-light tracking-[2px] mb-[10px]">
                  {slide.title}
                </h3>
                <p className="gallery-location text-base text-[--gray-medium]">
                  {slide.location}
                </p>
              </div>
              
              {/* CMS 버튼 for admin */}
              {isAuthenticated && slide.cms && (
                <div 
                  className="absolute top-4 right-4 z-30"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <DirectCMS
                    slotId={`about-installation-gallery${index + 1}`}
                    currentUrl={slide.cms.currentUrl}
                    type="image"
                    onUpload={slide.cms.handleUpload}
                    onDelete={slide.cms.handleDelete}
                    isAdminMode={true}
                    placeholder={slide.title}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="gallery-nav absolute bottom-[60px] right-[60px] flex gap-5 max-[768px]:right-5 max-[768px]:bottom-10">
          <button 
            className="w-[60px] h-[60px] bg-white/10 border border-white/20 text-white cursor-pointer transition-all duration-300 ease-in-out text-xl hover:bg-white/20"
            onClick={prevSlide}
          >
            ←
          </button>
          <button 
            className="w-[60px] h-[60px] bg-white/10 border border-white/20 text-white cursor-pointer transition-all duration-300 ease-in-out text-xl hover:bg-white/20"
            onClick={nextSlide}
          >
            →
          </button>
        </div>
      </section>

      {/* Footer - HTML 버전과 완전 동일 */}
      <footer className="py-[60px] px-10 bg-black text-white text-center border-t border-white/10">
        <p>&copy; 2025 REDUX. All rights reserved.</p>
      </footer>

      {/* CSS for animations matching HTML version */}
      <style jsx>{`
        @keyframes float3d {
          0%, 100% {
            transform: translateZ(0px) rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: translateZ(100px) rotateX(180deg) rotateY(90deg);
          }
          50% {
            transform: translateZ(-50px) rotateX(360deg) rotateY(180deg);
          }
          75% {
            transform: translateZ(50px) rotateX(180deg) rotateY(270deg);
          }
        }
        
        @keyframes heroFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes revealInstallation {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .installation-item.revealed {
          animation: revealInstallation 1.5s ease forwards;
        }
        
        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .installation-content {
            grid-template-columns: 1fr;
          }
          
          .installation-info {
            padding: 60px;
          }
          
          .installation-visual {
            height: 60vh;
          }
        }
        
        @media (max-width: 768px) {
          nav {
            padding: 15px 20px;
            mix-blend-mode: normal;
            background: rgba(0, 0, 0, 0.95);
          }
          
          .page-title {
            display: none;
          }
          
          .hero-title {
            font-size: clamp(40px, 8vw, 80px) !important;
            letter-spacing: 0.1em !important;
          }
          
          .showcase-section {
            padding: 80px 0;
          }
          
          .installation-item {
            margin-bottom: 80px;
          }
          
          .installation-info {
            padding: 40px 20px;
          }
          
          .installation-number {
            font-size: 80px;
          }
          
          .installation-title {
            font-size: 32px;
          }
        }
      `}</style>
    </>
  );
}

// Framer Motion 애니메이션으로 마이그레이션 완료