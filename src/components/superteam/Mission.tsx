import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Calendar, Coins, Briefcase, GraduationCap, Network } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Users,
    title: 'Builder Support & Mentorship',
    description: 'Personalized guidance for developers and founders, including coaching for 150+ teams in global hackathons.',
  },
  {
    icon: Calendar,
    title: 'Event Programming',
    description: 'Roadshows covering 8,000+ km, bootcamps in Greece, and Solana Hotel in Buenos Aires—9 events in 2024 with 20,000+ engagements.',
  },
  {
    icon: Coins,
    title: 'Grants & Funding Access',
    description: 'Up to $10K in grants from the Solana Foundation via Superteam Earn, with $66.5K approved so far.',
  },
  {
    icon: Briefcase,
    title: 'Job/Bounty Opportunities',
    description: 'Platform for bounties and freelance gigs, connecting Brazilian talent to global Solana projects.',
  },
  {
    icon: GraduationCap,
    title: 'Education & Workshops',
    description: 'Bootcamps and hands-on sessions for dev onboarding, focusing on DeFi, games, and infrastructure.',
  },
  {
    icon: Network,
    title: 'Network Connections',
    description: 'Partnerships with VCs, angels, and the LATAM ecosystem for fundraising and collaborations.',
  },
];

const Mission = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation with split text effect
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 0.5,
        }
      });

      tl.fromTo('.mission-heading-word', 
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.1, ease: "back.out(1.7)" }
      );

      // Subtitle animation
      gsap.fromTo('.mission-subtitle', 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.mission-subtitle',
            start: 'top 85%',
          }
        }
      );

      // Cards stagger animation with 3D rotation
      const cards = gsap.utils.toArray('.mission-card');
      cards.forEach((card: any, i) => {
        gsap.fromTo(card, 
          { 
            y: 80, 
            opacity: 0, 
            rotateY: i % 2 === 0 ? -15 : 15,
            scale: 0.9
          },
          { 
            y: 0, 
            opacity: 1, 
            rotateY: 0,
            scale: 1,
            duration: 0.8, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            }
          }
        );
      });

      // Icon pulse animation on hover
      gsap.utils.toArray('.mission-card').forEach((card: any) => {
        const icon = card.querySelector('.icon-container');
        card.addEventListener('mouseenter', () => {
          gsap.to(icon, { scale: 1.15, rotation: 5, duration: 0.3, ease: "back.out(2)" });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="mission" className="py-28 lg:py-40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={headingRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 overflow-hidden">
            <span className="mission-heading-word inline-block text-foreground">Our</span>{' '}
            <span className="mission-heading-word inline-block text-primary">Mission:</span>{' '}
            <span className="mission-heading-word inline-block text-foreground">Accelerating</span>{' '}
            <span className="mission-heading-word inline-block text-foreground">Solana</span>{' '}
            <span className="mission-heading-word inline-block text-foreground">in</span>{' '}
            <span className="mission-heading-word inline-block text-foreground">Brazil</span>
          </h2>
          <p className="mission-subtitle text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Launched in 2024, Superteam Brazil is transforming the Brazilian Web3 landscape with national roadshows, international bootcamps, and record-breaking hackathons. We're part of the global Superteam network, spanning 16 countries, with a community GDP of $9M+.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={pillar.title}
              className="mission-card group p-8 lg:p-10 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-500 cursor-pointer perspective-1000"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="icon-container w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 transition-transform duration-300">
                <pillar.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
