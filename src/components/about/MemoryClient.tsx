'use client';

import { useState } from 'react';
import OptimizedImage from '../ui/OptimizedImage';
import { useGalleryCMS } from '../../hooks/useSimpleCMS';
import { useSimpleAuth } from '../../hooks/useSimpleAuth';
import DirectCMS from '../cms/DirectCMS';

export default function MemoryClient() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { isAuthenticated } = useSimpleAuth();
  const memoryCMS = useGalleryCMS('about-memory-gallery', [
    '/images/about/memory/IMG_3452.JPG',
    '/images/about/memory/IMG_3454.JPG',
    '/images/about/memory/IMG_3455.JPG',
    '/images/about/memory/IMG_3481.JPG',
    '/images/about/memory/IMG_3491.JPG',
    '/images/about/memory/IMG_3492.JPG',
    '/images/about/memory/IMG_3493.JPG',
    '/images/about/memory/IMG_4339.JPG',
    '/images/about/memory/IMG_4345.JPG',
    '/images/about/memory/IMG_4348.JPG',
    '/images/about/memory/IMG_4367.JPG',
    '/images/about/memory/IMG_5380.JPG',
    '/images/about/memory/IMG_5381.JPG',
    '/images/about/memory/IMG_5382.JPG',
    '/images/about/memory/IMG_5383.JPG',
    '/images/about/memory/0C22A68E-AADF-4A8D-B5E7-44DDBA2EE64F.jpeg',
    '/images/about/memory/83C1CE7D-97A9-400F-9403-60E89979528A.jpg',
    '/images/about/memory/IMG_1728.jpeg',
    '/images/about/memory/IMG_7103.jpeg',
    '/images/about/memory/IMG_7146.jpeg',
    '/images/about/memory/IMG_7272.jpeg',
    '/images/about/memory/KakaoTalk_20250626_002430368.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_01.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_02.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_03.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_04.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_05.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_06.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_07.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_08.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_09.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_10.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_11.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_12.jpg',
    '/images/about/memory/KakaoTalk_20250626_002430368_13.jpg',
    '/images/about/memory/KakaoTalk_Photo_2025-06-29-18-44-00 001.jpeg',
    '/images/about/memory/KakaoTalk_Photo_2025-06-29-18-44-01 002.jpeg',
    '/images/about/memory/KakaoTalk_Photo_2025-06-29-18-44-01 003.jpeg',
    '/images/about/memory/KakaoTalk_Photo_2025-06-29-18-44-01 004.jpeg',
    '/images/about/memory/KakaoTalk_Photo_2025-06-29-18-44-01 005.jpeg'
  ]);

  const images = memoryCMS.currentImages;

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Memory</h1>
          <p className="text-gray-600">Collective Moments</p>
        </div>

        {/* 갤러리 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div
                className="aspect-[3/4] bg-gray-100 rounded overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <OptimizedImage
                  src={image}
                  alt={`Memory ${index + 1}`}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CMS 버튼 */}
              {isAuthenticated && (
                <div className="absolute top-2 right-2">
                  <DirectCMS
                    slotId={`memory-${index}`}
                    currentUrl={image}
                    type="image"
                    onUpload={(url) => {
                      const newImages = [...images];
                      newImages[index] = url;
                      memoryCMS.updateGallery(newImages);
                    }}
                    onDelete={() => {
                      const newImages = images.filter((_, i) => i !== index);
                      memoryCMS.updateGallery(newImages);
                    }}
                    isAdminMode={true}
                    placeholder={`메모리 ${index + 1}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 새 이미지 추가 - 관리자만 */}
        {isAuthenticated && (
          <div className="mt-8 flex justify-center">
            <div className="w-64 h-80 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
              <DirectCMS
                slotId="memory-new"
                type="image"
                onUpload={(url) => {
                  const newImages = [...images, url];
                  memoryCMS.updateGallery(newImages);
                }}
                isAdminMode={true}
                placeholder="새 이미지 추가"
              />
            </div>
          </div>
        )}
      </div>

      {/* 선택된 이미지 모달 - 매우 간단한 버전 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4"
          style={{ zIndex: 8000 }}
          onClick={() => setSelectedImage(null)}
        >
          <OptimizedImage
            src={selectedImage}
            alt="Selected memory"
            width={800}
            height={600}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}