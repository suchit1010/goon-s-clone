import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import toucanBg from '../../assets/a1.png';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 66.5, suffix: 'K+', prefix: '$', label: 'Grants Deployed', subtext: 'Directly to builders' },
  { value: 150, suffix: '+', label: 'Teams Funded', subtext: 'Building on Solana' },
  { value: 20, suffix: 'K+', label: 'Active Builders', subtext: 'Across Brazil' },
  { value: 9, suffix: '', label: 'Major Events', subtext: 'Hosted in 2024' },
  { value: 9, suffix: 'M+', prefix: '$', label: 'Community GDP', subtext: 'Value created' },
  { value: 16, suffix: '+', label: 'Countries', subtext: 'In our network' },
];

const AnimatedCounter = ({ target, prefix = '', suffix = '', isVisible }: { target: number; prefix?: string; suffix?: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      
      gsap.to({ value: 0 }, {
        value: target,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: function() {
          setCount(Math.round(this.targets()[0].value));
        }
      });
    }
  }, [isVisible, target]);

  return (
    <span ref={counterRef} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveal animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => setIsVisible(true),
      });

      // Title animation
      gsap.fromTo('.stats-title', 
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.stats-title',
            start: 'top 85%',
          }
        }
      );

      // Stats items stagger with scale
      gsap.fromTo('.stat-item', 
        { y: 80, opacity: 0, scale: 0.8 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8, 
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: '.stat-item',
            start: 'top 90%',
          }
        }
      );

      // Background parallax
      gsap.to('.stats-bg-shape', {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 lg:py-40 relative overflow-hidden">
      {/* Background image - no overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${toucanBg})` }}
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgb(234 179 8) 1px, transparent 1px), linear-gradient(90deg, rgb(234 179 8) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="stats-title text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-white">
          Real <span className="text-yellow-500">Impact,</span> Real <span className="text-yellow-500">Numbers</span>
        </h2>
        <p className="text-white/80 text-center mb-4 max-w-2xl mx-auto text-lg">
          We don't just talk about building—we fund it, coach it, and celebrate it.
        </p>
        <div className="flex justify-center items-center gap-2 mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm font-medium">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Updated weekly with new grants
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="stat-item text-center group backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-all duration-300"
            >
              <div className="relative">
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-500 mb-3 transition-transform duration-300 group-hover:scale-110">
                  <AnimatedCounter 
                    target={stat.value} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix}
                    isVisible={isVisible}
                  />
                </div>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-yellow-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              </div>
              <p className="text-white text-base md:text-lg lg:text-xl font-semibold mb-1">
                {stat.label}
              </p>
              <p className="text-white/60 text-xs md:text-sm">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
