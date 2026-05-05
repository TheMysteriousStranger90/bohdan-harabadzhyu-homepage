import React from 'react';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggleButton: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const buttonBackground = useColorModeValue('#1363d2', '#68217a');
  const buttonColor = useColorModeValue('#202023', '#f7fafc');

  return (
    <IconButton
      aria-label="Toggle theme"
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      color={buttonColor}
      backgroundColor={buttonBackground}
    />
  );
};

export default ThemeToggleButton;
