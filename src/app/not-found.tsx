/**
 * 404 페이지 - REDUX 브랜드 정체성을 반영한 디자인
 */
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const reduxLetters = ['R', 'E', 'D', 'U', 'X'];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0">
        <div className="absolute top-[20%] left-[10%] w-[200px] h-[200px] border border-gray-200 rounded-full opacity-30" />
        <div className="absolute bottom-[20%] right-[10%] w-[150px] h-[150px] border-2 border-gray-200 opacity-20" />
        <div className="absolute top-[50%] right-[20%] w-[100px] h-[1px] bg-gradient-to-r from-[#8B7D6B]/30 to-transparent transform rotate-45" />
        <div className="absolute bottom-[40%] left-[15%] w-[80px] h-[1px] bg-gradient-to-l from-[#8B7D6B]/30 to-transparent transform -rotate-12" />
      </div>

      {mounted && (
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 텍스트 - REDUX 스타일 */}
          <motion.div className="mb-8">
            <motion.h1
              className="text-[10rem] md:text-[12rem] font-['Playfair_Display'] font-black leading-none"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <span className="bg-gradient-to-r from-[#1a1a1a] via-[#8B7D6B] to-[#1a1a1a] bg-clip-text text-transparent">404</span>
            </motion.h1>

            {/* REDUX 글자 애니메이션 */}
            <div className="flex justify-center gap-2 mt-4">
              {reduxLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#8B7D6B]"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.h2
            className="text-xl md:text-2xl font-light text-gray-600 mb-4 tracking-wider uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            Page Not Found
          </motion.h2>

          <motion.p
            className="text-gray-500 mb-12 max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            The room you're looking for doesn't exist.<br />
            Let's navigate back to the creative space.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="inline-block px-12 py-4 bg-gradient-to-r from-[#8B7D6B] to-[#A39993] text-white uppercase tracking-[0.2em] text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Return Home</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* 추가 네비게이션 링크 */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <Link
              href="/about"
              className="text-sm text-gray-500 hover:text-[#8B7D6B] transition-colors duration-300 uppercase tracking-wider"
            >
              About
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/designers"
              className="text-sm text-gray-500 hover:text-[#8B7D6B] transition-colors duration-300 uppercase tracking-wider"
            >
              Designers
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/exhibitions"
              className="text-sm text-gray-500 hover:text-[#8B7D6B] transition-colors duration-300 uppercase tracking-wider"
            >
              Exhibitions
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/contact"
              className="text-sm text-gray-500 hover:text-[#8B7D6B] transition-colors duration-300 uppercase tracking-wider"
            >
              Contact
            </Link>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}