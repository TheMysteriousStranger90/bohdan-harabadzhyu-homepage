import React, {ReactNode} from 'react'
import {Box, Flex, Heading, Image, Stack, Text, useColorModeValue, useTheme} from '@chakra-ui/react'
import SubSection from './SubSection';

type ProfileProps = {
    profileSrc: string;
}

const Profile: React.FC<ProfileProps> = ({profileSrc}) => {

    return (
        <SubSection id='profile'>
            <Flex align='center' justify='center' wrap='wrap' pt={2}>
                <Box
                    display='block'
                    minW={{base: '210px', sm: '210px', md: '230px'}}
                    h='100%'
                    px={{base: 2, sm: 2}}
                    py={2}
                >
                    <Image
                        w='100%'
                        maxW='200px'
                        src={profileSrc}
                        borderRadius='full'
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    />
                </Box>
            </Flex>
        </SubSection>
    );
}

export default Profile;