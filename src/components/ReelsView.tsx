import React, { useState } from 'react';

const REELS_DATA = [
  {
    id: 'reel_1',
    creator: 'sora.tokyo',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7viTs1c8I76rGtzeQaKqBmvu-1xRqJXN3SrmPOtpLUKNw5AT-YUyjJQ378ZcNr-jfQ5S0kK5H07_Y19ILJ65JPVtCkFfbjHcHXHfdnRseZYXCRWsipuu0PjtSByBOSnKSBB5MISCtlhxozRIkb4jvSdLdRDV_wLGv8N9QkIyxrsdbfw3kcmoQJ_Yn3fw1e1QRQ6qqA2PiAuJEGQWm_RcFutu_EWxwe6-p6LaTWCgWqZTs7Q-WDiDM6g',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqjFvlSRSsJC9DsedoTGIRlj_TKLRgqgMnK_VO2Osiu5zJw0Pg0rZ7EhVv7xDaG5tFvLMxhiDbE_P8xYzWe1DFS0oKvwSb-OY05z-Y70rhkzyRWvGblW8D5wD2jyAK172CbTlXm5vy0a6JNyKcMiuKAxkjpnZBW-leOPcSZh4EwI8Fz_aqcyenFOIm6BXlBpADxejSLHhoGhQ6dKL5G4Q-BT1XJNro8tEQHc5RYyYFMe02D9F2w_YCSg',
    caption: 'Midnight drift through Shibuya during typhoon season ☔️ Turn sound on for the city rhythm.',
    audio: 'Original Audio - sora.tokyo • Synth Dreams',
    location: 'Shibuya Crossing, Tokyo',
    likes: '19.8K',
    comments: '341',
  },
  {
    id: 'reel_2',
    creator: 'marcus_vibe',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_nuWglLGdsxII3Kud7SEYH7Giy4-eR0bVnTzTxKS1S1uzKP3ucKT-BpwJuwmWovzPXaSDZTMeH0wqWbxAmqvOyyOgM04UYmleqNLV_UxUZn5mcvRxFxWdOfBVUIzqRiSe0SZxK2tB-ziyPEuc63mfg8pP1plyRK6DHpWd6CmisihQ91YKrJbVsSLU9-KR2lBonUEfNYYGK7yjkTjSJti6XqNxmBcnLMCDD5pOmpcsymqTzRc-h5zYbg',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBepXSDesuAAoAxsp6UjiapKX2oKF25KtSGXsAU6SzCqM3_HWWl3hUEaWzTzdYh_QAUsP6PXvz6f6BYup1q_UKQocZSdLnni_ylYnlUVNyhurCW6QJxxkm2__fwVRG2QeIuJVA0TjiFsZZRRdwpWBfXEQd47fz2qKmxF6YWoMt8iUhV7E3SsCSSDxSfYI3AnNqk2po5M8rKwfhjjL4Ej5UrMP_V5qdwewji-bmVOwyIzMlpL2d0wgP1Rg',
    caption: 'Sunset tape saturation experiments in the hills. Pure warmth.',
    audio: 'Marcus Vibe • Analog Tape Loop 04',
    location: 'Lands End, SF',
    likes: '8.4K',
    comments: '112',
  },
];

export const ReelsView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const reel = REELS_DATA[currentIndex];

  const handleNext = () => {
    if (currentIndex < REELS_DATA.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsLiked(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsLiked(false);
    }
  };

  return (
    <div className="w-full max-w-[620px] mx-auto py-4 flex flex-col items-center">
      {/* Reel Card Container */}
      <div className="relative w-full aspect-[9/16] max-h-[80vh] rounded-3xl overflow-hidden bg-black shadow-2xl border border-outline-variant/30 select-none">
        <img
          alt={reel.caption}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isPlaying ? 'scale-105' : 'scale-100 opacity-90'
          }`}
          src={reel.posterUrl}
          referrerPolicy="no-referrer"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85 pointer-events-none" />

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">movie</span>
            <span className="text-sm font-bold tracking-tight">Reels</span>
          </div>
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>
        </div>

        {/* Play/Pause Overlay Click */}
        <div
          className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {!isPlaying && (
            <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[36px] ml-1">play_arrow</span>
            </div>
          )}
        </div>

        {/* Right Floating Actions Column */}
        <div className="absolute right-4 bottom-20 z-20 flex flex-col items-center gap-5 text-white">
          {/* Like */}
          <button
            type="button"
            onClick={() => setIsLiked(!isLiked)}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                isLiked ? 'bg-secondary text-white' : 'bg-black/40 group-hover:bg-black/60'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </div>
            <span className="text-[11px] font-bold">{reel.likes}</span>
          </button>

          {/* Comments */}
          <button type="button" className="flex flex-col items-center gap-1 group">
            <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:bg-black/60 transition-all">
              <span className="material-symbols-outlined text-[24px]">chat_bubble</span>
            </div>
            <span className="text-[11px] font-bold">{reel.comments}</span>
          </button>

          {/* Bookmark */}
          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                isSaved ? 'bg-primary-container text-white' : 'bg-black/40 group-hover:bg-black/60'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
              >
                bookmark
              </span>
            </div>
          </button>

          {/* Share */}
          <button type="button" className="flex flex-col items-center gap-1 group">
            <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:bg-black/60 transition-all">
              <span className="material-symbols-outlined text-[24px]">send</span>
            </div>
          </button>
        </div>

        {/* Bottom Information Details */}
        <div className="absolute left-4 right-20 bottom-4 z-20 flex flex-col gap-2 text-white">
          <div className="flex items-center gap-2.5">
            <img
              alt={reel.creator}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-container"
              src={reel.avatar}
              referrerPolicy="no-referrer"
            />
            <span className="font-bold text-sm">@{reel.creator}</span>
            <button
              type="button"
              className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-sm text-xs font-bold transition-colors"
            >
              Follow
            </button>
          </div>

          <p className="text-xs text-white/95 leading-relaxed line-clamp-2">
            {reel.caption}
          </p>

          <div className="flex items-center gap-2 text-[11px] text-white/80">
            <span className="material-symbols-outlined text-[14px] text-tertiary-fixed animate-spin" style={{ animationDuration: '4s' }}>
              graphic_eq
            </span>
            <span className="truncate">{reel.audio}</span>
          </div>
        </div>

        {/* Navigation Arrows for reels */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center shadow-lg"
            >
              <span className="material-symbols-outlined text-[20px]">keyboard_arrow_up</span>
            </button>
          )}
          {currentIndex < REELS_DATA.length - 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center shadow-lg"
            >
              <span className="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
