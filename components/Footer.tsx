import {Flex, Text} from '@chakra-ui/react';
import styles from "../styles/Home.module.css";
import Image from "next/image";

const Footer = () => {
    return (
        <Flex align="center" justify="center" width="100%" pb={5}>
            <Text align="center">
                &copy; {new Date().getFullYear()} Bohdan Harabadzhyu. All rights reserved.
            </Text>
        </Flex>
    );
};

export default Footer;