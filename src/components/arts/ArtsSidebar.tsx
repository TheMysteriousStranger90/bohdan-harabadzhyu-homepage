import React, { useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Collapse,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

export interface Poem {
  id: number;
  title: string;
  url: string;
  stanzas: string[];
}

interface ArtsSidebarProps {
  poems: Poem[];
  selectedPoemId: number;
  onSelectPoem: (poem: Poem) => void;
}

const ArtsSidebar: React.FC<ArtsSidebarProps> = ({ poems, selectedPoemId, onSelectPoem }) => {
  const [poemsOpen, setPoemsOpen] = useState(true);
  const [musicOpen, setMusicOpen] = useState(false);

  return (
    <Box
      w={{ base: '200px', md: '240px' }}
      minH="100vh"
      bg="#111113"
      borderRight="1px solid #2a2a2e"
      py={6}
      px={4}
      flexShrink={0}
      overflowY="auto"
    >
      {/* Back navigation via Photo2 */}
      <NextLink href="/" passHref>
        <Box
          as="a"
          display="block"
          cursor="pointer"
          mb={3}
          w="fit-content"
          mx="auto"
          title="Вернуться на главную"
        >
          <Image
            src="/Photo2.png"
            alt="Богдан Харабаджю"
            borderRadius="full"
            w="80px"
            h="80px"
            objectFit="cover"
            border="2px solid #7c3aed"
            transition="border-color 0.2s, box-shadow 0.2s"
            _hover={{
              borderColor: '#a855f7',
              boxShadow: '0 0 12px rgba(168, 85, 247, 0.5)',
            }}
          />
        </Box>
      </NextLink>

      <Text
        color="white"
        fontFamily="var(--font-lora)"
        fontSize="sm"
        fontWeight="600"
        textAlign="center"
        mb={6}
      >
        Богдан Харабаджю
      </Text>

      {/* СТИХИ section */}
      <Box mb={4}>
        <Flex
          align="center"
          gap={2}
          cursor="pointer"
          onClick={() => setPoemsOpen(v => !v)}
          py={2}
          px={2}
          borderRadius="md"
          _hover={{ bg: '#1e1e22' }}
          userSelect="none"
        >
          <Image src="/pen-tool.svg" alt="poems" w="18px" h="18px" filter="invert(60%) sepia(1) saturate(3) hue-rotate(230deg)" />
          <Text color="white" fontFamily="var(--font-lora)" fontWeight="700" fontSize="sm" letterSpacing="wider" flex="1">
            СТИХИ
          </Text>
          {poemsOpen ? <FiChevronUp color="#a78bfa" size={16} /> : <FiChevronDown color="#a78bfa" size={16} />}
        </Flex>

        <Collapse in={poemsOpen} animateOpacity>
          <VStack align="stretch" spacing={0} pl={2}>
            {poems.map(poem => (
              <Text
                key={poem.id}
                py={1.5}
                px={3}
                fontSize="sm"
                fontFamily="var(--font-lora)"
                cursor="pointer"
                borderRadius="md"
                color={selectedPoemId === poem.id ? '#c084fc' : '#9ca3af'}
                fontWeight={selectedPoemId === poem.id ? '600' : '400'}
                borderLeft={selectedPoemId === poem.id ? '2px solid #c084fc' : '2px solid transparent'}
                transition="all 0.15s"
                _hover={{ color: '#e9d5ff', bg: '#1e1e22' }}
                onClick={() => onSelectPoem(poem)}
                noOfLines={2}
              >
                {poem.title}
              </Text>
            ))}
          </VStack>
        </Collapse>
      </Box>

      {/* МУЗЫКА section */}
      <Box>
        <Flex
          align="center"
          gap={2}
          cursor="pointer"
          onClick={() => setMusicOpen(v => !v)}
          py={2}
          px={2}
          borderRadius="md"
          _hover={{ bg: '#1e1e22' }}
          userSelect="none"
        >
          <Image src="/music.svg" alt="music" w="18px" h="18px" filter="invert(60%) sepia(1) saturate(3) hue-rotate(230deg)" />
          <Text color="white" fontFamily="var(--font-lora)" fontWeight="700" fontSize="sm" letterSpacing="wider" flex="1">
            МУЗЫКА
          </Text>
          {musicOpen ? <FiChevronUp color="#a78bfa" size={16} /> : <FiChevronDown color="#a78bfa" size={16} />}
        </Flex>

        <Collapse in={musicOpen} animateOpacity>
          <Box pl={4} pr={2} py={3}>
            <Text color="#6b7280" fontFamily="var(--font-lora)" fontSize="xs" lineHeight="tall" fontStyle="italic">
              В будущем здесь появится музыка из SoundCloud
            </Text>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default ArtsSidebar;
