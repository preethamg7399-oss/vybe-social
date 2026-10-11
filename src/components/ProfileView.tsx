import React, { useState } from 'react';
import { User, Post } from '../types';

interface ProfileViewProps {
  currentUser: User;
  allPosts: Post[];
  onOpenCreate: () => void;
  onUpdateProfile: (updated: Partial<User>) => void;
}

const HIGHLIGHTS = [
  { id: 'h1', title: "Tokyo '25", img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqjFvlSRSsJC9DsedoTGIRlj_TKLRgqgMnK_VO2Osiu5zJw0Pg0rZ7EhVv7xDaG5tFvLMxhiDbE_P8xYzWe1DFS0oKvwSb-OY05z-Y70rhkzyRWvGblW8D5wD2jyAK172CbTlXm5vy0a6JNyKcMiuKAxkjpnZBW-leOPcSZh4EwI8Fz_aqcyenFOIm6BXlBpADxejSLHhoGhQ6dKL5G4Q-BT1XJNro8tEQHc5RYyYFMe02D9F2w_YCSg' },
  { id: 'h2', title: '35mm Film', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBepXSDesuAAoAxsp6UjiapKX2oKF25KtSGXsAU6SzCqM3_HWWl3hUEaWzTzdYh_QAUsP6PXvz6f6BYup1q_UKQocZSdLnni_ylYnlUVNyhurCW6QJxxkm2__fwVRG2QeIuJVA0TjiFsZZRRdwpWBfXEQd47fz2qKmxF6YWoMt8iUhV7E3SsCSSDxSfYI3AnNqk2po5M8rKwfhjjL4Ej5UrMP_V5qdwewji-bmVOwyIzMlpL2d0wgP1Rg' },
  { id: 'h3', title: 'Architecture', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6KeLdYzo98z7k41m8II-BMeRbtTp_tokys4NECHnSooGeE0CzWVsKcg8HmBx2PWXo6RrxBUPs5mv-75xH-sbpbQh8bFt0FH4rS-o_6dY_OFQXgE-Yc3238fp6Q2-HiutyxJgwUD6PNhumtwER6WKvPnnF6om9vm4bsxRNHI6_LUsR8l-5hjrljZq3erTOpGInseOTpMjOTaJu22M95v4khsWflmGHUbVErVse_5vd5r4g2hnQvguFbA' },
  { id: 'h4', title: 'Darkroom', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeC4jRZiSCZlrfb5hAkYKPHVWVJSm6uPMotAmPkeAYcF4q1U3j0uyFCHEqzDhttSw-rfErdq7UW02u6XthZSDZ38UxOKBoLPxUNLiR9cJ8oMt61eM2s1ff7lzqjf3zhbUj6lZT_esOlS_bZHmVtjo45aVlKOupRop6WmlEFUlKQoSl8NNlCSXb0nAcwSpjK_4CXtnpRSye2FNy-nCkl8mzW9sZTvd0DkmKUBlwGymf17Kpf-dgPTDkQA' },
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  allPosts,
  onOpenCreate,
  onUpdateProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser.name);
  const [editBio, setEditBio] = useState(currentUser.bio || '');

  // Bookmarked posts
  const bookmarkedPosts = allPosts.filter((p) => p.isBookmarked);
  // User posts (or sample posts)
  const userPosts = allPosts;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name: editName, bio: editBio });
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-[940px] mx-auto py-6 flex flex-col gap-8">
      {/* Profile Header Details */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 pb-6 border-b border-outline-variant/20">
        {/* Avatar */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-primary-container to-secondary-container shrink-0">
          <img
            alt={currentUser.name}
            className="w-full h-full rounded-full object-cover bg-white ring-4 ring-white"
            src={currentUser.avatar}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left gap-3.5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-on-surface">
              {currentUser.username}
            </h1>
            {currentUser.verified && (
              <span
                className="material-symbols-outlined text-primary-container text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors cursor-pointer"
            >
              Edit profile
            </button>
            <button
              type="button"
              onClick={onOpenCreate}
              className="px-4 py-1.5 rounded-full bg-primary-container text-white text-xs font-bold hover:opacity-95 transition-opacity cursor-pointer shadow-sm"
            >
              + New Post
            </button>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-6 text-sm">
            <span>
              <strong className="text-on-surface font-bold">
                {currentUser.postsCount || allPosts.length}
              </strong>{' '}
              <span className="text-on-surface-variant">posts</span>
            </span>
            <span>
              <strong className="text-on-surface font-bold">
                {currentUser.followersCount?.toLocaleString() || '14.8K'}
              </strong>{' '}
              <span className="text-on-surface-variant">followers</span>
            </span>
            <span>
              <strong className="text-on-surface font-bold">
                {currentUser.followingCount || '384'}
              </strong>{' '}
              <span className="text-on-surface-variant">following</span>
            </span>
          </div>

          {/* Bio prose */}
          <div className="text-xs sm:text-sm text-on-surface max-w-lg leading-relaxed">
            <span className="font-bold block text-sm">{currentUser.name}</span>
            <p className="text-on-surface-variant mt-1">{currentUser.bio}</p>
            {currentUser.location && (
              <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-1">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                {currentUser.location}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Story Highlights Bar */}
      <div className="flex items-center gap-5 overflow-x-auto no-scrollbar py-2">
        {HIGHLIGHTS.map((h) => (
          <div key={h.id} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
            <div className="w-16 h-16 rounded-full p-[2px] bg-surface-container-highest group-hover:bg-primary-container transition-colors">
              <img
                alt={h.title}
                className="w-full h-full rounded-full object-cover ring-2 ring-white"
                src={h.img}
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-[11px] font-medium text-on-surface truncate w-16 text-center">
              {h.title}
            </span>
          </div>
        ))}
      </div>

      {/* Tabs Row */}
      <div className="flex items-center justify-center border-t border-outline-variant/20 pt-1">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-2 py-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-t-2 -mt-[5px] ${
              activeTab === 'posts'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">grid_on</span>
            Posts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 py-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-t-2 -mt-[5px] ${
              activeTab === 'saved'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">bookmark</span>
            Saved ({bookmarkedPosts.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tagged')}
            className={`flex items-center gap-2 py-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-t-2 -mt-[5px] ${
              activeTab === 'tagged'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">account_box</span>
            Tagged
          </button>
        </div>
      </div>

      {/* Posts Grid View */}
      {activeTab === 'saved' ? (
        bookmarkedPosts.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[40px] text-primary/50">bookmark</span>
            <span className="font-bold text-sm text-on-surface">No saved posts yet</span>
            <span className="text-xs">Tap the bookmark icon on any post in the feed to save it here.</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
            {bookmarkedPosts.map((post) => (
              <div
                key={post.id}
                className="relative aspect-square rounded-2xl overflow-hidden bg-surface-container group cursor-pointer border border-outline-variant/20"
              >
                <img
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={post.images[0]}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-sm">
                  <span>❤️ {post.likesCount}</span>
                  <span>💬 {post.commentsCount}</span>
                </div>
              </div>
            ))}
          </div>
        )
      ) : activeTab === 'tagged' ? (
        <div className="py-16 text-center flex flex-col items-center gap-2 text-on-surface-variant">
          <span className="material-symbols-outlined text-[40px] text-primary/50">sell</span>
          <span className="font-bold text-sm text-on-surface">Photos of you</span>
          <span className="text-xs">When creators tag you in photos, they will appear here.</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
          {userPosts.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square rounded-2xl overflow-hidden bg-surface-container group cursor-pointer border border-outline-variant/20"
            >
              <img
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={post.images[0]}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-sm">
                <span>❤️ {post.likesCount}</span>
                <span>💬 {post.commentsCount}</span>
              </div>
              {post.type === 'carousel' && (
                <div className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white">
                  <span className="material-symbols-outlined text-[16px]">collections</span>
                </div>
              )}
              {post.type === 'reel' && (
                <div className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white">
                  <span className="material-symbols-outlined text-[16px]">movie</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setIsEditing(false)} />
          <form
            onSubmit={handleSaveProfile}
            className="relative z-10 w-full max-w-md bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <span className="text-base font-bold text-on-surface">Edit Profile</span>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-on-surface">Display Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="bg-surface-container-low px-3 py-2 rounded-xl text-xs text-on-surface border border-outline-variant/20 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-on-surface">Bio</label>
              <textarea
                rows={3}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="bg-surface-container-low p-3 rounded-xl text-xs text-on-surface border border-outline-variant/20 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-full text-xs font-bold text-on-surface-variant hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-primary-container text-white text-xs font-bold shadow-sm hover:opacity-90 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
