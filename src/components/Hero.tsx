import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Set initial visibility immediately
    gsap.set(logoRef.current, { opacity: 1, y: 0 });
    gsap.set(subtitleRef.current, { opacity: 1, y: 0 });
    
    const ctx = gsap.context(() => {
      // Initial animation timeline
      const tl = gsap.timeline({ delay: 0.2 });

      // Animate shapes in
      tl.fromTo(
        [shape1Ref.current, shape2Ref.current, shape3Ref.current],
        { scale: 0.8, opacity: 0.3, rotation: -15 },
        { 
          scale: 1, 
          opacity: 1, 
          rotation: 0, 
          duration: 1, 
          stagger: 0.1,
          ease: "power3.out" 
        }
      );

      // Animate logo with a scale effect instead
      tl.fromTo(
        logoRef.current,
        { scale: 0.9, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.8"
      );

      // Animate subtitle
      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0.5 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      gsap.to(shape1Ref.current, {
        x: xPercent * 30,
        y: yPercent * 20,
        rotation: xPercent * 5,
        duration: 1,
        ease: "power2.out"
      });

      gsap.to(shape2Ref.current, {
        x: xPercent * -20,
        y: yPercent * 30,
        rotation: xPercent * -3,
        duration: 1.2,
        ease: "power2.out"
      });

      gsap.to(shape3Ref.current, {
        x: xPercent * 25,
        y: yPercent * -15,
        rotation: xPercent * 4,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Floating Shapes */}
      <div 
        ref={shape1Ref}
        className="absolute w-64 h-64 md:w-96 md:h-96 left-[5%] top-[20%] floating-shape z-0"
      >
        <div className="w-full h-full rounded-[40%_60%_70%_30%/30%_30%_70%_70%] bg-gradient-to-br from-muted/40 to-secondary grain-texture animate-float" />
      </div>

      <div 
        ref={shape2Ref}
        className="absolute w-48 h-48 md:w-80 md:h-80 right-[10%] top-[15%] floating-shape z-0"
      >
        <div className="w-full h-full rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-gradient-to-tr from-primary/30 to-accent/20 grain-texture animate-float-delayed" />
      </div>

      <div 
        ref={shape3Ref}
        className="absolute w-40 h-40 md:w-72 md:h-72 left-[25%] bottom-[15%] floating-shape z-0"
      >
        <div className="w-full h-full rounded-[40%_60%_60%_40%/60%_40%_60%_40%] bg-gradient-to-bl from-muted/30 to-transparent grain-texture animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-4">
        <div ref={logoRef} className="overflow-hidden">
          <h1 className="text-[18vw] md:text-[15vw] lg:text-[12vw] font-black tracking-tighter leading-none text-foreground drop-shadow-2xl">
            GOONS
          </h1>
        </div>
        
        <p 
          ref={subtitleRef}
          className="mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto font-light tracking-wide"
        >
          Focused on creating digital services with real impact
        </p>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-sm tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
