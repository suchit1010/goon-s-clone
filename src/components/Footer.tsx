import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="bg-background py-32 px-6 md:px-12 border-t border-border">
      <div ref={contentRef} className="max-w-7xl mx-auto">
        {/* CTA Section */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Let's create something
            <br />
            <span className="text-primary">amazing together</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Ready to transform your digital presence? We'd love to hear about your project.
          </p>
          <a
            href="mailto:hello@goons.design"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:bg-primary/90 transition-colors duration-300"
          >
            Start a Project
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-black text-foreground mb-4">GOONS</h3>
            <p className="text-muted-foreground max-w-sm">
              Focused on creating digital services with real impact. Based in Taipei, working globally.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm tracking-widest uppercase text-muted-foreground mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-foreground hover:text-primary transition-colors">Works</a></li>
              <li><a href="#" className="text-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-foreground hover:text-primary transition-colors">Process</a></li>
              <li><a href="#" className="text-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm tracking-widest uppercase text-muted-foreground mb-4">Connect</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-foreground hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="text-foreground hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-foreground hover:text-primary transition-colors">Behance</a></li>
              <li><a href="#" className="text-foreground hover:text-primary transition-colors">Dribbble</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            © 2024 GOONS Design. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0">
            Crafted with passion in Taipei
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
