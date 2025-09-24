'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { designers } from '../../data/designers';
import { useTextContent } from '../../hooks/usePageContent';
import { useSimpleAuth } from '../../hooks/useSimpleAuth';
import { useSimpleCMS } from '../../hooks/useSimpleCMS';
import DirectCMS from '../../components/cms/DirectCMS';

interface DesignerCardProps {
  designer: {
    id: string;
    number: string;
    name: string;
    mainRole: string;
    role: string;
    brand: string;
    profileImage: string;
    hasImage: boolean;
    hasVideo: boolean;
  };
  index: number;
  isAuthenticated: boolean;
  onClick: () => void;
}

function DesignerCard({ designer, index, isAuthenticated, onClick }: DesignerCardProps) {
  const { currentUrl, handleUpload, handleDelete } = useSimpleCMS(
    `designer-${designer.id}-profile`,
    designer.profileImage
  );

  const displayImage = currentUrl || designer.profileImage;
  const hasDisplayImage = !!displayImage;

  return (
    <div
      className="designer-card relative h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] min-h-[350px] sm:min-h-[400px] md:min-h-[450px] max-h-[500px] sm:max-h-[550px] md:max-h-[600px] overflow-hidden cursor-pointer bg-gray-50 transition-all duration-[600ms] ease-out hover:transform hover:scale-[1.002] hover:z-10 shadow-md hover:shadow-xl"
      onClick={onClick}
      style={{
        borderRight: '1px solid rgba(0, 0, 0, 0.05)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <div 
        className="absolute inset-0 transition-all duration-[800ms] ease-out"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: hasDisplayImage ? `url('${displayImage}')` : 'none',
          background: !hasDisplayImage ? 'linear-gradient(135deg, #f5f5f5, #e0e0e0)' : undefined,
          filter: 'grayscale(80%) contrast(1.1) brightness(1.1)',
          opacity: 0.85,
        }}
      >
        {!hasDisplayImage && (
          <div className="absolute inset-0 flex items-center justify-center text-6xl text-gray-400">
            📷
          </div>
        )}
      </div>
      
      
      <span
        className="absolute top-[20px] sm:top-[30px] md:top-[40px] right-[20px] sm:right-[30px] md:right-[40px] text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-light text-gray-300 transition-all duration-[600ms] ease-out"
      >
        {designer.number}
      </span>
      
      {/* Film indicator for designers with videos */}
      {designer.hasVideo && (
        <div
          className="absolute top-[20px] sm:top-[30px] md:top-[40px] left-[20px] sm:left-[30px] md:left-[40px] w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] bg-white/80 backdrop-blur-[10px] rounded-full flex items-center justify-center text-gray-700 shadow-sm transition-all duration-[600ms] ease-out text-xs sm:text-sm md:text-base"
        >
          ▶
        </div>
      )}
      
      <div
        className="absolute bottom-0 left-0 w-full p-[30px_20px] sm:p-[40px_30px] md:p-[50px_35px] lg:p-[60px_40px] bg-gradient-to-t from-white/95 via-white/80 to-transparent transform translate-y-[60%] transition-transform duration-[600ms] ease-out"
      >
        <h3
          className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-light tracking-[2px] sm:tracking-[2.5px] md:tracking-[3px] text-gray-900 mb-[6px] sm:mb-[8px] md:mb-[10px]"
        >
          {designer.name}
        </h3>
        <p
          className="text-[12px] sm:text-[14px] md:text-[16px] tracking-[1.5px] sm:tracking-[1.8px] md:tracking-[2px] text-gray-800 uppercase mb-[4px] sm:mb-[6px] md:mb-[8px] font-medium"
        >
          {designer.mainRole}
        </p>
        <p
          className="text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.8px] sm:tracking-[0.9px] md:tracking-[1px] text-gray-600 uppercase mb-[10px] sm:mb-[15px] md:mb-[20px]"
        >
          {designer.role}
        </p>
        <p
          className="text-[12px] sm:text-[14px] md:text-[16px] text-gray-700 mb-[15px] sm:mb-[20px] md:mb-[25px] lg:mb-[30px] opacity-90 line-clamp-2"
        >
          {designer.brand}
        </p>
        <span 
          className="inline-block py-[12px] px-[30px] border border-gray-800 text-gray-800 text-[12px] tracking-[2px] uppercase transition-all duration-300 ease-out opacity-0 hover:bg-gray-800 hover:text-white"
        >
          View Profile
        </span>
      </div>
      
      {/* CMS 버튼 for admin */}
      {isAuthenticated && (
        <div 
          className="absolute top-4 left-4 z-20"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <DirectCMS
            slotId={`designer-${designer.id}-profile`}
            currentUrl={currentUrl}
            type="image"
            onUpload={handleUpload}
            onDelete={handleDelete}
            isAdminMode={true}
            placeholder={designer.name}
          />
        </div>
      )}
    </div>
  );
}

export default function DesignersPage() {
  const router = useRouter();
  
  // Dynamic content loading
  const { text: heroTitle } = useTextContent('designers', 'hero-title', 'FIVE DESIGNERS');
  const { text: heroSubtitle } = useTextContent('designers', 'hero-subtitle', '5인의 디자이너, 하나의 비전');
  
  // CMS 인증
  const { isAuthenticated } = useSimpleAuth();

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('card-revealed');
          }, index * 100);
        }
      });
    }, observerOptions);
    
    // Observe designer cards for scroll animations
    document.querySelectorAll('.designer-card').forEach(card => {
      observer.observe(card);
    });
    
    // Touch feedback for mobile
    if ('ontouchstart' in window) {
      document.querySelectorAll('.designer-card').forEach(card => {
        card.addEventListener('touchstart', function(this: Element) {
          this.classList.add('touch-active');
        });
        
        card.addEventListener('touchend', function(this: Element) {
          setTimeout(() => {
            this.classList.remove('touch-active');
          }, 300);
        });
      });
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // 5인의 디자이너 데이터를 실제 데이터에서 가져와서 display용으로 변환
  const designerDisplayData = designers.map((designer, index) => {
    return {
      id: designer.id,
      number: String(designer.order).padStart(2, '0'),
      name: designer.name.toUpperCase(),
      mainRole: designer.mainRole,
      role: designer.role,
      brand: 'REDUX COLLECTIVE',
      profileImage: designer.profileImage,
      hasImage: !!designer.profileImage,
      hasVideo: !!designer.videoUrl
    };
  });

  const handleDesignerClick = (designerId: string) => {
    router.push(`/designers/${designerId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      {/* Hero Section */}
      <section
        className="hero-section flex items-center justify-center relative overflow-hidden"
        style={{
          marginTop: '60px',
          height: '40vh',
          minHeight: '300px',
        }}
      >
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            background: 'linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)',
          }}
        ></div>
        <div className="text-center z-10 px-4">
          <h1
            className="hero-title font-['Playfair_Display'] font-light tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] mb-3 sm:mb-4 md:mb-5"
            style={{
              fontSize: 'clamp(32px, 7vw, 80px)'
            }}
          >
            {heroTitle}
          </h1>
          <p
            className="hero-subtitle text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-gray-600 tracking-[1px] sm:tracking-[1.5px] md:tracking-[2px]"
          >
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Designer Grid */}
      <section
        className="designers-container py-[40px] sm:py-[60px] md:py-[80px] lg:py-[120px] px-[16px] sm:px-[24px] md:px-[32px] lg:px-[40px]"
      >
        <div className="max-w-[1600px] mx-auto">
          <div
            className="designers-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 relative"
          >
            {designerDisplayData.map((designer, index) => {
              return (
                <DesignerCard
                  key={designer.id}
                  designer={designer}
                  index={index}
                  isAuthenticated={isAuthenticated}
                  onClick={() => handleDesignerClick(designer.id)}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Designer card animations */
        .designer-card {
          opacity: 0;
          transform: translateY(100px);
          transition: all 0.8s ease;
        }
        
        .designer-card.card-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Designer card hover effects */
        .designer-card:hover {
          z-index: 10;
        }
        
        .designer-card:hover .designer-image {
          filter: grayscale(0%) contrast(1) brightness(1) !important;
          opacity: 1 !important;
          transform: scale(1.05) !important;
        }
        
        .designer-card:hover .designer-number {
          color: rgba(0, 0, 0, 0.1) !important;
          transform: scale(1.2) !important;
        }
        
        .designer-card:hover .designer-content {
          transform: translateY(0) !important;
        }
        
        .designer-card:hover .designer-link {
          opacity: 1 !important;
        }
        
        .designer-card:hover .film-indicator {
          background: rgba(255, 255, 255, 0.95) !important;
          transform: scale(1.1) !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
        }
        
        .designer-link:hover {
          background: #1a1a1a !important;
          color: #fff !important;
        }
        
        /* Touch feedback for mobile */
        @media (hover: none) {
          .designer-card:active .designer-image {
            filter: grayscale(0%) contrast(1) !important;
            opacity: 1 !important;
            transform: scale(1.05) !important;
          }
          
          .designer-card:active .designer-content {
            transform: translateY(0) !important;
          }
          
          .designer-card:active .designer-link {
            opacity: 1 !important;
          }
          
          .designer-content {
            transform: translateY(30%) !important;
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .designers-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          .designer-card {
            height: 55vh !important;
            min-height: 400px !important;
            max-height: 500px !important;
            border-right: none !important;
          }
          
          .designer-card:nth-child(2n) {
            border-right: none !important;
          }
        }
        
        @media (max-width: 768px) {
          .hero-section {
            margin-top: 60px !important;
            height: 40vh !important;
            min-height: 300px !important;
          }
          
          .hero-title {
            font-size: clamp(36px, 10vw, 56px) !important;
            letter-spacing: 0.1em !important;
          }
          
          .hero-subtitle {
            font-size: 16px !important;
          }
          
          .designers-container {
            padding: 60px 20px 40px !important;
          }
          
          .designers-grid {
            grid-template-columns: 1fr !important;
            gap: 2px !important;
            background: rgba(0, 0, 0, 0.02) !important;
            padding: 2px !important;
          }
          
          .designer-card {
            height: 60vh !important;
            min-height: 350px !important;
            max-height: 450px !important;
            border-right: none !important;
            border-bottom: none !important;
            background: #fff !important;
            border: 1px solid rgba(0,0,0,0.05) !important;
          }
          
          .designer-number {
            font-size: 80px !important;
            top: 20px !important;
            right: 20px !important;
          }
          
          .designer-name {
            font-size: 24px !important;
          }
          
          .designer-role {
            font-size: 12px !important;
          }
          
          .designer-brand {
            font-size: 14px !important;
          }
          
          .designer-content {
            padding: 40px 20px !important;
            transform: translateY(0) !important;
            background: linear-gradient(to top, rgba(255,255,255,0.98), rgba(255,255,255,0.9), transparent) !important;
          }
          
          .designer-link {
            opacity: 1 !important;
            padding: 10px 25px !important;
            font-size: 11px !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-title {
            font-size: 32px !important;
          }
          
          .hero-subtitle {
            font-size: 14px !important;
            letter-spacing: 1px !important;
          }
          
          .designer-card {
            height: 50vh !important;
            min-height: 300px !important;
            max-height: 400px !important;
          }
          
          .designer-number {
            font-size: 60px !important;
          }
          
          .designer-name {
            font-size: 20px !important;
          }
          
          .designer-role {
            font-size: 11px !important;
          }
          
          .designer-brand {
            font-size: 13px !important;
            margin-bottom: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}