'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { designers } from '../../../data/designers';
import { Designer } from '../../../types';
import { useSimpleAuth } from '../../../hooks/useSimpleAuth';
import { useSimpleCMS, useGalleryCMS } from '../../../hooks/useSimpleCMS';
import DirectCMS from '../../../components/cms/DirectCMS';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function DesignerPage({ params }: Props) {
  const router = useRouter();
  const [designer, setDesigner] = useState<Designer | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null);

  // CMS
  const { isAuthenticated } = useSimpleAuth();
  const profileCMS = useSimpleCMS(`designer-profile-${resolvedParams?.slug || ''}`);
  const portfolioCMS = useGalleryCMS(
    `designer-portfolio-${resolvedParams?.slug || ''}`,
    designer?.portfolioImages || []
  );

  // Resolve params
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await Promise.resolve(params);
      setResolvedParams(resolved);
    };
    resolveParams();
  }, [params]);

  // Load designer data
  useEffect(() => {
    if (!resolvedParams) return;

    const foundDesigner = designers.find(d => d.id === resolvedParams.slug);
    if (foundDesigner) {
      setDesigner(foundDesigner);
      setIsLoading(false);
    } else {
      notFound();
    }
  }, [resolvedParams]);

  // Lightbox functions
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    const images = portfolioCMS.currentImages;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = portfolioCMS.currentImages;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  if (isLoading || !designer) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const portfolioImages = portfolioCMS.currentImages;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/98 backdrop-blur-sm z-40 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-gray-900 font-bold text-xl tracking-wider hover:text-[#8B7D6B] transition-all duration-300">
              REDUX
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors">ABOUT</Link>
              <Link href="/designers" className="text-gray-700 hover:text-gray-900 transition-colors">DESIGNERS</Link>
              <Link href="/exhibitions" className="text-gray-700 hover:text-gray-900 transition-colors">EXHIBITIONS</Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">CONTACT</Link>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden text-gray-900 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {/* Hero Section - Designer Profile */}
        <section className="min-h-screen flex items-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            {/* Designer Number Badge */}
            <div className="mb-8 flex justify-center lg:justify-start">
              <span className="inline-block px-4 py-2 bg-[#8B7D6B]/10 border border-[#8B7D6B]/30 rounded-full text-[#8B7D6B] text-sm tracking-widest">
                DESIGNER {designer.order ? String(designer.order).padStart(2, '0') : '01'}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

              {/* Text Content */}
              <div className="order-2 lg:order-1 space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-wider animate-fade-in">
                    {designer.name}
                  </h1>
                  <div className="space-y-2">
                    <p className="text-[#8B7D6B] text-sm md:text-base uppercase tracking-[0.2em] animate-slide-up">
                      {designer.mainRole}
                    </p>
                    <p className="text-gray-500 text-sm uppercase tracking-wider animate-slide-up animation-delay-100">
                      {designer.role}
                    </p>
                  </div>
                </div>

                <div className="prose prose-gray max-w-none animate-fade-in animation-delay-200">
                  <p className="text-gray-700 text-base md:text-lg leading-[1.8] font-light">
                    {designer.bio}
                  </p>
                </div>

                <div className="space-y-4 animate-fade-in animation-delay-300">
                  {designer.instagramHandle && (
                    <div className="flex items-center gap-3 group">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                      </svg>
                      <a
                        href={`https://instagram.com/${designer.instagramHandle.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-[#8B7D6B] transition-all duration-300 group-hover:translate-x-1"
                      >
                        {designer.instagramHandle}
                      </a>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    {designer.videoUrl && (
                      <a
                        href={designer.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-[#8B7D6B]/10 border border-[#8B7D6B]/30 text-[#8B7D6B] rounded-lg hover:bg-[#8B7D6B]/20 transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        View Film
                      </a>
                    )}
                    <button
                      onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-500 hover:text-gray-900 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      View Portfolio ↓
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Image */}
              <div className="order-1 lg:order-2 relative">
                <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
                  {/* Decorative Frame */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#8B7D6B]/10 to-transparent rounded-2xl blur-2xl animate-pulse-slow" />

                  <div className="aspect-[3/4] relative overflow-hidden rounded-xl shadow-2xl group">
                    <Image
                      src={profileCMS.currentUrl || designer.profileImage}
                      alt={designer.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* CMS Edit Button */}
                    {isAuthenticated && (
                      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DirectCMS
                          slotId={`designer-${designer.id}-profile`}
                          currentUrl={profileCMS.currentUrl}
                          type="image"
                          onUpload={profileCMS.handleUpload}
                          onDelete={profileCMS.handleDelete}
                          isAdminMode={true}
                          placeholder="프로필"
                        />
                      </div>
                    )}
                  </div>

                  {/* Designer Name Tag */}
                  <div className="mt-4 text-center lg:text-left">
                    <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">
                      {designer.nameKo || designer.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50">
          <div className="container mx-auto max-w-7xl">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-wider animate-fade-in">
                Portfolio
              </h2>
              <div className="w-24 h-[1px] bg-[#8B7D6B]/50 mx-auto animate-expand" />
              <p className="text-gray-500 text-sm uppercase tracking-widest">
                Selected Works
              </p>
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {portfolioImages.map((image, index) => (
                <div
                  key={index}
                  className="relative break-inside-avoid cursor-pointer group overflow-hidden rounded-xl mb-4 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative overflow-hidden bg-gray-50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      width={400}
                      height={600}
                      className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                    {/* Work Number */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="text-gray-900 text-xs uppercase tracking-widest font-medium">
                        Work {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* CMS Edit Button */}
                    {isAuthenticated && (
                      <div
                        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DirectCMS
                          slotId={`designer-${designer.id}-portfolio-${index}`}
                          currentUrl={image}
                          type="image"
                          onUpload={(url) => {
                            const newImages = [...portfolioImages];
                            newImages[index] = url;
                            portfolioCMS.updateGallery(newImages);
                          }}
                          onDelete={() => {
                            const newImages = portfolioImages.filter((_, i) => i !== index);
                            portfolioCMS.updateGallery(newImages);
                          }}
                          isAdminMode={true}
                          placeholder={`포트폴리오 ${index + 1}`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Add New Image Slot */}
              {isAuthenticated && (
                <div className="relative min-h-[300px] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-white hover:bg-gray-50 transition-colors break-inside-avoid mb-4 shadow-sm">
                  <DirectCMS
                    slotId={`designer-${designer.id}-portfolio-new`}
                    type="image"
                    onUpload={(url) => {
                      portfolioCMS.updateGallery([...portfolioImages, url]);
                    }}
                    isAdminMode={true}
                    placeholder="새 이미지 추가"
                  />
                </div>
              )}
            </div>

            {/* Portfolio Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-200 pt-8">
              <div className="text-center">
                <p className="text-3xl font-light text-[#8B7D6B]">{portfolioImages.length}</p>
                <p className="text-xs uppercase tracking-widest text-gray-500 mt-2">Total Works</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-light text-[#8B7D6B]">{designer.order || 1}</p>
                <p className="text-xs uppercase tracking-widest text-gray-500 mt-2">Designer #</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-light text-[#8B7D6B]">2025</p>
                <p className="text-xs uppercase tracking-widest text-gray-500 mt-2">Since</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-light text-[#8B7D6B]">∞</p>
                <p className="text-xs uppercase tracking-widest text-gray-500 mt-2">Creative</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Enhanced Lightbox */}
      {isLightboxOpen && portfolioImages.length > 0 && (
        <div className="fixed inset-0 z-50 bg-gray-900/98 backdrop-blur-md flex items-center justify-center animate-fade-in" onClick={closeLightbox}>
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-gray-900/10 rounded-full text-white/80 hover:text-white hover:bg-gray-900/20 transition-all duration-300"
            onClick={closeLightbox}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-gray-900/10 rounded-full text-white/80 hover:text-white hover:bg-gray-900/20 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image Container */}
          <div className="max-w-[90vw] max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={portfolioImages[currentImageIndex]}
              alt={`Portfolio ${currentImageIndex + 1}`}
              width={1400}
              height={1800}
              className="object-contain max-w-full max-h-[85vh] w-auto h-auto rounded-lg"
              priority
            />
          </div>

          {/* Next Button */}
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-gray-900/10 rounded-full text-white/80 hover:text-white hover:bg-gray-900/20 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Counter & Info */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white/80 text-sm mb-2">
              Work {String(currentImageIndex + 1).padStart(2, '0')} of {String(portfolioImages.length).padStart(2, '0')}
            </p>
            <div className="flex gap-2 justify-center">
              {portfolioImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex ? 'w-8 bg-[#8B7D6B]' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 96px;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animate-expand {
          animation: expand 0.8s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animation-delay-100 {
          animation-delay: 100ms;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </main>
  );
}