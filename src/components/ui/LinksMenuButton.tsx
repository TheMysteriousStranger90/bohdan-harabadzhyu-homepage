import React from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiBookOpen } from 'react-icons/fi';

const LinksMenuButton: React.FC = () => {
  const buttonBackground = useColorModeValue('#1363d2', '#68217a');
  const buttonColor = useColorModeValue('#202023', '#f7fafc');
  const menuBackground = useColorModeValue('#ebf3fc', '#2c2c2e');
  const menuItemBg = useColorModeValue('#ebf3fc', '#2c2c2e');
  const menuItemHoverBg = useColorModeValue('#b6d6fe', '#4a2060');
  const menuItemText = useColorModeValue('#202023', '#f7fafc');
  const borderColor = useColorModeValue('#e2e8f0', '#4a5568');

  const itemProps = {
    as: 'a' as const,
    target: '_blank',
    rel: 'noopener noreferrer',
    fontFamily: "var(--font-lora)",
    py: 2,
    px: 3,
    lineHeight: '1.4',
    minH: '36px',
    display: 'flex',
    alignItems: 'center',
    bg: menuItemBg,
    color: menuItemText,
    _hover: { bg: menuItemHoverBg },
    _focus: { bg: menuItemHoverBg, boxShadow: 'none' },
    _active: { bg: menuItemHoverBg },
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Links Menu"
        icon={<FiBookOpen size={20} />}
        color={buttonColor}
        backgroundColor={buttonBackground}
      />
      <MenuList p={1} minW="auto" bg={menuBackground} borderColor={borderColor}>
        <MenuItem
          {...itemProps}
          href="https://dev.to/themysteriousstranger90"
        >
          <Box
            as="img" src="./devdotto.svg" alt="Dev.to"
            borderRadius="md" border="1px solid" borderColor={borderColor}
            p={1} mr={2} width="30px" height="30px"
          />
          Dev.to
        </MenuItem>
        <MenuItem
          {...itemProps}
          href="https://medium.com/@bohdan.harabadzhyu"
        >
          <Box
            as="img" src="./medium.svg" alt="Medium"
            borderRadius="md" border="1px solid" borderColor={borderColor}
            p={1} mr={2} width="30px" height="30px"
          />
          Medium
        </MenuItem>
        <MenuItem
          {...itemProps}
          href="https://habr.com/ru/users/TheMysteriousStranger90/articles/"
        >
          <Box
            as="img" src="./habr.svg" alt="Medium"
            borderRadius="md" border="1px solid" borderColor={borderColor}
            p={1} mr={2} width="30px" height="30px"
          />
          Хабр
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LinksMenuButton;
