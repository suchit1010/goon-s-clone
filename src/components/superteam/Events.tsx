import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, ArrowRight, Users, ExternalLink, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const upcomingEvents = [
  {
    title: 'Privacy Hackathon',
    date: 'Jan 2026',
    location: 'Online + In-Person',
    type: 'Hackathon',
    description: 'Powered by Solana, $2M+ in prizes with partners.',
    cta: 'Register Now',
  },
  {
    title: 'Solana Summer Brazil',
    date: 'Feb 2026',
    location: 'São Paulo, SP',
    type: 'Event Series',
    description: 'In-person/online events leading up to Carnival.',
    cta: 'See Details',
  },
];

const pastEvents = [
  {
    title: '2024 Roadshow',
    date: '2024',
    attendees: 20000,
    highlight: '8,000km, 9 events across Brazil',
  },
  {
    title: 'Greece Bootcamp',
    date: '2024',
    attendees: 150,
    highlight: 'with IslandDAO',
  },
  {
    title: 'Solana Hotel Buenos Aires',
    date: '2024',
    attendees: 200,
    highlight: 'LATAM Summit',
  },
  {
    title: 'Breakpoint UAE',
    date: '2024',
    attendees: 300,
    highlight: 'Brazilian records broken',
  },
];

const Events = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.events-title', 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.events-title',
            start: 'top 85%',
          }
        }
      );

      // Cards animation
      gsap.utils.toArray('.event-card').forEach((card: any, i) => {
        gsap.fromTo(card, 
          { y: 80, opacity: 0, rotateX: 8 },
          { 
            y: 0, 
            opacity: 1, 
            rotateX: 0,
            duration: 0.8, 
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            }
          }
        );
      });

      // Past events
      gsap.utils.toArray('.past-event').forEach((card: any, i) => {
        gsap.fromTo(card, 
          { scale: 0.9, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.6, 
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            }
          }
        );
      });

      // Embed animation
      gsap.fromTo('.events-embed', 
        { x: 60, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 1, 
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.events-embed',
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="py-28 lg:py-40 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="events-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Events That <span className="text-primary">Inspire</span> and Connect
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Join meetups, hackathons, and bootcamps that propel your Solana journey.
          </p>
        </div>

        {/* Main Grid: Upcoming + Lu.ma Embed */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Upcoming Events Cards */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              Upcoming Events
            </h3>
            
            <div className="space-y-5">
              {upcomingEvents.map((event) => (
                <div 
                  key={event.title}
                  className="event-card p-6 lg:p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-500 group cursor-pointer hover:shadow-xl hover:shadow-primary/5"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full mb-3">
                        {event.type}
                      </span>
                      <h4 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                        {event.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-primary/70" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-primary/70" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Button size="sm" className="group-hover:bg-primary transition-colors">
                        {event.cta}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a 
                href="https://lu.ma/Superteambrasil" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  View All on Lu.ma
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </a>
              <a 
                href="https://earn.superteam.fun/s/superteambr" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <Rocket className="w-4 h-4" />
                  Explore Bounties
                </Button>
              </a>
            </div>
          </div>

          {/* Lu.ma Calendar Embed */}
          <div className="events-embed relative">
            <div className="rounded-3xl overflow-hidden bg-card border border-border shadow-2xl shadow-primary/5">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-semibold text-sm">Live Calendar</span>
                </div>
                <a 
                  href="https://lu.ma/Superteambrasil" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  Open Lu.ma <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              {/* Embed Container */}
              <div className="h-[500px] lg:h-[550px] w-full bg-background">
                <iframe 
                  src="https://lu.ma/embed/calendar/cal-gDdDfhD1dhDTdEX/events"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 'none' }}
                  allowFullScreen
                  aria-hidden="false"
                  title="Superteam Brazil Events Calendar"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Past Events Gallery */}
        <div>
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Users className="w-5 h-5 text-muted-foreground" />
            </div>
            Past Events & Highlights
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pastEvents.map((event) => (
              <div 
                key={event.title}
                className="past-event p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <h4 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h4>
                <p className="text-xs text-accent mb-3 line-clamp-2">{event.highlight}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{event.date}</span>
                  <span className="text-primary font-semibold">{event.attendees.toLocaleString()}+</span>
                </div>
              </div>
            ))}
          </div>

          {/* Past Events CTA */}
          <div className="mt-8 text-center">
            <a 
              href="https://lu.ma/Superteambrasil?period=past" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
            >
              View All Past Events <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
