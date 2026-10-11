/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavScreen, User, Post, Story } from './types';
import {
  CURRENT_USER,
  INITIAL_POSTS,
  INITIAL_STORIES,
  SUGGESTED_USERS,
  INITIAL_CONVERSATIONS,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StoriesTray } from './components/StoriesTray';
import { PostCard } from './components/PostCard';
import { RightSidebar } from './components/RightSidebar';
import { StoryModal } from './components/StoryModal';
import { CreatePostModal } from './components/CreatePostModal';
import { ExploreView } from './components/ExploreView';
import { ReelsView } from './components/ReelsView';
import { MessagesView } from './components/MessagesView';
import { NotificationsView } from './components/NotificationsView';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<NavScreen>('home');
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>(SUGGESTED_USERS);
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [activeStoryModal, setActiveStoryModal] = useState<Story | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSwitchUserModalOpen, setIsSwitchUserModalOpen] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Calculations
  const unreadMessagesCount = conversations.reduce(
    (acc, curr) => acc + curr.unreadCount,
    0
  );
  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  // Like toggler
  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextLiked = !p.isLiked;
          return {
            ...p,
            isLiked: nextLiked,
            likesCount: nextLiked ? p.likesCount + 1 : p.likesCount - 1,
          };
        }
        return p;
      })
    );
  };

  // Bookmark toggler
  const handleToggleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, isBookmarked: !p.isBookmarked } : p
      )
    );
  };

  // Follow author/suggested user toggler
  const handleToggleFollow = (userId: string) => {
    setSuggestedUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u
      )
    );
    setPosts((prev) =>
      prev.map((p) =>
        p.author.id === userId
          ? {
              ...p,
              author: { ...p.author, isFollowing: !p.author.isFollowing },
            }
          : p
      )
    );
  };

  // Add Comment
  const handleAddComment = (postId: string, commentText: string) => {
    const newComment = {
      id: `comm_${Date.now()}`,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      text: commentText,
      timestamp: 'Just now',
      likesCount: 0,
      isLiked: false,
    };

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [newComment, ...p.comments],
              commentsCount: p.commentsCount + 1,
            }
          : p
      )
    );
  };

  // Create Post
  const handleCreatePost = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
    setCurrentUser((prev) => ({
      ...prev,
      postsCount: (prev.postsCount || 0) + 1,
    }));
    // Add Notification
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        type: 'like',
        user: currentUser,
        text: 'Your post was successfully published to VYBE feed!',
        timestamp: 'Just now',
        targetMedia: newPost.images[0],
        isRead: false,
      },
      ...prev,
    ]);
  };

  // Send Direct Message
  const handleSendMessage = (convId: string, text: string) => {
    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isRead: true,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? {
              ...c,
              lastMessage: text,
              timestamp: 'Just now',
              messages: [...c.messages, newMsg],
            }
          : c
      )
    );
  };

  // Story Reply handler
  const handleStoryReply = (storyUsername: string, text: string) => {
    const targetConv = conversations.find(
      (c) => c.user.username === storyUsername
    );
    if (targetConv) {
      handleSendMessage(targetConv.id, text);
    }
  };

  // Filter posts by search query if any
  const filteredPosts = searchQuery.trim()
    ? posts.filter((p) => {
        const query = searchQuery.toLowerCase();
        return (
          p.author.username.toLowerCase().includes(query) ||
          p.caption.toLowerCase().includes(query) ||
          (p.location && p.location.toLowerCase().includes(query)) ||
          p.hashtags.some((h) => h.toLowerCase().includes(query))
        );
      })
    : posts;

  // Infinite Scroll Trigger
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      // Append a curated post
      const morePost: Post = {
        id: `post_infinite_${Date.now()}`,
        author: {
          id: 'user_devon',
          username: 'devon.art',
          name: 'Devon Moreau',
          avatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAJl8q7ggjoOCeqq6cgRd1ck_cT1eYpFBoBldEAXDUHo3DhXierGE39jujHr04mKi0MHxIkrubFPLlwkUGX-n3CXmBQwESdyHB8hTuLEQyp1HKToDCxwEgDln6AOPDnxdw5ySIyniZuSyVNKlsbMHa-QkfyOammPNF7bjJX74dnIv_i02Sm5l96xbR_IUf4RT1aeyj4R6F6kx1O8I_XxWZLfXeUcS4YSFiuzNd5g4ocnpmpFiRXTXGXnw',
          verified: false,
        },
        location: 'Atelier Berlin, Germany',
        cameraTag: 'Hasselblad 500C',
        timestamp: '14h',
        type: 'image',
        images: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAJl8q7ggjoOCeqq6cgRd1ck_cT1eYpFBoBldEAXDUHo3DhXierGE39jujHr04mKi0MHxIkrubFPLlwkUGX-n3CXmBQwESdyHB8hTuLEQyp1HKToDCxwEgDln6AOPDnxdw5ySIyniZuSyVNKlsbMHa-QkfyOammPNF7bjJX74dnIv_i02Sm5l96xbR_IUf4RT1aeyj4R6F6kx1O8I_XxWZLfXeUcS4YSFiuzNd5g4ocnpmpFiRXTXGXnw',
        ],
        likesCount: 3120,
        isLiked: false,
        isBookmarked: false,
        caption:
          'Morning daylight cutting across raw canvas. The silence of the studio before painting starts.',
        hashtags: ['#atelier', '#berlin', '#fineart', '#minimalism'],
        commentsCount: 42,
        comments: [],
      };
      setPosts((prev) => [...prev, morePost]);
      setIsLoadingMore(false);
    }, 800);
  };

  // Switch persona
  const PERSONAS: User[] = [
    CURRENT_USER,
    {
      id: 'user_elena',
      username: 'elena.lens',
      name: 'Elena Rostova',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAeC4jRZiSCZlrfb5hAkYKPHVWVJSm6uPMotAmPkeAYcF4q1U3j0uyFCHEqzDhttSw-rfErdq7UW02u6XthZSDZ38UxOKBoLPxUNLiR9cJ8oMt61eM2s1ff7lzqjf3zhbUj6lZT_esOlS_bZHmVtjo45aVlKOupRop6WmlEFUlKQoSl8NNlCSXb0nAcwSpjK_4CXtnpRSye2FNy-nCkl8mzW9sZTvd0DkmKUBlwGymf17Kpf-dgPTDkQA',
      verified: true,
      bio: 'Film photographer wandering San Francisco and the Pacific Coast.',
      location: 'San Francisco, CA',
      followersCount: 22400,
      followingCount: 512,
      postsCount: 154,
    },
    {
      id: 'user_sora',
      username: 'sora.tokyo',
      name: 'Sora Takahashi',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD7nzOpccOUECQD3aU4UQ4b3MpnND8reaShDwHPcjdb50JkQUXpz95ePLwCnmh1Q4AtJ9TjZDU8IVlQTw6dyp8nf2J7wP_6fN-B9Y4j_x4JsYjpTCk9iDK9qC4Fl1ELrM4p604CHoAhl5zeA8ow5LJso_J1JbLBkmC9Ryj3tSVFuZmkMo828m1EF_SvRf8vSs8q4wPAoXKeTFGptNVmWffwU96nSQ8LQXjgRRdOT8mo5GGAE9AIbKvHOQ',
      verified: true,
      bio: 'Tokyo nocturnal visualist & director. Rain, neon, analog synths.',
      location: 'Shibuya, Tokyo',
      followersCount: 48900,
      followingCount: 320,
      postsCount: 88,
    },
  ];

  return (
    <div className="bg-background min-h-screen text-on-surface antialiased font-sans selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Fixed Desktop Navigation Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        unreadMessagesCount={unreadMessagesCount}
        unreadNotificationsCount={unreadNotificationsCount}
      />

      {/* Main App Layout */}
      <div className="md:pl-64 min-h-screen flex flex-col bg-background pb-16 md:pb-0">
        {/* Sticky Header */}
        <Header
          currentUser={currentUser}
          onNavigate={(screen) => setCurrentScreen(screen)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          unreadNotificationsCount={unreadNotificationsCount}
        />

        {/* Content Container */}
        <main className="relative w-full pt-16 flex-1 max-w-[1240px] mx-auto px-4 md:px-6 lg:px-8">
          {/* SEARCH ACTIVE NOTICE */}
          {searchQuery && (
            <div className="max-w-[1040px] mx-auto mt-4 p-3 bg-surface-container-lowest rounded-xl flex items-center justify-between border border-outline-variant/20 shadow-xs">
              <span className="text-xs text-on-surface">
                Showing results for &ldquo;<strong>{searchQuery}</strong>&rdquo; ({filteredPosts.length} posts found)
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-primary font-bold hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* SCREEN ROUTING */}
          {currentScreen === 'home' && (
            <div className="w-full max-w-[1040px] mx-auto py-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* CENTER MAIN FEED COLUMN (Matching mockup max-w-[630px]) */}
              <section className="lg:col-span-7 flex flex-col gap-6 w-full max-w-[630px] mx-auto">
                {/* STORIES TRAY */}
                <StoriesTray
                  stories={stories}
                  onSelectStory={(story) => setActiveStoryModal(story)}
                  onAddStory={() => setIsCreateModalOpen(true)}
                />

                {/* POSTS LIST */}
                {filteredPosts.length === 0 ? (
                  <div className="p-12 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/20 flex flex-col items-center gap-3">
                    <span className="material-symbols-outlined text-[44px] text-primary/40">
                      sentiment_dissatisfied
                    </span>
                    <h3 className="font-bold text-base text-on-surface">No posts found</h3>
                    <p className="text-xs text-on-surface-variant max-w-xs">
                      Try searching for a different creator, location, or hashtag like #35mmfilm.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 rounded-full bg-primary-container text-white text-xs font-bold mt-2"
                    >
                      Reset Filter
                    </button>
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onToggleLike={handleToggleLike}
                      onToggleBookmark={handleToggleBookmark}
                      onToggleFollowAuthor={handleToggleFollow}
                      onAddComment={handleAddComment}
                      onSelectHashtag={(tag) => setSearchQuery(tag)}
                    />
                  ))
                )}

                {/* INFINITE SCROLL SKELETON / LOADING INDICATOR */}
                <div className="flex flex-col items-center justify-center py-8 gap-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full bg-primary-container animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <div
                      className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <div
                      className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="text-xs text-on-surface-variant tracking-wider uppercase font-semibold hover:text-primary transition-colors cursor-pointer"
                  >
                    {isLoadingMore ? 'Loading vibes...' : 'Catching fresh vibes... (Click to load more)'}
                  </button>
                </div>
              </section>

              {/* RIGHT STICKY SIDEBAR (Matching mockup) */}
              <RightSidebar
                currentUser={currentUser}
                suggestedUsers={suggestedUsers}
                onToggleFollow={handleToggleFollow}
                onSelectTag={(tag) => setSearchQuery(tag)}
                onSwitchUser={() => setIsSwitchUserModalOpen(true)}
                onNavigateToProfile={() => setCurrentScreen('profile')}
              />
            </div>
          )}

          {currentScreen === 'search' && (
            <ExploreView
              onSelectHashtag={(tag) => {
                setSearchQuery(tag);
                setCurrentScreen('home');
              }}
              onOpenCreate={() => setIsCreateModalOpen(true)}
            />
          )}

          {currentScreen === 'explore' && (
            <ExploreView
              onSelectHashtag={(tag) => {
                setSearchQuery(tag);
                setCurrentScreen('home');
              }}
              onOpenCreate={() => setIsCreateModalOpen(true)}
            />
          )}

          {currentScreen === 'reels' && <ReelsView />}

          {currentScreen === 'messages' && (
            <MessagesView
              conversations={conversations}
              onSendMessage={handleSendMessage}
            />
          )}

          {currentScreen === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              onMarkAllRead={() =>
                setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
              }
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileView
              currentUser={currentUser}
              allPosts={posts}
              onOpenCreate={() => setIsCreateModalOpen(true)}
              onUpdateProfile={(updated) =>
                setCurrentUser((prev) => ({ ...prev, ...updated }))
              }
            />
          )}

          {currentScreen === 'settings' && (
            <SettingsView
              currentUser={currentUser}
              onSwitchUser={() => setIsSwitchUserModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* STORY VIEWER MODAL */}
      {activeStoryModal && (
        <StoryModal
          story={activeStoryModal}
          onClose={() => setActiveStoryModal(null)}
          onNextStory={() => {
            const curIdx = stories.findIndex((s) => s.id === activeStoryModal.id);
            if (curIdx < stories.length - 1) {
              setActiveStoryModal(stories[curIdx + 1]);
            } else {
              setActiveStoryModal(null);
            }
          }}
          onPrevStory={() => {
            const curIdx = stories.findIndex((s) => s.id === activeStoryModal.id);
            if (curIdx > 0) {
              setActiveStoryModal(stories[curIdx - 1]);
            }
          }}
          onSendReply={handleStoryReply}
        />
      )}

      {/* CREATE POST MODAL */}
      {isCreateModalOpen && (
        <CreatePostModal
          currentUser={currentUser}
          onClose={() => setIsCreateModalOpen(false)}
          onCreatePost={handleCreatePost}
        />
      )}

      {/* SWITCH USER MODAL */}
      {isSwitchUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="absolute inset-0"
            onClick={() => setIsSwitchUserModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-sm bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <span className="text-base font-bold text-on-surface">Switch Account</span>
              <button
                type="button"
                onClick={() => setIsSwitchUserModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {PERSONAS.map((persona) => (
                <div
                  key={persona.id}
                  onClick={() => {
                    setCurrentUser(persona);
                    setIsSwitchUserModalOpen(false);
                  }}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-colors border ${
                    currentUser.id === persona.id
                      ? 'border-primary bg-primary/5'
                      : 'border-outline-variant/20 hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      alt={persona.name}
                      className="w-10 h-10 rounded-full object-cover"
                      src={persona.avatar}
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col text-xs">
                      <span className="font-bold text-on-surface">{persona.name}</span>
                      <span className="text-on-surface-variant">@{persona.username}</span>
                    </div>
                  </div>
                  {currentUser.id === persona.id && (
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      check_circle
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
