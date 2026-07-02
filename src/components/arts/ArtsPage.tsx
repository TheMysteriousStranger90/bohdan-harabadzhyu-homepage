import {
  Flex, Box, useColorModeValue, useDisclosure,
  Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, IconButton,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import ArtsSidebar from '@/components/arts/ArtsSidebar';
import PoemDisplay from '@/components/arts/PoemDisplay';
import type { Poem } from '@/components/arts/ArtsSidebar';
import poemsData from '@/assets/data/poems.json';
import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';

const ArtsPage: NextPage = () => {
  const poems: Poem[] = poemsData.poems;
  const [selectedPoem, setSelectedPoem] = useState<Poem>(poems[0]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const gradientBackground = useColorModeValue(
    'linear(to-r, #ebf3fc, #d1e7f8)',
    'linear(to-r, #202023, #2c2c2e)',
  );
  const mobileBarBg = useColorModeValue('#d1e7f8', '#1a1a1e');
  const mobileAccent = useColorModeValue('#1363d2', '#c084fc');

  const handleSelectPoem = (poem: Poem) => {
    setSelectedPoem(poem);
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
              selectedPoemId={selectedPoem.id}
              onSelectPoem={setSelectedPoem}
            />
          </Box>

          <PoemDisplay poem={selectedPoem} />
        </Flex>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bg={mobileBarBg}>
          <DrawerCloseButton zIndex={2} />
          <ArtsSidebar
            poems={poems}
            selectedPoemId={selectedPoem.id}
            onSelectPoem={handleSelectPoem}
            variant="drawer"
          />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ArtsPage;
