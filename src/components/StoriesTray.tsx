import React from 'react';
import { Story } from '../types';

interface StoriesTrayProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
  onAddStory: () => void;
}

export const StoriesTray: React.FC<StoriesTrayProps> = ({
  stories,
  onSelectStory,
  onAddStory,
}) => {
  return (
    <div className="relative w-full bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/20">
      {/* Stories Header */}
      <div className="flex items-center justify-between pb-1 mb-1">
        <div className="flex items-center gap-1.5">
          <span className="text-base text-on-surface font-bold tracking-tight">
            Stories
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
        </div>
        <button
          className="text-xs text-primary hover:text-primary-container transition-colors font-semibold cursor-pointer"
          type="button"
          onClick={() => {
            if (stories.length > 1) {
              onSelectStory(stories[1]);
            }
          }}
        >
          Watch all
        </button>
      </div>

      {/* Stories Horizontal Carousel */}
      <div className="relative overflow-hidden group">
        <div className="flex items-center gap-4 overflow-x-auto scroll-smooth py-1 no-scrollbar">
          {/* Your Story item */}
          {stories.length > 0 && (
            <div
              className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group/user"
              onClick={onAddStory}
            >
              <div className="relative w-16 h-16 rounded-full p-[2px] flex items-center justify-center transition-transform hover:scale-105">
                <img
                  alt="Your Story"
                  className="w-14 h-14 rounded-full object-cover"
                  src={stories[0].avatar}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-primary-container text-white flex items-center justify-center shadow-md shadow-primary/30">
                  <span className="material-symbols-outlined text-[16px] leading-none">add</span>
                </div>
              </div>
              <span className="text-xs text-on-surface font-medium truncate w-16 text-center">
                Your story
              </span>
            </div>
          )}

          {/* Other creators stories */}
          {stories.slice(1).map((story) => (
            <div
              key={story.id}
              className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group/story"
              onClick={() => onSelectStory(story)}
            >
              <div
                className={`relative w-16 h-16 rounded-full p-[2.5px] flex items-center justify-center transition-transform duration-200 group-hover/story:scale-105 ${
                  story.isLive
                    ? 'bg-gradient-to-tr from-secondary-container via-primary-container to-tertiary-container'
                    : story.hasUnseen
                    ? 'bg-gradient-to-tr from-primary-container via-primary to-secondary-container shadow-sm'
                    : 'bg-surface-container-highest'
                }`}
              >
                <div className="w-full h-full rounded-full bg-surface-container-lowest p-[2px] flex items-center justify-center">
                  <img
                    alt={story.username}
                    className="w-full h-full rounded-full object-cover"
                    src={story.avatar}
                    referrerPolicy="no-referrer"
                  />
                </div>
                {story.isLive && (
                  <div className="absolute -bottom-1 px-1.5 py-0.5 rounded-full bg-secondary-container text-white text-[9px] uppercase tracking-wider font-extrabold shadow-sm animate-pulse">
                    LIVE
                  </div>
                )}
              </div>
              <span className="text-xs text-on-surface truncate w-16 text-center font-normal">
                {story.username}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
