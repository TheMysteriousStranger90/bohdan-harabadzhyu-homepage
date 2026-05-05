import React from 'react';
import {
  Box,
  chakra,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiGithub, FiMail } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';
import Footer from '@/components/layout/Footer';
import ProfileSection from '@/components/sections/ProfileSection';
import InfoCard from '@/components/sections/InfoCard';
import ContactIcon from '@/components/ui/ContactIcon';
import ThemeToggleButton from '@/components/ui/ThemeToggleButton';
import LanguageToggleButton from '@/components/ui/LanguageToggleButton';
import LinksMenuButton from '@/components/ui/LinksMenuButton';
import YouTubeButton from '@/components/ui/YouTubeButton';
import { MY_PROJECTS } from '@/data/myInformation';
import type { InfoItem } from '@/data/myInformation';
import { useLanguage } from '@/context/LanguageContext';
import translations from '@/data/translations';

const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const textColor = useColorModeValue('#202023', '#f7fafc');
  const iconColor = useColorModeValue('#1363d2', '#68217a');
  const gradientBackground = useColorModeValue(
    'linear(to-r, #ebf3fc, #d1e7f8)',
    'linear(to-r, #202023, #2c2c2e)',
  );

  const infoItems: InfoItem[] = [
    { index: 1, title: t.infoTitles.aboutMe, content: t.infoContent.aboutMe, logo: './smile.svg' },
    { index: 2, title: t.infoTitles.education, content: t.infoContent.education, logo: './book.svg' },
    { index: 3, title: t.infoTitles.skills, content: t.infoContent.skills, logo: './cpu.svg' },
    { index: 4, title: t.infoTitles.personalProjects, content: MY_PROJECTS, logo: './terminal.svg' },
  ];

  return (
    <Flex
      textAlign="center"
      pt={10}
      justifyContent="center"
      direction="column"
      width="full"
      bgGradient={gradientBackground}
      minH="100vh"
      p={5}
    >
      <Box position="absolute" top={2} right={2}>
        <Stack direction="row" spacing={4}>
          <ThemeToggleButton />
          <LanguageToggleButton />
          <YouTubeButton />
          <LinksMenuButton />
        </Stack>
      </Box>

      <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin="auto">
        <ProfileSection profileSrc="./Photo.jpg" />

        <chakra.h3 fontFamily="Nunito" fontWeight="bold" fontSize={25} color={textColor}>
          Bohdan Harabadzhyu | {t.heroSubtitle}
        </chakra.h3>

        <chakra.h1 py={6} fontSize={22} fontFamily="Nunito" fontWeight={600} color={textColor}>
          {t.reachMe}
          <Stack
            aria-label="Contact information"
            alignItems="center"
            mt={2}
            spacing={2}
            textAlign="center"
            pt={0}
            justifyContent="center"
            direction="row"
            width="full"
          >
            <ContactIcon
              label="Email"
              link="mailto:bohdan_harabadzhyu@outlook.com"
              icon={<FiMail size={32} />}
            />
            <ContactIcon
              label="Telegram"
              link="https://t.me/TheMysteriousStranger90"
              icon={<FaTelegram size={32} />}
            />
            <ContactIcon
              label="GitHub"
              link="https://github.com/TheMysteriousStranger90"
              icon={<FiGithub size={32} />}
            />
          </Stack>
        </chakra.h1>

        <chakra.h2
          margin="auto"
          width="70%"
          fontFamily="Inter"
          fontWeight="medium"
          color={textColor}
        >
          {t.factsAboutMe}
        </chakra.h2>
      </Box>

      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing="20" mt={16} mx="auto">
        {infoItems.map((cardInfo) => (
          <InfoCard key={cardInfo.index} {...cardInfo} />
        ))}
      </SimpleGrid>

      <Box>
        <Icon viewBox="0 12 40 35" mt={8} boxSize={6} color={iconColor}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </Icon>
      </Box>

      <Footer />
    </Flex>
  );
};

export default HeroSection;
