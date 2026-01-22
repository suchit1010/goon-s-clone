import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import community1 from '@/assets/community-1.jpeg';
import community2 from '@/assets/community-2.jpeg';
import community3 from '@/assets/community-3.jpeg';
import community4 from '@/assets/community-4.jpeg';
import community5 from '@/assets/community-5.jpeg';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageGridRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<SVGSVGElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Animate flowing curves
      tl.fromTo('.hero-curve path',
        { strokeDashoffset: 2000 },
        { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" },
        0
      );

      // Title reveal with split effect
      tl.fromTo(titleRef.current,
        { y: 100, opacity: 0, clipPath: "inset(100% 0 0 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.2 },
        0.3
      );

      // Subtitle
      tl.fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.6
      );

      // CTA buttons
      tl.fromTo(ctaRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        0.8
      );

      // Image grid with stagger
      tl.fromTo('.hero-image',
        { scale: 0.8, opacity: 0, y: 60 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "back.out(1.2)" },
        0.4
      );

      // Stats counter animation
      tl.fromTo('.hero-stat',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        1
      );

      // Floating animation for images
      gsap.to('.hero-image-1', {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
      gsap.to('.hero-image-2', {
        y: 12,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5
      });
      gsap.to('.hero-image-3', {
        y: -18,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1
      });

      // Parallax on scroll
      gsap.to('.hero-image', {
        y: (i) => (i + 1) * 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-background"
    >
      {/* Flowing curves background */}
      <svg 
        ref={curveRef}
        className="hero-curve absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="curve-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="curve-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path 
          d="M-100,400 Q200,200 500,350 T900,250 T1300,400 T1600,300" 
          fill="none" 
          stroke="url(#curve-gradient-1)" 
          strokeWidth="3"
          strokeDasharray="2000"
          className="opacity-60"
        />
        <path 
          d="M-100,500 Q300,300 600,450 T1000,350 T1400,500 T1700,400" 
          fill="none" 
          stroke="url(#curve-gradient-2)" 
          strokeWidth="2"
          strokeDasharray="2000"
          className="opacity-40"
        />
        <path 
          d="M-100,600 Q400,400 700,550 T1100,450 T1500,600 T1800,500" 
          fill="none" 
          stroke="url(#curve-gradient-1)" 
          strokeWidth="1.5"
          strokeDasharray="2000"
          className="opacity-30"
        />
      </svg>

      {/* Gradient overlays */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      {/* Main content */}
      <div className="container relative z-10 px-6 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-12rem)]">
          
          {/* Left - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-xl">🇧🇷</span>
              <span className="text-sm font-medium text-primary">Superteam Brasil</span>
            </div>

            <h1 
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              <span className="text-foreground">We lead Solana's</span>
              <br />
              <span className="text-foreground">growth in </span>
              <span className="text-primary relative">
                Brasil
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8 Q50 2 100 6 T198 4" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" className="opacity-50"/>
                </svg>
              </span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              We help local talent to work on Solana, founders to fly, startups and creatives to produce video & content for global companies.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="https://t.me/superteambr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20"
              >
                Join the Community
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="https://earn.superteam.fun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-border text-foreground font-semibold rounded-full hover:border-primary hover:text-primary transition-all duration-300"
              >
                Explore Opportunities
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border/50">
              <div className="hero-stat">
                <div className="text-3xl font-bold text-primary">200+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div className="hero-stat">
                <div className="text-3xl font-bold text-accent">$500K+</div>
                <div className="text-sm text-muted-foreground">Earned by Members</div>
              </div>
              <div className="hero-stat">
                <div className="text-3xl font-bold text-secondary">50+</div>
                <div className="text-sm text-muted-foreground">Events Hosted</div>
              </div>
            </div>
          </div>

          {/* Right - Image Grid */}
          <div ref={imageGridRef} className="relative h-[500px] lg:h-[600px]">
            {/* Main large image with video */}
            <div className="hero-image hero-image-1 absolute top-0 right-0 w-[280px] lg:w-[320px] h-[200px] lg:h-[220px] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 z-20 group">
              <video
                ref={videoRef}
                src="https://video.twimg.com/amplify_video/1875992547262177280/vid/avc1/1920x1080/lLNSFOHvXOEZkKYm.mp4?tag=16"
                poster={community1}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Video controls overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <button 
                    onClick={togglePlay}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                  </button>
                  <button 
                    onClick={toggleMute}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                  </button>
                </div>
              </div>
              {/* X badge */}
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-xs text-white font-medium">@SuperteamBR</span>
              </div>
            </div>

            {/* Second image */}
            <div className="hero-image hero-image-2 absolute top-[140px] lg:top-[160px] left-0 w-[220px] lg:w-[260px] h-[160px] lg:h-[180px] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 z-30">
              <img src={community3} alt="Community" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-xs text-white/80 font-medium">Breakpoint Dubai 2025</span>
              </div>
            </div>

            {/* Third image */}
            <div className="hero-image hero-image-3 absolute top-[260px] lg:top-[300px] right-[40px] lg:right-[60px] w-[200px] lg:w-[240px] h-[150px] lg:h-[170px] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 z-20">
              <img src={community2} alt="Community" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Fourth image */}
            <div className="hero-image absolute bottom-[80px] lg:bottom-[60px] left-[40px] lg:left-[20px] w-[180px] lg:w-[200px] h-[130px] lg:h-[150px] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 z-10">
              <img src={community4} alt="Community" className="w-full h-full object-cover" />
            </div>

            {/* Fifth image */}
            <div className="hero-image absolute bottom-0 right-0 w-[160px] lg:w-[180px] h-[120px] lg:h-[140px] rounded-2xl overflow-hidden shadow-2xl shadow-black/20 z-10">
              <img src={community5} alt="Community" className="w-full h-full object-cover" />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-[100px] left-[200px] w-16 h-16 rounded-full bg-primary/20 blur-xl" />
            <div className="absolute bottom-[150px] right-[180px] w-24 h-24 rounded-full bg-accent/20 blur-xl" />
            
            {/* Floating badge */}
            <div className="hero-image absolute top-[220px] right-[280px] lg:right-[320px] bg-card border border-border rounded-xl px-4 py-3 shadow-xl z-40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-lg">🚀</span>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Recently</div>
                  <div className="text-sm font-semibold">+15 new members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>

      {/* Bottom partners strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border/50 py-4 z-20">
        <div className="container px-6">
          <div className="flex items-center justify-between gap-8 overflow-x-auto scrollbar-hide">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Trusted by Solana's top projects</span>
            <div className="flex items-center gap-8 opacity-50">
              {['Phantom', 'Jupiter', 'Marinade', 'Orca', 'Raydium'].map((name) => (
                <span key={name} className="text-sm font-semibold text-muted-foreground whitespace-nowrap">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
