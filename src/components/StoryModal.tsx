import React, { useState, useEffect } from 'react';
import { Story } from '../types';

interface StoryModalProps {
  story: Story;
  onClose: () => void;
  onNextStory?: () => void;
  onPrevStory?: () => void;
  onSendReply?: (storyUsername: string, text: string) => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  story,
  onClose,
  onNextStory,
  onPrevStory,
  onSendReply,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [reactionsBurst, setReactionsBurst] = useState<string[]>([]);

  const slides = story.slides || [];
  const currentSlide = slides[slideIndex] || {
    id: 'empty',
    mediaUrl: story.avatar,
    caption: 'Moments captured',
    timestamp: 'Just now',
  };

  // Progress timer for auto-advancing
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (slideIndex < slides.length - 1) {
            setSlideIndex((s) => s + 1);
            return 0;
          } else {
            if (onNextStory) {
              onNextStory();
            } else {
              onClose();
            }
            return 100;
          }
        }
        return prev + 2.5; // ~4 seconds total per slide
      });
    }, 100);

    return () => clearInterval(interval);
  }, [slideIndex, slides.length, isPaused, onNextStory, onClose]);

  const handlePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex((s) => s - 1);
      setProgress(0);
    } else if (onPrevStory) {
      onPrevStory();
    }
  };

  const handleNext = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex((s) => s + 1);
      setProgress(0);
    } else if (onNextStory) {
      onNextStory();
    } else {
      onClose();
    }
  };

  const handleQuickReaction = (emoji: string) => {
    setReactionsBurst((prev) => [...prev, emoji]);
    if (onSendReply) {
      onSendReply(story.username, `Reacted ${emoji} to your story`);
    }
    setTimeout(() => {
      setReactionsBurst((prev) => prev.filter((_, i) => i !== 0));
    }, 1500);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    if (onSendReply) {
      onSendReply(story.username, replyText.trim());
    }
    setReplyText('');
    setReactionsBurst((prev) => [...prev, '✨ Sent!']);
    setTimeout(() => {
      setReactionsBurst((prev) => prev.filter((_, i) => i !== 0));
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      {/* Background Close Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Close button top right */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
        aria-label="Close stories"
      >
        <span className="material-symbols-outlined text-[24px]">close</span>
      </button>

      {/* Story Player Container */}
      <div
        className="relative z-10 w-full max-w-[420px] aspect-[9/16] max-h-[90vh] bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border border-white/10 select-none"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Background Image / Slide */}
        <img
          alt={currentSlide.caption || story.username}
          className="absolute inset-0 w-full h-full object-cover"
          src={currentSlide.mediaUrl}
          referrerPolicy="no-referrer"
        />

        {/* Gradient Scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none" />

        {/* Reaction Floating Bursts */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {reactionsBurst.map((emoji, idx) => (
            <span
              key={idx}
              className="text-4xl animate-bounce drop-shadow-lg"
              style={{ animationDuration: '0.8s' }}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* Top Header & Progress Bars */}
        <div className="relative z-20 p-4 flex flex-col gap-3">
          {/* Progress Bars */}
          <div className="flex items-center gap-1.5 w-full">
            {slides.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-100 rounded-full"
                  style={{
                    width:
                      i < slideIndex
                        ? '100%'
                        : i === slideIndex
                        ? `${progress}%`
                        : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Creator Profile Header */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <img
                alt={story.username}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-container"
                src={story.avatar}
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm">{story.username}</span>
                  <span className="text-xs text-white/70">• {currentSlide.timestamp}</span>
                </div>
                {currentSlide.tag && (
                  <span className="text-[11px] text-white/80 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px] text-secondary">
                      location_on
                    </span>
                    {currentSlide.tag}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1">
              {story.isLive && (
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
                  LIVE
                </span>
              )}
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="p-1 rounded-full text-white/80 hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isPaused ? 'play_arrow' : 'pause'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Middle Touch Areas for Prev / Next */}
        <div className="absolute inset-y-20 inset-x-0 flex z-10 pointer-events-auto">
          <div
            className="w-1/3 h-full cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
          />
          <div
            className="w-2/3 h-full cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          />
        </div>

        {/* Bottom Area: Caption, Quick Reactions & Reply */}
        <div className="relative z-20 p-4 flex flex-col gap-3">
          {/* Slide Caption */}
          {currentSlide.caption && (
            <div className="px-3 py-2 rounded-xl bg-black/40 backdrop-blur-md text-white text-xs font-medium">
              {currentSlide.caption}
            </div>
          )}

          {/* Quick Reaction Emoji Pills */}
          <div className="flex items-center justify-around py-1">
            {['❤️', '🔥', '👏', '😮', '💯'].map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleQuickReaction(emoji)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 active:scale-125 transition-transform flex items-center justify-center text-lg cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Reply Form */}
          <form
            onSubmit={handleSendReply}
            className="flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5"
          >
            <input
              type="text"
              placeholder={`Reply to ${story.username}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full bg-transparent text-white placeholder:text-white/60 text-xs focus:outline-none"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="text-white hover:text-primary-fixed transition-colors disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
