import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Flex, Stack, useColorModeValue } from '@chakra-ui/react';
import ArtsSidebar from '@/components/arts/ArtsSidebar';
import PoemDisplay from '@/components/arts/PoemDisplay';
import type { Poem } from '@/components/arts/ArtsSidebar';
import ThemeToggleButton from '@/components/ui/ThemeToggleButton';
import LanguageToggleButton from '@/components/ui/LanguageToggleButton';
import poemsData from '@/assets/data/poems.json';

const ArtsPage: NextPage = () => {
  const poems: Poem[] = poemsData.poems;
  const [selectedPoem, setSelectedPoem] = useState<Poem>(poems[0]);

  const gradientBackground = useColorModeValue(
    'linear(to-r, #ebf3fc, #d1e7f8)',
    'linear(to-r, #202023, #2c2c2e)',
  );

  return (
    <>
      <Head>
        <title>Bohdan Harabadzhyu | Arts</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex minH="100vh" bgGradient={gradientBackground}>
        <ArtsSidebar
          poems={poems}
          selectedPoemId={selectedPoem.id}
          onSelectPoem={setSelectedPoem}
        />

        <Box flex="1" position="relative">
          <Box position="absolute" top={2} right={2} zIndex={1}>
            <Stack direction="row" spacing={4}>
              <ThemeToggleButton />
              <LanguageToggleButton />
            </Stack>
          </Box>
          <PoemDisplay poem={selectedPoem} />
        </Box>
      </Flex>
    </>
  );
};

export default ArtsPage;
