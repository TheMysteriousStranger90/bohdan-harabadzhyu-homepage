import {
    Avatar,
    Box,
    chakra,
    Flex,
    Icon,
    SimpleGrid,
    Stack,
    useColorModeValue,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import Footer from "./Footer";
import Profile from "./Profile";
import {FiGithub, FiMail, FiBookOpen} from 'react-icons/fi';
import {FaTelegram} from 'react-icons/fa';
import ContactIcon from "./ContactIcon";
import {IconButton, useColorMode} from '@chakra-ui/react';
import {FaSun, FaMoon} from 'react-icons/fa';

const myinformation = [
    {
        index: 1,
        title: 'ABOUT ME',
        content:
            ' I am passionate about C# development and focus on creating applications using ASP.NET MVC, .NET Core and Web API. I aspire to combine my passion for programming and technology to create engaging web applications. I am also fond of classical music, fiction literature and English lessons. ',
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
            '|| Programming languages: C#, TypeScript, SQL || ' + 'Frameworks: ASP.NET Core, Entity Framework, Blazor, Angular, Avalonia UI || ' + 'Database: MSSQL || ',
        logo:
            './cpu.svg',
    },
    {
        index: 4,
        title: 'SOME PROJECTS',
        content: [
            {name: 'WhisperFTPApp', url: 'https://github.com/TheMysteriousStranger90/WhisperFTPApp'},
            {name: 'VoiceRecorder', url: 'https://github.com/TheMysteriousStranger90/VoiceRecorder'},
            {name: 'LogAnalyzerForWindows', url: 'https://github.com/TheMysteriousStranger90/LogAnalyzerForWindows'},
            {
                name: 'FashionClothesAndTrends',
                url: 'https://github.com/TheMysteriousStranger90/FashionClothesAndTrends'
            },
            {name: 'TheatreProjectMicroservices', url: 'https://github.com/TheMysteriousStranger90/TheatreProjectMicroservices'},
            {name: 'ArtGallery', url: 'https://github.com/TheMysteriousStranger90/ArtGallery'},
            {name: 'CodeForum', url: 'https://github.com/TheMysteriousStranger90/CodeForum'},
            {name: 'TelegramBotForSpotify', url: 'https://github.com/TheMysteriousStranger90/TelegramBotForSpotify'},
            {name: 'MedicalApp', url: 'https://github.com/TheMysteriousStranger90/MedicalApp'},
            {name: 'TheSailOS', url: 'https://github.com/TheMysteriousStranger90/TheSailOS'},
            {name: 'ConsoleWebScraper', url: 'https://github.com/TheMysteriousStranger90/ConsoleWebScraper'},
            {name: 'Cleanup.WindowsService', url: 'https://github.com/TheMysteriousStranger90/Cleanup.WindowsService'},
            {name: 'FileConversionLibrary', url: 'https://www.nuget.org/packages/FileConversionLibrary'},
            {name: 'SaveEditorForPathologic2', url: 'https://www.nexusmods.com/pathologic2/mods/27'},
            {name: 'TheLighthouseWavesPlayer', url: 'https://github.com/walk-away/TheLighthouseWavesPlayer'},
            {name: 'AzureSpeechProject', url: 'https://github.com/TheMysteriousStranger90/AzureSpeechProject'}
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

const ThemeToggleButton = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const buttonBackground = useColorModeValue('#1363d2', '#68217a');
    const buttonColor = useColorModeValue('#202023', '#f7fafc');

    return (
        <IconButton
            aria-label="Toggle theme"
            icon={colorMode === 'light' ? <FaMoon/> : <FaSun/>}
            onClick={toggleColorMode}
            color={buttonColor}
            backgroundColor={buttonBackground}
        />
    );
};

const LinksMenuButton = () => {
    const buttonBackground = useColorModeValue('#1363d2', '#68217a');
    const buttonColor = useColorModeValue('#202023', '#f7fafc');
    const menuBackground = useColorModeValue('#ebf3fc', '#2c2c2e');
    const borderColor = useColorModeValue('#e2e8f0', '#4a5568');

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Links Menu"
                icon={<FiBookOpen size={20} />}
                color={buttonColor}
                backgroundColor={buttonBackground}
            />
            <MenuList p={1} minW="auto" bg={menuBackground}>
                <MenuItem
                    as="a"
                    href="https://dev.to/themysteriousstranger90"
                    target="_blank"
                    py={2}
                    px={3}
                    lineHeight="1.4"
                    minH="36px"
                    display="flex"
                    alignItems="center"
                >
                    <Box
                        as="img"
                        src="./devdotto.svg"
                        alt="Dev.to"
                        borderRadius="md"
                        border="1px solid"
                        borderColor={borderColor}
                        p={1}
                        mr={2}
                        width="30px"  // Reduced width
                        height="30px" // Reduced height
                    />
                    Dev.to
                </MenuItem>
                <MenuItem
                    as="a"
                    href="https://medium.com/@bohdan.harabadzhyu"
                    target="_blank"
                    py={2}
                    px={3}
                    lineHeight="1.4"
                    minH="36px"
                    display="flex"
                    alignItems="center"
                >
                    <Box
                        as="img"
                        src="./medium.svg"
                        alt="Medium"
                        borderRadius="md"
                        border="1px solid"
                        borderColor={borderColor}
                        p={1}
                        mr={2}
                        width="30px"
                        height="30px"
                    />
                    Medium
                </MenuItem>
            </MenuList>
        </Menu>
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
    const { title, content, logo, index } = props;
    const backgroundColor = useColorModeValue('#1363d2', '#68217a');
    const textColor = useColorModeValue('#202023', '#f7fafc');
    const linkHoverColor = useColorModeValue('#f7fafc', '#202023');

    return (
        <Flex
            boxShadow={'lg'}
            maxW={'600px'}
            direction={{ base: 'column', md: 'row' }}
            width={'full'}
            rounded={'xs'}
            p={10}
            justifyContent={'space-between'}
            position={'relative'}
            bg={backgroundColor}
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
        >
            <Flex
                direction={'column'}
                textAlign={'left'}
                justifyContent={'space-between'}
                flex="1"
            >
                <chakra.p fontFamily={'Open Sans'} fontWeight={'bold'} fontSize={22} color={textColor}>
                    {title}
                </chakra.p>

                {Array.isArray(content) ? (
                    <chakra.p
                        fontFamily={'Oswald'}
                        fontWeight={'large'}
                        fontSize={'20px'}
                        pb={8}
                        color={textColor}
                        maxHeight={'160px'}
                        overflowY={'auto'}
                        css={{
                            '&::-webkit-scrollbar': {
                                width: '0px',
                                height: '0px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'transparent',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'transparent',
                            },
                        }}
                    >
                        {content.map((project: Project, idx: number) => (
                            <chakra.span key={project.name}>
                                <chakra.a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    _hover={{
                                        color: linkHoverColor,
                                    }}
                                >
                                    {project.name}
                                </chakra.a>
                                {idx < content.length - 1 && ', '}
                            </chakra.span>
                        ))}
                    </chakra.p>
                ) : (
                    <chakra.p
                        fontFamily={'Oswald'}
                        fontWeight={'large'}
                        fontSize={'20px'}
                        pb={8}
                        color={textColor}
                    >
                        {content}
                    </chakra.p>
                )}
            </Flex>
            <Avatar
                src={logo}
                height={'120px'}
                width={'120px'}
                alignSelf={{ base: 'center', md: 'center' }}
                m={{ base: '20px 0 0 0', md: '0 0 0 50px' }}
            />
        </Flex>
    );
}

export default function GridBlurredBackdrop() {
    const textColor = useColorModeValue('#202023', '#f7fafc');
    const iconColor = useColorModeValue('#1363d2', '#68217a');
    const gradientBackground = useColorModeValue('linear(to-r, #ebf3fc, #d1e7f8)', 'linear(to-r, #202023, #2c2c2e)');

    return (
        <Flex
            textAlign={'center'}
            pt={10}
            justifyContent={'center'}
            direction={'column'}
            width={'full'}
            bgGradient={gradientBackground}
            minH={'100vh'}
            p={5}
        >

            <Box position="absolute" top={2} right={2}>
                <Stack direction="row" spacing={4}>
                    <ThemeToggleButton />
                    <LinksMenuButton />
                </Stack>
            </Box>

            <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>

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
                columns={{ base: 1, xl: 2 }}
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
                         stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
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