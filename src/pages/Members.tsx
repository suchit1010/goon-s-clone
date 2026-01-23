import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, X, Users } from "lucide-react";
import Header from "@/components/superteam/Header";
import Footer from "@/components/superteam/Footer";

gsap.registerPlugin(ScrollTrigger);

interface Member {
  name: string;
  handle: string;
  role: string;
  company: string;
  background: string;
  skills: string[];
  isCore: boolean;
  avatar: string;
}

const members: Member[] = [
  // Core Team
  {
    name: "Pedro Marafiotti",
    handle: "@pedromarafiotti",
    role: "Lead",
    company: "Superteam Brazil",
    background: "Leads operations and community growth for Superteam Brazil, focusing on Solana ecosystem expansion in LATAM.",
    skills: ["Core Team", "Growth", "Biz Dev"],
    isCore: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro&backgroundColor=ffd23f"
  },
  {
    name: "Fillipe Trentin (Coruja)",
    handle: "@CorujaCripto",
    role: "Head of Technology",
    company: "Superteam Brazil",
    background: "New core team member (announced May 2024), inspires builders in blockchain tech; experienced in developer relations and ecosystem building.",
    skills: ["Core Team", "Dev", "Growth"],
    isCore: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fillipe&backgroundColor=008c4c"
  },
  // Other Members
  {
    name: "Lucas Britto",
    handle: "@lucastobritto",
    role: "CEO",
    company: "Credit Markets & VitalFi",
    background: "Former VC, PE & M&A executive, 100% focused on RWA and on-chain strategies. Legally trained with strong governance expertise.",
    skills: ["Biz Dev", "Governance", "Fintech"],
    isCore: false,
    avatar: "/src/assets/members/lucas-britto.jpg"
  },
  {
    name: "Rodrigo Trindade",
    handle: "@r0dtr",
    role: "CSO",
    company: "Credit Markets",
    background: "Data, Strategy & GTM focused on blockchain lending in LATAM and web3. Former research lead at Iporanga Ventures.",
    skills: ["Biz Dev", "Fintech", "Strategy"],
    isCore: false,
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Rodrigo&backgroundColor=2f6b3f"
  },
  {
    name: "Arthur Bretas",
    handle: "@0x_arthurbretas",
    role: "Software Engineer",
    company: "Cloak",
    background: "OSS contributor building privacy-focused infrastructure in web3. Backend and infrastructure dev on Solana.",
    skills: ["Dev", "Backend", "Infra"],
    isCore: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arthur&backgroundColor=f7eacb"
  },
  {
    name: "Victor Carvalho",
    handle: "@vict0rcarvalh0o",
    role: "Software Engineer / Founder",
    company: "Cloak",
    background: "Co-founder building privacy-focused infrastructure in web3. Turbine graduate, ex-BTG Pactual.",
    skills: ["Dev", "Rust", "Infra"],
    isCore: false,
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=VictorC&backgroundColor=ffd23f"
  },
  {
    name: "Ravi Aymara",
    handle: "@w3_surfer",
    role: "Film Maker & AI Video Creator",
    company: "Superteam Brazil",
    background: "Content creator building in Solana ecosystem; focuses on video production and AI tools for community engagement.",
    skills: ["Content", "Design"],
    isCore: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi&backgroundColor=008c4c"
  },
  {
    name: "Victor Cioffi",
    handle: "@victorcioffi",
    role: "Community Lead",
    company: "Ex-Head @ Superteam Brazil",
    background: "Early leader in Superteam Brazil; drove events like roadshows and bootcamps; ecosystem growth expert.",
    skills: ["Growth", "Events", "Community"],
    isCore: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=VictorCioffi&backgroundColor=2f6b3f"
  },
  {
    name: "Bruna Uchôa",
    handle: "@brunauzoa",
    role: "Founder & Ambassador",
    company: "HODL21 / FSL Web3",
    background: "Community builder in Web3; marketing and ambassadorship experience across multiple protocols.",
    skills: ["Community", "Content", "Growth"],
    isCore: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bruna&backgroundColor=ffd23f"
  },
  {
    name: "João Silva",
    handle: "@joaosolana",
    role: "Developer",
    company: "Solana Ecosystem",
    background: "Young Brazilian developer who stood out in the ecosystem building on Solana.",
    skills: ["Rust", "Frontend", "Dev"],
    isCore: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao&backgroundColor=f7eacb"
  },
  {
    name: "Maria Oliveira",
    handle: "@mariasoldev",
    role: "Developer",
    company: "Solana Ecosystem",
    background: "Young Brazilian developer who stood out in the ecosystem building infrastructure on Solana.",
    skills: ["Dev", "Infra", "Backend"],
    isCore: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&backgroundColor=008c4c"
  }
];

const allSkills = ["All", "Core Team", "Dev", "Rust", "Frontend", "Backend", "Infra", "Growth", "Biz Dev", "Content", "Design", "Community", "Events", "Fintech", "Governance", "Strategy"];

const Members = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredMembers = useMemo(() => {
    let filtered = [...members];
    
    // Sort: Core team first
    filtered.sort((a, b) => (b.isCore ? 1 : 0) - (a.isCore ? 1 : 0));
    
    // Filter by skill
    if (activeFilter !== "All") {
      filtered = filtered.filter(m => m.skills.includes(activeFilter));
    }
    
    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(query) ||
        m.handle.toLowerCase().includes(query) ||
        m.role.toLowerCase().includes(query) ||
        m.company.toLowerCase().includes(query) ||
        m.skills.some(s => s.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [searchQuery, activeFilter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(".members-hero-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
      
      gsap.from(".members-hero-subtitle", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      });

      gsap.from(".search-bar", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out"
      });

      gsap.from(".filter-pill", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        delay: 0.5,
        ease: "power3.out"
      });

      // Cards animation
      gsap.from(".member-card", {
        scrollTrigger: {
          trigger: ".members-grid",
          start: "top 85%"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Re-animate cards when filter changes
  useEffect(() => {
    gsap.fromTo(".member-card", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power3.out" }
    );
  }, [activeFilter, searchQuery]);

  return (
    <main ref={sectionRef} className="min-h-screen bg-superteam-dark">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-superteam-green/20 border border-superteam-green/30 mb-6">
            <Users className="w-4 h-4 text-superteam-green" />
            <span className="text-superteam-green text-sm font-medium">100+ Members Strong</span>
          </div>
          
          <h1 className="members-hero-title text-5xl md:text-7xl font-clash font-bold text-superteam-beige mb-6">
            Members <span className="text-superteam-yellow">Directory</span>
          </h1>
          
          <p className="members-hero-subtitle text-xl text-superteam-beige/70 max-w-2xl mx-auto mb-12">
            Connect with our growing network of Solana builders in Brazil—over 100+ members strong. 
            Explore and filter our talented community.
          </p>

          {/* Search Bar */}
          <div className="search-bar relative max-w-md mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-superteam-beige/50" />
            <input
              type="text"
              placeholder="Search by name, role, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-superteam-dark-green/50 border border-superteam-green/20 text-superteam-beige placeholder:text-superteam-beige/40 focus:outline-none focus:border-superteam-green/50 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-superteam-beige/50 hover:text-superteam-beige transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {allSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => setActiveFilter(skill)}
                className={`filter-pill px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === skill
                    ? "bg-superteam-green text-superteam-dark"
                    : "bg-superteam-dark-green/50 text-superteam-beige/70 hover:bg-superteam-green/20 hover:text-superteam-beige border border-superteam-green/20"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Results count */}
          <p className="text-superteam-beige/50 text-sm mb-6">
            Showing {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''}
          </p>

          <div className="members-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <a
                key={member.handle}
                href={`https://x.com/${member.handle.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`member-card group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 ${
                  member.isCore 
                    ? "bg-gradient-to-br from-superteam-green/30 via-superteam-dark-green/50 to-superteam-yellow/10 border-2 border-superteam-green/40" 
                    : "bg-superteam-dark-green/40 border border-superteam-green/20 hover:border-superteam-green/40"
                }`}
              >
                {/* Core Team Badge */}
                {member.isCore && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-superteam-yellow text-superteam-dark text-xs font-bold">
                    Core Team
                  </div>
                )}

                {/* Decorative shapes for core team */}
                {member.isCore && (
                  <>
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-superteam-yellow/10 blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-superteam-green/20 blur-xl" />
                  </>
                )}

                <div className="relative z-10 flex items-start gap-4">
                  {/* Avatar */}
                  <div className={`relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 group-hover:scale-105 ${
                    member.isCore ? "border-superteam-yellow" : "border-superteam-green/30 group-hover:border-superteam-green"
                  }`}>
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-superteam-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-clash font-bold text-lg truncate transition-colors duration-300 ${
                      member.isCore ? "text-superteam-yellow" : "text-superteam-beige group-hover:text-superteam-yellow"
                    }`}>
                      {member.name}
                    </h3>
                    <p className="text-superteam-green text-sm font-medium">{member.handle}</p>
                    <p className="text-superteam-beige/60 text-sm mt-1">{member.role}</p>
                    <p className="text-superteam-beige/40 text-xs">{member.company}</p>
                  </div>
                </div>

                {/* Background */}
                <p className="relative z-10 mt-4 text-superteam-beige/50 text-sm line-clamp-2">
                  {member.background}
                </p>

                {/* Skills */}
                <div className="relative z-10 flex flex-wrap gap-2 mt-4">
                  {member.skills.map((skill) => (
                    <span 
                      key={skill}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        skill === "Core Team"
                          ? "bg-superteam-yellow/20 text-superteam-yellow"
                          : "bg-superteam-green/10 text-superteam-green/80"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Hover CTA */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-superteam-dark via-superteam-dark/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="flex items-center justify-center gap-2 text-superteam-yellow text-sm font-medium">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Follow on X
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Empty state */}
          {filteredMembers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-superteam-beige/50 text-lg">No members found matching your criteria.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
                className="mt-4 text-superteam-green hover:text-superteam-yellow transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Members;
