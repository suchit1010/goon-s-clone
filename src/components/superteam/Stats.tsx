import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 20, suffix: 'K+', label: 'Participants Engaged' },
  { value: 9, suffix: '', label: 'Events in 2024' },
  { value: 66.5, suffix: 'K+', prefix: '$', label: 'Grants Approved' },
  { value: 150, suffix: '+', label: 'Teams Coached' },
  { value: 9, suffix: 'M+', prefix: '$', label: 'Global Community GDP' },
  { value: 16, suffix: '', label: 'Countries in Network' },
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
    <section ref={sectionRef} className="py-28 lg:py-40 bg-secondary relative overflow-hidden">
      {/* Background decorations with parallax */}
      <div className="stats-bg-shape absolute -top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="stats-bg-shape absolute -bottom-40 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="stats-title text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
          Our <span className="text-primary">Impact</span> on Solana
        </h2>
        <p className="text-muted-foreground text-center mb-20 max-w-2xl mx-auto text-lg">
          Numbers that prove our commitment to Brazil's growth in Web3.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="stat-item text-center group"
            >
              <div className="relative">
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-4 transition-transform duration-300 group-hover:scale-110">
                  <AnimatedCounter 
                    target={stat.value} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix}
                    isVisible={isVisible}
                  />
                </div>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              </div>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
