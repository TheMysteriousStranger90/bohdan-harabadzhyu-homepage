import type { NextPage } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import HomeSeo from '@/components/seo/HomeSeo';

const Home: NextPage = () => (
  <>
    <HomeSeo />
    <HeroSection />
  </>
);

export default Home;
