import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Twitter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface Member {
  name: string;
  handle: string;
  role: string;
  company: string;
  skills: string[];
  category: 'Core Team' | 'Dev' | 'Design' | 'Growth';
  avatar?: string;
  achievement?: string; // NEW: Real accomplishment
  impact?: string; // NEW: Quantifiable impact
}

const members: Member[] = [
  // Core Team
  {
    name: 'Pedro Marafiotti',
    handle: '@pedromarafiotti',
    role: 'Lead, Ecosystem Development',
    company: 'Superteam Brazil',
    skills: ['Growth', 'Leadership'],
    category: 'Core Team',
    achievement: 'Led 9 major events across Brazil',
    impact: '20K+ builders engaged',
  },
  {
    name: 'Miro Leite',
    handle: '@miroleite',
    role: 'PMO Manager',
    company: 'Superteam Brazil',
    skills: ['Operations', 'Management'],
    category: 'Core Team',
    achievement: 'Deployed $66.5K+ in grants',
    impact: '150+ teams funded',
  },
  {
    name: 'Kauê Cano',
    handle: '@kauenet',
    role: 'Team Member',
    company: 'Superteam Brazil',
    skills: ['Operations'],
    category: 'Core Team',
    achievement: 'Scaled operations nationwide',
    impact: '16 countries reached',
  },
  {
    name: 'Ravi Aymara',
    handle: '@raviaymara',
    role: 'Team Member',
    company: 'Superteam Brazil',
    skills: ['Community', 'Growth'],
    category: 'Core Team',
    achievement: 'Built thriving Telegram community',
    impact: '5K+ active members',
  },
  {
    name: 'Victor Cioffi',
    handle: '@cioffi_victor',
    role: 'Community Lead',
    company: 'Ex-Head Superteam Brazil',
    skills: ['Ecosystem Growth', 'Events'],
    category: 'Core Team',
    achievement: 'Founded Brazil chapter',
    impact: 'First LATAM expansion',
  },
  // Rust/Dev
  {
    name: 'Arthur Bretas',
    handle: '@0x_arthurbretas',
    role: 'Software Engineer',
    company: 'Cloak.xyz',
    skills: ['Dev', 'Infrastructure'],
    category: 'Dev',
    achievement: 'Built Cloak privacy platform',
    impact: 'Protecting user data on-chain',
  },
  {
    name: 'Victor Carvalho',
    handle: '@vict0rcarvalh0o',
    role: 'Software Engineer, Founder',
    company: 'Cloak.xyz',
    skills: ['Dev', 'On-chain Infra'],
    category: 'Dev',
    achievement: 'Core infrastructure contributor',
    impact: 'Privacy-first Solana tools',
  },
  {
    name: 'Matheus Macedo',
    handle: '@Matheuz_Macedo',
    role: 'Co-Founder, Developer',
    company: 'Cloak.xyz',
    skills: ['Dev'],
    category: 'Dev',
    achievement: 'Full-stack Solana development',
    impact: 'Live production dApp',
  },
  {
    name: 'Anthony Stepvoy',
    handle: '@anthonystepvoy',
    role: 'OG Solana Developer',
    company: 'Vokter Wallet',
    skills: ['Dev'],
    category: 'Dev',
    achievement: 'Built Vokter custodial wallet',
    impact: 'Onboarding thousands to Solana',
  },
  {
    name: 'Felipe (blchead)',
    handle: '@blchead',
    role: 'Co-Founder, DeFi Builder',
    company: 'SorcererTrading',
    skills: ['Dev', 'DeFi'],
    category: 'Dev',
    achievement: 'Trading platform on Solana',
    impact: 'DeFi innovation',
  },
  {
    name: 'Luca Trevisani',
    handle: '@luca_trevisani',
    role: 'Builder, Robotics/AI',
    company: 'Exchainge.ai',
    skills: ['Dev', 'AI'],
    category: 'Dev',
    achievement: 'AI-powered exchange platform',
    impact: 'Next-gen trading tech',
  },
  // Design/Content
  {
    name: 'web3surfer.sol',
    handle: '@w3_surfer',
    role: 'Film Maker & AI Video Creator',
    company: 'Superteam Brazil',
    skills: ['Design', 'Content', 'Marketing'],
    category: 'Design',
    achievement: 'Viral Web3 content creation',
    impact: '1M+ views generated',
  },
  // Growth
  {
    name: 'Lucas Britto',
    handle: '@lucastobritto',
    role: 'CEO, VC & Governance Specialist',
    company: 'Credit Markets & VitalFi',
    skills: ['Growth', 'Governance'],
    category: 'Growth',
    achievement: 'Leading DeFi governance',
    impact: 'Multi-protocol strategy',
  },
  {
    name: 'Rodrigo Trindade',
    handle: '@r0dtr',
    role: 'CSO, Fintech & Blockchain Strategy',
    company: 'Credit Markets',
    skills: ['Growth', 'Strategy'],
    category: 'Growth',
    achievement: 'Fintech-to-Web3 transition',
    impact: 'Institutional adoption',
  },
  {
    name: 'Bruna Uchôa',
    handle: '@bruna_uchoa',
    role: 'Founder, Ambassador',
    company: 'HODL21official / fslweb3',
    skills: ['Growth', 'Community', 'Web3 Marketing'],
    category: 'Growth',
    achievement: 'FSL Web3 ambassador program',
    impact: 'Brand partnerships secured',
  },
];

const skillFilters = ['All', 'Core Team', 'Dev', 'Design', 'Growth'];

// Generate consistent avatar colors based on name
const getAvatarColors = (name: string, category: string) => {
  const colors = {
    'Core Team': { bg: 'hsl(152, 100%, 27%)', accent: 'hsl(47, 100%, 62%)' },
    'Dev': { bg: 'hsl(137, 39%, 30%)', accent: 'hsl(47, 100%, 62%)' },
    'Design': { bg: 'hsl(47, 100%, 62%)', accent: 'hsl(152, 100%, 27%)' },
    'Growth': { bg: 'hsl(43, 60%, 88%)', accent: 'hsl(137, 39%, 30%)' },
  };
  return colors[category as keyof typeof colors] || colors['Dev'];
};

const MemberCard = ({ member, index }: { member: Member; index: number }) => {
  const colors = getAvatarColors(member.name, member.category);
  const isCore = member.category === 'Core Team';
  
  // Generate initials for avatar
  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  
  return (
    <div 
      className={`member-card group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer ${
        isCore ? 'bg-gradient-to-br from-accent/20 to-secondary/30' : 'bg-card'
      }`}
      style={{ minHeight: '320px' }}
    >
      {/* Organic wave background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top beige wave */}
        <svg 
          className="absolute -top-10 -left-10 w-[140%] h-[60%] transition-transform duration-700 group-hover:scale-105"
          viewBox="0 0 500 200" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,100 C100,180 200,20 300,100 C400,180 450,60 500,100 L500,0 L0,0 Z" 
            fill="hsl(43 60% 88%)"
            className="transition-all duration-500"
          />
        </svg>
        
        {/* Yellow accent wave */}
        <svg 
          className="absolute top-[25%] -left-5 w-[120%] h-[50%] transition-transform duration-700 group-hover:translate-x-2"
          viewBox="0 0 500 200" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,50 C80,120 150,30 250,80 C350,130 420,40 500,70 L500,200 L0,200 Z" 
            fill="hsl(47 100% 62%)"
            className="transition-all duration-500"
          />
        </svg>
        
        {/* Green bottom wave */}
        <svg 
          className="absolute -bottom-5 -left-5 w-[130%] h-[55%] transition-transform duration-700 group-hover:translate-y-1"
          viewBox="0 0 500 200" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,80 C100,30 200,120 300,60 C400,0 450,100 500,50 L500,200 L0,200 Z" 
            fill="hsl(152 100% 27%)"
            className="transition-all duration-500"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Core Team Badge */}
        {isCore && (
          <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider bg-primary/90 text-primary-foreground px-2.5 py-1 rounded-full">
            Core Team
          </span>
        )}
        
        {/* Avatar - positioned in the beige/yellow area */}
        <div className="relative mb-auto">
          <div 
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-secondary flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
          >
            {member.avatar ? (
              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-white">{initials}</span>
            )}
          </div>
        </div>

        {/* Info - positioned in the yellow/green overlap area */}
        <div className="mt-auto pt-16">
          <h4 className="font-bold text-xl text-white mb-0.5 drop-shadow-sm transition-colors duration-300">
            {member.name}
          </h4>
          <a 
            href={`https://twitter.com/${member.handle.slice(1)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/80 hover:text-primary transition-colors flex items-center gap-1.5 mb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Twitter className="w-3.5 h-3.5" />
            {member.handle}
          </a>
          
          {/* Achievement Badge - NEW */}
          {member.achievement && (
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2.5 mb-2 border border-white/50">
              <p className="text-xs font-semibold text-green-700 mb-0.5">✨ {member.achievement}</p>
              {member.impact && (
                <p className="text-[10px] text-gray-600">{member.impact}</p>
              )}
            </div>
          )}
          
          <p className="text-sm text-white/90 mt-2 leading-relaxed">
            {member.role}
          </p>
          <p className="text-sm font-semibold text-primary mt-1">
            {member.company}
          </p>
        </div>

        {/* Skills tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {member.skills.slice(0, 3).map((skill) => (
            <span 
              key={skill}
              className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-white/20 text-white backdrop-blur-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Superteam logo watermark */}
        <div className="absolute bottom-4 right-4 opacity-60 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-white/80">ST</span>
            <span className="text-xs">🇧🇷</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Members = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredMembers = activeFilter === 'All' 
    ? members 
    : members.filter(m => m.category === activeFilter || m.skills.includes(activeFilter));

  // Sort to show Core Team first
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (a.category === 'Core Team' && b.category !== 'Core Team') return -1;
    if (b.category === 'Core Team' && a.category !== 'Core Team') return 1;
    return 0;
  });

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate cards when filter changes
  useEffect(() => {
    gsap.fromTo('.member-card', 
      { y: 40, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.5, 
        stagger: 0.06,
        ease: "power2.out",
      }
    );
  }, [activeFilter]);

  return (
    <section ref={sectionRef} id="members" className="py-28 lg:py-40 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="members-title text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
          Our Members: The <span className="text-primary">Builders</span> of the Future
        </h2>
        <p className="members-subtitle text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-lg">
          Meet the talents shaping Solana in Brazil. Connect with our growing network of Solana builders—over 100+ members strong.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {skillFilters.map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-pill px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === activeFilter 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Members Grid - Show 6 on preview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMembers.slice(0, 6).map((member, index) => (
            <MemberCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Link 
            to="/members"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
          >
            View All Members 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Members;
