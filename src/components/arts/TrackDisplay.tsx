import React, {useEffect, useRef, useState} from 'react';
import {Box, chakra, Flex, IconButton, Spinner, Text, useColorModeValue} from '@chakra-ui/react';
import {FiPause, FiPlay} from 'react-icons/fi';
import {useLanguage} from '@/context/LanguageContext';
import translations from '@/data/translations';
import type {Track} from './ArtsSidebar';

interface TrackDisplayProps {
  track: Track;
  /** When false, only the hidden audio iframe stays mounted and playback pauses */
  visible: boolean;
}

// --- Minimal typings for the SoundCloud Widget API ---
interface SCWidget {
  bind: (event: string, callback: (e?: {currentPosition: number}) => void) => void;
  unbind: (event: string) => void;
  load: (url: string, options?: {auto_play?: boolean; show_teaser?: boolean; callback?: () => void}) => void;
  play: () => void;
  pause: () => void;
  seekTo: (ms: number) => void;
  getDuration: (callback: (ms: number) => void) => void;
}

declare global {
  interface Window {
    SC?: {
      Widget: ((el: HTMLIFrameElement) => SCWidget) & {
        Events: Record<string, string>;
      };
    };
  }
}

// Load https://w.soundcloud.com/player/api.js once, shared between mounts
let widgetApiPromise: Promise<void> | null = null;
const loadWidgetApi = (): Promise<void> => {
  if (window.SC?.Widget) return Promise.resolve();
  if (!widgetApiPromise) {
    widgetApiPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        widgetApiPromise = null;
        reject(new Error('Failed to load SoundCloud Widget API'));
      };
      document.body.appendChild(script);
    });
  }
  return widgetApiPromise;
};

const formatTime = (ms: number) => {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

// Inline /public/soundcloud.svg (simple-icons) so it inherits text color
const SoundCloudIcon: React.FC<{size?: number}> = ({size = 16}) => (
  <chakra.svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    w={`${size}px`}
    h={`${size}px`}
    fill="currentColor"
    display="inline-block"
    verticalAlign="-2px"
    mr={2}
  >
    <path d="M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.747.747 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373ZM10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0ZM9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0Zm-1.663-.257c.27 2.726.39 5.171 0 7.904a.266.266 0 0 1-.532 0c-.38-2.69-.257-5.21 0-7.904a.266.266 0 0 1 .532 0Zm-1.647.77a26.108 26.108 0 0 1-.008 7.147.272.272 0 0 1-.542 0 27.955 27.955 0 0 1 0-7.147.275.275 0 0 1 .55 0Zm-1.67 1.769c.421 1.865.228 3.5-.029 5.388a.257.257 0 0 1-.514 0c-.21-1.858-.398-3.549 0-5.389a.272.272 0 0 1 .543 0Zm-1.655-.273c.388 1.897.26 3.508-.01 5.412-.026.28-.514.283-.54 0-.244-1.878-.347-3.54-.01-5.412a.283.283 0 0 1 .56 0Zm-1.668.911c.4 1.268.257 2.292-.026 3.572a.257.257 0 0 1-.514 0c-.241-1.262-.354-2.312-.023-3.572a.283.283 0 0 1 .563 0Z"/>
  </chakra.svg>
);

const TrackDisplay: React.FC<TrackDisplayProps> = ({track, visible}) => {
  const {language} = useLanguage();
  const t = translations[language];

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<SCWidget | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const seekingRef = useRef(false);
  // The iframe is created once and reused; track changes go through widget.load()
  const initialUrlRef = useRef(track.url);
  const loadedUrlRef = useRef(track.url);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0); // ms
  const [duration, setDuration] = useState(0); // ms
  // true while widget.load() for a newly selected track is in flight —
  // blocks the Play button so a click can't race the SoundCloud widget
  // (otherwise the click can land before the new track is actually loaded,
  // silently getting dropped and requiring a second click to work)
  const [switchingTrack, setSwitchingTrack] = useState(false);

  // Exact same values as PoemDisplay / InfoCard
  const backgroundColor = useColorModeValue('#1363d2', '#68217a');
  const textColor = useColorModeValue('#202023', '#f7fafc');
  const linkHoverColor = useColorModeValue('#f7fafc', '#202023');

  // Custom player controls — in light mode they take the poem text color
  // (#202023), in dark mode a light circle with the card-colored icon
  const playBg = useColorModeValue('#202023', 'rgba(255, 255, 255, 0.92)');
  const playHoverBg = useColorModeValue('#33333a', '#ffffff');
  // Icon takes the card color — blue on the dark button in light mode,
  // purple on the light button in dark mode
  const playIconColor = backgroundColor;
  const barTrackBg = useColorModeValue('rgba(32, 32, 35, 0.25)', 'rgba(0, 0, 0, 0.25)');
  const barFillBg = useColorModeValue('#202023', 'rgba(255, 255, 255, 0.95)');

  const embedSrc =
    'https://w.soundcloud.com/player/?url=' +
    encodeURIComponent(initialUrlRef.current) +
    '&auto_play=false&show_teaser=false';

  // Widget setup — once per mount; the iframe itself is never re-created
  useEffect(() => {
    let cancelled = false;

    loadWidgetApi()
      .then(() => {
        if (cancelled || !iframeRef.current || !window.SC) return;
        const widget = window.SC.Widget(iframeRef.current);
        widgetRef.current = widget;
        const Events = window.SC.Widget.Events;

        widget.bind(Events.READY, () => {
          if (cancelled) return;
          setReady(true);
          widget.getDuration(ms => {
            if (!cancelled) setDuration(ms);
          });
        });
        widget.bind(Events.PLAY, () => {
          if (!cancelled) setPlaying(true);
        });
        widget.bind(Events.PAUSE, () => {
          if (!cancelled) setPlaying(false);
        });
        widget.bind(Events.PLAY_PROGRESS, e => {
          if (!cancelled && !seekingRef.current && e) setPosition(e.currentPosition);
        });
        widget.bind(Events.FINISH, () => {
          if (cancelled) return;
          setPlaying(false);
          setPosition(0);
        });
      })
      .catch(() => {
        /* player stays in loading state; the SoundCloud link below still works */
      });

    return () => {
      cancelled = true;
      const widget = widgetRef.current;
      widgetRef.current = null;
      // Quiet the widget before the iframe leaves the DOM, otherwise the
      // SoundCloud script keeps polling a detached element and throws
      if (widget && window.SC) {
        try {
          widget.pause();
          Object.values(window.SC.Widget.Events).forEach(ev => widget.unbind(ev));
        } catch {
          /* iframe already detached */
        }
      }
    };
  }, []);

  // Switching to another track — reuse the same iframe via widget.load()
  useEffect(() => {
    if (!ready || loadedUrlRef.current === track.url) return;
    loadedUrlRef.current = track.url;
    seekingRef.current = false;
    setPlaying(false);
    setPosition(0);
    setDuration(0);
    setSwitchingTrack(true);
    widgetRef.current?.load(track.url, {
      auto_play: false,
      show_teaser: false,
      callback: () => {
        widgetRef.current?.getDuration(ms => setDuration(ms));
        setSwitchingTrack(false);
      },
    });
  }, [ready, track.url]);

  // Hidden (user switched to a poem) — pause, keep position
  useEffect(() => {
    if (!visible) widgetRef.current?.pause();
  }, [visible]);

  const togglePlay = () => {
    const widget = widgetRef.current;
    if (!widget || !ready || switchingTrack) return;
    if (playing) widget.pause();
    else widget.play();
  };

  const positionFromPointer = (clientX: number) => {
    const bar = barRef.current;
    if (!bar || !duration) return 0;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    return ratio * duration;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ready || !duration) return;
    seekingRef.current = true;
    barRef.current?.setPointerCapture(e.pointerId);
    setPosition(positionFromPointer(e.clientX));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!seekingRef.current) return;
    setPosition(positionFromPointer(e.clientX));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!seekingRef.current) return;
    seekingRef.current = false;
    const newPosition = positionFromPointer(e.clientX);
    setPosition(newPosition);
    widgetRef.current?.seekTo(newPosition);
  };

  const progressPercent = duration ? (position / duration) * 100 : 0;

  return (
    <>
      {/* Hidden SoundCloud iframe — audio engine only, UI is ours.
          Mounted permanently (even when a poem is shown) and kept at a real
          size offscreen: removing or shrinking it crashes the widget script */}
      <chakra.iframe
        ref={iframeRef}
        title={track.title}
        src={embedSrc}
        allow="autoplay; encrypted-media"
        position="fixed"
        top="-200px"
        left="-500px"
        w="400px"
        h="166px"
        opacity={0}
        pointerEvents="none"
        border="none"
        aria-hidden="true"
        tabIndex={-1}
      />

      {visible && (
        <Flex
          flex="1"
          align="flex-start"
          justify="center"
          p={{base: 4, md: 10}}
          overflowY="auto"
          pt={{base: 6, md: 10}}
        >
          <Box
            boxShadow="lg"
            maxW="520px"
            w="full"
            rounded="xs"
            p={{base: 4, md: 6}}
            bg={backgroundColor}
            transition="transform 0.2s, box-shadow 0.2s"
            _hover={{transform: 'translateY(-4px)', boxShadow: '2xl'}}
            textAlign="center"
          >
            <chakra.p
              fontFamily="var(--font-lora)"
              fontWeight="bold"
              fontSize={{base: 16, md: 20}}
              color={textColor}
              mb={5}
            >
              {track.title}
            </chakra.p>

            {/* Custom player */}
            <Flex align="center" gap={4}>
              <IconButton
                aria-label={playing ? 'Pause' : 'Play'}
                icon={
                  ready && !switchingTrack
                    ? playing
                      ? <FiPause size={20} />
                      : <FiPlay size={20} style={{marginLeft: '2px'}} />
                    : <Spinner size="sm" color={playIconColor} />
                }
                onClick={togglePlay}
                isDisabled={!ready || switchingTrack}
                isRound
                size="lg"
                bg={playBg}
                color={playIconColor}
                flexShrink={0}
                transition="transform 0.15s, background 0.15s"
                _hover={{bg: playHoverBg, transform: 'scale(1.06)'}}
                _active={{bg: playHoverBg, transform: 'scale(0.97)'}}
                _disabled={{bg: playBg, cursor: 'default', opacity: 0.8}}
              />

              <Box flex="1">
                {/* Progress bar — click or drag to seek */}
                <Box
                  ref={barRef}
                  position="relative"
                  h="8px"
                  borderRadius="full"
                  bg={barTrackBg}
                  cursor={ready ? 'pointer' : 'default'}
                  sx={{touchAction: 'none'}}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  role="slider"
                  aria-label="Seek"
                  aria-valuemin={0}
                  aria-valuemax={duration}
                  aria-valuenow={position}
                >
                  <Box
                    position="absolute"
                    left={0}
                    top={0}
                    bottom={0}
                    w={`${progressPercent}%`}
                    borderRadius="full"
                    bg={barFillBg}
                    transition={seekingRef.current ? 'none' : 'width 0.2s linear'}
                  />
                </Box>

                <Flex justify="space-between" mt={1.5}>
                  <Text fontSize="xs" fontFamily="var(--font-lora)" color={textColor} opacity={0.75}>
                    {formatTime(position)}
                  </Text>
                  <Text fontSize="xs" fontFamily="var(--font-lora)" color={textColor} opacity={0.75}>
                    {duration ? formatTime(duration) : '–:––'}
                  </Text>
                </Flex>
              </Box>
            </Flex>

            {/* Attribution link — required by SoundCloud when using a custom UI */}
            <chakra.p fontFamily="var(--font-lora)" fontSize="14px" color={textColor} mt={5} opacity={0.7}>
              <chakra.a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                _hover={{color: linkHoverColor}}
              >
                <SoundCloudIcon />
                {t.arts.listenOn} ↗
              </chakra.a>
            </chakra.p>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default TrackDisplay;
