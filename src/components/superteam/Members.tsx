import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Twitter, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const members = [
  {
    name: 'Lucas Britto',
    handle: '@lucastobritto',
    role: 'CEO @Credit_Markets',
    company: 'Credit Markets',
    skills: ['Governance', 'VC', 'Strategy'],
    isCore: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucas',
  },
  {
    name: 'Rodrigo Trindade',
    handle: '@r0dtr',
    role: 'CSO @Credit_Markets',
    company: 'Credit Markets',
    skills: ['Fintech', 'Blockchain', 'Strategy'],
    isCore: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rodrigo',
  },
  {
    name: 'Bruna Uchôa',
    handle: '@brunauchoa',
    role: 'Founder @HODL21official',
    company: 'HODL21',
    skills: ['Community', 'Web3 Marketing', 'Ambassador'],
    isCore: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bruna',
  },
  {
    name: 'Victor Cioffi',
    handle: '@victorcioffi',
    role: 'Community Lead',
    company: 'Ex-Head Superteam Brazil',
    skills: ['Ecosystem Growth', 'Events', 'BD'],
    isCore: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=victor',
  },
  {
    name: 'Ana Silva',
    handle: '@anasilva',
    role: 'Smart Contract Dev',
    company: 'Solana Labs',
    skills: ['Rust', 'Anchor', 'TypeScript'],
    isCore: false,
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

const skillFilters = ['All', 'Core Team', 'Rust', 'Frontend', 'Design', 'Content', 'Growth'];

const Members = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.members-title', 
        { y: 80, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.members-title',
            start: 'top 85%',
          }
        }
      );

      // Subtitle
      gsap.fromTo('.members-subtitle', 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.members-subtitle',
            start: 'top 90%',
          }
        }
      );

      // Filter pills animation
      gsap.fromTo('.filter-pill', 
        { y: 30, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.5, 
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: '.filter-pill',
            start: 'top 90%',
          }
        }
      );

      // Member cards with staggered reveal
      gsap.utils.toArray('.member-card').forEach((card: any, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        
        gsap.fromTo(card, 
          { 
            y: 100, 
            opacity: 0, 
            scale: 0.9,
            rotateY: col < 2 ? -10 : 10,
          },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            rotateY: 0,
            duration: 0.8, 
            delay: (row * 0.1) + (col * 0.08),
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
            }
          }
        );
      });

      // Magnetic effect on member cards
      gsap.utils.toArray('.member-card').forEach((card: any) => {
        const xTo = gsap.quickTo(card, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(card, "y", { duration: 0.6, ease: "power3" });

        card.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          xTo(x * 0.1);
          yTo(y * 0.1);
        });

        card.addEventListener('mouseleave', () => {
          xTo(0);
          yTo(0);
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Sort members to show Core Team first
  const sortedMembers = [...members].sort((a, b) => (b.isCore ? 1 : 0) - (a.isCore ? 1 : 0));

  return (
    <section ref={sectionRef} id="members" className="py-28 lg:py-40 bg-card/50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="members-title text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
          Our Members: The <span className="text-primary">Builders</span> of the Future
        </h2>
        <p className="members-subtitle text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-lg">
          Meet the talents shaping Solana in Brazil. Connect with innovators driving the ecosystem forward.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {skillFilters.map((filter, index) => (
            <button 
              key={filter}
              className={`filter-pill px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === 'All' 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
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
              className={`member-card group p-6 rounded-3xl border transition-all duration-500 cursor-pointer hover:shadow-2xl ${
                member.isCore 
                  ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 hover:border-primary/50' 
                  : 'bg-card border-border hover:border-primary/30'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {member.isCore && (
                <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full mb-4">
                  Core Team
                </span>
              )}
              
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-16 h-16 rounded-full bg-muted ring-2 ring-transparent group-hover:ring-primary/50 transition-all duration-300"
                  />
                  {member.isCore && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs">⭐</span>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
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
              <p className="text-sm font-medium text-foreground mb-5">{member.company}</p>

              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Twitter hover reveal */}
              <div className="mt-5 pt-5 border-t border-border opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <a 
                  href={`https://twitter.com/${member.handle.slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary font-medium"
                >
                  <Twitter className="w-4 h-4" /> Follow on X
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a 
            href="/members"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
          >
            View All Members 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Members;
