import React from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { useLanguage } from '@/context/LanguageContext';

const LanguageToggleButton: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const buttonBackground = useColorModeValue('#1363d2', '#68217a');
  const buttonColor = useColorModeValue('#202023', '#f7fafc');

  return (
    <Button
      aria-label="Toggle language"
      onClick={toggleLanguage}
      color={buttonColor}
      backgroundColor={buttonBackground}
      fontFamily="Nunito"
      fontWeight="bold"
      fontSize="sm"
      minW="2.5rem"
      h="2.5rem"
      px={2}
      _hover={{ opacity: 0.85, backgroundColor: buttonBackground }}
    >
      {language === 'en' ? 'RU' : 'EN'}
    </Button>
  );
};

export default LanguageToggleButton;
