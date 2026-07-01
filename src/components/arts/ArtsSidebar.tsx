import React, { useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Collapse,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiChevronUp, FiChevronDown, FiPenTool, FiMusic } from 'react-icons/fi';
import { useLanguage } from '@/context/LanguageContext';
import translations from '@/data/translations';

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

  const { language } = useLanguage();
  const t = translations[language];

  // Match main page color scheme
  const sidebarBg = useColorModeValue('#d1e7f8', '#1a1a1e');
  const borderColor = useColorModeValue('#93c5fd', '#2a2a2e');
  const textColor = useColorModeValue('#202023', '#f7fafc');
  const mutedText = useColorModeValue('#4b5563', '#9ca3af');
  const hoverBg = useColorModeValue('transparent', 'rgba(255,255,255,0.05)');
  const selectedColor = useColorModeValue('#1363d2', '#c084fc');
  const selectedBg = useColorModeValue('rgba(19,99,210,0.12)', 'rgba(192,132,252,0.08)');
  const chevronColor = useColorModeValue('#1363d2', '#68217a');

  // Icon badge — same colors as ContactIcon
  const iconBg = useColorModeValue('#1363d2', '#68217a');
  const iconColor = useColorModeValue('#202023', '#f7fafc');

  return (
    <Box
      w={{ base: '200px', md: '240px' }}
      minH="100vh"
      bg={sidebarBg}
      borderRight={`1px solid ${borderColor}`}
      py={6}
      px={4}
      flexShrink={0}
      overflowY="auto"
    >
      {/* Photo2 — back to homepage (NextLink is the <a>, Box is <div>) */}
      <NextLink href="/">
        <Box
          display="block"
          cursor="pointer"
          mb={3}
          w="fit-content"
          mx="auto"
          title={t.arts.backToMain}
        >
          <Image
            src="/Photo2.png"
            alt="Bogdan Garabagiu"
            borderRadius="full"
            w="130px"
            h="130px"
            objectFit="cover"
            border={`2px solid ${iconBg}`}
            transition="transform 0.2s, opacity 0.2s"
            _hover={{ transform: 'scale(1.05)', opacity: 0.85 }}
          />
        </Box>
      </NextLink>

      <Text
        color={textColor}
        fontFamily="var(--font-lora)"
        fontSize="sm"
        fontWeight="600"
        textAlign="center"
        mb={6}
      >
        Bogdan Garabagiu
      </Text>

      {/* POEMS / СТИХИ section */}
      <Box mb={4}>
        <Flex
          align="center"
          gap={2}
          cursor="pointer"
          onClick={() => setPoemsOpen(v => !v)}
          py={2}
          px={2}
          borderRadius="md"
          _hover={{ bg: hoverBg }}
          userSelect="none"
        >
          {/* Round icon badge — matches ContactIcon style */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="34px"
            h="34px"
            borderRadius="full"
            bg={iconBg}
            color={iconColor}
            flexShrink={0}
          >
            <FiPenTool size={15} />
          </Box>
          <Text
            color={textColor}
            fontFamily="var(--font-lora)"
            fontWeight="700"
            fontSize="sm"
            letterSpacing="wider"
            flex="1"
          >
            {t.arts.poems}
          </Text>
          {poemsOpen
            ? <FiChevronUp color={chevronColor} size={16} />
            : <FiChevronDown color={chevronColor} size={16} />}
        </Flex>

        <Collapse in={poemsOpen} animateOpacity>
          <VStack align="stretch" spacing={0} pl={2} mt={1}>
            {poems.map(poem => (
              <Text
                key={poem.id}
                py={1.5}
                px={3}
                fontSize="sm"
                fontFamily="var(--font-lora)"
                cursor="pointer"
                borderRadius="md"
                color={selectedPoemId === poem.id ? selectedColor : mutedText}
                fontWeight={selectedPoemId === poem.id ? '600' : '400'}
                bg={selectedPoemId === poem.id ? selectedBg : 'transparent'}
                borderLeft={`2px solid ${selectedPoemId === poem.id ? selectedColor : 'transparent'}`}
                transition="all 0.15s"
                _hover={{ color: textColor, bg: hoverBg }}
                onClick={() => onSelectPoem(poem)}
                noOfLines={2}
              >
                {poem.title}
              </Text>
            ))}
          </VStack>
        </Collapse>
      </Box>

      {/* MUSIC / МУЗЫКА section */}
      <Box>
        <Flex
          align="center"
          gap={2}
          cursor="pointer"
          onClick={() => setMusicOpen(v => !v)}
          py={2}
          px={2}
          borderRadius="md"
          _hover={{ bg: hoverBg }}
          userSelect="none"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="34px"
            h="34px"
            borderRadius="full"
            bg={iconBg}
            color={iconColor}
            flexShrink={0}
          >
            <FiMusic size={15} />
          </Box>
          <Text
            color={textColor}
            fontFamily="var(--font-lora)"
            fontWeight="700"
            fontSize="sm"
            letterSpacing="wider"
            flex="1"
          >
            {t.arts.music}
          </Text>
          {musicOpen
            ? <FiChevronUp color={chevronColor} size={16} />
            : <FiChevronDown color={chevronColor} size={16} />}
        </Flex>

        <Collapse in={musicOpen} animateOpacity>
          <Box pl={4} pr={2} py={3}>
            <Text
              color={mutedText}
              fontFamily="var(--font-lora)"
              fontSize="xs"
              lineHeight="tall"
            >
              {t.arts.musicComingSoon}
            </Text>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default ArtsSidebar;
