import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import theme from '../components/Footer';
import Footer from "../components/Footer";
import BasicGrid from "../components/BasicGrid";
import {
    Avatar,
    Box,
    chakra,
    Container,
    Flex,
    Icon,
    SimpleGrid,
    useColorModeValue,
} from '@chakra-ui/react';
import GridBlurredBackdrop from "../components/BasicGrid";

const Home: NextPage = () => {
    return (
        GridBlurredBackdrop()
    )
}

export default Home
