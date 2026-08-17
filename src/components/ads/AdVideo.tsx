'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { formatDuration } from '@/lib/utils/formatters';
import { viewAd } from '@/lib/api/ads';

interface AdVideoProps {
  videoUrl: string;
  poster: string;
  thumbnail: string;
  title: string;
  adId: string;
  durationSeconds: number;
  badge?: string;
}

export function AdVideo({
  videoUrl,
  poster,
  thumbnail,
  title,
  adId,
  durationSeconds,
  badge,
}: AdVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(durationSeconds);
  const [showControls, setShowControls] = useState(true);
  const [viewTracked, setViewTracked] = useState(false);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      // Track view after 5 seconds of playback
      if (!viewTracked && video.currentTime > 5) {
        setViewTracked(true);
        viewAd(adId).catch(() => {});
      }
    };
    const onLoadedMetadata = () => setDuration(video.duration);
    const onEnded = () => setPlaying(false);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('ended', onEnded);
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('ended', onEnded);
    };
  }, [adId, viewTracked]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
    setPlaying(!playing);
    resetControlsTimer();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * video.duration;
  };

  const resetControlsTimer = () => {
    clearTimeout(controlsTimerRef.current);
    setShowControls(true);
    if (playing) {
      controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  const openFullscreen = () => {
    videoRef.current?.requestFullscreen?.().catch(() => {});
  };

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-black group"
      style={{ aspectRatio: '16/9' }}
      onMouseMove={resetControlsTimer}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      {/* Poster image (shown before play) */}
      {!playing && (
        <Image
          src={poster || thumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 65vw"
          className="object-cover"
          priority
        />
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className={`w-full h-full object-cover ${playing ? 'block' : 'hidden'}`}
        playsInline
        aria-label={title}
      />

      {/* Badge */}
      {badge && (
        <div className="absolute top-3 inset-s-3 bg-[#F97316] text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
          {badge}
        </div>
      )}

      {/* Play button overlay (not playing) */}
      {!playing && (
        <button
          onClick={togglePlay}
          aria-label="تشغيل الفيديو"
          className="absolute inset-0 flex items-center justify-center group/play z-10"
        >
          <div className="w-16 h-16 rounded-full bg-[#F97316] shadow-2xl flex items-center justify-center
            group-hover/play:scale-110 transition-transform duration-200">
            <Play className="w-7 h-7 text-white ms-1" aria-hidden="true" />
          </div>
        </button>
      )}

      {/* Controls overlay (playing) */}
      {playing && (
        <div
          className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-300
            ${showControls ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }}
        >
          {/* Progress bar */}
          <div
            role="slider"
            aria-label="شريط التقدم"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            tabIndex={0}
            className="w-full h-1.5 bg-white/30 cursor-pointer mx-0 hover:h-2.5 transition-all"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-[#F97316] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                aria-label={playing ? 'إيقاف مؤقت' : 'تشغيل'}
                className="text-white hover:text-[#F97316] transition-colors"
              >
                {playing ? (
                  <Pause className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Play className="w-5 h-5 ms-0.5" aria-hidden="true" />
                )}
              </button>
              <button
                onClick={toggleMute}
                aria-label={muted ? 'تشغيل الصوت' : 'كتم الصوت'}
                className="text-white hover:text-[#F97316] transition-colors"
              >
                {muted ? (
                  <VolumeX className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Volume2 className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
              <span className="text-white text-xs font-medium" dir="ltr">
                {formatDuration(Math.floor(currentTime))} / {formatDuration(Math.floor(duration))}
              </span>
            </div>
            <button
              onClick={openFullscreen}
              aria-label="ملء الشاشة"
              className="text-white hover:text-[#F97316] transition-colors"
            >
              <Maximize className="w-4.5 h-4.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
