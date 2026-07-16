import React from 'react';
import {Box, chakra, Flex, useColorModeValue} from '@chakra-ui/react';
import {useLanguage} from '@/context/LanguageContext';
import translations from '@/data/translations';
import type {Track} from './ArtsSidebar';

interface TrackDisplayProps {
  track: Track;
}

const TrackDisplay: React.FC<TrackDisplayProps> = ({track}) => {
  const {language} = useLanguage();
  const t = translations[language];

  // Exact same values as PoemDisplay / InfoCard
  const backgroundColor = useColorModeValue('#1363d2', '#68217a');
  const textColor = useColorModeValue('#202023', '#f7fafc');
  const linkHoverColor = useColorModeValue('#f7fafc', '#202023');
  const playerColor = useColorModeValue('1363d2', 'c084fc');

  const embedSrc =
    'https://w.soundcloud.com/player/?url=' +
    encodeURIComponent(track.url) +
    `&color=%23${playerColor}` +
    '&auto_play=false&hide_related=true&show_comments=false' +
    '&show_user=true&show_reposts=false&show_teaser=false&visual=true';

  return (
    <Flex
      flex="1"
      align="flex-start"
      justify="center"
      p={{base: 4, md: 10}}
      overflowY="auto"
      pt={{base: 6, md: 10}}
    >
      <Box
        boxShadow="lg"
        maxW="600px"
        w="full"
        rounded="xs"
        p={{base: 5, md: 10}}
        bg={backgroundColor}
        transition="transform 0.2s, box-shadow 0.2s"
        _hover={{transform: 'translateY(-4px)', boxShadow: '2xl'}}
        textAlign="center"
      >
        <chakra.p
          fontFamily="var(--font-lora)"
          fontWeight="bold"
          fontSize={{base: 18, md: 22}}
          color={textColor}
          mb={6}
        >
          {track.title}
        </chakra.p>

        {/* SoundCloud embedded player */}
        <Box rounded="xs" overflow="hidden">
          <chakra.iframe
            key={embedSrc}
            title={track.title}
            src={embedSrc}
            w="full"
            h={{base: '320px', md: '400px'}}
            border="none"
            allow="autoplay"
            loading="lazy"
          />
        </Box>

        {/* Link to original — same style as in PoemDisplay */}
        <chakra.p fontFamily="var(--font-lora)" fontSize="14px" color={textColor} mt={8} opacity={0.7}>
          <chakra.a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            _hover={{color: linkHoverColor}}
          >
            {t.arts.listenOn} ↗
          </chakra.a>
        </chakra.p>
      </Box>
    </Flex>
  );
};

export default TrackDisplay;
