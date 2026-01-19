import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WorkflowStep {
  id: number;
  title: string;
  description: string;
}

const steps: WorkflowStep[] = [
  {
    id: 1,
    title: "Align",
    description: "We start by understanding your goals, challenges, and vision. Through collaborative workshops and research, we align on the direction that will create the most impact."
  },
  {
    id: 2,
    title: "Design",
    description: "Our design process transforms insights into visual solutions. We create intuitive interfaces that balance aesthetics with functionality, ensuring every pixel serves a purpose."
  },
  {
    id: 3,
    title: "Architect",
    description: "We build robust technical foundations that scale. Our architecture decisions ensure your product can grow and evolve with your business needs."
  },
  {
    id: 4,
    title: "Develop",
    description: "Clean code, modern technologies, and agile methodology. We develop with precision and care, delivering products that perform flawlessly."
  },
  {
    id: 5,
    title: "Launch",
    description: "From testing to deployment, we ensure a smooth launch. Our support continues beyond launch to optimize and enhance your digital product."
  }
];

const Workflow = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the header
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: headerRef.current,
        pinSpacing: false
      });

      // Animate each step
      stepsRef.current.forEach((step, index) => {
        if (!step) return;

        const number = step.querySelector('.step-number');
        const title = step.querySelector('.step-title');
        const desc = step.querySelector('.step-desc');
        const line = step.querySelector('.step-line');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 60%",
            end: "top 20%",
            scrub: 1
          }
        });

        tl.fromTo(number, 
          { opacity: 0.1, x: -50 }, 
          { opacity: 1, x: 0, duration: 0.5 }
        )
        .fromTo(title, 
          { opacity: 0.3, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.5 }, 
          0
        )
        .fromTo(desc, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.5 }, 
          0.2
        )
        .fromTo(line, 
          { scaleY: 0 }, 
          { scaleY: 1, duration: 0.8 }, 
          0
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-secondary min-h-[400vh]">
      {/* Fixed Header */}
      <div 
        ref={headerRef}
        className="absolute top-0 left-0 w-full md:w-1/2 h-screen flex items-center px-6 md:px-12 lg:px-20 z-10"
      >
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary" />
            <span className="text-primary text-sm tracking-widest uppercase">Our Process</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            How We<br />Work
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-md">
            A proven methodology that transforms ideas into exceptional digital experiences.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="ml-0 md:ml-[50%] pt-32">
        {steps.map((step, index) => (
          <div
            key={step.id}
            ref={(el) => { stepsRef.current[index] = el; }}
            className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 relative"
          >
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="step-line absolute left-[2.5rem] md:left-[4rem] top-1/2 w-px h-full bg-gradient-to-b from-primary/50 to-transparent origin-top" />
            )}

            <div className="flex items-start gap-8 md:gap-12">
              {/* Step Number */}
              <div className="step-number text-6xl md:text-8xl font-black text-primary/20 select-none">
                {String(step.id).padStart(2, '0')}
              </div>

              {/* Step Content */}
              <div className="flex-1 max-w-lg">
                <h3 className="step-title text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="step-desc text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Workflow;
