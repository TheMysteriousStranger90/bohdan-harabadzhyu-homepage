import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const Footer: React.FC = () => (
  <Flex align="center" justify="center" width="100%" pb={5}>
    <Text align="center">
      &copy; {new Date().getFullYear()} Bohdan Harabadzhyu. All rights reserved.
    </Text>
  </Flex>
);

export default Footer;
