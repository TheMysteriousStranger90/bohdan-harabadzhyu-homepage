import React from 'react'
import { IconButton, useColorModeValue } from '@chakra-ui/react'

type ContactIconProps = {
    label: string;
    link: string;
    icon: React.ReactElement;
}

const ContactIcon: React.FC<ContactIconProps> = ({label, link, icon}) => {
    const buttonBackground = useColorModeValue('#1363d2', '#68217a');
    const buttonColor = useColorModeValue('#202023', '#f7fafc');

    return (
        <IconButton
            as='a'
            aria-label={label}
            isRound
            tabIndex={0}
            size='lg'
            colorScheme='grey'
            color={buttonColor}
            backgroundColor={buttonBackground}
            href={link}
            target='_blank'
            rel='noopener'
            icon={icon}
            variant='ghost'
        />
    );
}

export default ContactIcon;