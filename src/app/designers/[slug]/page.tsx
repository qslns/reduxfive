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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const portfolioImages = portfolioCMS.currentImages;

  return (
    <main className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-md z-40 border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-white font-bold text-xl hover:opacity-70 transition-opacity">
              REDUX
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-white/80 hover:text-white transition-colors">ABOUT</Link>
              <Link href="/designers" className="text-white/80 hover:text-white transition-colors">DESIGNERS</Link>
              <Link href="/exhibitions" className="text-white/80 hover:text-white transition-colors">EXHIBITIONS</Link>
              <Link href="/contact" className="text-white/80 hover:text-white transition-colors">CONTACT</Link>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden text-white p-2">
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
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

              {/* Text Content */}
              <div className="order-2 lg:order-1 space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                    {designer.name}
                  </h1>
                  <p className="text-amber-300 text-sm md:text-base uppercase tracking-wider">
                    {designer.role}
                  </p>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 text-base md:text-lg leading-relaxed">
                    {designer.bio}
                  </p>
                </div>

                {designer.instagramHandle && (
                  <div className="flex items-center gap-2">
                    <span className="text-white/60">Instagram:</span>
                    <a
                      href={`https://instagram.com/${designer.instagramHandle.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300 hover:text-amber-400 transition-colors"
                    >
                      {designer.instagramHandle}
                    </a>
                  </div>
                )}
              </div>

              {/* Profile Image */}
              <div className="order-1 lg:order-2 relative">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                    <Image
                      src={profileCMS.currentUrl || designer.profileImage}
                      alt={designer.name}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* CMS Edit Button */}
                    {isAuthenticated && (
                      <div className="absolute top-4 right-4 z-10">
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
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Portfolio
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {portfolioImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[3/4] cursor-pointer group overflow-hidden rounded-lg"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image}
                    alt={`Portfolio ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

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
              ))}

              {/* Add New Image Slot */}
              {isAuthenticated && (
                <div className="relative aspect-[3/4] border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center">
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
          </div>
        </section>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && portfolioImages.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white text-4xl"
            onClick={closeLightbox}
          >
            ×
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>

          <div className="max-w-[90vw] max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={portfolioImages[currentImageIndex]}
              alt={`Portfolio ${currentImageIndex + 1}`}
              width={1200}
              height={1600}
              className="object-contain max-w-full max-h-[90vh] w-auto h-auto"
              priority
            />
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60">
            {currentImageIndex + 1} / {portfolioImages.length}
          </div>
        </div>
      )}
    </main>
  );
}