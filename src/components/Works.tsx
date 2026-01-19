import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  color: string;
}

const projects: Project[] = [
  { id: 1, title: "CTBC Bank", category: "Digital Banking Platform", year: "2024", color: "from-blue-600/20 to-blue-900/40" },
  { id: 2, title: "Hotai Motor", category: "E-Commerce Experience", year: "2024", color: "from-orange-600/20 to-red-900/40" },
  { id: 3, title: "EasyCard", category: "Financial Services", year: "2023", color: "from-green-600/20 to-teal-900/40" },
  { id: 4, title: "Cathay Life", category: "Insurance Platform", year: "2023", color: "from-purple-600/20 to-indigo-900/40" },
];

const Works = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((project, index) => {
        if (!project) return;

        gsap.fromTo(
          project,
          { 
            y: 100,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 80%",
              end: "top 30%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Parallax effect on scroll
        gsap.to(project.querySelector('.project-image'), {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: project,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-primary" />
            <span className="text-primary text-sm tracking-widest uppercase">Selected Works</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground">
            Our Works
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { projectRefs.current[index] = el; }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl">
                {/* Project Image Placeholder */}
                <div className={`project-image aspect-[16/9] w-full bg-gradient-to-br ${project.color} grain-texture`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[20vw] font-black text-foreground/5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Project Info */}
              <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-lg text-muted-foreground">
                    {project.category}
                  </p>
                </div>
                <span className="text-muted-foreground text-lg">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
