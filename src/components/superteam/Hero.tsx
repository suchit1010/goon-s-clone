import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import toucanImage from '@/assets/toucan-hero.jpg';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const toucanRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial timeline for hero entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      // Toucan fly-in animation with "gasp" feel
      tl.fromTo(toucanRef.current, 
        { x: -300, y: 150, scale: 0.3, opacity: 0, rotation: -25 },
        { x: 0, y: 0, scale: 1, opacity: 1, rotation: 0, duration: 1.4, ease: "back.out(1.4)" },
        0.2
      );

      // Title reveal with clip-path effect
      tl.fromTo(titleRef.current,
        { y: 80, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "power4.out" },
        0.5
      );

      // Subtitle reveal
      tl.fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        0.7
      );

      // CTA buttons stagger
      tl.fromTo(ctaRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        0.9
      );

      // Carousel slide up
      tl.fromTo(carouselRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        1.1
      );

      // Floating particles with random movement
      gsap.to('.particle', {
        y: -40,
        x: "random(-20, 20)",
        duration: "random(2.5, 4)",
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.3, from: "random" }
      });

      // Parallax effect on scroll
      gsap.to(toucanRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Scale down hero content on scroll
      gsap.to('.hero-content', {
        scale: 0.95,
        opacity: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "50% top",
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

  // Carousel media items - Twitter video first
  const carouselItems = [
    { type: 'video', src: 'https://video.twimg.com/amplify_video/1875992547262177280/vid/avc1/1920x1080/lLNSFOHvXOEZkKYm.mp4?tag=16', poster: toucanImage },
    { type: 'image', src: toucanImage },
    { type: 'image', src: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop' },
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain-texture"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-accent/10" />
      
      {/* Animated background shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 organic-shape blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 organic-shape-2 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
      
      {/* Floating particles */}
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-2 h-2 rounded-full"
          style={{
            left: `${5 + Math.random() * 90}%`,
            top: `${15 + Math.random() * 70}%`,
            backgroundColor: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--accent))' : 'hsl(var(--secondary))',
            opacity: 0.3 + Math.random() * 0.5,
            width: `${4 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 6}px`,
          }}
        />
      ))}

      <div className="hero-content container relative z-10 px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary mb-6 leading-[0.9]"
            >
              Superteam
              <span className="block text-foreground mt-2">Brasil</span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Building the home for Solana talent in Latin America's largest market. 
              Join the movement of builders, creators, and innovators.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="https://t.me/superteambr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 relative overflow-hidden"
              >
                <span className="relative z-10">Join Community</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer" />
              </a>
              <a 
                href="https://earn.superteam.fun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                Explore Opportunities
              </a>
            </div>

            {/* Powered by Solana */}
            <div className="mt-12 flex items-center gap-3 justify-center lg:justify-start opacity-60">
              <span className="text-sm text-muted-foreground">Powered by</span>
              <svg className="h-5" viewBox="0 0 646 96" fill="currentColor">
                <path d="M108.53 75.69a4.3 4.3 0 0 1-3.04 1.26H16.31a2.15 2.15 0 0 1-1.52-3.67l14.07-14.07a4.3 4.3 0 0 1 3.04-1.26h89.18a2.15 2.15 0 0 1 1.52 3.67l-14.07 14.07Zm0-56.74a4.3 4.3 0 0 0-3.04-1.26H16.31a2.15 2.15 0 0 0-1.52 3.67l14.07 14.07a4.3 4.3 0 0 0 3.04 1.26h89.18a2.15 2.15 0 0 0 1.52-3.67L108.53 18.95ZM16.31 52.29h89.18a4.3 4.3 0 0 0 3.04-1.26l14.07-14.07a2.15 2.15 0 0 0-1.52-3.67H31.9a4.3 4.3 0 0 0-3.04 1.26L14.79 48.62a2.15 2.15 0 0 0 1.52 3.67Z" fill="url(#solana-grad)" />
                <defs>
                  <linearGradient id="solana-grad" x1="0" y1="48" x2="126" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9945FF" />
                    <stop offset="1" stopColor="#14F195" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-sm font-semibold text-muted-foreground">SOLANA</span>
            </div>
          </div>

          {/* Right - Toucan */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                ref={toucanRef}
                src={toucanImage} 
                alt="Superteam Brasil Toucan" 
                className="w-full max-w-md lg:max-w-lg rounded-3xl shadow-2xl shadow-primary/10"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 rounded-3xl pointer-events-none" />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl animate-float">
                <span className="text-2xl">🇧🇷</span>
                <span className="ml-2 text-sm font-semibold">Brasil</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Carousel */}
      <div 
        ref={carouselRef}
        className="absolute bottom-8 left-0 right-0 px-6"
      >
        <div className="container mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {carouselItems.map((item, index) => (
              <div 
                key={index}
                className={`relative flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 ${
                  index === 0 ? 'w-80 h-44' : 'w-48 h-32'
                }`}
              >
                {item.type === 'video' ? (
                  <>
                    <video
                      ref={index === 0 ? videoRef : undefined}
                      src={item.src}
                      poster={item.poster}
                      autoPlay
                      muted={isMuted}
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    {/* Video controls */}
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
                    {/* Twitter badge */}
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span className="text-xs text-white font-medium">@SuperteamBR</span>
                    </div>
                  </>
                ) : (
                  <img 
                    src={item.src} 
                    alt={`Community ${index}`}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Scroll</span>
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
