import React, { useState } from 'react';
import { User } from '../types';

interface SettingsViewProps {
  currentUser: User;
  onSwitchUser: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentUser,
  onSwitchUser,
}) => {
  const [highQualityUploads, setHighQualityUploads] = useState(true);
  const [autoplayReels, setAutoplayReels] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushLikes, setPushLikes] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="w-full max-w-[680px] mx-auto py-6 flex flex-col gap-6">
      <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
        <div>
          <h2 className="text-xl font-bold text-on-surface">Settings & Preferences</h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Manage your visual feeds, camera archive preferences, and account controls.
          </p>
        </div>
        {savedNotice && (
          <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">
            Preferences Saved!
          </span>
        )}
      </div>

      {/* Account Info Card */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            alt={currentUser.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-container"
            src={currentUser.avatar}
            referrerPolicy="no-referrer"
          />
          <div>
            <h3 className="text-sm font-bold text-on-surface">{currentUser.name}</h3>
            <p className="text-xs text-on-surface-variant">@{currentUser.username}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onSwitchUser}
          className="px-4 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-xs font-bold text-primary transition-colors cursor-pointer"
        >
          Switch Account
        </button>
      </div>

      {/* Media & Camera Settings */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col gap-4">
        <span className="text-xs font-bold text-on-surface uppercase tracking-wider text-primary">
          Media & Archival
        </span>

        <div className="flex items-center justify-between py-1">
          <div>
            <div className="text-xs font-bold text-on-surface">
              High-Fidelity Photo Uploads
            </div>
            <div className="text-[11px] text-on-surface-variant">
              Preserve uncompressed 35mm grain and high-dynamic-range detail
            </div>
          </div>
          <button
            type="button"
            onClick={() => setHighQualityUploads(!highQualityUploads)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              highQualityUploads ? 'bg-primary-container' : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                highQualityUploads ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-1">
          <div>
            <div className="text-xs font-bold text-on-surface">Autoplay Reels</div>
            <div className="text-[11px] text-on-surface-variant">
              Seamlessly preview reels with spatial audio preview
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAutoplayReels(!autoplayReels)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              autoplayReels ? 'bg-primary-container' : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                autoplayReels ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col gap-4">
        <span className="text-xs font-bold text-on-surface uppercase tracking-wider text-primary">
          Privacy & Visibility
        </span>

        <div className="flex items-center justify-between py-1">
          <div>
            <div className="text-xs font-bold text-on-surface">Private Portfolio</div>
            <div className="text-[11px] text-on-surface-variant">
              Only approved creators can see your posts and stories
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPrivateAccount(!privateAccount)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              privateAccount ? 'bg-primary-container' : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                privateAccount ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Notifications Controls */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col gap-4">
        <span className="text-xs font-bold text-on-surface uppercase tracking-wider text-primary">
          Notifications
        </span>

        <div className="flex items-center justify-between py-1">
          <div>
            <div className="text-xs font-bold text-on-surface">Likes & Interactions</div>
            <div className="text-[11px] text-on-surface-variant">
              Notify me when someone likes my photography or pins a comment
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPushLikes(!pushLikes)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              pushLikes ? 'bg-primary-container' : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                pushLikes ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-1">
          <div>
            <div className="text-xs font-bold text-on-surface">Email Digests</div>
            <div className="text-[11px] text-on-surface-variant">
              Weekly curated roundup of trending editorial creators
            </div>
          </div>
          <button
            type="button"
            onClick={() => setEmailAlerts(!emailAlerts)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              emailAlerts ? 'bg-primary-container' : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                emailAlerts ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2.5 rounded-full bg-primary-container text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};
