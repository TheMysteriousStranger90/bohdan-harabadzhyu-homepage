import {
    Avatar,
    Box,
    chakra,
    Container,
    Flex,
    Icon,
    SimpleGrid, Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import Footer from "./Footer";
import Profile from "./Profile";
import {FiGithub, FiMail} from 'react-icons/fi';
import {FaTelegram} from 'react-icons/fa';
import ContactIcon from "./ContactIcon";

import { IconButton, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const myinformation = [
    {
        index: 1,
        title: 'ABOUT ME',
        content:
            ' I am passionate about C# development and focus on creating applications using ASP.NET MVC, .NET Core, and Web API. I aspire to combine my passion for programming and technology to create engaging web applications. I am also fond of classical music, fiction literature, and English lessons. ',
        logo:
            './smile.svg',
    },
    {
        index: 2,
        title: 'EDUCATION',
        content:
            '|| First Higher Education – V.O. Sukhomlynskyi Mykolaiv National University (Ethnology. Obtained qualification: Master Degree. 2017)\n' +
            '|| Second Higher Education – Admiral Makarov National University of Shipbuilding (Computer sciences. Obtained qualification: Bachelor’s Degree. 2021) ||',
        logo:
            './book.svg',
    },
    {
        index: 3,
        title: 'SKILLS',
        content:
            '|| Programming languages: C#, TypeScript, SQL || ' + 'Frameworks: ASP.NET Core, Entity Framework, Angular, Avalonia UI || ' + 'Database: MSSQL || ',
        logo:
            './cpu.svg',
    },
    {
        index: 4,
        title: 'SOME PROJECTS',
        content: [
            { name: 'VoiceRecorder', url: 'https://github.com/TheMysteriousStranger90/VoiceRecorder' },
            { name: 'LogAnalyzerForWindows', url: 'https://github.com/TheMysteriousStranger90/LogAnalyzerForWindows' },
            { name: 'SocialNetworkV2', url: 'https://github.com/TheMysteriousStranger90/SocialNetworkV2' },
            { name: 'CodeForum', url: 'https://github.com/TheMysteriousStranger90/CodeForum' },
            { name: 'TelegramBotForSpotify', url: 'https://github.com/TheMysteriousStranger90/TelegramBotForSpotify' },
            { name: 'ConsoleWebScraper', url: 'https://github.com/TheMysteriousStranger90/ConsoleWebScraper' },
            // добавьте больше проектов здесь
        ],
        logo: './terminal.svg',
    },
];

const basicInfo = (
    <>
        <ContactIcon
            label='email'
            link={`mailto:bohdan_harabadzhyu@outlook.com`}
            icon={<FiMail size={32}/>}
        />

        <ContactIcon
            label='telegram'
            link={`https://t.me/TheMysteriousStranger90`}
            icon={<FaTelegram size={32}/>}
        />

        <ContactIcon
            label='github'
            link={`https://github.com/TheMysteriousStranger90`}
            icon={<FiGithub size={32}/>}
        />
    </>
);

const githubInfo = (
    <>
        <ContactIcon
            label='github'
            link={`https://github.com/TheMysteriousStranger90`}
            icon={<FiGithub size={32}/>}
        />
    </>
);

const ThemeToggleButton = () => {
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


interface Project {
    name: string;
    url: string;
}

interface TestimonialCardProps {
    title: string;
    content: string | Project[];
    logo: string;
    index: number;
}

function TestimonialCard(props: TestimonialCardProps) {
    const {title, content, logo, index} = props;
    const backgroundColor = useColorModeValue('#1363d2', '#68217a');
    const textColor = useColorModeValue('#202023', '#f7fafc');

    return (
        <Flex
            boxShadow={'lg'}
            maxW={'600px'}
            direction={{base: 'row', md: 'row'}}
            width={'full'}
            rounded={'xs'}
            p={10}
            justifyContent={'space-between'}
            position={'relative'}
            bg={backgroundColor}
            _after={{}}
            _before={{}}>
            <Flex
                direction={'column'}
                textAlign={'left'}
                justifyContent={'space-between'}>

                <chakra.p fontFamily={'Open Sans'} fontWeight={'bold'} fontSize={22} color={textColor}>
                    {title}
                    <chakra.span
                        fontFamily={'Oswald'}
                        fontWeight={'medium'}
                        color={textColor}>
                        {' '}
                    </chakra.span>
                </chakra.p>

                {Array.isArray(content) ? (
                    <chakra.p
                        fontFamily={'Oswald'}
                        fontWeight={'large'}
                        fontSize={'20px'}
                        pb={8}
                        color={textColor}>
                        {content.map((project: Project) => (
                            <chakra.a href={project.url} key={project.name}>
                                {project.name}
                            </chakra.a>
                        )).reduce((prev: (JSX.Element | string)[], curr: JSX.Element, index: number) => {
                            return index === 0 ? [curr] : [...prev, ', ', curr];
                        }, [])}
                    </chakra.p>
                ) : (
                    <chakra.p
                        fontFamily={'Oswald'}
                        fontWeight={'large'}
                        fontSize={'20px'}
                        pb={8}
                        color={textColor}>
                        {content}
                    </chakra.p>
                )}

            </Flex>
            <Avatar
                src={logo}
                height={'120px'}
                width={'120px'}
                alignSelf={'center'}
                m={{base: '0 0 35px 0', md: '0 0 0 50px'}}
            />
        </Flex>
    );
}

export default function GridBlurredBackdrop() {
    const textColor = useColorModeValue('#202023', '#f7fafc');
    const iconColor = useColorModeValue('#1363d2', '#68217a');

    return (
        <Flex
            textAlign={'center'}
            pt={10}
            justifyContent={'center'}
            direction={'column'}
            width={'full'}>

            <Box position="absolute" top={2} right={2}>
                <ThemeToggleButton />
            </Box>

            <Box width={{base: 'full', sm: 'lg', lg: 'xl'}} margin={'auto'}>

                <Profile
                    profileSrc='./Photo.jpg'
                />

                <chakra.h3
                    fontFamily={'Nunito'}
                    fontWeight={'bold'}
                    fontSize={25}
                    color={textColor}>
                    Bohdan Harabadzhyu | C# Developer
                </chakra.h3>

                <chakra.h1
                    py={6}
                    fontSize={22}
                    fontFamily={'Nunito'}
                    fontWeight={600}
                    color={textColor}>
                    How to reach me ...
                    <Stack
                        aria-label='email info'
                        alignItems='center'
                        mt={2}
                        spacing={2}
                        textAlign={'center'}
                        pt={0}
                        justifyContent={'center'}
                        direction={'row'}
                        width={'full'}
                    >
                        {basicInfo}
                    </Stack>
                </chakra.h1>

                <chakra.h2
                    margin={'auto'}
                    width={'70%'}
                    fontFamily={'Inter'}
                    fontWeight={'medium'}
                    color={textColor}>
                    ...a few facts about me...
                </chakra.h2>

            </Box>
            <SimpleGrid
                columns={{base: 1, xl: 2}}
                spacing={'20'}
                mt={16}
                mx={'auto'}>
                {myinformation.map((cardInfo, index) => (
                    <TestimonialCard key={cardInfo.index}  {...cardInfo} />
                ))}
            </SimpleGrid>
            <Box>
                <Icon viewBox="0 12 40 35" mt={8} boxSize={6} color={iconColor}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
                         stroke={iconColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         className="feather feather-code">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                </Icon>
            </Box>
            <Footer></Footer>
        </Flex>
    );
}