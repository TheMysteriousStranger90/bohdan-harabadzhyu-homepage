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

const myinformation = [
    {
        index: 1,
        title: 'ABOUT ME',
        content:
            'I am passionate about C# development and I focus on application created in ASP.NET MVC, .NET CORE and Web API. ' +
            'I aspire to combine my passion for programming and technology to create interest web applications. ' +
            'I am also fond of classical music, fiction literature and english lessons... ',
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
            '|| Programming languages: C#, TypeScript, SQL || ' + 'Frameworks: ASP.NET Core, Entity Framework, Angular || ' + 'Database: MSSQL || ',
        logo:
            './cpu.svg',
    },
    {
        index: 4,
        title: 'PROJECTS',
        content:
            '    ||   A visit to my GitHub Profile   ||   ',
        logo:
            './terminal.svg',
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


interface TestimonialCardProps {
    title: string;
    content: string;
    logo: string;
    index: number;
}

function TestimonialCard(props: TestimonialCardProps) {
    const {title, content, logo, index} = props;
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
            bg={useColorModeValue('#212121', '#68217a')}
            _after={{}}
            _before={{}}>
            <Flex
                direction={'column'}
                textAlign={'left'}
                justifyContent={'space-between'}>

                <chakra.p fontFamily={'Open Sans'} fontWeight={'bold'} fontSize={22}>
                    {title}
                    <chakra.span
                        fontFamily={'Oswald'}
                        fontWeight={'medium'}
                        color={'f7fafc'}>
                        {' '}
                    </chakra.span>
                </chakra.p>

                <chakra.p
                    fontFamily={'Oswald'}
                    fontWeight={'large'}
                    fontSize={'20px'}
                    pb={8}>
                    {content}
                </chakra.p>

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
    return (
        <Flex
            textAlign={'center'}
            pt={10}
            justifyContent={'center'}
            direction={'column'}
            width={'full'}>

            <Box width={{base: 'full', sm: 'lg', lg: 'xl'}} margin={'auto'}>

                <Profile
                    profileSrc='./Photo.jpg'
                />

                <chakra.h3
                    fontFamily={'Nunito'}
                    fontWeight={'bold'}
                    fontSize={25}
                    color={'#f7fafc'}>
                    Bohdan Harabadzhyu | C# Developer
                </chakra.h3>

                <chakra.h1
                    py={6}
                    fontSize={22}
                    fontFamily={'Nunito'}
                    fontWeight={600}
                    color={'#f7fafc'}>
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
                    color={'#f7fafc'}>
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
                <Icon viewBox="0 12 40 35" mt={8} boxSize={6} color={'#68217a'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
                         stroke="#68217a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
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