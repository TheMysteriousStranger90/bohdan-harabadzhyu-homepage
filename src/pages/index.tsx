import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import HeroSection from '@/components/sections/HeroSection';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Bohdan Harabadzhyu | C# Developer</title>
      <meta name="description" content="Personal homepage of Bohdan Harabadzhyu (Bogdan Garabagiu), C# Developer" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HeroSection />
  </>
);

export default Home;
