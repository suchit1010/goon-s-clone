import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Mission = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('.word');
      
      if (words) {
        gsap.fromTo(
          words,
          { 
            opacity: 0.15,
            y: 20 
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "center center",
              scrub: 1
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const missionText = "We believe that great design should solve real problems. Our mission is to create digital experiences that are not just beautiful, but meaningful and impactful.";
  
  const words = missionText.split(' ');

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-background py-32 px-6 md:px-12"
    >
      <div className="max-w-5xl mx-auto">
        <div ref={textRef} className="text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed">
          {words.map((word, index) => (
            <span 
              key={index} 
              className="word inline-block mr-[0.3em] text-foreground"
            >
              {word}
            </span>
          ))}
        </div>

        <div className="mt-20 flex items-center gap-4">
          <div className="w-12 h-px bg-primary" />
          <span className="text-primary text-sm tracking-widest uppercase">Our Mission</span>
        </div>
      </div>
    </section>
  );
};

export default Mission;
