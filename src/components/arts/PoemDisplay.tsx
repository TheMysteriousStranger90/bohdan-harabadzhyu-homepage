import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';
import type { Poem } from './ArtsSidebar';

interface PoemDisplayProps {
  poem: Poem;
}

const SECTION_HEADING_RE = /^(I{1,3}V?|VI{0,3}|IX|X{0,3})(\..*)?$/;

const isHeading = (line: string) => SECTION_HEADING_RE.test(line.split('\n')[0].trim());

const PoemDisplay: React.FC<PoemDisplayProps> = ({ poem }) => {
  return (
    <Flex flex="1" align="center" justify="center" p={{ base: 4, md: 10 }} overflowY="auto">
      <Box
        bg="#5b21b6"
        borderRadius="xl"
        p={{ base: 6, md: 10 }}
        maxW="640px"
        w="full"
        boxShadow="0 8px 32px rgba(124, 58, 237, 0.35)"
      >
        {/* Title */}
        <Text
          color="white"
          fontFamily="var(--font-lora)"
          fontWeight="700"
          fontSize={{ base: 'xl', md: '2xl' }}
          mb={6}
        >
          {poem.title}
        </Text>

        {/* Stanzas */}
        {poem.stanzas.map((stanza, idx) => {
          const lines = stanza.split('\n');
          const firstLine = lines[0].trim();
          const hasSectionHeading = isHeading(firstLine);

          return (
            <Box key={idx} mt={idx === 0 ? 0 : 5}>
              {hasSectionHeading ? (
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

        {/* Link to original */}
        <Link
          href={poem.url}
          isExternal
          display="flex"
          alignItems="center"
          gap={1}
          mt={8}
          color="#c4b5fd"
          fontSize="xs"
          fontFamily="var(--font-lora)"
          _hover={{ color: '#e9d5ff', textDecoration: 'underline' }}
          w="fit-content"
        >
          Читать на poeziya.ru
          <FiExternalLink size={12} />
        </Link>
      </Box>
    </Flex>
  );
};

export default PoemDisplay;
