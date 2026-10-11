import React, { useState } from 'react';
import { User, Post } from '../types';

interface CreatePostModalProps {
  currentUser: User;
  onClose: () => void;
  onCreatePost: (newPost: Post) => void;
}

const PRESET_IMAGES = [
  {
    name: 'Coastal Horizon',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBepXSDesuAAoAxsp6UjiapKX2oKF25KtSGXsAU6SzCqM3_HWWl3hUEaWzTzdYh_QAUsP6PXvz6f6BYup1q_UKQocZSdLnni_ylYnlUVNyhurCW6QJxxkm2__fwVRG2QeIuJVA0TjiFsZZRRdwpWBfXEQd47fz2qKmxF6YWoMt8iUhV7E3SsCSSDxSfYI3AnNqk2po5M8rKwfhjjL4Ej5UrMP_V5qdwewji-bmVOwyIzMlpL2d0wgP1Rg',
    camera: 'Contax G2 • 35mm',
    location: 'Pacific Coast Ridge, CA',
  },
  {
    name: 'Minimal Architecture',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6KeLdYzo98z7k41m8II-BMeRbtTp_tokys4NECHnSooGeE0CzWVsKcg8HmBx2PWXo6RrxBUPs5mv-75xH-sbpbQh8bFt0FH4rS-o_6dY_OFQXgE-Yc3238fp6Q2-HiutyxJgwUD6PNhumtwER6WKvPnnF6om9vm4bsxRNHI6_LUsR8l-5hjrljZq3erTOpGInseOTpMjOTaJu22M95v4khsWflmGHUbVErVse_5vd5r4g2hnQvguFbA',
    camera: 'Leica SL2 • 28mm',
    location: 'Copenhagen Design Loft',
  },
  {
    name: 'Shibuya Rain Glow',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqjFvlSRSsJC9DsedoTGIRlj_TKLRgqgMnK_VO2Osiu5zJw0Pg0rZ7EhVv7xDaG5tFvLMxhiDbE_P8xYzWe1DFS0oKvwSb-OY05z-Y70rhkzyRWvGblW8D5wD2jyAK172CbTlXm5vy0a6JNyKcMiuKAxkjpnZBW-leOPcSZh4EwI8Fz_aqcyenFOIm6BXlBpADxejSLHhoGhQ6dKL5G4Q-BT1XJNro8tEQHc5RYyYFMe02D9F2w_YCSg',
    camera: 'Fujifilm X-Pro3 • 23mm',
    location: 'Shibuya Crossing, Tokyo',
  },
];

const FILTERS = [
  { id: 'normal', name: 'Normal', css: '' },
  { id: 'warm', name: 'Contax Warm', css: 'sepia(25%) saturate(130%) contrast(105%)' },
  { id: 'grain', name: 'Analog Grain', css: 'contrast(115%) brightness(95%) saturate(110%)' },
  { id: 'neon', name: 'Tokyo Neon', css: 'hue-rotate(15deg) contrast(120%) saturate(140%)' },
  { id: 'noir', name: 'Muted Nordic', css: 'saturate(70%) contrast(110%) brightness(102%)' },
];

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  currentUser,
  onClose,
  onCreatePost,
}) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState(PRESET_IMAGES[0].url);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState(PRESET_IMAGES[0].location);
  const [cameraTag, setCameraTag] = useState(PRESET_IMAGES[0].camera);
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
  const [customTagInput, setCustomTagInput] = useState('#editorial #visuals');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (preset: typeof PRESET_IMAGES[0]) => {
    setSelectedImageUrl(preset.url);
    setLocation(preset.location);
    setCameraTag(preset.camera);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImageUrl) return;

    const hashtags = customTagInput
      .split(' ')
      .map((t) => t.trim())
      .filter((t) => t.startsWith('#'));

    const newPost: Post = {
      id: `post_${Date.now()}`,
      author: currentUser,
      location: location || undefined,
      cameraTag: cameraTag || undefined,
      timestamp: 'Just now',
      type: 'image',
      images: [selectedImageUrl],
      likesCount: 1,
      isLiked: true,
      isBookmarked: false,
      caption: caption || 'Fresh frame from the studio.',
      hashtags: hashtags.length > 0 ? hashtags : ['#VYBE', '#Editorial'],
      commentsCount: 0,
      comments: [],
    };

    onCreatePost(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">
              add_photo_alternate
            </span>
            <span className="text-base font-bold text-on-surface">Create New Post</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 no-scrollbar">
          {/* Image Preview & Preset Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* Image Preview Area */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/20 group">
              <img
                alt="Selected post preview"
                className="w-full h-full object-cover transition-all"
                style={{ filter: selectedFilter.css }}
                src={selectedImageUrl}
                referrerPolicy="no-referrer"
              />
              {cameraTag && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">photo_camera</span>
                  {cameraTag}
                </div>
              )}
            </div>

            {/* Controls & Options */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2 block">
                  Select Visual Asset
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageUrl === preset.url
                          ? 'border-primary ring-2 ring-primary/20 scale-[1.02]'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        alt={preset.name}
                        className="w-full h-full object-cover"
                        src={preset.url}
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
                <div className="mt-2.5">
                  <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface cursor-pointer transition-colors border border-outline-variant/20">
                    <span className="material-symbols-outlined text-[18px]">upload</span>
                    <span>Upload your own photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Aesthetic Filter Chips */}
              <div>
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2 block">
                  Aesthetic Filter
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {FILTERS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFilter(f)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        selectedFilter.id === f.id
                          ? 'bg-primary-container text-white shadow-sm'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Caption Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Caption
            </label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write an editorial caption, story, or reflection..."
              className="w-full bg-surface-container-low p-3 rounded-2xl text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary-container border border-outline-variant/20 resize-none"
            />
          </div>

          {/* Location & Camera Tag Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-on-surface">Location</label>
              <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/20">
                <span className="material-symbols-outlined text-secondary text-[18px]">
                  location_on
                </span>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. San Francisco, CA"
                  className="w-full bg-transparent text-xs text-on-surface focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-on-surface">Camera / Lens Gear</label>
              <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/20">
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                  photo_camera
                </span>
                <input
                  type="text"
                  value={cameraTag}
                  onChange={(e) => setCameraTag(e.target.value)}
                  placeholder="e.g. Leica M6 • 35mm"
                  className="w-full bg-transparent text-xs text-on-surface focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Hashtags Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-on-surface">Hashtags</label>
            <input
              type="text"
              value={customTagInput}
              onChange={(e) => setCustomTagInput(e.target.value)}
              placeholder="#35mmfilm #GoldenHour #analog"
              className="w-full bg-surface-container-low px-3 py-2 rounded-xl text-xs text-on-surface border border-outline-variant/20 focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-gradient-to-tr from-primary-container to-secondary-container text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Publish to VYBE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
