import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ExternalLink, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo('.events-content', 
        { x: -60, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.events-content',
            start: 'top 80%',
          }
        }
      );

      // Embed animation
      gsap.fromTo('.events-embed', 
        { x: 60, opacity: 0, scale: 0.95 },
        { 
          x: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1, 
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.events-embed',
            start: 'top 80%',
          }
        }
      );

      // CTA buttons stagger
      gsap.fromTo('.events-cta', 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.15,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.events-content',
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="py-28 lg:py-40 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="events-content lg:sticky lg:top-32">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Join us for our{' '}
              <span className="text-primary">upcoming events.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-4">
              Find your tribe and ignite your passion. We're here to support your journey in the Solana ecosystem. Our events are the best place to learn and connect.
            </p>
            
            <div className="p-6 rounded-2xl bg-card/50 border border-border mb-8">
              <p className="text-foreground/80 leading-relaxed">
                Cowork, network and learn with founders, builders, investors and policy leaders who want to contribute to economic and technological advancement in Brazil, through Solana.
              </p>
            </div>

            <div className="space-y-4">
              <a 
                href="https://lu.ma/Superteambrasil" 
                target="_blank" 
                rel="noopener noreferrer"
                className="events-cta"
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto justify-start gap-3 px-6 py-6 text-left bg-card hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                >
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>View All Events on Lu.ma</span>
                </Button>
              </a>
              
              <a 
                href="https://earn.superteam.fun/s/superteambr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="events-cta block"
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto justify-start gap-3 px-6 py-6 text-left bg-card hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                >
                  <Rocket className="w-5 h-5 text-primary" />
                  <span>Explore Bounties & Earn</span>
                </Button>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="mt-10 pt-8 border-t border-border">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-primary">9+</p>
                  <p className="text-sm text-muted-foreground">Events in 2024</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-primary">20K+</p>
                  <p className="text-sm text-muted-foreground">Participants</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-primary">8,000</p>
                  <p className="text-sm text-muted-foreground">km Roadshow</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Lu.ma Embed */}
          <div className="events-embed">
            <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-2xl shadow-primary/5">
              {/* Header bar */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-semibold text-sm">Superteam Brazil Events</span>
                </div>
                <a 
                  href="https://lu.ma/Superteambrasil" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  Open in Lu.ma <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              {/* Lu.ma Embed */}
              <div className="aspect-[3/4] lg:aspect-[4/5] w-full">
                <iframe 
                  src="https://lu.ma/embed/calendar/cal-gDdDfhD1dhDTdEX/events?lt=light"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ 
                    border: 'none',
                    background: 'transparent',
                  }}
                  allowFullScreen
                  aria-hidden="false"
                  title="Superteam Brazil Events Calendar"
                />
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 hidden lg:block">
              <div className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg">
                Live Calendar
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
