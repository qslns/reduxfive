'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSimpleCMS } from '../../hooks/useSimpleCMS';
import { useSimpleAuth } from '../../hooks/useSimpleAuth';
import DirectCMS from '../cms/DirectCMS';

/**
 * 최적화된 Hero Section - 로딩 문제 해결
 */
function HeroSection() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // CMS integration
  const { isAuthenticated } = useSimpleAuth();
  const { currentUrl: heroVideoUrl, handleUpload: cmsUpload, handleDelete: cmsDelete } = useSimpleCMS('main-hero-video', '/VIDEO/main.mp4');
  

  // 클라이언트 마운트 처리
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 비디오 로드 처리
  useEffect(() => {
    if (!isClient || !videoRef.current) return;

    const video = videoRef.current;
    
    const handleLoadedData = () => {
      setVideoError(false);
      // 자동 재생 시도
      video.play().catch(() => {
        // 자동 재생 실패시 무시 (사용자가 수동으로 재생 가능)
      });
    };

    const handleError = () => {
      setVideoError(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [isClient, heroVideoUrl]);

  const navigateToAbout = () => {
    router.push('/about');
  };

  const navigateToExhibitions = () => {
    router.push('/exhibitions');
  };

  // 비디오 컨트롤 함수들 - 간소화
  const hideVideo = () => {
    setIsVideoVisible(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const showVideo = () => {
    setIsVideoVisible(true);
  };

  // 비디오가 다시 보이게 될 때 자동 재생
  useEffect(() => {
    if (isVideoVisible && videoRef.current && isClient) {
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0; // 처음부터 재생
          videoRef.current.play().catch((error) => {
            console.warn('Video play failed:', error);
          });
        }
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [isVideoVisible, isClient]);

  // 서버 사이드 렌더링 중에는 기본 콘텐츠 반환
  if (!isClient) {
    return (
      <section className="hero-section relative h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="hero-content text-center z-10 px-6">
          <h1 
            className="hero-title font-['Playfair_Display'] font-bold text-gray-900 mb-8 tracking-[-0.02em] leading-[0.85]"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            REDUX
          </h1>
          <p className="hero-subtitle text-gray-700 text-xl tracking-[0.3em] uppercase mb-12">
            THE ROOM OF [ ]
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-section relative h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Background Video */}
      {!videoError && isVideoVisible && (
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={heroVideoUrl || '/VIDEO/main.mp4'} type="video/mp4" />
        </video>
      )}

      {/* Background Image (when video is hidden or error) */}
      {(videoError || !isVideoVisible) && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: 'url(/images/hero-background/background.png)'
          }}
        />
      )}

      {/* Background overlay - lighter for white theme */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />

      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")'
        }}
      />

      {/* Avant-garde scratch-style irregular line elements - 확장된 버전 */}
      <div 
        className="absolute top-[18%] right-[12%] w-[200px] h-[0.5px] bg-gradient-to-r from-transparent via-gray-400/30 to-transparent"
        style={{ transform: 'rotate(-23deg) skewX(-15deg)' }}
      />
      <div 
        className="absolute bottom-[25%] left-[8%] w-[180px] h-[0.5px] bg-gradient-to-l from-transparent via-gray-400/25 to-transparent"
        style={{ transform: 'rotate(17deg) skewY(12deg)' }}
      />
      <div 
        className="absolute top-[65%] right-[20%] w-[120px] h-[0.5px] bg-gradient-to-r from-transparent via-gray-400/20 to-transparent"
        style={{ transform: 'rotate(-45deg)' }}
      />
      <div 
        className="absolute top-[40%] left-[15%] w-[100px] h-[0.5px] bg-gradient-to-l from-transparent via-gray-400/25 to-transparent"
        style={{ transform: 'rotate(72deg) skewX(20deg)' }}
      />
      
      {/* 추가된 아방가르드 선 요소들 */}
      <div 
        className="absolute top-[10%] left-[25%] w-[80px] h-[0.3px] bg-gradient-to-r from-gray-300/15 via-gray-400/35 to-transparent"
        style={{ transform: 'rotate(-67deg) skewY(-8deg)' }}
      />
      <div 
        className="absolute top-[55%] right-[35%] w-[140px] h-[0.4px] bg-gradient-to-l from-transparent via-gray-400/20 to-gray-300/15"
        style={{ transform: 'rotate(38deg) skewX(25deg)' }}
      />
      <div 
        className="absolute bottom-[40%] right-[8%] w-[60px] h-[0.3px] bg-gradient-to-r from-gray-400/20 to-transparent"
        style={{ transform: 'rotate(-82deg) skewX(-30deg)' }}
      />
      <div 
        className="absolute top-[75%] left-[35%] w-[90px] h-[0.4px] bg-gradient-to-l from-transparent via-gray-400/30 to-gray-300/10"
        style={{ transform: 'rotate(15deg) skewY(18deg)' }}
      />
      <div 
        className="absolute top-[30%] right-[45%] w-[50px] h-[0.2px] bg-gray-400/20"
        style={{ transform: 'rotate(-125deg) skewX(40deg)' }}
      />
      <div 
        className="absolute bottom-[15%] left-[20%] w-[110px] h-[0.3px] bg-gradient-to-r from-gray-300/10 via-transparent to-gray-400/25"
        style={{ transform: 'rotate(55deg) skewY(-22deg)' }}
      />
      
      {/* 매우 미세한 스크래치 라인들 */}
      <div 
        className="absolute top-[25%] left-[45%] w-[35px] h-[0.2px] bg-gray-400/15"
        style={{ transform: 'rotate(-95deg)' }}
      />
      <div 
        className="absolute top-[85%] right-[25%] w-[70px] h-[0.2px] bg-gradient-to-r from-transparent to-gray-400/20"
        style={{ transform: 'rotate(110deg) skewX(-15deg)' }}
      />
      <div 
        className="absolute top-[45%] left-[60%] w-[40px] h-[0.15px] bg-gray-400/10"
        style={{ transform: 'rotate(-155deg) skewY(35deg)' }}
      />

      {/* Main content with enhanced transparency effects for video interaction */}
      <div className="hero-content text-center z-10 px-6 max-w-4xl mx-auto">
        <h1
          className="hero-title font-['Playfair_Display'] font-bold mb-8 tracking-[-0.02em] leading-[0.85] transition-all duration-1000 ease-out animate-gradient"
          style={{
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            background: 'linear-gradient(135deg, #2a2a2a 0%, #5a5a5a 25%, #8B7D6B 50%, #5a5a5a 75%, #2a2a2a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundSize: '200% auto',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.08))',
          }}
        >
          REDUX
        </h1>
        
        <p
          className="hero-subtitle text-xl tracking-[0.3em] uppercase mb-12 transition-all duration-1000"
          style={{
            background: 'linear-gradient(90deg, #4a4a4a 0%, #7a7a7a 50%, #4a4a4a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: 0.9,
            filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.05))',
          }}
        >
          THE ROOM OF [ ]
        </p>

        <div className="hero-description max-w-2xl mx-auto mb-12">
          <p
            className="text-lg leading-relaxed"
            style={{
              background: 'linear-gradient(135deg, #5a5a5a 0%, #7a7a7a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1.8',
              opacity: 0.95,
            }}
          >
            5명의 패션 디자이너가 만들어가는 창작의 공간.<br />
            패션을 넘어 예술로, 개인을 넘어 집단으로.
          </p>
        </div>

        {/* Action buttons */}
        <div className="hero-actions flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={navigateToAbout}
            className="group relative px-8 py-4 backdrop-blur-md uppercase tracking-[0.2em] text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(43, 43, 43, 0.85) 0%, rgba(139, 125, 107, 0.85) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
            }}
          >
            <span className="relative z-10 text-white font-medium">Discover Redux</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B7D6B] to-[#6B5D4B] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button
            onClick={navigateToExhibitions}
            className="group relative px-8 py-4 backdrop-blur-md uppercase tracking-[0.2em] text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.25) 100%)',
              border: '1px solid rgba(90, 90, 90, 0.3)',
            }}
          >
            <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">View Exhibitions</span>
          </button>
        </div>
      </div>

      {/* 비디오 컨트롤 - 간소화된 버전 */}
      {!videoError && (
        <div className="absolute bottom-20 right-8 z-30">
          {isVideoVisible ? (
            // X 버튼 - 비디오 끄기 (미니멀 디자인)
            <button
              onClick={hideVideo}
              className="w-12 h-12 bg-white/80 hover:bg-white/90 backdrop-blur-md border border-gray-300 rounded-full flex items-center justify-center text-gray-700 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-lg"
              title="비디오 끄기"
              aria-label="비디오 끄기"
            >
              <span className="text-lg font-bold">×</span>
            </button>
          ) : (
            // 재생 버튼 - 비디오 켜기 (미니멀 디자인)
            <button
              onClick={showVideo}
              className="w-12 h-12 bg-white/80 hover:bg-white/90 backdrop-blur-md border border-gray-300 rounded-full flex items-center justify-center text-gray-700 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-lg"
              title="비디오 재생"
              aria-label="비디오 재생"
            >
              <span className="text-lg font-bold ml-0.5">▶</span>
            </button>
          )}
        </div>
      )}


      {/* CMS 버튼 for admin - video management */}
      {isAuthenticated && (
        <div className="absolute top-20 right-8 z-30">
          <DirectCMS
            slotId="main-hero-video"
            currentUrl={heroVideoUrl}
            type="video"
            onUpload={cmsUpload}
            onDelete={cmsDelete}
            isAdminMode={true}
            placeholder="Hero Video"
          />
        </div>
      )}
    </section>
  );
}

const HeroSectionWithStyles = () => (
  <>
    <HeroSection />
    <style jsx global>{`
        /* 그라데이션 애니메이션 */
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          animation: gradient-shift 4s ease infinite;
        }

        /* 홈페이지에서 Navigation 투명하게 만들기 */
        body:has(.hero-section) .redux-nav:not(.redux-nav--scrolled) {
          background: transparent !important;
          backdrop-filter: none !important;
          border-bottom: none !important;
        }

        body:has(.hero-section) .redux-nav:not(.redux-nav--scrolled) .redux-nav__logo {
          background: linear-gradient(135deg, #3a3a3a 0%, #6a6a6a 50%, #8B7D6B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        body:has(.hero-section) .redux-nav:not(.redux-nav--scrolled) .redux-nav__link {
          color: #5a5a5a;
          opacity: 0.9;
        }

        body:has(.hero-section) .redux-nav:not(.redux-nav--scrolled) .redux-nav__link:hover {
          color: #8B7D6B;
          opacity: 1;
        }

        body:has(.hero-section) .redux-nav:not(.redux-nav--scrolled) .redux-nav__toggle-line {
          background: #5a5a5a;
        }

        /* 완전히 새로운 모바일 최적화 - 깨짐 방지 */
        @media (max-width: 768px) {
          .hero-section {
            height: 100vh !important;
            height: 100dvh !important;
            width: 100vw !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
            position: relative !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          
          .hero-content {
            width: 100% !important;
            max-width: 100vw !important;
            padding: 0 20px !important;
            margin: 0 !important;
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
            box-sizing: border-box !important;
          }
          
          .hero-title {
            font-size: clamp(2rem, 10vw, 3.5rem) !important;
            margin-bottom: 1rem !important;
            line-height: 0.9 !important;
            font-weight: 700 !important;
            letter-spacing: -0.01em !important;
            width: 100% !important;
            max-width: 100% !important;
            word-break: keep-all !important;
            overflow-wrap: break-word !important;
          }
          
          .hero-subtitle {
            font-size: clamp(0.75rem, 2.5vw, 0.9rem) !important;
            margin-bottom: 1.5rem !important;
            letter-spacing: 0.2em !important;
            opacity: 0.9 !important;
            width: 100% !important;
            max-width: 90vw !important;
          }
          
          .hero-description {
            margin-bottom: 2rem !important;
            width: 100% !important;
            max-width: 90vw !important;
          }
          
          .hero-description p {
            font-size: 0.85rem !important;
            line-height: 1.5 !important;
            width: 100% !important;
            max-width: 280px !important;
            margin: 0 auto !important;
          }
          
          .hero-actions {
            flex-direction: column !important;
            gap: 1rem !important;
            align-items: center !important;
            width: 100% !important;
            max-width: 90vw !important;
          }
          
          .hero-actions button {
            width: 100% !important;
            max-width: 260px !important;
            padding: 14px 24px !important;
            font-size: 0.8rem !important;
            min-height: 48px !important;
            border-width: 2px !important;
            font-weight: 500 !important;
            letter-spacing: 0.1em !important;
            transition: all 0.3s ease !important;
            box-sizing: border-box !important;
          }
          
          /* 비디오 컨트롤 모바일 최적화 */
          .hero-section .absolute.bottom-20.right-8 {
            bottom: 100px !important;
            right: 20px !important;
            z-index: 50 !important;
          }
          
          .hero-section .absolute.bottom-20.right-8 button {
            width: 44px !important;
            height: 44px !important;
            font-size: 14px !important;
            min-height: 44px !important;
            min-width: 44px !important;
            touch-action: manipulation !important;
          }
          
          /* CMS 버튼 모바일 최적화 */
          .hero-section .absolute.top-20.right-8 {
            top: 80px !important;
            right: 20px !important;
            z-index: 50 !important;
          }
          
          /* 스크롤 인디케이터 모바일 위치 */
          .hero-section .absolute.bottom-8.left-1\\/2 {
            bottom: 20px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            z-index: 40 !important;
          }
        }
        
        /* 매우 작은 화면 (iPhone SE 등) */
        @media (max-width: 375px) {
          .hero-content {
            padding: 0 15px !important;
          }
          
          .hero-title {
            font-size: clamp(1.8rem, 8vw, 2.5rem) !important;
          }
          
          .hero-subtitle {
            font-size: clamp(0.7rem, 2vw, 0.8rem) !important;
            letter-spacing: 0.15em !important;
          }
          
          .hero-description p {
            font-size: 0.8rem !important;
            max-width: 250px !important;
          }
          
          .hero-actions button {
            max-width: 240px !important;
            padding: 12px 20px !important;
            font-size: 0.75rem !important;
            min-height: 44px !important;
          }
        }
        
        /* 가로모드 모바일 대응 */
        @media (max-width: 768px) and (orientation: landscape) {
          .hero-section {
            height: 100vh !important;
          }
          
          .hero-content {
            padding: 0 30px !important;
          }
          
          .hero-title {
            font-size: clamp(2rem, 8vw, 3rem) !important;
            margin-bottom: 0.5rem !important;
          }
          
          .hero-subtitle {
            margin-bottom: 1rem !important;
          }
          
          .hero-description {
            margin-bottom: 1.5rem !important;
          }
          
          .hero-actions {
            flex-direction: row !important;
            gap: 1rem !important;
            justify-content: center !important;
          }
          
          .hero-actions button {
            width: auto !important;
            max-width: none !important;
            padding: 12px 24px !important;
            font-size: 0.8rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-title {
            font-size: clamp(1.8rem, 12vw, 3.5rem) !important;
          }
          
          .hero-subtitle {
            font-size: 0.8rem !important;
            letter-spacing: 0.15em !important;
          }
          
          .hero-description p {
            font-size: 0.85rem !important;
            max-width: 280px !important;
          }
          
          .hero-actions button {
            padding: 12px 20px !important;
            font-size: 0.75rem !important;
            max-width: 240px !important;
          }
          
          .hero-content {
            padding: 0 15px !important;
          }
        }
        
        @media (max-width: 375px) {
          .hero-title {
            font-size: clamp(1.6rem, 12vw, 3rem) !important;
          }
          
          .hero-subtitle {
            font-size: 0.75rem !important;
          }
          
          .hero-description p {
            font-size: 0.8rem !important;
            max-width: 260px !important;
          }
          
          .hero-actions button {
            padding: 10px 18px !important;
            font-size: 0.7rem !important;
            max-width: 220px !important;
          }
        }
        
        /* Prevent flash of unstyled content */
        .hero-section {
          min-height: 100vh;
          min-height: 100dvh;
        }
        
        /* Video optimization */
        video {
          will-change: transform;
        }
        
        /* Performance optimizations */
        .hero-content * {
          will-change: auto;
        }
        
        /* 텍스트 투명 효과 애니메이션 */
        @keyframes textGlow {
          0% {
            filter: contrast(1.2) brightness(1.1) saturate(1.1);
            text-shadow: 0 0 40px rgba(255,255,255,0.2), 0 0 80px rgba(255,255,255,0.1);
            background: linear-gradient(45deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7), rgba(255,255,255,0.95));
          }
          50% {
            filter: contrast(1.4) brightness(1.3) saturate(1.2);
            text-shadow: 0 0 50px rgba(255,255,255,0.35), 0 0 100px rgba(255,255,255,0.2), 0 0 150px rgba(255,255,255,0.1);
            background: linear-gradient(45deg, rgba(255,255,255,1), rgba(255,255,255,0.8), rgba(255,255,255,1));
          }
          100% {
            filter: contrast(1.3) brightness(1.2) saturate(1.15);
            text-shadow: 0 0 60px rgba(255,255,255,0.4), 0 0 120px rgba(255,255,255,0.25);
            background: linear-gradient(45deg, rgba(255,255,255,0.95), rgba(255,255,255,0.75), rgba(255,255,255,0.98));
          }
        }

        @keyframes subtitleGlow {
          0% {
            opacity: 0.8;
            text-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.15);
            filter: brightness(1.1) contrast(1.1);
          }
          50% {
            opacity: 0.95;
            text-shadow: 0 0 30px rgba(255,255,255,0.45), 0 0 60px rgba(255,255,255,0.25), 0 0 90px rgba(255,255,255,0.1);
            filter: brightness(1.3) contrast(1.2);
          }
          100% {
            opacity: 0.9;
            text-shadow: 0 0 25px rgba(255,255,255,0.4), 0 0 50px rgba(255,255,255,0.2);
            filter: brightness(1.2) contrast(1.15);
          }
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
  </>
);

export default HeroSectionWithStyles;