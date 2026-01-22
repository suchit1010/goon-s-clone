import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: 'Solana Foundation', logo: '◎' },
  { name: 'Colosseum', logo: '🏛️' },
  { name: 'IslandDAO', logo: '🏝️' },
  { name: 'Jupiter', logo: '🪐' },
  { name: 'Credit Markets', logo: '💳' },
  { name: 'Meteora', logo: '☄️' },
  { name: 'Phantom', logo: '👻' },
  { name: 'Magic Eden', logo: '🪄' },
];

const Partners = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.partners-title', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.partners-title',
            start: 'top 90%',
          }
        }
      );

      // Partner logos with wave-like stagger
      gsap.utils.toArray('.partner-logo').forEach((logo: any, i) => {
        gsap.fromTo(logo, 
          { y: 50, opacity: 0, scale: 0.8 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.6, 
            delay: i * 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: logo,
              start: 'top 95%',
            }
          }
        );
      });

      // Continuous subtle float animation
      gsap.utils.toArray('.partner-logo').forEach((logo: any, i) => {
        gsap.to(logo, {
          y: -8,
          duration: 2 + (i * 0.2),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.15,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 border-y border-border relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/3 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <h3 className="partners-title text-center text-2xl font-bold mb-4 text-foreground">
          Trusted by <span className="text-primary">Ecosystem Leaders</span>
        </h3>
        <p className="text-center text-muted-foreground text-sm mb-12 max-w-lg mx-auto">
          Partnerships that strengthen Solana in Brazil and LATAM
        </p>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-6 md:gap-8 items-center">
          {partners.map((partner, index) => (
            <div 
              key={partner.name}
              className="partner-logo flex flex-col items-center justify-center p-4 lg:p-6 rounded-2xl hover:bg-muted/50 transition-all duration-500 cursor-pointer group"
            >
              <span className="text-4xl md:text-5xl mb-3 grayscale group-hover:grayscale-0 group-hover:scale-125 transition-all duration-500">
                {partner.logo}
              </span>
              <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
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
