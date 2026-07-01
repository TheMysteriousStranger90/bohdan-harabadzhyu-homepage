import React from 'react';
import { Avatar, Box, chakra, Flex, useColorModeValue } from '@chakra-ui/react';
import { useLanguage } from '@/context/LanguageContext';
import translations from '@/data/translations';
import type { Poem } from './ArtsSidebar';

interface PoemDisplayProps {
  poem: Poem;
}

const SECTION_HEADING_RE = /^(I{1,3}V?|VI{0,3}|IX|X{0,3})\./;

const PoemDisplay: React.FC<PoemDisplayProps> = ({ poem }) => {
  const { language } = useLanguage();
  const t = translations[language];

  // Exact same values as InfoCard
  const backgroundColor = useColorModeValue('#1363d2', '#68217a');
  const textColor = useColorModeValue('#202023', '#f7fafc');
  const linkHoverColor = useColorModeValue('#f7fafc', '#202023');

  return (
    <Flex
      flex="1"
      align="flex-start"
      justify="center"
      p={{ base: 4, md: 10 }}
      overflowY="auto"
      pt={10}
    >
      <Box
        boxShadow="lg"
        maxW="600px"
        w="full"
        rounded="xs"
        p={10}
        bg={backgroundColor}
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.02)' }}
      >
        {/* Title — same as InfoCard title */}
        <chakra.p
          fontFamily="var(--font-lora)"
          fontWeight="bold"
          fontSize={22}
          color={textColor}
          mb={6}
        >
          {poem.title}
        </chakra.p>

        {/* Stanzas */}
        {poem.stanzas.map((stanza, idx) => {
          const lines = stanza.split('\n');
          const firstLine = lines[0].trim();
          const hasHeading = SECTION_HEADING_RE.test(firstLine);

          return (
            <Box key={idx} mt={idx === 0 ? 0 : 5}>
              {hasHeading ? (
                <>
                  <chakra.p
                    fontFamily="var(--font-lora)"
                    fontWeight="bold"
                    fontSize="sm"
                    color={textColor}
                    mb={2}
                    letterSpacing="wide"
                    opacity={0.75}
                  >
                    {firstLine}
                  </chakra.p>
                  <chakra.p
                    fontFamily="var(--font-lora)"
                    fontSize="18px"
                    color={textColor}
                    whiteSpace="pre-line"
                    lineHeight="tall"
                  >
                    {lines.slice(1).join('\n')}
                  </chakra.p>
                </>
              ) : (
                <chakra.p
                  fontFamily="var(--font-lora)"
                  fontSize="18px"
                  color={textColor}
                  whiteSpace="pre-line"
                  lineHeight="tall"
                >
                  {stanza}
                </chakra.p>
              )}
            </Box>
          );
        })}

        {/* Link to original — same style as project links in InfoCard */}
        <chakra.p fontFamily="var(--font-lora)" fontSize="14px" color={textColor} mt={8} opacity={0.7}>
          <chakra.a
            href={poem.url}
            target="_blank"
            rel="noopener noreferrer"
            _hover={{ color: linkHoverColor }}
          >
            {t.arts.readOn} ↗
          </chakra.a>
        </chakra.p>
      </Box>
    </Flex>
  );
};

export default PoemDisplay;
