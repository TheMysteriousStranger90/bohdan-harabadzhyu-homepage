import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Flex } from '@chakra-ui/react';
import ArtsSidebar from '@/components/arts/ArtsSidebar';
import PoemDisplay from '@/components/arts/PoemDisplay';
import type { Poem } from '@/components/arts/ArtsSidebar';
import poemsData from '@/assets/data/poems.json';

const ArtsPage: NextPage = () => {
  const poems: Poem[] = poemsData.poems;
  const [selectedPoem, setSelectedPoem] = useState<Poem>(poems[0]);

  return (
    <>
      <Head>
        <title>Богдан Харабаджю | Творчество</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex minH="100vh" bg="#0d0d10">
        <ArtsSidebar
          poems={poems}
          selectedPoemId={selectedPoem.id}
          onSelectPoem={setSelectedPoem}
        />
        <PoemDisplay poem={selectedPoem} />
      </Flex>
    </>
  );
};

export default ArtsPage;
