import React from 'react';
import { Box } from '@chakra-ui/react';

interface SubSectionProps {
  children: React.ReactNode;
  id?: string;
}

const SubSection: React.FC<SubSectionProps> = ({ children, id }) => (
  <Box as="section" id={id} alignItems="center" justifyContent="center" py={10}>
    {children}
  </Box>
);

export default SubSection;
