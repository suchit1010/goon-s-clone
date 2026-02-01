import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Twitter, ArrowRight, Filter } from 'lucide-react';
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
  },
  {
    name: 'Miro Leite',
    handle: '@miroleite',
    role: 'PMO Manager',
    company: 'Superteam Brazil',
    skills: ['Operations', 'Management'],
    category: 'Core Team',
  },
  {
    name: 'Kauê Cano',
    handle: '@kauenet',
    role: 'Team Member',
    company: 'Superteam Brazil',
    skills: ['Operations'],
    category: 'Core Team',
  },
  {
    name: 'Ravi Aymara',
    handle: '@raviaymara',
    role: 'Team Member',
    company: 'Superteam Brazil',
    skills: ['Community', 'Growth'],
    category: 'Core Team',
  },
  {
    name: 'Victor Cioffi',
    handle: '@cioffi_victor',
    role: 'Community Lead',
    company: 'Ex-Head Superteam Brazil',
    skills: ['Ecosystem Growth', 'Events'],
    category: 'Core Team',
  },
  // Developers
  {
    name: 'Arthur Bretas',
    handle: '@0x_arthurbretas',
    role: 'Software Engineer',
    company: 'Cloak.xyz',
    skills: ['Rust', 'Infrastructure'],
    category: 'Dev',
  },
  {
    name: 'Victor Carvalho',
    handle: '@vict0rcarvalh0o',
    role: 'Software Engineer, Founder',
    company: 'Cloak.xyz',
    skills: ['Solana', 'On-chain'],
    category: 'Dev',
  },
  {
    name: 'Matheus Macedo',
    handle: '@Matheuz_Macedo',
    role: 'Co-Founder, Developer',
    company: 'Cloak.xyz',
    skills: ['Web3'],
    category: 'Dev',
  },
  {
    name: 'Anthony Stepvoy',
    handle: '@anthonystepvoy',
    role: 'OG Solana Developer',
    company: 'Vokter Wallet',
    skills: ['Solana', 'Wallets'],
    category: 'Dev',
  },
  // Design/Growth
  {
    name: 'web3surfer.sol',
    handle: '@w3_surfer',
    role: 'Film Maker & AI Video Creator',
    company: 'Superteam Brazil',
    skills: ['Design', 'Content'],
    category: 'Design',
  },
  {
    name: 'Lucas Britto',
    handle: '@lucastobritto',
    role: 'CEO, VC & Governance',
    company: 'Credit Markets',
    skills: ['Growth', 'Governance'],
    category: 'Growth',
  },
  {
    name: 'Bruna Uchôa',
    handle: '@bruna_uchoa',
    role: 'Founder, Ambassador',
    company: 'HODL21 / fslweb3',
    skills: ['Growth', 'Community'],
    category: 'Growth',
  },
];

const skillFilters = ['All', 'Core Team', 'Dev', 'Design', 'Growth'];

const MembersClean = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredMembers = activeFilter === 'All' 
    ? members 
    : members.filter(member => member.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          }
        }
      );

      // Filters animation
      gsap.fromTo(filtersRef.current, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: filtersRef.current,
            start: 'top 90%',
          }
        }
      );

      // Member cards stagger
      gsap.fromTo('.member-card-clean', 
        { y: 80, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8, 
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: '.member-card-clean',
            start: 'top 90%',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Core Team':
        return 'bg-yellow-500 text-black';
      case 'Dev':
        return 'bg-blue-500 text-white';
      case 'Design':
        return 'bg-purple-500 text-white';
      case 'Growth':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <section ref={sectionRef} className="py-28 lg:py-40 bg-background relative overflow-hidden">
      {/* Background decorations - minimal */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-500/3 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our Members: The <span className="text-yellow-500">Builders</span> of the Future
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Meet the talented individuals driving innovation in Brazil's Solana ecosystem
          </p>
        </div>

        {/* Filters */}
        <div ref={filtersRef} className="flex flex-wrap justify-center gap-3 mb-16">
          {skillFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30'
                  : 'bg-card border border-border text-foreground hover:border-yellow-500/50 hover:text-yellow-500'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Members Grid - Premium Card Design */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {filteredMembers.map((member, index) => (
            <div 
              key={member.handle} 
              className="member-card-clean group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/20 cursor-pointer"
              style={{ minHeight: '320px' }}
            >
              {/* Organic Background Shapes */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Primary organic shape */}
                <svg 
                  className="absolute -top-10 -right-10 w-[140%] h-[70%] transition-transform duration-700 group-hover:scale-105"
                  viewBox="0 0 500 300" 
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M0,150 C100,250 200,50 300,150 C400,250 450,100 500,150 L500,0 L0,0 Z" 
                    fill={member.category === 'Core Team' ? 
                      "url(#coreGradient)" : 
                      member.category === 'Dev' ? "url(#devGradient)" :
                      member.category === 'Design' ? "url(#designGradient)" : 
                      "url(#growthGradient)"
                    }
                    className="transition-all duration-500 group-hover:opacity-80"
                  />
                </svg>
                
                {/* Secondary accent shape */}
                <svg 
                  className="absolute bottom-0 left-0 w-[120%] h-[50%] transition-transform duration-700 group-hover:translate-x-2"
                  viewBox="0 0 500 200" 
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M0,100 C80,180 150,60 250,120 C350,180 420,80 500,120 L500,200 L0,200 Z" 
                    fill="rgba(234, 179, 8, 0.15)"
                    className="transition-all duration-500 group-hover:opacity-60"
                  />
                </svg>
              </div>

              {/* Gradients for different categories */}
              <defs>
                <svg className="absolute inset-0 w-0 h-0">
                  <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="rgb(234, 179, 8)" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="devGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="designGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="rgb(234, 179, 8)" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(234, 179, 8)" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.5" />
                  </linearGradient>
                </svg>
              </defs>

              {/* Core Team Badge */}
              {member.category === 'Core Team' && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-yellow-500 rounded-full ring-4 ring-white/20 z-20"></div>
              )}

              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                {/* Top Section - Avatar and Name */}
                <div className="mb-4">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
                    <span className="text-white drop-shadow-lg">
                      {getInitials(member.name)}
                    </span>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-bold text-xl text-white drop-shadow-lg mb-1">
                      {member.name}
                    </h3>
                    <p className="text-white/80 text-sm font-medium drop-shadow">
                      {member.handle}
                    </p>
                  </div>
                </div>

                {/* Bottom Section - Role and Company */}
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="font-semibold text-white/90 text-sm drop-shadow mb-1">
                      {member.role}
                    </p>
                    <p className="text-white/70 text-xs drop-shadow">
                      {member.company}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.slice(0, 2).map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30 drop-shadow"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover overlay with subtle animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-3xl"></div>
              
              {/* Subtle border */}
              <div className="absolute inset-0 rounded-3xl border border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            to="/members"
            className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/30"
          >
            View All Members
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MembersClean;