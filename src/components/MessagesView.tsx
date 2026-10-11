import React, { useState } from 'react';
import { Conversation, Message } from '../types';

interface MessagesViewProps {
  conversations: Conversation[];
  onSendMessage: (convId: string, text: string) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  conversations,
  onSendMessage,
}) => {
  const [activeConvId, setActiveConvId] = useState<string>(
    conversations[0]?.id || ''
  );
  const [inputText, setInputText] = useState('');

  const activeConv =
    conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    onSendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="w-full max-w-[1040px] mx-auto py-4">
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/20 shadow-sm overflow-hidden h-[75vh] flex">
        {/* Left Conversations Sidebar */}
        <div className="w-full sm:w-80 border-r border-outline-variant/20 flex flex-col shrink-0">
          <div className="p-4 border-b border-outline-variant/20 flex items-center justify-between">
            <span className="text-base font-bold text-on-surface">Messages</span>
            <button
              type="button"
              className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface"
              title="New message"
            >
              <span className="material-symbols-outlined text-[20px]">edit_square</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-outline-variant/10">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`flex items-center gap-3 p-3.5 cursor-pointer transition-colors ${
                  activeConv?.id === conv.id
                    ? 'bg-primary-container/10 border-l-4 border-primary'
                    : 'hover:bg-surface-container'
                }`}
              >
                <div className="relative">
                  <img
                    alt={conv.user.name}
                    className="w-11 h-11 rounded-full object-cover ring-1 ring-outline-variant/30"
                    src={conv.user.avatar}
                    referrerPolicy="no-referrer"
                  />
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                  )}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-on-surface truncate">
                      {conv.user.username}
                    </span>
                    <span className="text-[10px] text-on-surface-variant">
                      {conv.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[11px] text-on-surface-variant truncate">
                      {conv.lastMessage}
                    </span>
                    {conv.unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-secondary-container text-white text-[10px] font-bold">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Active Chat Window */}
        {activeConv ? (
          <div className="hidden sm:flex flex-1 flex-col">
            {/* Chat Header */}
            <div className="p-3.5 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-lowest">
              <div className="flex items-center gap-3">
                <img
                  alt={activeConv.user.name}
                  className="w-9 h-9 rounded-full object-cover"
                  src={activeConv.user.avatar}
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-on-surface">
                      {activeConv.user.name}
                    </span>
                    {activeConv.user.verified && (
                      <span className="material-symbols-outlined text-primary text-[15px]">
                        verified
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-on-surface-variant">
                    @{activeConv.user.username} • {activeConv.online ? 'Active now' : 'Offline'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-on-surface-variant">
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-surface-container"
                  title="Voice call"
                >
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </button>
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-surface-container"
                  title="Video call"
                >
                  <span className="material-symbols-outlined text-[20px]">videocam</span>
                </button>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-surface-container-low/40 no-scrollbar">
              {activeConv.messages.map((msg: Message) => {
                const isMe = msg.senderId === 'user_alex';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[70%] ${
                      isMe ? 'self-end items-end' : 'self-start items-start'
                    }`}
                  >
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-primary-container text-white rounded-br-xs shadow-sm'
                          : 'bg-surface-container-lowest text-on-surface rounded-bl-xs border border-outline-variant/20 shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-on-surface-variant/70 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-outline-variant/20 bg-surface-container-lowest flex items-center gap-2"
            >
              <div className="flex items-center gap-2 flex-1 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/20">
                <input
                  type="text"
                  placeholder={`Message ${activeConv.user.name}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-transparent text-xs md:text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setInputText((prev) => prev + ' 🙌')}
                  className="text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    sentiment_satisfied
                  </span>
                </button>
              </div>

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-on-surface-variant text-sm">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};
