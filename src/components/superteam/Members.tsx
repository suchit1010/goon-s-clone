import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Twitter, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const members = [
  {
    name: 'Lucas Britto',
    handle: '@lucastobritto',
    role: 'VC & M&A Executive',
    company: 'VitalFi',
    skills: ['RWA', 'DeFi', 'Strategy'],
    isCore: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucas',
  },
  {
    name: 'Ana Silva',
    handle: '@anasilva',
    role: 'Smart Contract Dev',
    company: 'Solana Labs',
    skills: ['Rust', 'Anchor', 'TypeScript'],
    isCore: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
  },
  {
    name: 'Pedro Santos',
    handle: '@pedrosantos',
    role: 'Product Designer',
    company: 'Phantom',
    skills: ['UI/UX', 'Web3', 'Figma'],
    isCore: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pedro',
  },
  {
    name: 'Maria Costa',
    handle: '@mariacosta',
    role: 'Community Lead',
    company: 'Superteam',
    skills: ['Growth', 'Events', 'Content'],
    isCore: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
  },
  {
    name: 'João Oliveira',
    handle: '@joaooliveira',
    role: 'Full Stack Developer',
    company: 'Magic Eden',
    skills: ['React', 'Node.js', 'Solana'],
    isCore: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
  },
  {
    name: 'Fernanda Lima',
    handle: '@fernandalima',
    role: 'Marketing Lead',
    company: 'Jupiter',
    skills: ['Marketing', 'Strategy', 'BD'],
    isCore: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fernanda',
  },
  {
    name: 'Carlos Mendes',
    handle: '@carlosmendes',
    role: 'Protocol Engineer',
    company: 'Marinade',
    skills: ['Rust', 'DeFi', 'Security'],
    isCore: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
  },
  {
    name: 'Beatriz Ferreira',
    handle: '@beatrizferreira',
    role: 'Content Creator',
    company: 'Freelance',
    skills: ['Content', 'Video', 'Education'],
    isCore: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=beatriz',
  },
];

const skillFilters = ['All', 'Dev', 'Design', 'Content', 'Growth', 'DeFi'];

const Members = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.members-title', 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.members-title',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.member-card', 
        { y: 50, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.5, 
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.member-card',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Sort members to show Core Team first
  const sortedMembers = [...members].sort((a, b) => (b.isCore ? 1 : 0) - (a.isCore ? 1 : 0));

  return (
    <section ref={sectionRef} id="members" className="py-24 lg:py-32 bg-card/50 relative">
      <div className="container mx-auto px-6">
        <h2 className="members-title text-4xl md:text-5xl font-bold text-center mb-6">
          Meet the <span className="text-primary">Builders</span>
        </h2>
        <p className="members-title text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Our community is made up of talented developers, designers, creators, and founders 
          building the future of Web3 in Brazil.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillFilters.map((filter) => (
            <button 
              key={filter}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'All' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Members Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedMembers.map((member) => (
            <div 
              key={member.name}
              className={`member-card group p-6 rounded-2xl border transition-all duration-300 card-hover ${
                member.isCore 
                  ? 'bg-primary/5 border-primary/30' 
                  : 'bg-card border-border hover:border-primary/30'
              }`}
            >
              {member.isCore && (
                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block">
                  Core Team
                </span>
              )}
              
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-14 h-14 rounded-full bg-muted"
                />
                <div>
                  <h4 className="font-bold group-hover:text-primary transition-colors">
                    {member.name}
                  </h4>
                  <a 
                    href={`https://twitter.com/${member.handle.slice(1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline"
                  >
                    {member.handle}
                  </a>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-1">{member.role}</p>
              <p className="text-sm font-medium text-foreground mb-4">{member.company}</p>

              <div className="flex flex-wrap gap-1.5">
                {member.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-2.5 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Twitter hover reveal */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <a 
                  href={`https://twitter.com/${member.handle.slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary"
                >
                  <Twitter className="w-4 h-4" /> Follow
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="/members"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            View All Members <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Members;
