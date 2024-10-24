import React, {ReactNode} from 'react'
import {Box, Flex, Heading, Image, Stack, Text, useColorModeValue, useTheme} from '@chakra-ui/react'
import SubSection from './SubSection';

type ProfileProps = {
    profileSrc: string;
}

const Profile: React.FC<ProfileProps> = ({ profileSrc }) => {
    const borderColor = useColorModeValue('#0d47a1', '#222224');
    const boxShadow = useColorModeValue('0 4px 6px rgba(0, 0, 0, 0.1)', '0 4px 6px rgba(0, 0, 0, 0.6)');

    return (
        <SubSection id='profile'>
            <Flex align='center' justify='center' wrap='wrap' pt={2}>
                <Box
                    display='block'
                    minW={{ base: '210px', sm: '210px', md: '0 0 0 50px' }}
                    h='100%'
                    px={{ base: 2, sm: 2 }}
                    py={2}
                >
                    <Image
                        w='100%'
                        maxW='225px'
                        src={profileSrc}
                        borderRadius='full'
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        alt="Photo"
                        border={`0.5px solid ${borderColor}`}
                        boxShadow={boxShadow}
                        transition="transform 0.2s, box-shadow 0.2s"
                        _hover={{
                            transform: 'scale(1.05)',
                            boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
                        }}
                    />
                </Box>
            </Flex>
        </SubSection>
    );
};

export default Profile;