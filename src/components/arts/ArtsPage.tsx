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
import { lora } from '@/lib/fonts';

const ArtsPage: NextPage = () => {
  const poems: Poem[] = poemsData.poems;
  const tracks: Track[] = tracksData.tracks;
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(poems[0]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const gradientBackground = useColorModeValue(
    'linear(to-r, #ebf3fc, #d1e7f8)',
    'linear(to-r, #202023, #2c2c2e)',
  );
  const mobileBarBg = useColorModeValue('#d1e7f8', '#1a1a1e');
  const mobileAccent = useColorModeValue('#1363d2', '#c084fc');

  const selectPoem = (poem: Poem) => {
    setSelectedPoem(poem);
    setSelectedTrack(null);
  };

  const selectTrack = (track: Track) => {
    setSelectedTrack(track);
    setSelectedPoem(null);
  };

  const handleSelectPoem = (poem: Poem) => {
    selectPoem(poem);
    onClose();
  };

  const handleSelectTrack = (track: Track) => {
    selectTrack(track);
    onClose();
  };

  return (
    <>
      <Head>
        <title>Bohdan Harabadzhyu | Arts</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction="column" h="100vh" overflow="hidden" bgGradient={gradientBackground}>
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
              onSelectPoem={selectPoem}
              onSelectTrack={selectTrack}
            />
          </Box>

          {/* TrackDisplay stays mounted even when a poem is shown — it owns the
              hidden SoundCloud iframe, and unmounting that crashes the widget script */}
          {selectedTrack === null && selectedPoem && <PoemDisplay poem={selectedPoem} />}
          <TrackDisplay
            track={selectedTrack ?? tracks[0]}
            visible={selectedTrack !== null}
          />
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bg={mobileBarBg} className={lora.variable}>
          <DrawerCloseButton zIndex={2} />
          <ArtsSidebar
            poems={poems}
            tracks={tracks}
            selectedPoemId={selectedPoem?.id ?? null}
            selectedTrackId={selectedTrack?.id ?? null}
            onSelectPoem={handleSelectPoem}
            onSelectTrack={handleSelectTrack}
            variant="drawer"
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ArtsPage;
