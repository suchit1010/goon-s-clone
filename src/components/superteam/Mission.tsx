import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Calendar, Coins, Briefcase, GraduationCap, Network } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Users,
    title: 'Builder Support',
    description: 'Mentorship and guidance from experienced Solana builders and founders.',
  },
  {
    icon: Calendar,
    title: 'Events',
    description: 'Regular meetups, hackathons, and workshops across Brazil.',
  },
  {
    icon: Coins,
    title: 'Grants & Funding',
    description: 'Access to grants and funding opportunities for your projects.',
  },
  {
    icon: Briefcase,
    title: 'Bounties & Jobs',
    description: 'Earn by completing bounties or find your next role in Web3.',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Learn Solana development through our workshops and resources.',
  },
  {
    icon: Network,
    title: 'Network',
    description: 'Connect with the best talent in the Brazilian Web3 ecosystem.',
  },
];

const Mission = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.mission-title', 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.mission-title',
            start: 'top 80%',
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo('.mission-card', 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="mission" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="mission-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-primary">What</span> We Do
          </h2>
          <p className="mission-title text-lg text-muted-foreground max-w-2xl mx-auto">
            Superteam Brasil empowers the next generation of Solana builders with resources, 
            community, and opportunities to succeed.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <div 
              key={pillar.title}
              className="mission-card group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 card-hover"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <pillar.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
