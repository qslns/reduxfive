'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

/**
 * REDUX Navigation Component
 * 완전히 재구축된 네비게이션 시스템 - HTML 버전의 모든 기능 포함
 */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  
  // 페이지 타입 확인
  const isHomePage = pathname === '/';
  const aboutSubPages = [
    '/about/fashion-film',
    '/about/visual-art', 
    '/about/memory',
    '/about/installation',
    '/about/collective'
  ];
  const isAboutSubPage = aboutSubPages.includes(pathname);
  
  // Scroll effect with performance optimization
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu toggle with body scroll lock
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuActive(prev => {
      const newState = !prev;
      
      if (newState) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
      } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        setActiveSubmenu(null);
      }
      
      return newState;
    });
  }, []);

  // Toggle submenu
  const toggleSubmenu = useCallback((menu: string) => {
    setActiveSubmenu(prev => prev === menu ? null : menu);
  }, []);

  // Close mobile menu on navigation - 완전히 강화된 버전
  const closeMobileMenu = useCallback(() => {
    console.log('🔴 모바일 메뉴 닫기 호출됨'); // 디버그용
    
    // 즉시 상태 변경
    setMobileMenuActive(false);
    setActiveSubmenu(null);
    
    // Body 스크롤 즉시 복원
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.height = '';
    document.body.classList.remove('mobile-menu-active');
    
    // DOM 조작으로 강제 닫기
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.remove('redux-nav__mobile--active');
      mobileMenu.style.display = 'none';
      mobileMenu.style.transform = 'translateX(100%)';
      mobileMenu.style.opacity = '0';
      mobileMenu.style.visibility = 'hidden';
      
      // 약간의 딜레이 후 스타일 초기화
      setTimeout(() => {
        if (mobileMenu && !mobileMenuActive) {
          mobileMenu.style.display = '';
          mobileMenu.style.transform = '';
          mobileMenu.style.opacity = '';
          mobileMenu.style.visibility = '';
        }
      }, 300);
    }
    
    // 토글 버튼도 비활성화
    const toggleButton = document.querySelector('.redux-nav__toggle');
    if (toggleButton) {
      toggleButton.classList.remove('redux-nav__toggle--active');
    }
    
    console.log('✅ 모바일 메뉴 완전히 닫힘');
  }, []);

  // ESC key handler for mobile menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuActive) {
        closeMobileMenu();
      }
    };

    if (mobileMenuActive) {
      document.addEventListener('keydown', handleEscKey);
      return () => document.removeEventListener('keydown', handleEscKey);
    }
  }, [mobileMenuActive, closeMobileMenu]);

  // Close mobile menu on pathname change - 강화된 버전
  useEffect(() => {
    if (mobileMenuActive) {
      console.log('🔄 경로 변경으로 인한 메뉴 닫기:', pathname);
      closeMobileMenu();
    }
  }, [pathname, closeMobileMenu]); // Remove mobileMenuActive from dependencies to prevent infinite loops

  // 전역 클릭 이벤트로 메뉴 닫기 - 추가 안전장치
  useEffect(() => {
    if (!mobileMenuActive) return;

    const handleGlobalClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target) return;
      
      // 메뉴 내부 클릭이 아닌 경우에만 닫기
      const mobileMenu = document.getElementById('mobile-menu');
      const isMenuClick = mobileMenu?.contains(target);
      const isToggleClick = target.closest('.redux-nav__toggle');
      
      if (!isMenuClick && !isToggleClick) {
        console.log('🔄 전역 클릭으로 인한 메뉴 닫기');
        closeMobileMenu();
      }
    };

    // 약간의 딜레이를 주어 토글 버튼 클릭과 충돌 방지
    const timer = setTimeout(() => {
      document.addEventListener('click', handleGlobalClick, { passive: true });
      document.addEventListener('touchend', handleGlobalClick, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('touchend', handleGlobalClick);
    };
  }, [mobileMenuActive, closeMobileMenu]);

  // 모든 페이지에서 네비게이션 렌더링 (사용자 요청에 따라 수정)

  return (
    <>
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <nav 
        className={`redux-nav ${scrolled ? 'redux-nav--scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="redux-nav__container">
          {/* Logo */}
          <Link href="/" className="redux-nav__logo" aria-label="REDUX Home" onClick={closeMobileMenu}>
            REDUX
          </Link>

          {/* Desktop Menu */}
          <ul className="redux-nav__menu" role="menubar">
            {/* About Menu */}
            <li className="redux-nav__item" role="none">
              <Link 
                href="/about" 
                className="redux-nav__link"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <div className="redux-nav__dropdown" role="menu" aria-label="About submenu">
                <Link href="/about/fashion-film" className="redux-nav__dropdown-item" role="menuitem" onClick={closeMobileMenu}>Fashion Film</Link>
                <Link href="/about/memory" className="redux-nav__dropdown-item" role="menuitem" onClick={closeMobileMenu}>Memory</Link>
                <Link href="/about/visual-art" className="redux-nav__dropdown-item" role="menuitem" onClick={closeMobileMenu}>Visual Art</Link>
                <Link href="/about/installation" className="redux-nav__dropdown-item" role="menuitem" onClick={closeMobileMenu}>Process</Link>
                <Link href="/about/collective" className="redux-nav__dropdown-item" role="menuitem" onClick={closeMobileMenu}>Collective</Link>
              </div>
            </li>

            {/* Designers Menu */}
            <li className="redux-nav__item" role="none">
              <Link 
                href="/designers" 
                className="redux-nav__link"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={closeMobileMenu}
              >
                Designers
              </Link>
              <div className="redux-nav__dropdown" role="menu" aria-label="Designers submenu">
                <Link href="/designers/kim-bomin" className="redux-nav__dropdown-item" role="menuitem" onClick={closeMobileMenu}>Kim Bomin</Link>
                <Link href="/designers/park-parang" className="redux-nav__dropdown-item" role="menuitem" onClick={closeMobileMenu}>Park Parang</Link>
                <Link href="/designers/lee-taehyeon" className="redux-nav__dropdown-item" role="menuitem" onClick={closeMobileMenu}>Lee Taehyeon</Link>
                <Link href="/designers/choi-eunsol" className="redux-nav__dropdown-item" role="menuitem" onClick={closeMobileMenu}>Choi Eunsol</Link>
                <Link href="/designers/kim-gyeongsu" className="redux-nav__dropdown-item" role="menuitem" onClick={closeMobileMenu}>Kim Gyeongsu</Link>
              </div>
            </li>

            {/* Exhibitions Menu */}
            <li className="redux-nav__item" role="none">
              <Link 
                href="/exhibitions" 
                className="redux-nav__link"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={closeMobileMenu}
              >
                Exhibitions
              </Link>
              <div className="redux-nav__dropdown" role="menu" aria-label="Exhibitions submenu">
                <Link href="/exhibitions#cine-mode" className="redux-nav__dropdown-item" role="menuitem" onClick={closeMobileMenu}>CINE MODE</Link>
                <Link href="/exhibitions#the-room" className="redux-nav__dropdown-item" role="menuitem" onClick={closeMobileMenu}>THE ROOM OF [ ]</Link>
              </div>
            </li>

            {/* Contact Menu */}
            <li className="redux-nav__item" role="none">
              <Link href="/contact" className="redux-nav__link" role="menuitem" onClick={closeMobileMenu}>Contact</Link>
            </li>

            {/* Admin Menu */}
            <li className="redux-nav__item" role="none">
              <Link href="/admin" className="redux-nav__link" role="menuitem" onClick={closeMobileMenu}>Admin</Link>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className={`redux-nav__toggle ${mobileMenuActive ? 'redux-nav__toggle--active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label={mobileMenuActive ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuActive}
            aria-controls="mobile-menu"
          >
            <span className="redux-nav__toggle-line" />
            <span className="redux-nav__toggle-line" />
            <span className="redux-nav__toggle-line" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`redux-nav__mobile ${mobileMenuActive ? 'redux-nav__mobile--active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="redux-nav__mobile-content">
          {/* Mobile Menu Header with Close Button */}
          <div className="redux-nav__mobile-header">
            <Link href="/" className="redux-nav__mobile-logo" onClick={closeMobileMenu}>
              REDUX
            </Link>
            <button
              onClick={closeMobileMenu}
              className="redux-nav__mobile-close"
              aria-label="메뉴 닫기"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <h2 id="mobile-menu-title" className="sr-only">Mobile Navigation Menu</h2>
          
          {/* Home Button - 가장 먼저 추가 */}
          <div className="redux-nav__mobile-item redux-nav__mobile-item--home">
            <Link href="/" onClick={closeMobileMenu}>
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
          </div>
          
          {/* About Mobile Menu */}
          <div className="redux-nav__mobile-item">
            <button 
              onClick={() => toggleSubmenu('about')}
              className="redux-nav__mobile-button"
              aria-expanded={activeSubmenu === 'about'}
              aria-controls="mobile-about-submenu"
            >
              <span>About</span>
              <svg className={`w-4 h-4 ml-auto transition-transform ${activeSubmenu === 'about' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              id="mobile-about-submenu"
              className={`redux-nav__mobile-submenu ${activeSubmenu === 'about' ? 'redux-nav__mobile-submenu--active' : ''}`}
            >
              <Link href="/about" onClick={closeMobileMenu}>About REDUX</Link>
              <Link href="/about/fashion-film" onClick={closeMobileMenu}>Fashion Film</Link>
              <Link href="/about/memory" onClick={closeMobileMenu}>Memory</Link>
              <Link href="/about/visual-art" onClick={closeMobileMenu}>Visual Art</Link>
              <Link href="/about/installation" onClick={closeMobileMenu}>Process</Link>
              <Link href="/about/collective" onClick={closeMobileMenu}>Collective</Link>
            </div>
          </div>

          {/* Designers Mobile Menu */}
          <div className="redux-nav__mobile-item">
            <button 
              onClick={() => toggleSubmenu('designers')}
              className="redux-nav__mobile-button"
              aria-expanded={activeSubmenu === 'designers'}
              aria-controls="mobile-designers-submenu"
            >
              <span>Designers</span>
              <svg className={`w-4 h-4 ml-auto transition-transform ${activeSubmenu === 'designers' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              id="mobile-designers-submenu"
              className={`redux-nav__mobile-submenu ${activeSubmenu === 'designers' ? 'redux-nav__mobile-submenu--active' : ''}`}
            >
              <Link href="/designers" onClick={closeMobileMenu}>All Designers</Link>
              <Link href="/designers/kim-bomin" onClick={closeMobileMenu}>Kim Bomin</Link>
              <Link href="/designers/park-parang" onClick={closeMobileMenu}>Park Parang</Link>
              <Link href="/designers/lee-taehyeon" onClick={closeMobileMenu}>Lee Taehyeon</Link>
              <Link href="/designers/choi-eunsol" onClick={closeMobileMenu}>Choi Eunsol</Link>
              <Link href="/designers/kim-gyeongsu" onClick={closeMobileMenu}>Kim Gyeongsu</Link>
            </div>
          </div>

          {/* Exhibitions Mobile Menu */}
          <div className="redux-nav__mobile-item">
            <Link href="/exhibitions" onClick={closeMobileMenu}>Exhibitions</Link>
          </div>

          {/* Contact Mobile Menu */}
          <div className="redux-nav__mobile-item">
            <Link href="/contact" onClick={closeMobileMenu}>Contact</Link>
          </div>

          {/* Admin Mobile Menu */}
          <div className="redux-nav__mobile-item">
            <Link href="/admin" onClick={closeMobileMenu}>Admin</Link>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        <div 
          className="redux-nav__mobile-backdrop"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      </div>

      {/* Enhanced CSS with BEM naming */}
      <style jsx global>{`
        /* Screen reader only utility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Navigation Variables */
        :root {
          --nav-transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          --nav-transition-fast: all 0.2s ease;
          --nav-blur: blur(20px);
          --nav-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          --nav-z-index: 1000;
        }

        /* Navigation Base - Simplified */
        .redux-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 20px 40px;
          z-index: var(--nav-z-index);
          transition: var(--nav-transition);
          
          /* Simplified background - transparent on home page, white on others */
          background: ${
            isHomePage
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(255, 255, 255, 0.98)'
          };
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .redux-nav--scrolled {
          padding: 15px 40px;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(10px);
        }

        /* Navigation Container */
        .redux-nav__container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1600px;
          margin: 0 auto;
          position: relative;
        }

        /* Logo */
        .redux-nav__logo {
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 3vw, 26px);
          font-weight: 800;
          letter-spacing: 0.05em;
          color: #1a1a1a;
          text-decoration: none;
          transition: var(--nav-transition);
          cursor: pointer;
          position: relative;
          z-index: 2;
        }

        .redux-nav__logo:hover {
          color: #8B7D6B;
          transform: scale(1.05);
        }

        /* Desktop Menu */
        .redux-nav__menu {
          display: flex;
          gap: clamp(20px, 4vw, 40px);
          list-style: none;
          margin: 0;
          padding: 0;
          align-items: center;
        }

        .redux-nav__item {
          position: relative;
        }

        .redux-nav__link {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: clamp(13px, 1.2vw, 15px);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #505050;
          text-decoration: none;
          padding: 8px 0;
          display: block;
          transition: var(--nav-transition);
          position: relative;
          cursor: pointer;
        }

        /* Enhanced hover effects */
        .redux-nav__link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #8B7D6B, #A39993);
          transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .redux-nav__item:hover .redux-nav__link::after {
          width: 100%;
        }

        .redux-nav__item:hover .redux-nav__link {
          color: #6B625A;
          transform: translateY(-1px);
        }

        /* Dropdown Menu */
        .redux-nav__dropdown {
          position: absolute;
          top: calc(100% + 15px);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          min-width: 200px;
          padding: 20px 0;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
          border-radius: 8px;
        }

        .redux-nav__item:hover .redux-nav__dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0px);
        }

        .redux-nav__dropdown-item {
          display: block;
          padding: 12px 25px;
          color: #505050;
          font-size: 13px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          text-decoration: none;
          transition: var(--nav-transition-fast);
          position: relative;
        }

        .redux-nav__dropdown-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background: linear-gradient(180deg, #8B7D6B, #A39993);
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }

        .redux-nav__dropdown-item:hover {
          background: rgba(0, 0, 0, 0.03);
          padding-left: 35px;
          color: #8B7D6B;
        }

        .redux-nav__dropdown-item:hover::before {
          transform: scaleY(1);
        }

        /* Mobile Menu Toggle */
        .redux-nav__toggle {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 20px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          position: relative;
          z-index: 1001;
        }

        .redux-nav__toggle-line {
          width: 100%;
          height: 2px;
          background: #1a1a1a;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          transform-origin: center;
        }

        .redux-nav__toggle--active .redux-nav__toggle-line:nth-child(1) {
          transform: rotate(45deg) translateY(9px);
        }

        .redux-nav__toggle--active .redux-nav__toggle-line:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }

        .redux-nav__toggle--active .redux-nav__toggle-line:nth-child(3) {
          transform: rotate(-45deg) translateY(-9px);
        }

        /* Mobile Menu - 최종 강화 버전 */
        .redux-nav__mobile {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100vh !important;
          height: 100dvh !important;
          z-index: 9999 !important;
          transform: translateX(100%) !important;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        .redux-nav__mobile--active {
          display: block !important;
          transform: translateX(0) !important;
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
        }

        /* 비활성화 상태 강제 적용 */
        .redux-nav__mobile:not(.redux-nav__mobile--active) {
          display: none !important;
          transform: translateX(100%) !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        .redux-nav__mobile-content {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 248, 248, 0.95) 100%);
          backdrop-filter: blur(30px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          padding: 0;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        
        /* Mobile Menu Header */
        .redux-nav__mobile-header {
          width: 100%;
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        
        .redux-nav__mobile-logo {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          text-decoration: none;
          letter-spacing: 0.05em;
        }
        
        .redux-nav__mobile-close {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          color: #1a1a1a;
          transition: all 0.3s ease;
        }
        
        .redux-nav__mobile-close:hover,
        .redux-nav__mobile-close:focus {
          background: rgba(0, 0, 0, 0.08);
          transform: scale(1.05);
          outline: none;
        }

        .redux-nav__mobile-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          z-index: -1;
        }

        .redux-nav__mobile-item {
          width: 100%;
          padding: 0 24px;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.4s ease forwards;
          animation-delay: calc(var(--index, 0) * 0.05s);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .redux-nav__mobile-item--home {
          background: linear-gradient(90deg, rgba(139, 125, 107, 0.08) 0%, transparent 100%);
          border-bottom: 1px solid rgba(139, 125, 107, 0.15);
        }
        
        .redux-nav__mobile-item--home > a {
          color: #8B7D6B;
          font-weight: 500;
          display: flex;
          align-items: center;
        }

        .redux-nav__mobile--active .redux-nav__mobile-item {
          --index: 1;
        }

        .redux-nav__mobile--active .redux-nav__mobile-item:nth-child(2) { --index: 2; }
        .redux-nav__mobile--active .redux-nav__mobile-item:nth-child(3) { --index: 3; }
        .redux-nav__mobile--active .redux-nav__mobile-item:nth-child(4) { --index: 4; }
        .redux-nav__mobile--active .redux-nav__mobile-item:nth-child(5) { --index: 5; }
        .redux-nav__mobile--active .redux-nav__mobile-item:nth-child(6) { --index: 6; }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .redux-nav__mobile-button,
        .redux-nav__mobile-item > a {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 400;
          color: #1a1a1a;
          letter-spacing: 0.05em;
          min-height: 64px;
          display: flex;
          align-items: center;
          padding: 20px 0;
          text-transform: capitalize;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
          width: 100%;
          transition: all 0.2s ease;
          border-radius: 0;
          position: relative;
        }
        
        .redux-nav__mobile-button {
          justify-content: space-between;
        }

        .redux-nav__mobile-button:hover,
        .redux-nav__mobile-item > a:hover,
        .redux-nav__mobile-button:focus,
        .redux-nav__mobile-item > a:focus {
          color: #8B7D6B;
          padding-left: 10px;
          outline: none;
        }
        
        .redux-nav__mobile-button::before,
        .redux-nav__mobile-item > a::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 0;
          background: #8B7D6B;
          transition: height 0.3s ease;
        }
        
        .redux-nav__mobile-button:hover::before,
        .redux-nav__mobile-item > a:hover::before {
          height: 30px;
        }

        .redux-nav__mobile-submenu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(0, 0, 0, 0.02);
        }

        .redux-nav__mobile-submenu--active {
          max-height: 500px;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
        }

        .redux-nav__mobile-submenu a {
          font-size: 14px;
          font-weight: 300;
          color: #505050;
          opacity: 0.9;
          text-decoration: none;
          padding: 16px 24px 16px 48px;
          display: block;
          transition: all 0.2s ease;
          border-radius: 0;
          margin: 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.03);
          position: relative;
        }

        .redux-nav__mobile-submenu a:hover,
        .redux-nav__mobile-submenu a:focus {
          opacity: 1;
          color: #8B7D6B;
          background: rgba(139, 125, 107, 0.05);
          padding-left: 56px;
          outline: none;
        }
        
        .redux-nav__mobile-submenu a::before {
          content: '→';
          position: absolute;
          left: 32px;
          color: #8B7D6B;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .redux-nav__mobile-submenu a:hover::before {
          opacity: 1;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .redux-nav {
            padding: 15px 20px;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
          }
          
          .redux-nav--scrolled {
            padding: 12px 20px;
          }
          
          .redux-nav__menu {
            display: none;
          }
          
          .redux-nav__toggle {
            display: flex;
          }
          
          .redux-nav__mobile {
            display: block;
          }

          .redux-nav__logo {
            font-size: 20px;
          }
          
          /* 모바일 메뉴 컨텐츠 패딩 조정 */
          .redux-nav__mobile-content {
            padding-top: 0;
          }
          
          /* 메뉴 아이템 시작 위치 */
          .redux-nav__mobile-item:first-of-type {
            margin-top: 20px;
          }
        }

        @media (max-width: 480px) {
          .redux-nav {
            padding: 12px 15px;
          }
          
          .redux-nav--scrolled {
            padding: 10px 15px;
          }

          .redux-nav__mobile-content {
            padding: 60px 15px 30px;
            gap: 20px;
          }

          .redux-nav__mobile-button,
          .redux-nav__mobile-item > a {
            font-size: 18px;
            padding: 12px 20px;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .redux-nav__link::after {
            background: currentColor;
          }
          
          .redux-nav__dropdown {
            border-width: 2px;
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .redux-nav,
          .redux-nav__logo,
          .redux-nav__link,
          .redux-nav__dropdown,
          .redux-nav__dropdown-item,
          .redux-nav__toggle-line,
          .redux-nav__mobile,
          .redux-nav__mobile-button,
          .redux-nav__mobile-submenu {
            transition: none;
          }
          
          .redux-nav__mobile-item {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </>
  );
}