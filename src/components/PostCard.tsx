import React, { useState } from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onToggleLike: (postId: string) => void;
  onToggleBookmark: (postId: string) => void;
  onToggleFollowAuthor?: (authorId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onSelectHashtag?: (hashtag: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onToggleLike,
  onToggleBookmark,
  onToggleFollowAuthor,
  onAddComment,
  onSelectHashtag,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(post.currentSlide || 0);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [pinnedLiked, setPinnedLiked] = useState(post.pinnedComment?.isLiked || false);
  const [pinnedLikesCount, setPinnedLikesCount] = useState(post.pinnedComment?.likesCount || 0);
  const [showMenu, setShowMenu] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Double tap handler
  let lastTap = 0;
  const handleMediaTouch = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      // Double tap triggered
      if (!post.isLiked) {
        onToggleLike(post.id);
      }
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 900);
    }
    lastTap = now;
  };

  const handleMediaDoubleClick = () => {
    if (!post.isLiked) {
      onToggleLike(post.id);
    }
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 900);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(post.id, commentInput.trim());
    setCommentInput('');
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentSlideIndex < post.images.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const togglePinnedCommentLike = () => {
    setPinnedLiked(!pinnedLiked);
    setPinnedLikesCount(pinnedLiked ? pinnedLikesCount - 1 : pinnedLikesCount + 1);
  };

  const copyShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedNotification(true);
    setShowMenu(false);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <article className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/20 overflow-hidden transition-all duration-200">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-primary-container to-secondary-container shrink-0">
            <div className="w-full h-full rounded-full bg-surface-container-lowest p-[1.5px]">
              <img
                alt={post.author.username}
                className="w-full h-full rounded-full object-cover"
                src={post.author.avatar}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-bold text-on-surface leading-tight hover:underline cursor-pointer">
                {post.author.username}
              </span>
              {post.author.verified && (
                <span
                  className="material-symbols-outlined text-primary-container text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              )}
              <span className="text-xs text-on-surface-variant">• {post.timestamp}</span>
            </div>
            {post.location && (
              <span className="text-xs text-on-surface-variant flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[13px] text-secondary">
                  location_on
                </span>
                {post.location}
              </span>
            )}
          </div>
        </div>

        {/* Right side of header: Follow button (if not author) & More options */}
        <div className="relative flex items-center gap-2">
          {onToggleFollowAuthor && post.author.isFollowing !== undefined && (
            <button
              type="button"
              onClick={() => onToggleFollowAuthor(post.author.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                post.author.isFollowing
                  ? 'bg-surface-container-high text-on-surface'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
            >
              {post.author.isFollowing ? 'Following' : 'Follow'}
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
            aria-label="More options"
          >
            <span className="material-symbols-outlined text-[20px]">more_horiz</span>
          </button>

          {showMenu && (
            <div className="absolute right-0 top-10 w-44 bg-surface-container-lowest border border-outline-variant/40 rounded-xl shadow-lg p-1.5 z-30 flex flex-col gap-1">
              <button
                type="button"
                onClick={copyShareLink}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-container rounded-lg text-left"
              >
                <span className="material-symbols-outlined text-[16px]">link</span>
                Copy link
              </button>
              <button
                type="button"
                onClick={() => {
                  onToggleBookmark(post.id);
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-container rounded-lg text-left"
              >
                <span className="material-symbols-outlined text-[16px]">bookmark</span>
                {post.isBookmarked ? 'Remove bookmark' : 'Bookmark post'}
              </button>
              <button
                type="button"
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-secondary hover:bg-secondary-fixed/30 rounded-lg text-left"
              >
                <span className="material-symbols-outlined text-[16px]">report</span>
                Report content
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Media Section */}
      <div
        className={`relative w-full bg-surface-container overflow-hidden group select-none ${
          post.type === 'reel'
            ? 'aspect-[9/14] max-h-[520px]'
            : post.type === 'carousel'
            ? 'aspect-[4/3]'
            : 'aspect-[4/5]'
        }`}
        onClick={handleMediaTouch}
        onDoubleClick={handleMediaDoubleClick}
      >
        {/* Media display */}
        {post.type === 'carousel' ? (
          <img
            alt={post.caption}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
            src={post.images[currentSlideIndex] || post.images[0]}
            referrerPolicy="no-referrer"
          />
        ) : post.type === 'reel' ? (
          <div className="relative w-full h-full bg-inverse-surface">
            <img
              alt={post.caption}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isPlayingVideo ? 'scale-105 opacity-100' : 'opacity-90 group-hover:scale-105'
              }`}
              src={post.videoPoster || post.images[0]}
              referrerPolicy="no-referrer"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-transparent to-inverse-surface/40 pointer-events-none" />

            {/* Play Button Center Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlayingVideo(!isPlayingVideo);
                }}
                className="w-16 h-16 rounded-full bg-inverse-surface/50 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-primary-container/80 transition-all duration-300 shadow-xl cursor-pointer"
                aria-label={isPlayingVideo ? 'Pause reel' : 'Play reel'}
              >
                <span
                  className="material-symbols-outlined text-[36px] ml-1"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {isPlayingVideo ? 'pause' : 'play_arrow'}
                </span>
              </button>
            </div>

            {/* Top Video Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white pointer-events-none">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-inverse-surface/60 backdrop-blur-md text-xs">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed-dim">
                  movie
                </span>
                <span>Reel</span>
              </div>
              {post.reelViews && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-inverse-surface/60 backdrop-blur-md text-xs">
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span className="font-semibold">{post.reelViews}</span>
                </div>
              )}
            </div>

            {/* Bottom Audio Track Strip */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              {post.audioTrack && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-inverse-surface/70 backdrop-blur-md max-w-[80%]">
                  <span
                    className={`material-symbols-outlined text-[16px] text-tertiary-fixed ${
                      isPlayingVideo ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '4s' }}
                  >
                    graphic_eq
                  </span>
                  <span className="text-xs truncate font-medium">{post.audioTrack}</span>
                </div>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="w-8 h-8 rounded-full bg-inverse-surface/70 backdrop-blur-md flex items-center justify-center hover:bg-inverse-surface/90 transition-colors cursor-pointer text-white"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isMuted ? 'volume_off' : 'volume_up'}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <img
            alt={post.caption}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
            src={post.images[0]}
            referrerPolicy="no-referrer"
          />
        )}

        {/* Camera Tag Badge (for photography posts) */}
        {post.cameraTag && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-inverse-surface/60 backdrop-blur-md text-white flex items-center gap-1 text-xs pointer-events-none">
            <span className="material-symbols-outlined text-[14px]">photo_camera</span>
            <span>{post.cameraTag}</span>
          </div>
        )}

        {/* Carousel Slide Counter & Controls */}
        {post.type === 'carousel' && post.images.length > 1 && (
          <>
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-inverse-surface/75 backdrop-blur-md text-white text-xs font-bold tracking-wider pointer-events-none">
              {currentSlideIndex + 1} / {post.images.length}
            </div>

            {/* Prev button */}
            {currentSlideIndex > 0 && (
              <button
                type="button"
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-inverse-surface/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-inverse-surface/85 cursor-pointer shadow-md"
                aria-label="Previous slide"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
            )}

            {/* Next button */}
            {currentSlideIndex < post.images.length - 1 && (
              <button
                type="button"
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-inverse-surface/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-inverse-surface/85 cursor-pointer shadow-md"
                aria-label="Next slide"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            )}

            {/* Carousel Indicator Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-inverse-surface/40 backdrop-blur-sm pointer-events-none">
              {post.images.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-200 ${
                    i === currentSlideIndex
                      ? 'w-2 h-2 bg-white'
                      : 'w-1.5 h-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Animated Double Tap Heart Burst */}
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            showHeartBurst ? 'opacity-100 scale-110' : 'opacity-0 scale-50'
          }`}
        >
          <span
            className="material-symbols-outlined text-secondary text-[84px] drop-shadow-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            favorite
          </span>
        </div>
      </div>

      {/* Post Actions & Interactions Bar */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Like Button */}
            <button
              type="button"
              onClick={() => onToggleLike(post.id)}
              className={`group/btn flex items-center gap-1 transition-transform active:scale-125 cursor-pointer ${
                post.isLiked ? 'text-secondary' : 'text-on-surface hover:text-secondary'
              }`}
              aria-label={post.isLiked ? 'Unlike' : 'Like'}
            >
              <span
                className="material-symbols-outlined text-[26px]"
                style={{ fontVariationSettings: post.isLiked ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>

            {/* Comment Button */}
            <button
              type="button"
              onClick={() => setShowAllComments(!showAllComments)}
              className="group/btn flex items-center gap-1 text-on-surface hover:text-primary transition-colors cursor-pointer"
              aria-label="Comment"
            >
              <span className="material-symbols-outlined text-[24px]">chat_bubble</span>
            </button>

            {/* Send / Share Button */}
            <button
              type="button"
              onClick={copyShareLink}
              className="group/btn flex items-center gap-1 text-on-surface hover:text-primary transition-colors cursor-pointer"
              aria-label="Share"
            >
              <span className="material-symbols-outlined text-[24px]">send</span>
            </button>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={() => onToggleBookmark(post.id)}
            className={`transition-colors cursor-pointer ${
              post.isBookmarked ? 'text-primary' : 'text-on-surface hover:text-primary'
            }`}
            aria-label={post.isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: post.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
          </button>
        </div>

        {/* Copy share toast notice */}
        {copiedNotification && (
          <div className="text-xs text-primary font-semibold py-0.5">
            Link copied to clipboard!
          </div>
        )}

        {/* Likes Count */}
        <div className="flex items-center gap-2 pt-1">
          {post.likersSample && post.likersSample.length > 0 && (
            <div className="flex -space-x-2 overflow-hidden items-center mr-1">
              {post.likersSample.map((liker, idx) => (
                <div
                  key={idx}
                  className={`w-5 h-5 rounded-full ${liker.bgClass} flex items-center justify-center text-[10px] font-bold ${liker.textClass} ring-1 ring-white`}
                >
                  {liker.initials}
                </div>
              ))}
            </div>
          )}
          <span className="text-sm font-bold text-on-surface">
            {post.likesCount.toLocaleString()} likes
          </span>
        </div>

        {/* Caption */}
        <div className="text-sm text-on-surface leading-relaxed">
          <span className="font-bold mr-1.5 hover:underline cursor-pointer">
            {post.author.username}
          </span>
          <span>{post.caption}</span>

          {/* Hashtags */}
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1 text-xs text-primary font-medium">
              {post.hashtags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => onSelectHashtag && onSelectHashtag(tag)}
                  className="hover:underline cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pinned Comment (if present, like for studio_arch) */}
        {post.pinnedComment && (
          <div className="mt-1 p-2 bg-surface-container-low rounded-xl flex items-start gap-2 border border-outline-variant/10">
            <span
              className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              push_pin
            </span>
            <div className="flex-1 text-xs">
              <span className="font-bold text-on-surface mr-1">
                {post.pinnedComment.username}
              </span>
              <span className="text-on-surface-variant">
                {post.pinnedComment.text}
              </span>
            </div>
            <button
              type="button"
              onClick={togglePinnedCommentLike}
              className={`transition-colors shrink-0 cursor-pointer ${
                pinnedLiked ? 'text-secondary' : 'text-on-surface-variant hover:text-secondary'
              }`}
            >
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: pinnedLiked ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>
          </div>
        )}

        {/* Comments Count Button */}
        <button
          type="button"
          onClick={() => setShowAllComments(!showAllComments)}
          className="text-left text-xs text-on-surface-variant hover:text-on-surface transition-colors mt-0.5 cursor-pointer font-medium"
        >
          {showAllComments
            ? 'Hide comments'
            : `View all ${post.commentsCount || post.comments.length} comments`}
        </button>

        {/* Expanded Comments List */}
        {showAllComments && post.comments.length > 0 && (
          <div className="flex flex-col gap-2 pt-1 border-t border-outline-variant/20 max-h-48 overflow-y-auto no-scrollbar">
            {post.comments.map((comm) => (
              <div key={comm.id} className="flex items-start justify-between gap-2 text-xs">
                <div className="flex items-start gap-2">
                  {comm.userAvatar && (
                    <img
                      alt={comm.username}
                      className="w-5 h-5 rounded-full object-cover shrink-0 mt-0.5"
                      src={comm.userAvatar}
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div>
                    <span className="font-bold text-on-surface mr-1.5 hover:underline cursor-pointer">
                      {comm.username}
                    </span>
                    <span className="text-on-surface-variant">{comm.text}</span>
                    <div className="text-[10px] text-on-surface-variant/70 mt-0.5">
                      {comm.timestamp}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-on-surface-variant hover:text-secondary text-[14px]"
                  aria-label="Like comment"
                >
                  <span className="material-symbols-outlined text-[14px]">favorite</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Inline Comment Input Box */}
        <form
          onSubmit={handleCommentSubmit}
          className="flex items-center justify-between gap-2 pt-1"
        >
          <div className="flex items-center gap-2 flex-1 bg-surface-container-low px-3 py-1.5 rounded-full focus-within:bg-surface-container transition-colors">
            <input
              className="w-full bg-transparent text-on-surface placeholder:text-on-surface-variant focus:outline-none text-xs md:text-sm"
              placeholder={`Add a comment for ${post.author.username}...`}
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setCommentInput((prev) => prev + ' ✨')}
              className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              title="Add reaction"
            >
              <span className="material-symbols-outlined text-[18px]">
                sentiment_satisfied
              </span>
            </button>
          </div>
          <button
            type="submit"
            disabled={!commentInput.trim()}
            className="text-xs md:text-sm font-bold text-primary hover:text-primary-container px-2 py-1 transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            Post
          </button>
        </form>
      </div>
    </article>
  );
};
