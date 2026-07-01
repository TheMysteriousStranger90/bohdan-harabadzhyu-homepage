import React from 'react';
import { Box, Flex, Text, Link, useColorModeValue } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';
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

  const cardBg = useColorModeValue('#6d28d9', '#5b21b6');
  const linkColor = '#c4b5fd';

  return (
    <Flex flex="1" align="center" justify="center" p={{ base: 4, md: 10 }} overflowY="auto" pt={{ base: 16, md: 16 }}>
      <Box
        bg={cardBg}
        borderRadius="xl"
        p={{ base: 6, md: 10 }}
        maxW="640px"
        w="full"
        boxShadow="0 8px 32px rgba(124, 58, 237, 0.35)"
        textAlign="center"
      >
        <Text
          color="white"
          fontFamily="var(--font-lora)"
          fontWeight="700"
          fontSize={{ base: 'xl', md: '2xl' }}
          mb={6}
        >
          {poem.title}
        </Text>

        {poem.stanzas.map((stanza, idx) => {
          const lines = stanza.split('\n');
          const firstLine = lines[0].trim();
          const hasHeading = SECTION_HEADING_RE.test(firstLine);

          return (
            <Box key={idx} mt={idx === 0 ? 0 : 5}>
              {hasHeading ? (
                <>
                  <Text
                    color="#e9d5ff"
                    fontFamily="var(--font-lora)"
                    fontWeight="700"
                    fontSize="sm"
                    mb={2}
                    letterSpacing="wide"
                  >
                    {firstLine}
                  </Text>
                  <Text
                    color="white"
                    fontFamily="var(--font-lora)"
                    fontSize={{ base: 'sm', md: 'md' }}
                    whiteSpace="pre-line"
                    lineHeight="tall"
                  >
                    {lines.slice(1).join('\n')}
                  </Text>
                </>
              ) : (
                <Text
                  color="white"
                  fontFamily="var(--font-lora)"
                  fontSize={{ base: 'sm', md: 'md' }}
                  whiteSpace="pre-line"
                  lineHeight="tall"
                >
                  {stanza}
                </Text>
              )}
            </Box>
          );
        })}

        <Box display="flex" justifyContent="center" mt={8}>
          <Link
            href={poem.url}
            isExternal
            display="flex"
            alignItems="center"
            gap={1}
            color={linkColor}
            fontSize="xs"
            fontFamily="var(--font-lora)"
            _hover={{ color: 'white', textDecoration: 'underline' }}
          >
            {t.arts.readOn}
            <FiExternalLink size={12} />
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default PoemDisplay;
