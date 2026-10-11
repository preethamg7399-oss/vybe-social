import React, { useState } from 'react';
import { NotificationItem } from '../types';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAllRead,
}) => {
  const [filter, setFilter] = useState<'all' | 'like' | 'comment' | 'follow'>('all');

  const filtered =
    filter === 'all'
      ? notifications
      : notifications.filter((n) => n.type === filter);

  const getIconForType = (type: NotificationItem['type']) => {
    switch (type) {
      case 'like':
        return { icon: 'favorite', color: 'text-secondary bg-secondary-fixed' };
      case 'comment':
        return { icon: 'chat_bubble', color: 'text-primary bg-primary-fixed' };
      case 'follow':
        return { icon: 'person_add', color: 'text-tertiary bg-tertiary-fixed' };
      case 'live':
        return { icon: 'sensors', color: 'text-secondary bg-secondary-fixed' };
      default:
        return { icon: 'notifications', color: 'text-on-surface bg-surface-container' };
    }
  };

  return (
    <div className="w-full max-w-[680px] mx-auto py-4 flex flex-col gap-5">
      {/* Notifications Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-on-surface">Notifications</h2>
        <button
          type="button"
          onClick={onMarkAllRead}
          className="text-xs font-semibold text-primary hover:underline cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-xl border border-outline-variant/20">
        {(['all', 'like', 'comment', 'follow'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              filter === tab
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab === 'all' ? 'All Activity' : `${tab}s`}
          </button>
        ))}
      </div>

      {/* Notification items list */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden divide-y divide-outline-variant/10">
        {filtered.map((item) => {
          const { icon, color } = getIconForType(item.type);
          return (
            <div
              key={item.id}
              className={`p-4 flex items-center justify-between gap-3 transition-colors ${
                !item.isRead ? 'bg-primary/5' : 'hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    alt={item.user.username}
                    className="w-11 h-11 rounded-full object-cover ring-1 ring-outline-variant/20"
                    src={item.user.avatar}
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[12px] shadow-xs ${color}`}
                  >
                    <span className="material-symbols-outlined text-[13px]">{icon}</span>
                  </div>
                </div>

                <div className="flex flex-col min-w-0 text-xs">
                  <span className="text-on-surface leading-snug">
                    <strong className="hover:underline cursor-pointer">
                      {item.user.username}
                    </strong>{' '}
                    {item.text}
                  </span>
                  <span className="text-on-surface-variant text-[11px] mt-0.5">
                    {item.timestamp}
                  </span>
                </div>
              </div>

              {/* Target Thumbnail if present */}
              {item.targetMedia && (
                <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-outline-variant/20">
                  <img
                    alt="Target post thumbnail"
                    className="w-full h-full object-cover"
                    src={item.targetMedia}
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
