/**
 * Hero Section Component
 * 메인 페이지 히어로 섹션 - 비디오 백그라운드와 타이틀
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  videoUrl?: string;
  className?: string;
}

export default function HeroSection({
  videoUrl: heroVideoUrl,
  className = ''
}: HeroSectionProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll effects
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setIsClient(true);

    const videoElement = videoRef.current;
    if (videoElement && isClient) {
      videoElement.src = heroVideoUrl || '/VIDEO/main.mp4';
      videoElement.load();

      videoElement.addEventListener('canplay', () => {
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => setVideoError(true));
        }
      });

      videoElement.addEventListener('error', () => setVideoError(true));
    }

    const timer = setTimeout(() => setShowOverlay(true), 1500);

    return () => {
      clearTimeout(timer);
      if (videoElement) {
        videoElement.removeEventListener('canplay', () => {});
        videoElement.removeEventListener('error', () => {});
      }
    };
  }, [heroVideoUrl, isClient]);

  // Navigation functions
  const navigateToAbout = () => router.push('/about');
  const navigateToDesigners = () => router.push('/designers');
  const scrollToExplore = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  // Toggle video visibility
  const toggleVideo = () => setIsVideoVisible(!isVideoVisible);
  const showVideo = () => setIsVideoVisible(true);

  // Re-play video when it becomes visible
  useEffect(() => {
    if (isVideoVisible && videoRef.current && isClient) {
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {
            // Video play failed silently
          });
        }
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isVideoVisible, isClient]);

  // Server-side rendering fallback
  if (!isClient) {
    return (
      <section className="hero-section relative h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="text-center z-10 px-6">
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

  // Typography animation variants
  const titleLetterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1] as const
      }
    })
  };

  const titleText = "REDUX";

  return (
    <motion.section
      ref={sectionRef}
      className="hero-section relative h-screen bg-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
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

      {/* Background Image (fallback) */}
      {(videoError || !isVideoVisible) && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-100 opacity-70" />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30" />

      {/* Decorative elements */}
      <div className="absolute top-[35%] left-[10%] w-[250px] h-[250px] border border-gray-300/30 rounded-full" />
      <div className="absolute bottom-[20%] right-[15%] w-[180px] h-[180px] border-2 border-gray-300/20" />
      <div className="absolute top-[18%] right-[12%] w-[200px] h-[0.5px] bg-gradient-to-r from-transparent via-gray-400/30 to-transparent transform rotate-[-23deg]" />
      <div className="absolute bottom-[25%] left-[8%] w-[180px] h-[0.5px] bg-gradient-to-l from-transparent via-gray-400/25 to-transparent transform rotate-[17deg]" />

      {/* MAIN CONTENT - CENTERED */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          className="text-center px-6"
          style={{ y, opacity }}
        >
          {/* REDUX TITLE */}
          <motion.h1
            className="font-['Playfair_Display'] font-black mb-12 tracking-[-0.02em] leading-[0.85] transition-all duration-1000 ease-out"
            style={{
              fontSize: 'clamp(4rem, 10vw, 10rem)',
              textShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
            initial="hidden"
            animate="visible"
          >
            {titleText.split('').map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={titleLetterVariants}
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 25%, #8B7D6B 50%, #4a4a4a 75%, #1a1a1a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '200% auto',
                  animation: 'gradient-shift 4s ease infinite',
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            className="text-2xl tracking-[0.4em] uppercase mb-16 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{
              background: 'linear-gradient(90deg, #3a3a3a 0%, #6a6a6a 50%, #3a3a3a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.05))',
            }}
          >
            THE ROOM OF [ ]
          </motion.p>

          {/* DESCRIPTION */}
          <motion.div
            className="max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <p
              className="text-xl md:text-2xl leading-relaxed font-light"
              style={{
                background: 'linear-gradient(135deg, #4a4a4a 0%, #7a7a7a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '2',
              }}
            >
              5인의 패션 디자이너가 만들어가는 창작 집단.<br />
              개인의 경계를 넘어 하나의 비전을 그리다.
            </p>
          </motion.div>

          {/* ACTION BUTTONS */}
          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <motion.button
              onClick={navigateToAbout}
              className="group px-10 py-4 bg-gradient-to-r from-[#8B7D6B] to-[#A39993] text-white uppercase tracking-[0.2em] text-sm font-medium relative overflow-hidden transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Discover Story</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={navigateToDesigners}
              className="group px-10 py-4 border-2 border-gray-700 text-gray-700 uppercase tracking-[0.2em] text-sm font-medium relative overflow-hidden transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Meet Creators</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>

          {/* SCROLL INDICATOR */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={scrollToExplore}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-gray-600 hover:text-[#8B7D6B] transition-colors duration-300"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-xs uppercase tracking-[0.2em]">Explore</span>
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient animation keyframes */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </motion.section>
  );
}