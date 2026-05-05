import React from 'react';
import { Avatar, chakra, Flex, useColorModeValue } from '@chakra-ui/react';
import type { InfoItem, Project } from '@/data/myInformation';

const InfoCard: React.FC<InfoItem> = ({ title, content, logo }) => {
  const backgroundColor = useColorModeValue('#1363d2', '#68217a');
  const textColor = useColorModeValue('#202023', '#f7fafc');
  const linkHoverColor = useColorModeValue('#f7fafc', '#202023');

  return (
    <Flex
      boxShadow="lg"
      maxW="600px"
      direction={{ base: 'column', md: 'row' }}
      width="full"
      rounded="xs"
      p={10}
      justifyContent="space-between"
      position="relative"
      bg={backgroundColor}
      transition="transform 0.2s"
      _hover={{ transform: 'scale(1.05)' }}
    >
      <Flex direction="column" textAlign="left" justifyContent="space-between" flex="1">
        <chakra.p fontFamily="Open Sans" fontWeight="bold" fontSize={22} color={textColor}>
          {title}
        </chakra.p>

        {Array.isArray(content) ? (
          <chakra.p
            fontFamily="Oswald"
            fontWeight="large"
            fontSize="20px"
            pb={8}
            color={textColor}
            maxHeight="160px"
            overflowY="auto"
            css={{
              '&::-webkit-scrollbar': { width: '0px', height: '0px' },
              '&::-webkit-scrollbar-track': { background: 'transparent' },
              '&::-webkit-scrollbar-thumb': { background: 'transparent' },
            }}
          >
            {(content as Project[]).map((project, idx) => (
              <chakra.span key={project.name}>
                <chakra.a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ color: linkHoverColor }}
                >
                  {project.name}
                </chakra.a>
                {idx < (content as Project[]).length - 1 && ', '}
              </chakra.span>
            ))}
          </chakra.p>
        ) : (
          <chakra.p fontFamily="Oswald" fontWeight="large" fontSize="20px" pb={8} color={textColor}>
            {content}
          </chakra.p>
        )}
      </Flex>

      <Avatar
        src={logo}
        height="120px"
        width="120px"
        alignSelf={{ base: 'center', md: 'center' }}
        m={{ base: '20px 0 0 0', md: '0 0 0 50px' }}
      />
    </Flex>
  );
};

export default InfoCard;
