"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { SiteContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { ArrowRight } from "./Icons";

/* The few parts of the YouTube IFrame API this section uses. */
type YTPlayer = {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  destroy(): void;
  getIframe(): HTMLIFrameElement;
  unloadModule?(name: string): void;
};
type YTApi = {
  Player: new (el: HTMLElement, options: Record<string, unknown>) => YTPlayer;
  PlayerState: { PLAYING: number };
};
declare global {
  interface Window {
    YT?: YTApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTApi> | null = null;

/** Loads https://www.youtube.com/iframe_api once, however many players ask. */
function loadYouTubeApi(): Promise<YTApi> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  apiPromise ??= new Promise<YTApi>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (window.YT) resolve(window.YT);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => {
      apiPromise = null;
      reject(new Error("YouTube IFrame API failed to load"));
    };
    document.head.appendChild(script);
  });
  return apiPromise;
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const noSubscription = () => () => {};

/**
 * Homepage film. The player loads as the section approaches, plays muted once
 * half of it is on screen (browsers only allow muted autoplay) and pauses when
 * it scrolls away. Visitors who prefer reduced motion get a play button instead.
 */
export default function VideoShowcase({ c, locale }: { c: SiteContent; locale: Locale }) {
  const v = c.video;
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const userPausedRef = useRef(false);

  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
  const canFullscreen = useSyncExternalStore(
    noSubscription,
    () => document.fullscreenEnabled === true,
    () => false,
  );

  // Watch the frame: load the player when it is close, track when half is visible.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          nearObserver.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    const viewObserver = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.5),
      { threshold: [0, 0.5, 1] },
    );
    nearObserver.observe(frame);
    viewObserver.observe(frame);
    return () => {
      nearObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  // Create the player once the section is near.
  useEffect(() => {
    const host = hostRef.current;
    if (!near || !host) return;
    let cancelled = false;
    const mount = document.createElement("div");
    host.appendChild(mount);

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        playerRef.current = new YT.Player(mount, {
          host: "https://www.youtube-nocookie.com",
          videoId: v.youtubeId,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 0,
            mute: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            loop: 1,
            playlist: v.youtubeId,
            playsinline: 1,
            iv_load_policy: 3,
            cc_load_policy: 0,
            hl: locale,
            origin: window.location.origin,
          },
          events: {
            onReady: ({ target }: { target: YTPlayer }) => {
              target.mute();
              target.getIframe().title = v.caption;
              setReady(true);
            },
            onStateChange: ({ data, target }: { data: number; target: YTPlayer }) => {
              const isPlaying = data === YT.PlayerState.PLAYING;
              setPlaying(isPlaying);
              if (isPlaying) {
                setStarted(true);
                // The film carries its own English titles and Arabic subtitles;
                // YouTube's auto captions would sit on top of them.
                target.unloadModule?.("captions");
                target.unloadModule?.("cc");
              }
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
      host.replaceChildren();
    };
  }, [near, v.youtubeId, v.caption, locale]);

  // Play while in view, pause when it leaves. A slow buffer or a stalled
  // player can swallow the first playVideo(), so keep asking until it plays.
  useEffect(() => {
    const player = playerRef.current;
    if (!ready || !player) return;
    if (!inView) {
      player.pauseVideo();
      return;
    }
    if (playing || reducedMotion || userPausedRef.current) return;
    player.playVideo();
    const retry = window.setInterval(() => {
      if (!userPausedRef.current) player.playVideo();
    }, 3000);
    return () => window.clearInterval(retry);
  }, [ready, inView, reducedMotion, playing]);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;
    if (playing) {
      userPausedRef.current = true;
      player.pauseVideo();
    } else {
      userPausedRef.current = false;
      player.playVideo();
    }
  };

  const toggleSound = () => {
    const player = playerRef.current;
    if (!player) return;
    if (muted) {
      player.unMute();
      if (!playing) {
        userPausedRef.current = false;
        player.playVideo();
      }
    } else {
      player.mute();
    }
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else stageRef.current?.requestFullscreen();
  };

  const youtubeUrl = `https://www.youtube.com/watch?v=${v.youtubeId}`;
  const control =
    "grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/85 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white disabled:opacity-40";

  return (
    <section id="film" className="relative overflow-hidden bg-green-950 text-white">
      <div aria-hidden className="video-glow pointer-events-none absolute inset-0" />
      <div className="shell section relative">
        <div className="reveal grid gap-7 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-light text-green-300">{v.eyebrow}</p>
            <h2 className="display-2 mt-6 text-balance text-white">{v.heading}</h2>
          </div>
          <p className="max-w-md text-[1.0625rem] leading-[1.7] text-white/70">{v.intro}</p>
        </div>

        <div ref={stageRef} className="video-stage reveal mt-14">
          <div
            ref={frameRef}
            className={`video-frame relative aspect-video overflow-hidden rounded-[22px] bg-black ring-1 ring-white/10 ${inView ? "is-in-view" : ""}`}
          >
            <div ref={hostRef} className="video-host absolute inset-0" />

            <Image
              src="/media/video-how-tam-works.webp"
              alt=""
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className={`object-cover transition-opacity duration-700 ${started ? "opacity-0" : "opacity-100"}`}
            />

            {failed ? (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={v.youtube}
                className="video-surface group absolute inset-0 z-10 grid place-items-center"
              >
                <PlayBadge />
              </a>
            ) : (
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? v.pause : v.play}
                className={`video-surface group absolute inset-0 z-10 grid place-items-center transition-colors duration-500 ${started && !playing ? "bg-black/35" : "bg-transparent"}`}
              >
                <span className={`transition-all duration-500 ${playing ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}>
                  <PlayBadge />
                </span>
              </button>
            )}
          </div>

          <div className="video-controls mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <span aria-hidden className={`video-eq ${playing ? "is-playing" : ""}`}>
                <i />
                <i />
                <i />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/75">{v.caption}</span>
              <span aria-hidden className="h-3 w-px bg-white/15" />
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[0.8125rem] text-white/55 transition-colors hover:text-white"
              >
                {v.youtube}
                <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleSound}
                disabled={!ready}
                aria-pressed={!muted}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-[0.8125rem] font-medium text-white/85 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white disabled:opacity-40"
              >
                {muted ? <SpeakerOffIcon /> : <SpeakerIcon />}
                {muted ? v.soundOn : v.soundOff}
              </button>
              <button
                type="button"
                onClick={togglePlay}
                disabled={!ready}
                aria-label={playing ? v.pause : v.play}
                className={control}
              >
                {playing ? <PauseIcon /> : <PlayIcon />}
              </button>
              {canFullscreen && (
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  disabled={!ready}
                  aria-label={v.fullscreen}
                  className={control}
                >
                  <ExpandIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlayBadge() {
  return (
    <span className="grid h-[76px] w-[76px] place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/35 backdrop-blur-md transition-transform duration-300 group-hover:scale-105 sm:h-[88px] sm:w-[88px]">
      <svg viewBox="0 0 24 24" className="h-7 w-7 translate-x-[2px]" aria-hidden="true">
        <path d="M7 4.5v15l12.5-7.5L7 4.5Z" fill="currentColor" />
      </svg>
    </span>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-px" aria-hidden="true">
      <path d="M7 4.5v15l12.5-7.5L7 4.5Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="none" />
      <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11" />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="none" />
      <path d="m16 9.5 5 5m0-5-5 5" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </svg>
  );
}
