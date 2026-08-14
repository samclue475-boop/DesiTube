import React, { useRef } from 'react';
import { VideoCategory } from '../types';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { sounds } from '../utils/audio';

const CATEGORIES: VideoCategory[] = [
  'All',
  'Trending 🇮🇳',
  'Street Food',
  'Tech in Hindi',
  'Comedy & Vines',
  'Bollywood Hits',
  'Village Cooking',
  'Cricket & IPL',
  'Desi Gaming',
  'Bhakti & Mantras',
];

interface CategoryChipsProps {
  selectedCategory: VideoCategory;
  onSelectCategory: (category: VideoCategory) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex items-center bg-[#0f0f0f] py-3 px-4 sm:px-6 border-b border-[#272727]">
      
      {/* Explore Icon Button */}
      <button 
        id="explore-pill-btn"
        onClick={() => {
          sounds.playTap();
          onSelectCategory('Trending 🇮🇳');
        }}
        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#272727] hover:bg-[#3f3f3f] text-gray-300 text-sm font-medium mr-2 shrink-0 cursor-pointer transition-colors"
        title="Explore Trending"
      >
        <Compass className="w-4 h-4 text-[#FF0000]" />
        <span className="hidden sm:inline">Explore</span>
      </button>

      <div className="h-5 w-px bg-[#272727] mr-2 shrink-0 hidden sm:block" />

      {/* Left Scroll Button */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex p-1 rounded-full bg-[#1a1a1a] hover:bg-[#272727] text-gray-300 mr-1 z-10 transition-colors cursor-pointer border border-[#333]"
        title="Scroll left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Scrollable Categories */}
      <div 
        ref={scrollContainerRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              id={`category-chip-${category.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
              onClick={() => {
                sounds.playTap();
                onSelectCategory(category);
              }}
              className={`whitespace-nowrap px-3 py-1 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-[#272727] hover:bg-[#3f3f3f] text-gray-300 hover:text-white'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll('right')}
        className="hidden md:flex p-1 rounded-full bg-[#1a1a1a] hover:bg-[#272727] text-gray-300 ml-1 z-10 transition-colors cursor-pointer border border-[#333]"
        title="Scroll right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
