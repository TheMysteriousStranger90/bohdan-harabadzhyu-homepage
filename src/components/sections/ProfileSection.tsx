import React from 'react';
import { Box, Flex, Image, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import SubSection from '@/components/layout/SubSection';

interface ProfileSectionProps {
  profileSrc: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profileSrc }) => {
  const borderColor = useColorModeValue('#0d47a1', '#222224');
  const boxShadow = useColorModeValue(
    '0 4px 6px rgba(0, 0, 0, 0.1)',
    '0 4px 6px rgba(0, 0, 0, 0.6)',
  );
  const borderStyle = '0.5px solid ' + borderColor;

  return (
    <SubSection id="profile">
      <Flex align="center" justify="center" wrap="wrap" pt={2}>
        <Box
          display="block"
          minW={{ base: '210px', sm: '210px', md: '0 0 0 50px' }}
          h="100%"
          px={{ base: 2, sm: 2 }}
          py={2}
        >
          <NextLink href="/arts" passHref>
            <Box as="a" display="block" title="Творчество">
              <Image
                w="100%"
                maxW="225px"
                src={profileSrc}
                borderRadius="full"
                alt="Bohdan Harabadzhyu photo"
                border={borderStyle}
                boxShadow={boxShadow}
                transition="transform 0.2s, box-shadow 0.2s"
                cursor="pointer"
                _hover={{
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
                }}
              />
            </Box>
          </NextLink>
        </Box>
      </Flex>
    </SubSection>
  );
};

export default ProfileSection;
