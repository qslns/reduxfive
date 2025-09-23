'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import OptimizedImage from '../ui/OptimizedImage';
import { useSimpleAuth } from '../../hooks/useSimpleAuth';
import { useSimpleCMS } from '../../hooks/useSimpleCMS';
import DirectCMS from '../cms/DirectCMS';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// 최적화된 ShowcaseSection - 로딩 문제 해결
export default function ShowcaseSection() {
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // CMS 인증
  const { isAuthenticated } = useSimpleAuth();
  
  // SimpleCMS 슬롯 - 디자이너 프로필 이미지들
  const kimBominCMS = useSimpleCMS('main-designer-profile-kimbomin', '/images/profile/Kim Bomin.webp');
  const parkParangCMS = useSimpleCMS('main-designer-profile-parkparang', '/images/profile/Park Parang.jpg');
  const leeTaehyeonCMS = useSimpleCMS('main-designer-profile-leetaehyeon', '/images/profile/Lee Taehyeon.jpg');
  const choiEunsolCMS = useSimpleCMS('main-designer-profile-choieunsol', '/images/profile/Choi Eunsol.jpeg');
  const kimGyeongsuCMS = useSimpleCMS('main-designer-profile-kimgyeongsu', '/images/profile/Kim Gyeongsu.webp');
  
  // SimpleCMS 슬롯 - 전시 프리뷰 이미지들
  const cinemodeCMS = useSimpleCMS('main-exhibition-cinemode', '/images/exhibitions/cinemode/1.jpg');
  const theroomCMS = useSimpleCMS('main-exhibition-theroom', '/images/exhibitions/theroom/qslna_mirror-box_installation_four_polished_steel_walls_refle_4ffced5d-0e8e-41c6-a7ad-8f08583b1c72_2.png');
  
  // 디자이너 데이터
  const designers = [
    { 
      id: 'kimbomin',
      name: 'KIM BOMIN',
      cms: kimBominCMS,
      link: '/designers/kimbomin',
      role: 'Fashion Designer'
    },
    { 
      id: 'parkparang',
      name: 'PARK PARANG',
      cms: parkParangCMS,
      link: '/designers/parkparang',
      role: 'Fashion Designer'
    },
    { 
      id: 'leetaehyeon',
      name: 'LEE TAEHYEON',
      cms: leeTaehyeonCMS,
      link: '/designers/leetaehyeon',
      role: 'Fashion Designer'
    },
    { 
      id: 'choieunsol',
      name: 'CHOI EUNSOL',
      cms: choiEunsolCMS,
      link: '/designers/choieunsol',
      role: 'Fashion Designer'
    },
    { 
      id: 'kimgyeongsu',
      name: 'KIM GYEONGSU',
      cms: kimGyeongsuCMS,
      link: '/designers/kimgyeongsu',
      role: 'Fashion Designer'
    }
  ];

  // 전시 데이터
  const exhibitions = [
    {
      id: 'cinemode',
      name: 'CINE MODE',
      description: '패션 필름',
      cms: cinemodeCMS,
      link: '/exhibitions#cine-mode'
    },
    {
      id: 'theroom',
      name: 'THE ROOM OF [ ]',
      description: '설치 미술',
      cms: theroomCMS,
      link: '/exhibitions#the-room'
    }
  ];

  // 클라이언트 마운트 처리
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 서버 사이드 렌더링에서도 실제 콘텐츠 표시
  const actualDesigners = designers.slice(0, 5); // 5명만 표시

  // 애니메이션 변수
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100
      }
    }
  };

  const titleVariants = {
    hidden: {
      y: 30,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1] as const
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className="showcase-section py-32 px-10 bg-gradient-to-b from-white via-gray-50/50 to-white min-h-screen flex items-center"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-24 md:mb-32"
          variants={titleVariants}
        >
          <motion.h2
            className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 md:mb-12 tracking-[-0.02em]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, ease: [0.25, 0.8, 0.25, 1] }}
          >
            CREATORS
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg md:text-xl max-w-xl md:max-w-2xl mx-auto leading-relaxed px-4 tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            5인의 패션 디자이너, 그들의 창작 세계를 탐험하다.
          </motion.p>
        </motion.div>

        {/* Showcase Grid */}
        <motion.div
          className="showcase-grid grid grid-cols-2 md:grid-cols-4 gap-8 auto-rows-fr"
          variants={containerVariants}
        >
          {/* Designers */}
          {designers.map((designer, index) => (
            <motion.div
              key={designer.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
            <Link
              href={designer.link}
              className="showcase-item group relative overflow-hidden bg-white aspect-square block shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <OptimizedImage
                  src={designer.cms.currentUrl || `/images/profile/${designer.name.replace(' ', ' ')}.${designer.id === 'kimbomin' || designer.id === 'kimgyeongsu' ? 'webp' : designer.id === 'choieunsol' ? 'jpeg' : 'jpg'}`}
                  alt={designer.name}
                  fill={true}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-700"
                />
              </motion.div>
              
              {/* Overlay - 이전 버전 스타일 복원 및 개선 */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-['Playfair_Display'] font-semibold text-lg tracking-[0.1em] mb-1 text-gray-900">
                    {designer.name}
                  </h3>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#8B7D6B] to-[#A39993] mb-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <p className="text-sm text-gray-700 tracking-wider uppercase font-light">
                    {designer.role}
                  </p>
                </div>
                {/* 중앙 View 텍스트 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="text-[#8B7D6B] font-medium text-sm tracking-[0.3em] uppercase">View Profile</span>
                </div>
              </div>

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
                    slotId={`main-designer-profile-${designer.id}`}
                    currentUrl={designer.cms.currentUrl}
                    type="image"
                    onUpload={designer.cms.handleUpload}
                    onDelete={designer.cms.handleDelete}
                    isAdminMode={true}
                    placeholder={designer.name}
                  />
                </div>
              )}
            </Link>
            </motion.div>
          ))}

          {/* Exhibitions */}
          {exhibitions.map((exhibition, index) => (
            <motion.div
              key={exhibition.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
            <Link
              href={exhibition.link}
              className="showcase-item group relative overflow-hidden bg-white aspect-square block shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <OptimizedImage
                  src={exhibition.cms.currentUrl || `/images/exhibitions/${exhibition.id}/1.jpg`}
                  alt={exhibition.name}
                  fill={true}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-700"
                />
              </motion.div>
              
              {/* Overlay - 전시 카드 스타일 개선 */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/98 via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                {/* Exhibition 배지 */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs bg-gradient-to-r from-[#8B7D6B] to-[#A39993] text-white px-3 py-1 rounded uppercase tracking-wider font-medium shadow-md">
                    Exhibition
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-['Playfair_Display'] font-semibold text-lg tracking-[0.1em] mb-1 bg-gradient-to-r from-[#8B7D6B] to-[#6B5D4B] bg-clip-text text-transparent">
                    {exhibition.name}
                  </h3>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-[#8B7D6B] to-[#A39993] mb-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <p className="text-sm text-gray-700 tracking-wider font-light">
                    {exhibition.description}
                  </p>
                </div>
                {/* 중앙 View 텍스트 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="text-[#8B7D6B] font-medium text-sm tracking-[0.3em] uppercase">View Exhibition</span>
                </div>
              </div>

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
                    slotId={`main-exhibition-${exhibition.id}`}
                    currentUrl={exhibition.cms.currentUrl}
                    type="image"
                    onUpload={exhibition.cms.handleUpload}
                    onDelete={exhibition.cms.handleDelete}
                    isAdminMode={true}
                    placeholder={exhibition.name}
                  />
                </div>
              )}
            </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/about"
              className="inline-block px-12 py-5 bg-gradient-to-r from-gray-900 to-gray-700 text-white uppercase tracking-[0.3em] text-sm font-medium shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">더 알아보기</span>
              <motion.div
                className="absolute inset-0 bg-[#8B7D6B]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .showcase-item {
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        .showcase-item:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }
        
        /* Enhanced Mobile Responsive adjustments */
        @media (max-width: 768px) {
          .showcase-section {
            padding: 50px 20px !important;
            min-height: auto !important;
          }
          
          .showcase-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          
          .showcase-item {
            aspect-ratio: 1 !important;
            border-radius: 8px !important;
          }
          
          .showcase-item h3 {
            font-size: 0.75rem !important;
          }
          
          .showcase-item p {
            font-size: 0.65rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .showcase-section {
            padding: 40px 15px !important;
          }
          
          .showcase-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 0.75rem !important;
          }
          
          .showcase-item h3 {
            font-size: 0.7rem !important;
            margin-bottom: 0.25rem !important;
          }
          
          .showcase-item p {
            font-size: 0.6rem !important;
          }
        }
        
        @media (max-width: 375px) {
          .showcase-section {
            padding: 30px 12px !important;
          }
          
          .showcase-grid {
            gap: 0.5rem !important;
          }
          
          .showcase-item h3 {
            font-size: 0.65rem !important;
          }
          
          .showcase-item p {
            font-size: 0.55rem !important;
          }
        }
        
        /* Performance optimizations */
        .showcase-item img {
          will-change: transform;
        }
        
        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .showcase-item {
            animation: none !important;
            opacity: 1 !important;
          }
          
          .showcase-item img,
          .showcase-item {
            transition: none !important;
          }
        }
      `}</style>
    </motion.section>
  );
}