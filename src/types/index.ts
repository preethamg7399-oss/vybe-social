export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  verified?: boolean;
  isFollowing?: boolean;
  bio?: string;
  location?: string;
  followersCount?: number;
  followingCount?: number;
  postsCount?: number;
}

export interface Comment {
  id: string;
  username: string;
  userAvatar?: string;
  text: string;
  timestamp: string;
  likesCount?: number;
  isLiked?: boolean;
  isPinned?: boolean;
}

export interface Post {
  id: string;
  author: User;
  location?: string;
  cameraTag?: string;
  timestamp: string;
  type: 'image' | 'carousel' | 'reel';
  images: string[];
  currentSlide?: number;
  videoPoster?: string;
  reelViews?: string;
  audioTrack?: string;
  likesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  caption: string;
  hashtags: string[];
  pinnedComment?: Comment;
  comments: Comment[];
  commentsCount: number;
  likersSample?: { initials: string; bgClass: string; textClass: string }[];
}

export interface Story {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  isLive?: boolean;
  hasUnseen?: boolean;
  slides: {
    id: string;
    mediaUrl: string;
    caption?: string;
    timestamp: string;
    tag?: string;
  }[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  mediaUrl?: string;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  online?: boolean;
  messages: Message[];
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'live';
  user: User;
  text: string;
  timestamp: string;
  targetMedia?: string;
  isRead: boolean;
}

export type NavScreen = 'home' | 'search' | 'explore' | 'reels' | 'messages' | 'notifications' | 'profile' | 'settings';
