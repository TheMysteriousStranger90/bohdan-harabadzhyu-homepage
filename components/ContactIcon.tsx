import React from 'react'
import {IconButton, useColorModeValue, useTheme} from '@chakra-ui/react'

type ContactIconProps = {
    label: string;
    link: string;
    icon: React.ReactElement;
}

const ContactIcon: React.FC<ContactIconProps> = ({label, link, icon}) => {

    return (
        <IconButton
            as='a'
            aria-label={label}
            isRound
            tabIndex={0}
            size='lg'
            colorScheme='grey'
            color={'#f7fafc'}
            backgroundColor={'#68217a'}
            href={link}
            target='_blank'
            rel='noopener'
            icon={icon}
            variant='ghost'
        />
    );
}

export default ContactIcon;