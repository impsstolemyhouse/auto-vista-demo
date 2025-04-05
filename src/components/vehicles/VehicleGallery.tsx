
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VehicleGalleryProps {
  images: string[];
  make: string;
  model: string;
}

const VehicleGallery = ({ images, make, model }: VehicleGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-lg aspect-[16/9] bg-gray-200 dark:bg-gray-800">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={image}
              alt={`${make} ${model} image ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Navigation arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 border-0 hover:bg-white dark:hover:bg-gray-800 rounded-full h-10 w-10"
          onClick={prevSlide}
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 border-0 hover:bg-white dark:hover:bg-gray-800 rounded-full h-10 w-10"
          onClick={nextSlide}
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </Button>

        {/* Slide counter */}
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail navigation */}
      <div className="mt-4 grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative aspect-[16/9] rounded-md overflow-hidden border-2 transition-all ${
              index === activeIndex
                ? 'border-dms-blue'
                : 'border-transparent hover:border-gray-300'
            }`}
            aria-label={`Go to image ${index + 1}`}
          >
            <img
              src={image}
              alt={`${make} ${model} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default VehicleGallery;
