import React from 'react';
import { User } from '../types';
import { TRENDING_TAGS } from '../data/mockData';

interface RightSidebarProps {
  currentUser: User;
  suggestedUsers: User[];
  onToggleFollow: (userId: string) => void;
  onSelectTag: (tag: string) => void;
  onSwitchUser: () => void;
  onNavigateToProfile: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  currentUser,
  suggestedUsers,
  onToggleFollow,
  onSelectTag,
  onSwitchUser,
  onNavigateToProfile,
}) => {
  return (
    <aside className="hidden lg:flex lg:col-span-5 flex-col gap-6 sticky top-20 self-start w-full max-w-[340px]">
      {/* Current User Mini Card */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/20 flex items-center justify-between">
        <div
          onClick={onNavigateToProfile}
          className="flex items-center gap-3 min-w-0 cursor-pointer group"
        >
          <div className="relative w-12 h-12 rounded-full ring-2 ring-primary-container/20 p-0.5 shrink-0 group-hover:ring-primary-container transition-all">
            <img
              alt={currentUser.name}
              className="w-full h-full rounded-full object-cover"
              src={currentUser.avatar}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">
              {currentUser.username}
            </span>
            <span className="text-xs text-on-surface-variant truncate">
              {currentUser.name}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onSwitchUser}
          className="text-xs font-bold text-primary hover:text-primary-container transition-colors shrink-0 cursor-pointer"
        >
          Switch
        </button>
      </div>

      {/* Suggested For You Card */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-on-surface">Suggested for you</span>
          <button
            type="button"
            className="text-xs font-semibold text-primary hover:underline cursor-pointer"
          >
            See All
          </button>
        </div>

        <div className="flex flex-col gap-3.5">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-outline-variant/20"
                  src={user.avatar}
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-on-surface truncate hover:underline cursor-pointer">
                    {user.username}
                  </span>
                  <span className="text-[11px] text-on-surface-variant truncate">
                    {user.bio}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onToggleFollow(user.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer ${
                  user.isFollowing
                    ? 'bg-surface-container-high text-on-surface font-semibold'
                    : 'bg-surface-container hover:bg-primary-container hover:text-white text-primary'
                }`}
              >
                {user.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending On VYBE Card */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-secondary text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span className="text-sm font-bold text-on-surface">Trending on VYBE</span>
          </div>
          <span className="text-[10px] text-on-surface-variant uppercase font-semibold">
            Today
          </span>
        </div>

        <div className="flex flex-col gap-1">
          {TRENDING_TAGS.map((item) => (
            <button
              key={item.tag}
              type="button"
              onClick={() => onSelectTag(item.tag)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container transition-colors group text-left cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                  {item.tag}
                </span>
                <span className="text-[11px] text-on-surface-variant">{item.count}</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px] group-hover:translate-x-0.5 group-hover:text-primary transition-all">
                arrow_forward
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <footer className="px-2 flex flex-col gap-1 text-on-surface-variant text-[11px] leading-relaxed">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <a className="hover:underline" href="#about">About</a>•
          <a className="hover:underline" href="#help">Help</a>•
          <a className="hover:underline" href="#press">Press</a>•
          <a className="hover:underline" href="#api">API</a>•
          <a className="hover:underline" href="#jobs">Jobs</a>•
          <a className="hover:underline" href="#privacy">Privacy</a>•
          <a className="hover:underline" href="#terms">Terms</a>•
          <a className="hover:underline" href="#locations">Locations</a>•
          <a className="hover:underline" href="#language">Language</a>
        </div>
        <div className="text-on-surface-variant/70 font-semibold mt-1">
          © 2025 VYBE FROM STITCH
        </div>
      </footer>
    </aside>
  );
};
