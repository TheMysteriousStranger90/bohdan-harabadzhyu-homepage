import {
  Flex, Box, useColorModeValue, useDisclosure,
  Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import ArtsSidebar from '@/components/arts/ArtsSidebar';
import PoemDisplay from '@/components/arts/PoemDisplay';
import TrackDisplay from '@/components/arts/TrackDisplay';
import type { Poem, Track } from '@/components/arts/ArtsSidebar';
import poemsData from '@/assets/data/poems.json';
import tracksData from '@/assets/data/tracks.json';
import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { lora } from '@/lib/fonts';

/** `?poem=3` / `?track=2` → 3 / 2. Anything that is not a positive integer → null. */
const parseId = (value: string | string[] | undefined): number | null => {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !/^\d+$/.test(raw)) return null;
  const id = Number(raw);
  return id > 0 ? id : null;
};

const ArtsPage: NextPage = () => {
  const poems: Poem[] = poemsData.poems;
  const tracks: Track[] = tracksData.tracks;
  const router = useRouter();

  // The URL is the single source of truth for the selection, so every poem/track has a
  // shareable link: /arts?poem=3 or /arts?track=2. (On the statically prerendered page
  // router.query is empty until hydration, which falls back to the first poem — same as the HTML.)
  // A valid ?track wins over ?poem; unknown ids fall back to the first poem.
  const selectedTrack = tracks.find(t => t.id === parseId(router.query.track)) ?? null;
  const selectedPoem: Poem | null = selectedTrack
    ? null
    : (poems.find(p => p.id === parseId(router.query.poem)) ?? poems[0] ?? null);

  // TrackDisplay stays mounted even when a poem is shown — it owns the hidden SoundCloud
  // iframe — so it always needs a track. Adjust state during render (not in an effect) so it
  // never shows the previous track's title for a frame.
  const [activeTrack, setActiveTrack] = useState<Track>(tracks[0]);
  if (selectedTrack && selectedTrack.id !== activeTrack.id) {
    setActiveTrack(selectedTrack);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const gradientBackground = useColorModeValue(
    'linear(to-r, #ebf3fc, #d1e7f8)',
    'linear(to-r, #202023, #2c2c2e)',
  );
  const mobileBarBg = useColorModeValue('#d1e7f8', '#1a1a1e');
  const mobileAccent = useColorModeValue('#1363d2', '#c084fc');

  const pageTitle = selectedTrack
    ? `${selectedTrack.title} | Arts`
    : selectedPoem
      ? `${selectedPoem.title} | Arts`
      : 'Arts';

  return (
    <>
      <Head>
        <title>{`Bohdan Harabadzhyu | ${pageTitle}`}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        direction="column"
        h="100vh"
        sx={{ '@supports (height: 100dvh)': { height: '100dvh' } }}
        overflow="hidden"
        bgGradient={gradientBackground}
      >
        {/* Mobile top bar */}
        <Flex
          display={{ base: 'flex', md: 'none' }}
          align="center"
          px={4}
          py={3}
          bg={mobileBarBg}
          flexShrink={0}
        >
          <IconButton
            aria-label="Open poems list"
            icon={<FiMenu size={20} />}
            onClick={onOpen}
            variant="ghost"
            color={mobileAccent}
          />
        </Flex>

        <Flex flex="1" minH={0}>
          <Box display={{ base: 'none', md: 'block' }}>
            <ArtsSidebar
              poems={poems}
              tracks={tracks}
              selectedPoemId={selectedPoem?.id ?? null}
              selectedTrackId={selectedTrack?.id ?? null}
            />
          </Box>

          {/* TrackDisplay stays mounted even when a poem is shown — it owns the
              hidden SoundCloud iframe, and unmounting that crashes the widget script */}
          {selectedTrack === null && selectedPoem && (
            <PoemDisplay key={selectedPoem.id} poem={selectedPoem} />
          )}
          <TrackDisplay
            track={activeTrack}
            visible={selectedTrack !== null}
          />
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent
          bg={mobileBarBg}
          className={lora.variable}
          sx={{ '@supports (height: 100dvh)': { height: '100dvh', maxHeight: '100dvh' } }}
        >
          <DrawerCloseButton zIndex={2} />
          <ArtsSidebar
            poems={poems}
            tracks={tracks}
            selectedPoemId={selectedPoem?.id ?? null}
            selectedTrackId={selectedTrack?.id ?? null}
            onNavigate={onClose}
            variant="drawer"
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ArtsPage;
