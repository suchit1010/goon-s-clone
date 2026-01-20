import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: 'Solana', logo: '◎' },
  { name: 'Phantom', logo: '👻' },
  { name: 'Magic Eden', logo: '🪄' },
  { name: 'Jupiter', logo: '🪐' },
  { name: 'Marinade', logo: '🧂' },
  { name: 'Raydium', logo: '💧' },
  { name: 'Orca', logo: '🐋' },
  { name: 'Drift', logo: '🌊' },
];

const Partners = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.partner-logo', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.partner-logo',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 border-y border-border">
      <div className="container mx-auto px-6">
        <h3 className="text-center text-muted-foreground text-sm uppercase tracking-wider mb-10">
          Trusted by the Solana Ecosystem
        </h3>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-6 md:gap-8 items-center">
          {partners.map((partner) => (
            <div 
              key={partner.name}
              className="partner-logo flex flex-col items-center justify-center p-4 rounded-xl hover:bg-muted/50 transition-all duration-300 cursor-pointer group"
            >
              <span className="text-3xl md:text-4xl mb-2 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300">
                {partner.logo}
              </span>
              <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
