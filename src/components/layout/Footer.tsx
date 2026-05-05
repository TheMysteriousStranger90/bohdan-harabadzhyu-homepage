import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useLanguage } from '@/context/LanguageContext';
import translations from '@/data/translations';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Flex align="center" justify="center" width="100%" pb={5}>
      <Text align="center">
        &copy; {new Date().getFullYear()} Bohdan Harabadzhyu. {t.footerRights}
      </Text>
    </Flex>
  );
};

export default Footer;
