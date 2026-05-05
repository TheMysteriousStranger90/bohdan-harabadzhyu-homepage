import React from 'react';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { FaYoutube } from 'react-icons/fa';

const YouTubeButton: React.FC = () => {
  const buttonBackground = useColorModeValue('#1363d2', '#68217a');
  const buttonColor = useColorModeValue('#202023', '#f7fafc');

  return (
    <IconButton
      as="a"
      aria-label="YouTube channel"
      href="https://www.youtube.com/@TheMysteriousStranger90"
      target="_blank"
      rel="noopener noreferrer"
      icon={<FaYoutube size={20} />}
      color={buttonColor}
      backgroundColor={buttonBackground}
    />
  );
};

export default YouTubeButton;