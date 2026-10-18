import React, { useState } from 'react';
import { Play, Pause, Disc3, Volume2, Sparkles } from './Icons';
import { portfolioContent } from '../data/content';

/**
 * Daily Rotation Music Card
 * - If spotifyEmbedUrl is provided, embeds the Spotify player iframe.
 * - Otherwise, renders a sleek, interactive mock player with 3 tracks.
 * - Easily removable by toggling or removing this single component.
 */
export default function MusicCard() {
  const { musicCard } = portfolioContent;
  const { title, description, spotifyEmbedUrl, mockTracks } = musicCard;

  const [activeTrackId, setActiveTrackId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  const activeTrack = mockTracks.find((t) => t.id === activeTrackId) || mockTracks[0];

  const handleTogglePlay = (id) => {
    if (activeTrackId === id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrackId(id);
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto lg:max-w-none relative rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 hover:border-blue-500/30">
      {/* Ambient background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Disc3
                className={`w-5 h-5 text-blue-400 ${
                  isPlaying && !spotifyEmbedUrl ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '4s' }}
              />
              {title}
            </h3>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Coding Vibes
            </span>
          </div>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Mode A: Spotify Embed Iframe (if provided) */}
      {spotifyEmbedUrl && (
        <div className="relative z-10 w-full overflow-hidden rounded-xl border border-white/5">
          <iframe
            title="Spotify Playlist"
            src={spotifyEmbedUrl}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full rounded-xl bg-transparent"
          />
        </div>
      )}

      {/* Mode B: Mock 3-Track Player (if no embed URL) */}
      {!spotifyEmbedUrl && (
        <div className="relative z-10 space-y-4">
          {/* Track List */}
          <div className="space-y-2">
            {mockTracks.map((track) => {
              const isActive = activeTrackId === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => handleTogglePlay(track.id)}
                  className={`group/track flex items-center justify-between p-2.5 sm:p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/15 border-blue-500/40 shadow-[0_0_15px_rgba(37,99,235,0.15)]'
                      : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Play/Pause Button */}
                    <button
                      type="button"
                      aria-label={`${isActive && isPlaying ? 'Pausar' : 'Reproducir'} ${track.title}`}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isActive && isPlaying
                          ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]'
                          : 'bg-white/10 text-white/70 group-hover/track:bg-blue-600 group-hover/track:text-white'
                      }`}
                    >
                      {isActive && isPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                      )}
                    </button>

                    {/* Track Details */}
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-semibold truncate transition-colors ${
                          isActive ? 'text-blue-300' : 'text-white/90 group-hover/track:text-white'
                        }`}
                      >
                        {track.title}
                      </p>
                      <p className="text-xs text-white/50 truncate">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  {/* Equalizer / Tag & Duration */}
                  <div className="flex items-center gap-2.5 shrink-0 pl-2">
                    {isActive && isPlaying ? (
                      /* Animated Equalizer Wave */
                      <div className="flex items-end gap-0.5 h-3.5">
                        <span className="w-0.5 h-full bg-blue-400 rounded-full animate-[bounce_0.8s_infinite]" />
                        <span className="w-0.5 h-2/3 bg-blue-400 rounded-full animate-[bounce_0.6s_infinite_0.2s]" />
                        <span className="w-0.5 h-4/5 bg-blue-400 rounded-full animate-[bounce_0.9s_infinite_0.4s]" />
                      </div>
                    ) : (
                      <span className="text-[10px] font-mono text-white/40 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/5">
                        {track.tag}
                      </span>
                    )}
                    <span className="text-xs font-mono text-white/40">
                      {track.duration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Now Playing Footer Bar */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <div className="flex items-center gap-2 truncate">
              <Volume2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="truncate">
                Now: <span className="text-white/80 font-medium">{activeTrack.title}</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-400 shrink-0 text-[11px] font-mono">
              <Sparkles className="w-3 h-3" />
              <span>Heavy Rotation</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
