import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const JoinCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for the CTA section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // Background scale effect
      tl.fromTo('.cta-bg', 
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out" },
        0
      );

      // Headline animation with clip reveal
      tl.fromTo('.cta-headline', 
        { y: 100, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "power4.out" },
        0.2
      );

      // Subtitle
      tl.fromTo('.cta-subtitle', 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.4
      );

      // Buttons stagger
      tl.fromTo('.cta-button', 
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" },
        0.6
      );

      // Floating animation for background decorations
      gsap.to('.cta-decoration', {
        y: -30,
        x: 20,
        rotation: 10,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.5, from: "random" }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 lg:py-40 relative overflow-hidden">
      <div className="cta-bg absolute inset-0 bg-primary" />
      
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="cta-decoration absolute top-10 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
        <div className="cta-decoration absolute bottom-10 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
        <div className="cta-decoration absolute top-1/2 left-1/4 w-24 h-24 bg-background/5 rounded-full blur-xl" />
        <div className="cta-decoration absolute bottom-1/4 right-1/3 w-40 h-40 bg-secondary/5 rounded-full blur-2xl" />
      </div>
      
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle, hsl(var(--primary-foreground)) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="cta-headline text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-8">
            Join Now and Build the Future
          </h2>
          <p className="cta-subtitle text-xl lg:text-2xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Be part of the Solana revolution in Brazil. Connect with thousands of builders and access exclusive opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://t.me/superteambr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-button inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary-foreground text-primary font-semibold rounded-full hover:bg-primary-foreground/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <MessageCircle className="w-5 h-5" />
              Join Telegram
            </a>
            <a 
              href="https://discord.gg/superteambr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-button inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-primary-foreground text-primary-foreground font-semibold rounded-full hover:bg-primary-foreground/10 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join Discord
            </a>
            <a 
              href="https://twitter.com/SuperteamBR" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-button inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-primary-foreground text-primary-foreground font-semibold rounded-full hover:bg-primary-foreground/10 transition-all duration-300 hover:scale-105"
            >
              <Twitter className="w-5 h-5" />
              Follow on X
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCTA;
