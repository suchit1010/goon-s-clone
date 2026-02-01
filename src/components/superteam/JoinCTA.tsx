import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageCircle, DollarSign, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const JoinCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { y: 80, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          }
        }
      );

      // CTA buttons stagger
      gsap.fromTo('.join-cta-button', 
        { y: 60, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8, 
          stagger: 0.2,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
          }
        }
      );

      // Background animations
      gsap.to('.join-bg-shape', {
        y: -100,
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 lg:py-40 bg-gradient-to-br from-yellow-500/10 via-background to-purple-500/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="join-bg-shape absolute top-20 right-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />
      <div className="join-bg-shape absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(rgb(234 179 8) 1px, transparent 1px), linear-gradient(90deg, rgb(234 179 8) 1px, transparent 1px)`,
        backgroundSize: '100px 100px'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-yellow-500/15 mb-8">
            <span className="text-4xl">🦜</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            Join Now and Build the <span className="text-yellow-500">Future</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Be part of Brazil's most active Solana community. Connect, learn, and build with the best.
          </p>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <a 
            href="https://t.me/superteambr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="join-cta-button group inline-flex items-center gap-4 px-12 py-6 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xl rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/40 transform"
          >
            <MessageCircle className="w-6 h-6" />
            Join Telegram
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a 
            href="https://earn.superteam.fun/s/superteambr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="join-cta-button group inline-flex items-center gap-4 px-12 py-6 border-2 border-yellow-500/50 text-foreground font-bold text-xl rounded-full hover:border-yellow-500 hover:bg-yellow-500/5 transition-all duration-300"
          >
            <DollarSign className="w-6 h-6 text-yellow-500" />
            Explore Earn
          </a>
        </div>

        {/* Social proof / Quick stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="join-cta-button text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">20K+</div>
            <div className="text-sm text-muted-foreground">Community Members</div>
          </div>
          <div className="join-cta-button text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">$66K+</div>
            <div className="text-sm text-muted-foreground">Grants Distributed</div>
          </div>
          <div className="join-cta-button text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">150+</div>
            <div className="text-sm text-muted-foreground">Teams Coached</div>
          </div>
          <div className="join-cta-button text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">9</div>
            <div className="text-sm text-muted-foreground">Events in 2024</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCTA;
