import React from 'react';
import { NavScreen, User } from '../types';
import { BRAND_LOGO_URL } from '../data/mockData';

interface SidebarProps {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  currentUser: User;
  onOpenCreateModal: () => void;
  unreadMessagesCount: number;
  unreadNotificationsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  currentUser,
  onOpenCreateModal,
  unreadMessagesCount,
  unreadNotificationsCount,
}) => {
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex-col justify-between py-4 px-4 select-none border-r border-outline-variant/30">
        <div className="flex flex-col gap-4">
          {/* Logo Header */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 px-2 py-1 cursor-pointer transition-transform hover:opacity-90"
          >
            <img
              alt="VYBE Brand Logo"
              className="h-8 w-auto object-contain"
              src={BRAND_LOGO_URL}
              referrerPolicy="no-referrer"
            />
            <span className="text-xl font-bold tracking-tight text-on-surface">
              VYBE
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {/* Home */}
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-200 group text-left w-full ${
                currentScreen === 'home'
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_4px_20px_-2px_rgba(124,58,237,0.25)]'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium'
              }`}
            >
              <span className={`material-symbols-outlined text-[24px] ${currentScreen === 'home' ? 'icon-filled' : ''}`}>
                home
              </span>
              <span>Home</span>
            </button>

            {/* Search */}
            <button
              type="button"
              onClick={() => onNavigate('search')}
              className={`flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-200 group text-left w-full ${
                currentScreen === 'search'
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_4px_20px_-2px_rgba(124,58,237,0.25)]'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">search</span>
              <span>Search</span>
            </button>

            {/* Explore */}
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className={`flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-200 group text-left w-full ${
                currentScreen === 'explore'
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_4px_20px_-2px_rgba(124,58,237,0.25)]'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium'
              }`}
            >
              <span className={`material-symbols-outlined text-[24px] ${currentScreen === 'explore' ? 'icon-filled' : ''}`}>
                explore
              </span>
              <span>Explore</span>
            </button>

            {/* Reels */}
            <button
              type="button"
              onClick={() => onNavigate('reels')}
              className={`flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-200 group text-left w-full ${
                currentScreen === 'reels'
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_4px_20px_-2px_rgba(124,58,237,0.25)]'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">movie</span>
              <span>Reels</span>
            </button>

            {/* Messages */}
            <button
              type="button"
              onClick={() => onNavigate('messages')}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group text-left w-full ${
                currentScreen === 'messages'
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_4px_20px_-2px_rgba(124,58,237,0.25)]'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`material-symbols-outlined text-[24px] ${currentScreen === 'messages' ? 'icon-filled' : ''}`}>
                  chat_bubble
                </span>
                <span>Messages</span>
              </div>
              {unreadMessagesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold leading-none">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            {/* Notifications */}
            <button
              type="button"
              onClick={() => onNavigate('notifications')}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group text-left w-full ${
                currentScreen === 'notifications'
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_4px_20px_-2px_rgba(124,58,237,0.25)]'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`material-symbols-outlined text-[24px] ${currentScreen === 'notifications' ? 'icon-filled' : ''}`}>
                  favorite
                </span>
                <span>Notifications</span>
              </div>
              {unreadNotificationsCount > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest"></span>
              )}
            </button>

            {/* Create Post Action Button */}
            <div className="my-2">
              <button
                type="button"
                onClick={onOpenCreateModal}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-tr from-primary-container to-secondary-container text-white font-bold text-sm shadow-[0_4px_20px_-2px_rgba(124,58,237,0.25)] hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span>Create Post</span>
              </button>
            </div>

            {/* Profile */}
            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className={`flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-200 group text-left w-full ${
                currentScreen === 'profile'
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_4px_20px_-2px_rgba(124,58,237,0.25)]'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <img
                  alt="Profile"
                  className="w-6 h-6 rounded-full object-cover ring-2 ring-primary-container ring-offset-2 ring-offset-surface-container-lowest"
                  src={currentUser.avatar}
                  referrerPolicy="no-referrer"
                />
              </div>
              <span>Profile</span>
            </button>

            {/* Settings */}
            <button
              type="button"
              onClick={() => onNavigate('settings')}
              className={`flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-200 group text-left w-full ${
                currentScreen === 'settings'
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-[0_4px_20px_-2px_rgba(124,58,237,0.25)]'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">settings</span>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Footer Area with Profile Snippet */}
        <div className="relative flex flex-col gap-1 pt-2 border-t border-outline-variant/20">
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-outline-variant/30"
                src={currentUser.avatar}
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-on-surface truncate">
                  {currentUser.name}
                </span>
                <span className="text-xs text-on-surface-variant truncate">
                  @{currentUser.username}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
              unfold_more
            </span>
          </div>

          {/* User Popover menu */}
          {showUserMenu && (
            <div className="absolute bottom-16 left-2 right-2 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl shadow-xl p-2 z-50 flex flex-col gap-1">
              <button
                type="button"
                onClick={() => {
                  onNavigate('profile');
                  setShowUserMenu(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container text-left"
              >
                <span className="material-symbols-outlined text-[18px]">account_circle</span>
                View profile
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('settings');
                  setShowUserMenu(false);
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container text-left"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                Account preferences
              </button>
              <div className="h-px bg-outline-variant/20 my-1" />
              <button
                type="button"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-secondary hover:bg-secondary-fixed/40 text-left"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Switch account
              </button>
            </div>
          )}

          <button
            onClick={() => onNavigate('settings')}
            className="flex items-center gap-4 px-4 py-2 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all duration-200 w-full text-left"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
            <span>More</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Bar Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-lg border-t border-outline-variant/30 z-50 flex items-center justify-around px-2">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={`p-2 flex flex-col items-center ${currentScreen === 'home' ? 'text-primary' : 'text-on-surface-variant'}`}
        >
          <span className={`material-symbols-outlined text-[24px] ${currentScreen === 'home' ? 'icon-filled' : ''}`}>home</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('explore')}
          className={`p-2 flex flex-col items-center ${currentScreen === 'explore' ? 'text-primary' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined text-[24px]">explore</span>
        </button>
        <button
          type="button"
          onClick={onOpenCreateModal}
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-container to-secondary-container text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[22px]">add</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('reels')}
          className={`p-2 flex flex-col items-center ${currentScreen === 'reels' ? 'text-primary' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined text-[24px]">movie</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('profile')}
          className="p-1.5 flex flex-col items-center"
        >
          <img
            alt="Profile"
            className={`w-6 h-6 rounded-full object-cover ${currentScreen === 'profile' ? 'ring-2 ring-primary-container' : ''}`}
            src={currentUser.avatar}
            referrerPolicy="no-referrer"
          />
        </button>
      </nav>
    </>
  );
};
