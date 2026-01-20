import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/superteam/Header';
import Hero from '@/components/superteam/Hero';
import Mission from '@/components/superteam/Mission';
import Stats from '@/components/superteam/Stats';
import Events from '@/components/superteam/Events';
import Members from '@/components/superteam/Members';
import Partners from '@/components/superteam/Partners';
import FAQ from '@/components/superteam/FAQ';
import JoinCTA from '@/components/superteam/JoinCTA';
import Footer from '@/components/superteam/Footer';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main>
        <Hero />
        <Mission />
        <Stats />
        <Events />
        <Members />
        <Partners />
        <FAQ />
        <JoinCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
