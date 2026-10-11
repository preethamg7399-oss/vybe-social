import React from 'react';
import { User, NavScreen } from '../types';
import { BRAND_LOGO_URL } from '../data/mockData';

interface HeaderProps {
  currentUser: User;
  onNavigate: (screen: NavScreen) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  unreadNotificationsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onNavigate,
  searchQuery,
  onSearchChange,
  unreadNotificationsCount,
}) => {
  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-4 md:px-8 border-b border-outline-variant/20">
      {/* Brand Title Area */}
      <div className="flex items-center gap-3">
        <img
          alt="VYBE Brand Logo"
          className="h-8 w-auto object-contain cursor-pointer"
          src={BRAND_LOGO_URL}
          onClick={() => onNavigate('home')}
          referrerPolicy="no-referrer"
        />
        <span
          onClick={() => onNavigate('home')}
          className="text-lg md:text-xl font-bold tracking-tight text-on-surface cursor-pointer"
        >
          VYBE Feed
        </span>
      </div>

      {/* Right Controls Area */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Search Field */}
        <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-xl focus-within:ring-2 focus-within:ring-primary-container focus-within:bg-surface-container transition-all">
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            className="bg-transparent text-on-surface placeholder:text-on-surface-variant focus:outline-none text-xs md:text-sm w-32 sm:w-48 lg:w-64"
            placeholder="Search VYBE..."
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="text-on-surface-variant hover:text-on-surface text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Notifications Icon Button */}
        <button
          className="relative p-2 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          type="button"
          onClick={() => onNavigate('notifications')}
          aria-label="View notifications"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary ring-2 ring-surface"></span>
          )}
        </button>

        {/* User Avatar */}
        <button
          type="button"
          onClick={() => onNavigate('profile')}
          className="focus:outline-none cursor-pointer"
        >
          <img
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant hover:ring-2 hover:ring-primary-container transition-all"
            src={currentUser.avatar}
            referrerPolicy="no-referrer"
          />
        </button>
      </div>
    </header>
  );
};
