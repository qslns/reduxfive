'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OptimizedImage from '../../../components/ui/OptimizedImage';
import { useSimpleCMS } from '../../../hooks/useSimpleCMS';
import { useSimpleAuth } from '../../../hooks/useSimpleAuth';
import DirectCMS from '../../../components/cms/DirectCMS';

// HTML redux6 about-collective.html과 완전 동일한 Collective 페이지 구현
export default function CollectivePage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  
  // CMS integration
  const { isAuthenticated } = useSimpleAuth();
  
  // CMS 슬롯들 - 각 멤버별 프로필 이미지
  const kimBominCMS = useSimpleCMS('about-collective-kimbomin-profile', '/images/profile/Kim Bomin.webp');
  const parkParangCMS = useSimpleCMS('about-collective-parkparang-profile', '/images/profile/Park Parang.jpg');
  const leeTaehyeonCMS = useSimpleCMS('about-collective-leetaehyeon-profile', '/images/profile/Lee Taehyeon.jpg');
  const choiEunsolCMS = useSimpleCMS('about-collective-choieunsol-profile', '/images/profile/Choi Eunsol.jpeg');
  const kimGyeongsuCMS = useSimpleCMS('about-collective-kimgyeongsu-profile', '/images/profile/Kim Gyeongsu.webp');
  
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
    
    const memberObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, index * 100);
        }
      });
    }, observerOptions);
    
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, { threshold: 0.2 });

    const memberCards = document.querySelectorAll('.member-card');
    const valueItems = document.querySelectorAll('.value-item');
    const philosophyTexts = document.querySelectorAll('.philosophy-text');
    
    memberCards.forEach(card => memberObserver.observe(card));
    valueItems.forEach(item => scrollObserver.observe(item));
    philosophyTexts.forEach(text => scrollObserver.observe(text));
    
    return () => {
      memberObserver.disconnect();
      scrollObserver.disconnect();
    };
  }, [isClient]);


  const openDesignerPage = (designer: string) => {
    router.push(`/designers/${designer}`);
  };

  // 블랙스크린 방지 - SSR에서도 콘텐츠 렌더링

  return (
    <>

      {/* Hero Section - White theme version */}
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

        <div className="hero-content text-center z-[1] text-gray-900">
          <h1
            className="hero-title font-thin uppercase mb-5 opacity-0 transform translate-y-[50px] animate-[heroFade_1.5s_ease_forwards] tracking-[0.4em]"
            style={{ fontSize: 'clamp(80px, 12vw, 200px)', textShadow: '0 0 30px rgba(0,0,0,0.1)' }}
          >
            REDUX
          </h1>
          <p className="hero-subtitle text-lg tracking-[4px] opacity-0 animate-[heroFade_1.5s_ease_forwards] [animation-delay:0.3s] text-[#8B7D6B]">
            FIVE MINDS, ONE VISION
          </p>
        </div>
      </section>

      {/* Philosophy Section - White theme version */}
      <section className="philosophy-section py-40 px-10 bg-white shadow-sm">
        <div className="philosophy-container max-w-[1000px] mx-auto text-center">
          <h2 className="philosophy-title text-5xl font-light tracking-[4px] mb-[60px] text-gray-900">
            WHO WE ARE
          </h2>
          <p className="philosophy-text text-2xl font-light leading-[2] text-gray-700 mb-10">
            REDUX는 <span className="text-[#8B7D6B] font-semibold">5인의 패션 디자이너</span>가 모여서 만든 예술 크루입니다.
          </p>
          <p className="philosophy-text text-2xl font-light leading-[2] text-gray-700 mb-10">
            우리는 패션필름, 설치, 비주얼 작업 등 다양한 방식으로<br />
            관객들에게 <span className="text-[#8B7D6B] font-semibold">'기억에 남을 순간'</span>을 디자인합니다.
          </p>
          <p className="philosophy-text text-2xl font-light leading-[2] text-gray-700 mb-10">
            각자 다른 색을 가진 멤버가 모여서 하나의 흐름을 만들고,<br />
            그 잔상이 오래도록 머물길 바라는 마음으로 활동하고 있습니다.
          </p>
          <p className="philosophy-quote text-lg italic text-gray-600 mt-[60px]">
            "Fashion is not just what we wear, it's how we remember."
          </p>
        </div>
      </section>

      {/* Members Section - White theme version */}
      <section className="members-section py-[120px] px-10 bg-gradient-to-b from-gray-50 to-white">
        <h2 className="members-title text-5xl font-light tracking-[4px] text-center mb-20 text-gray-900">
          THE COLLECTIVE
        </h2>
        <div className="members-grid grid grid-cols-3 gap-[60px] max-w-[1400px] mx-auto max-[1024px]:grid-cols-2 max-[1024px]:gap-10 max-[768px]:grid-cols-1 max-[768px]:gap-[60px]">
          
          {/* Member 1: Kim Bomin */}
          <div 
            className="member-card text-center cursor-pointer opacity-0 transform translate-y-[50px] revealed:animate-[revealMember_0.8s_ease_forwards]"
            onClick={() => openDesignerPage('kimbomin')}
          >
            <div className="member-portrait relative [aspect-ratio:3/4] bg-gray-800 overflow-hidden mb-[30px]">
              <div className="member-number absolute top-5 left-5 text-5xl font-thin text-white opacity-50 z-10">
                01
              </div>
              
              {/* 개별 멤버 카드용 아방가르드 선 */}
              <div 
                className="absolute top-[15%] right-[8%] w-[50px] h-[0.3px] bg-white/15"
                style={{ transform: 'rotate(-45deg) skewX(-10deg)' }}
              />
              <div 
                className="absolute bottom-[20%] left-[12%] w-[35px] h-[0.2px] bg-gradient-to-r from-transparent to-white/12"
                style={{ transform: 'rotate(75deg)' }}
              />
              <OptimizedImage 
                src={kimBominCMS.currentUrl || "/images/profile/Kim Bomin.webp"} 
                alt="Kim Bomin" 
                fill={true}
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover [filter:grayscale(100%)] transition-all duration-[800ms] ease-in-out hover:[filter:grayscale(0%)] hover:transform hover:scale-105"
              />
              
              {/* CMS 버튼 for admin */}
              {isAuthenticated && (
                <div 
                  className="absolute top-2 right-2 z-20"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <DirectCMS
                    slotId="about-collective-kimbomin-profile"
                    currentUrl={kimBominCMS.currentUrl}
                    type="image"
                    onUpload={kimBominCMS.handleUpload}
                    onDelete={kimBominCMS.handleDelete}
                    isAdminMode={true}
                    placeholder="Kim Bomin"
                  />
                </div>
              )}
            </div>
            <h3 className="member-name text-xl font-normal tracking-[2px] mb-[10px] text-gray-900">
              KIM BOMIN
            </h3>
            <p className="member-role text-sm tracking-[1px] text-gray-600 uppercase">
              Creative Director
            </p>
          </div>

          {/* Member 2: Park Parang */}
          <div 
            className="member-card text-center cursor-pointer opacity-0 transform translate-y-[50px] revealed:animate-[revealMember_0.8s_ease_forwards]"
            onClick={() => openDesignerPage('parkparang')}
          >
            <div className="member-portrait relative [aspect-ratio:3/4] bg-gray-800 overflow-hidden mb-[30px]">
              <div className="member-number absolute top-5 left-5 text-5xl font-thin text-white opacity-50 z-10">
                02
              </div>
              <OptimizedImage 
                src={parkParangCMS.currentUrl || "/images/profile/Park Parang.jpg"} 
                alt="Park Parang" 
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover [filter:grayscale(100%)] transition-all duration-[800ms] ease-in-out hover:[filter:grayscale(0%)] hover:transform hover:scale-105"
              />
              
              {/* CMS 버튼 for admin */}
              {isAuthenticated && (
                <div 
                  className="absolute top-2 right-2 z-20"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <DirectCMS
                    slotId="about-collective-parkparang-profile"
                    currentUrl={parkParangCMS.currentUrl}
                    type="image"
                    onUpload={parkParangCMS.handleUpload}
                    onDelete={parkParangCMS.handleDelete}
                    isAdminMode={true}
                    placeholder="Park Parang"
                  />
                </div>
              )}
            </div>
            <h3 className="member-name text-xl font-normal tracking-[2px] mb-[10px] text-gray-900">
              PARK PARANG
            </h3>
            <p className="member-role text-sm tracking-[1px] text-gray-600 uppercase">
              Visual Artist
            </p>
          </div>

          {/* Member 3: Lee Taehyeon */}
          <div 
            className="member-card text-center cursor-pointer opacity-0 transform translate-y-[50px] revealed:animate-[revealMember_0.8s_ease_forwards]"
            onClick={() => openDesignerPage('leetaehyeon')}
          >
            <div className="member-portrait relative [aspect-ratio:3/4] bg-gray-800 overflow-hidden mb-[30px]">
              <div className="member-number absolute top-5 left-5 text-5xl font-thin text-white opacity-50 z-10">
                03
              </div>
              <OptimizedImage 
                src={leeTaehyeonCMS.currentUrl || "/images/profile/Lee Taehyeon.jpg"} 
                alt="Lee Taehyeon" 
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover [filter:grayscale(100%)] transition-all duration-[800ms] ease-in-out hover:[filter:grayscale(0%)] hover:transform hover:scale-105"
              />
              
              {/* CMS 버튼 for admin */}
              {isAuthenticated && (
                <div 
                  className="absolute top-2 right-2 z-20"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <DirectCMS
                    slotId="about-collective-leetaehyeon-profile"
                    currentUrl={leeTaehyeonCMS.currentUrl}
                    type="image"
                    onUpload={leeTaehyeonCMS.handleUpload}
                    onDelete={leeTaehyeonCMS.handleDelete}
                    isAdminMode={true}
                    placeholder="Lee Taehyeon"
                  />
                </div>
              )}
            </div>
            <h3 className="member-name text-xl font-normal tracking-[2px] mb-[10px] text-gray-900">
              LEE TAEHYEON
            </h3>
            <p className="member-role text-sm tracking-[1px] text-gray-600 uppercase">
              Fashion Designer
            </p>
          </div>

          {/* Member 4: Choi Eunsol */}
          <div 
            className="member-card text-center cursor-pointer opacity-0 transform translate-y-[50px] revealed:animate-[revealMember_0.8s_ease_forwards]"
            onClick={() => openDesignerPage('choieunsol')}
          >
            <div className="member-portrait relative [aspect-ratio:3/4] bg-gray-800 overflow-hidden mb-[30px]">
              <div className="member-number absolute top-5 left-5 text-5xl font-thin text-white opacity-50 z-10">
                04
              </div>
              <OptimizedImage 
                src={choiEunsolCMS.currentUrl || "/images/profile/Choi Eunsol.jpeg"} 
                alt="Choi Eunsol" 
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover [filter:grayscale(100%)] transition-all duration-[800ms] ease-in-out hover:[filter:grayscale(0%)] hover:transform hover:scale-105"
              />
              
              {/* CMS 버튼 for admin */}
              {isAuthenticated && (
                <div 
                  className="absolute top-2 right-2 z-20"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <DirectCMS
                    slotId="about-collective-choieunsol-profile"
                    currentUrl={choiEunsolCMS.currentUrl}
                    type="image"
                    onUpload={choiEunsolCMS.handleUpload}
                    onDelete={choiEunsolCMS.handleDelete}
                    isAdminMode={true}
                    placeholder="Choi Eunsol"
                  />
                </div>
              )}
            </div>
            <h3 className="member-name text-xl font-normal tracking-[2px] mb-[10px] text-gray-900">
              CHOI EUNSOL
            </h3>
            <p className="member-role text-sm tracking-[1px] text-gray-600 uppercase">
              Art Director
            </p>
          </div>

          {/* Member 5: Kim Gyeongsu */}
          <div 
            className="member-card text-center cursor-pointer opacity-0 transform translate-y-[50px] revealed:animate-[revealMember_0.8s_ease_forwards]"
            onClick={() => openDesignerPage('kimgyeongsu')}
          >
            <div className="member-portrait relative [aspect-ratio:3/4] bg-gray-800 overflow-hidden mb-[30px]">
              <div className="member-number absolute top-5 left-5 text-5xl font-thin text-white opacity-50 z-10">
                05
              </div>
              <OptimizedImage 
                src={kimGyeongsuCMS.currentUrl || "/images/profile/Kim Gyeongsu.webp"} 
                alt="Kim Gyeongsu" 
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover [filter:grayscale(100%)] transition-all duration-[800ms] ease-in-out hover:[filter:grayscale(0%)] hover:transform hover:scale-105"
              />
              
              {/* CMS 버튼 for admin */}
              {isAuthenticated && (
                <div 
                  className="absolute top-2 right-2 z-20"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <DirectCMS
                    slotId="about-collective-kimgyeongsu-profile"
                    currentUrl={kimGyeongsuCMS.currentUrl}
                    type="image"
                    onUpload={kimGyeongsuCMS.handleUpload}
                    onDelete={kimGyeongsuCMS.handleDelete}
                    isAdminMode={true}
                    placeholder="Kim Gyeongsu"
                  />
                </div>
              )}
            </div>
            <h3 className="member-name text-xl font-normal tracking-[2px] mb-[10px] text-gray-900">
              KIM GYEONGSU
            </h3>
            <p className="member-role text-sm tracking-[1px] text-gray-600 uppercase">
              Installation Artist
            </p>
          </div>
        </div>
      </section>

      {/* Values Section - White theme version */}
      <section className="values-section py-[120px] px-10 bg-gradient-to-b from-gray-100 to-gray-50 text-gray-900">
        <div className="values-container max-w-[1400px] mx-auto">
          <h2 className="values-title text-5xl font-light tracking-[4px] text-center mb-20 text-gray-900">
            OUR VALUES
          </h2>
          <div className="values-grid grid grid-cols-4 gap-10 max-[1024px]:grid-cols-2 max-[768px]:grid-cols-1 max-[768px]:gap-[30px]">

            <div className="value-item text-center py-10 px-5 border border-gray-200 bg-white rounded-lg shadow-sm transition-all duration-500 ease-in-out hover:bg-gray-50 hover:shadow-md hover:transform hover:-translate-y-[10px]">
              <div className="value-icon w-[60px] h-[60px] mx-auto mb-[30px] border-2 border-[#8B7D6B] rounded-full flex items-center justify-center text-2xl text-[#8B7D6B]">
                ∞
              </div>
              <h3 className="value-name text-lg font-light tracking-[2px] mb-5 uppercase text-gray-900">
                Collective
              </h3>
              <p className="value-description text-sm leading-[1.8] text-gray-600">
                개인의 창의성이 모여
                더 큰 시너지를 만듭니다
              </p>
            </div>

            <div className="value-item text-center py-10 px-5 border border-gray-200 bg-white rounded-lg shadow-sm transition-all duration-500 ease-in-out hover:bg-gray-50 hover:shadow-md hover:transform hover:-translate-y-[10px]">
              <div className="value-icon w-[60px] h-[60px] mx-auto mb-[30px] border-2 border-[#8B7D6B] rounded-full flex items-center justify-center text-2xl text-[#8B7D6B]">
                ◐
              </div>
              <h3 className="value-name text-lg font-light tracking-[2px] mb-5 uppercase text-gray-900">
                Memory
              </h3>
              <p className="value-description text-sm leading-[1.8] text-gray-600">
                순간을 넘어 기억에
                남는 경험을 디자인합니다
              </p>
            </div>

            <div className="value-item text-center py-10 px-5 border border-gray-200 bg-white rounded-lg shadow-sm transition-all duration-500 ease-in-out hover:bg-gray-50 hover:shadow-md hover:transform hover:-translate-y-[10px]">
              <div className="value-icon w-[60px] h-[60px] mx-auto mb-[30px] border-2 border-[#8B7D6B] rounded-full flex items-center justify-center text-2xl text-[#8B7D6B]">
                ◈
              </div>
              <h3 className="value-name text-lg font-light tracking-[2px] mb-5 uppercase text-gray-900">
                Boundary
              </h3>
              <p className="value-description text-sm leading-[1.8] text-gray-600">
                패션과 예술의 경계를
                허물고 새로운 영역을 탐구합니다
              </p>
            </div>

            <div className="value-item text-center py-10 px-5 border border-gray-200 bg-white rounded-lg shadow-sm transition-all duration-500 ease-in-out hover:bg-gray-50 hover:shadow-md hover:transform hover:-translate-y-[10px]">
              <div className="value-icon w-[60px] h-[60px] mx-auto mb-[30px] border-2 border-[#8B7D6B] rounded-full flex items-center justify-center text-2xl text-[#8B7D6B]">
                ※
              </div>
              <h3 className="value-name text-lg font-light tracking-[2px] mb-5 uppercase text-gray-900">
                Evolution
              </h3>
              <p className="value-description text-sm leading-[1.8] text-gray-600">
                끊임없이 변화하고
                진화하는 창작을 추구합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section - White theme version */}
      <section className="cta-section py-40 px-10 bg-white text-center shadow-inner">
        <h2
          className="cta-title font-light tracking-[3px] mb-10 text-gray-900"
          style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
        >
          Let's Create Something Memorable Together
        </h2>
        <a
          href="/contact"
          className="cta-button inline-block py-5 px-[60px] border-2 border-[#8B7D6B] text-[#8B7D6B] no-underline text-base tracking-[2px] uppercase relative overflow-hidden transition-all duration-300 ease-in-out hover:text-white before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-[#8B7D6B] before:transition-[left_0.3s_ease] before:-z-[1] hover:before:left-0 rounded-sm shadow-sm hover:shadow-md"
        >
          Get in Touch
        </a>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes heroFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes revealMember {
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .revealed {
          animation: revealMember 0.8s ease forwards;
        }
        
        /* 완전한 모바일 최적화 */
        @media (max-width: 768px) {
          html, body {
            overflow-x: hidden !important;
            width: 100% !important;
            max-width: 100vw !important;
          }
          
          .hero-section {
            height: 100vh !important;
            width: 100vw !important;
            max-width: 100vw !important;
            padding: 80px 15px 0 !important;
            overflow-x: hidden !important;
          }
          
          .hero-title {
            font-size: clamp(2.5rem, 8vw, 4rem) !important;
            letter-spacing: 0.2em !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          
          .hero-subtitle {
            font-size: clamp(0.8rem, 2.5vw, 1rem) !important;
            letter-spacing: 0.15em !important;
            margin-top: 1rem !important;
            width: 100% !important;
            max-width: 90vw !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          
          .members-section {
            padding: 60px 15px !important;
            width: 100vw !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
          }
          
          .members-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          
          .member-card {
            width: 100% !important;
            max-width: 100% !important;
            padding: 1.5rem !important;
            margin-bottom: 1rem !important;
          }
          
          .member-image {
            width: 120px !important;
            height: 120px !important;
            margin: 0 auto 1rem !important;
          }
          
          .member-name {
            font-size: 1.25rem !important;
            margin-bottom: 0.5rem !important;
          }
          
          .member-role {
            font-size: 0.875rem !important;
            margin-bottom: 1rem !important;
          }
          
          .member-bio {
            font-size: 0.875rem !important;
            line-height: 1.5 !important;
          }
          
          .philosophy-section {
            padding: 60px 15px !important;
            width: 100vw !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
          }
          
          .philosophy-text h3 {
            font-size: 1.5rem !important;
            margin-bottom: 1rem !important;
          }
          
          .philosophy-text p {
            font-size: 0.875rem !important;
            line-height: 1.6 !important;
          }
          
          .cta-section {
            padding: 60px 15px !important;
            width: 100vw !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
          }
          
          .cta-section h2 {
            font-size: clamp(1.5rem, 5vw, 2rem) !important;
            margin-bottom: 2rem !important;
            line-height: 1.3 !important;
          }
          
          .cta-button {
            padding: 15px 30px !important;
            font-size: 0.875rem !important;
            letter-spacing: 1px !important;
            width: 100% !important;
            max-width: 280px !important;
            text-align: center !important;
            display: block !important;
            margin: 0 auto !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-section {
            padding: 60px 12px 0 !important;
          }
          
          .hero-title {
            font-size: clamp(2rem, 10vw, 3rem) !important;
          }
          
          .members-section,
          .philosophy-section,
          .cta-section {
            padding: 40px 12px !important;
          }
          
          .member-image {
            width: 100px !important;
            height: 100px !important;
          }
          
          .cta-button {
            padding: 12px 24px !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>

    </>
  );
}