import React, { useState } from 'react';
import { EXPLORE_POSTS } from '../data/mockData';

interface ExploreViewProps {
  onSelectHashtag: (tag: string) => void;
  onOpenCreate: () => void;
}

const CATEGORIES = [
  'All',
  'Photography',
  'Architecture',
  'Reels',
  'Portraits',
  'Sound & Music',
  'Art & Studio',
];

export const ExploreView: React.FC<ExploreViewProps> = ({
  onSelectHashtag,
}) => {
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeItem, setActiveItem] = useState<typeof EXPLORE_POSTS[0] | null>(null);

  const filteredPosts =
    selectedCat === 'All'
      ? EXPLORE_POSTS
      : EXPLORE_POSTS.filter((p) => p.category === selectedCat);

  return (
    <div className="w-full max-w-[1040px] mx-auto py-4 flex flex-col gap-6">
      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCat === cat
                ? 'bg-primary-container text-white shadow-md shadow-primary/20 scale-[1.02]'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-outline-variant/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Discovery Visual Masonry / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
        {filteredPosts.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className={`group relative overflow-hidden rounded-2xl bg-surface-container cursor-pointer shadow-sm border border-outline-variant/20 ${item.aspect}`}
          >
            <img
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={item.imageUrl}
              referrerPolicy="no-referrer"
            />
            {/* Scrim and Overlay info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3.5 text-white">
              <span className="text-xs font-bold tracking-tight">{item.title}</span>
              <span className="text-[11px] text-white/80">@{item.author}</span>
              <div className="flex items-center gap-3 mt-1.5 text-xs font-medium">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    favorite
                  </span>
                  {item.likes}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                  {item.comments}
                </span>
              </div>
            </div>

            {/* Badge for Reel / Media */}
            {item.category === 'Reels' && (
              <div className="absolute top-2.5 right-2.5 p-1 rounded-full bg-black/50 backdrop-blur-md text-white pointer-events-none">
                <span className="material-symbols-outlined text-[16px]">movie</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail Modal if clicked */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setActiveItem(null)} />
          <div className="relative z-10 w-full max-w-xl bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-on-surface">@{activeItem.author}</span>
                <span className="text-xs text-on-surface-variant">• {activeItem.category}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container"
              >
                ✕
              </button>
            </div>
            <div className="aspect-[4/3] bg-zinc-900 overflow-hidden">
              <img
                alt={activeItem.title}
                className="w-full h-full object-cover"
                src={activeItem.imageUrl}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-on-surface">{activeItem.title}</h4>
                <div className="flex items-center gap-3 text-xs text-on-surface-variant mt-1">
                  <span>❤️ {activeItem.likes} likes</span>
                  <span>💬 {activeItem.comments} comments</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectHashtag(`#${activeItem.category.replace(/\s+/g, '')}`);
                  setActiveItem(null);
                }}
                className="px-4 py-2 rounded-full bg-primary-container text-white text-xs font-bold hover:opacity-90"
              >
                Find Similar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
