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
    deadline: '5 days left',
    location: 'Online + In-Person',
    type: 'Hackathon',
    description: 'Powered by Solana, $2M+ in prizes with partners.',
    cta: 'Register Now',
    urgent: true,
    prizes: '$2M+',
  },
  {
    title: 'Solana Summer Brazil',
    date: 'Feb 2026',
    deadline: 'Early Bird Closes Soon',
    location: 'São Paulo, SP',
    type: 'Event Series',
    description: 'In-person/online events leading up to Carnival.',
    cta: 'Reserve Your Spot',
    urgent: false,
    prizes: null,
  },
];

const pastEvents = [
  {
    title: '2024 Roadshow',
    date: '2024',
    attendees: 20000,
    highlight: '8,000km traveled, 9 cities',
    testimonial: '"Best Web3 tour in LATAM history"',
    image: true,
  },
  {
    title: 'Greece Bootcamp',
    date: '2024',
    attendees: 150,
    highlight: 'Built 12 MVPs in 5 days',
    testimonial: '"Life-changing experience"',
    image: true,
  },
  {
    title: 'Solana Hotel Buenos Aires',
    date: '2024',
    attendees: 200,
    highlight: 'LATAM\'s biggest Solana event',
    testimonial: '"Unmatched networking"',
    image: true,
  },
  {
    title: 'Breakpoint UAE',
    date: '2024',
    attendees: 300,
    highlight: 'Brazil had largest delegation',
    testimonial: '"Proud moment for Brazil"',
    image: true,
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
    <sectiodiv className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="text-sm font-medium text-primary">🎪 Where Builders Meet Opportunities</span>
          </div>
          <h2 className="events-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Events That <span className="text-primary">Launch</span> Careers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From hackathons with <span className="text-foreground font-semibold">$2M+ in prizes</span> to intimate builder workshops—every event is designed to accelerate
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
                  className={`event-card p-6 lg:p-8 rounded-3xl bg-card border transition-all duration-500 group cursor-pointer hover:shadow-xl ${
                    event.urgent 
                      ? 'border-yellow-500/50 bg-yellow-500/5 hover:border-yellow-500' 
                      : 'border-border hover:border-primary/50 hover:shadow-primary/5'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {event.urgent && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-red-600 dark:text-red-400">{event.deadline}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
                          {event.type}
                        </span>
                        {event.prizes && (
                          <span className="inline-block text-xs font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full">
                            💰 {event.prizes} Prizes
                          </span>
                        )}
                      </div>
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
                      <Button size="sm" className={`transition-colors ${event.urgent ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'group-hover:bg-primary'}`}>
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

        {/* Past Events Gallery with Social Proof */}
        <div>
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            2024 Impact: 20,000+ Builders Reached
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pastEvents.map((event) => (
              <div 
                key={event.title}
                className="past-event p-6 rounded-2xl bg-gradient-to-br from-card to-muted/20 border border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold text-primary/70 uppercase tracking-wider bg-primary/5 px-2 py-1 rounded">
                    {event.date}
                  </span>
                  <span className="text-xl">✨</span>
                </div>
                <h4 className="font-bold text-base mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-3">{event.highlight}</p>
                {event.testimonial && (
                  <p className="text-xs italic text-primary/80 mb-3 border-l-2 border-primary/30 pl-2">
                    {event.testimonial}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs pt-3 border-t border-border/50">
                  <span className="text-muted-foreground">Attendees</span>
                  <span className="text-primary font-bold text-sm">{event.attendees.toLocaleString()}+</span>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof Banner */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-yellow-500/10 to-green-500/10 border border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-bold mb-2">
                  Don't Miss the Next One 🚀
                </h4>
                <p className="text-muted-foreground">
                  Join 20K+ builders who've accelerated their careers through our events
                </p>
              </div>
              <a 
                href="https://lu.ma/Superteambrasil" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                  <Calendar className="w-4 h-4" />
                  See All Events
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
