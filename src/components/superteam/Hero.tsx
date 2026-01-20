import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import toucanImage from '@/assets/toucan-hero.jpg';
import logoYellow from '@/assets/logo-yellow-vertical.png';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const toucanRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Toucan fly-in animation
      gsap.fromTo(toucanRef.current, 
        { x: -200, y: 100, scale: 0.5, opacity: 0, rotation: -15 },
        { x: 0, y: 0, scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)", delay: 0.3 }
      );

      // Title reveal
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.6 }
      );

      // Subtitle reveal
      gsap.fromTo(subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.8 }
      );

      // CTA buttons
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1 }
      );

      // Floating particles
      gsap.to('.particle', {
        y: -30,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.5, from: "random" }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain-texture"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-accent/10" />
      
      {/* Organic background shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 organic-shape blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 organic-shape-2 blur-3xl animate-float-delayed" />
      
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-2 h-2 rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${20 + Math.random() * 60}%`,
            backgroundColor: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
            opacity: 0.4 + Math.random() * 0.4,
          }}
        />
      ))}

      <div className="container relative z-10 px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight"
            >
              Superteam
              <span className="block text-foreground">Brasil</span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Building the home for Solana talent in Latin America's largest market. 
              Join the movement of builders, creators, and innovators.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="https://t.me/superteambr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
              >
                Join Community
              </a>
              <a 
                href="https://earn.superteam.fun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Explore Opportunities
              </a>
            </div>

            {/* Powered by Solana */}
            <div className="mt-12 flex items-center gap-3 justify-center lg:justify-start opacity-60">
              <span className="text-sm text-muted-foreground">Powered by</span>
              <svg className="h-5" viewBox="0 0 646 96" fill="currentColor">
                <path d="M108.53 75.69a4.3 4.3 0 0 1-3.04 1.26H16.31a2.15 2.15 0 0 1-1.52-3.67l14.07-14.07a4.3 4.3 0 0 1 3.04-1.26h89.18a2.15 2.15 0 0 1 1.52 3.67l-14.07 14.07Zm0-56.74a4.3 4.3 0 0 0-3.04-1.26H16.31a2.15 2.15 0 0 0-1.52 3.67l14.07 14.07a4.3 4.3 0 0 0 3.04 1.26h89.18a2.15 2.15 0 0 0 1.52-3.67L108.53 18.95ZM16.31 52.29h89.18a4.3 4.3 0 0 0 3.04-1.26l14.07-14.07a2.15 2.15 0 0 0-1.52-3.67H31.9a4.3 4.3 0 0 0-3.04 1.26L14.79 48.62a2.15 2.15 0 0 0 1.52 3.67Z" fill="url(#solana-grad)" />
                <defs>
                  <linearGradient id="solana-grad" x1="0" y1="48" x2="126" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9945FF" />
                    <stop offset="1" stopColor="#14F195" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-sm font-semibold text-muted-foreground">SOLANA</span>
            </div>
          </div>

          {/* Right - Toucan */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                ref={toucanRef}
                src={toucanImage} 
                alt="Superteam Brasil Toucan" 
                className="w-full max-w-md lg:max-w-lg rounded-3xl shadow-2xl"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 rounded-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Scroll</span>
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
