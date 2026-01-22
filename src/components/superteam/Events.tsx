import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, ArrowRight, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const upcomingEvents = [
  {
    title: 'Privacy Hackathon',
    date: 'Jan 2026',
    location: 'Online + In-Person',
    type: 'Hackathon',
    description: 'Powered by Solana, $2M+ in prizes with partners.',
  },
  {
    title: 'Solana Summer Brazil',
    date: 'Feb 2026',
    location: 'São Paulo, SP',
    type: 'Event Series',
    description: 'In-person/online events leading up to Carnival.',
  },
  {
    title: 'Web3 Builder Bootcamp',
    date: 'Mar 2026',
    location: 'Rio de Janeiro, RJ',
    type: 'Bootcamp',
    description: 'Hands-on dev onboarding focusing on DeFi and games.',
  },
];

const pastEvents = [
  {
    title: '2024 Roadshow',
    date: '2024',
    attendees: 20000,
    highlight: '8,000km, 9 events',
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
        { y: 80, opacity: 0 },
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

      // Event cards with 3D tilt effect
      gsap.utils.toArray('.event-card').forEach((card: any, i) => {
        gsap.fromTo(card, 
          { 
            y: 100, 
            opacity: 0, 
            rotateX: 10,
            transformPerspective: 1000,
          },
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

      // Past events slide in from left
      gsap.utils.toArray('.past-event').forEach((card: any, i) => {
        gsap.fromTo(card, 
          { x: -80, opacity: 0, scale: 0.9 },
          { 
            x: 0, 
            opacity: 1, 
            scale: 1,
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

      // Section heading columns
      gsap.fromTo('.events-col-title', 
        { x: -40, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.events-col-title',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="py-28 lg:py-40 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="events-title text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
          Events That <span className="text-primary">Inspire</span> and Connect
        </h2>
        <p className="text-muted-foreground text-center mb-20 max-w-2xl mx-auto text-lg">
          Join meetups, hackathons, and bootcamps that propel your Solana journey.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Upcoming Events */}
          <div>
            <h3 className="events-col-title text-2xl font-bold mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              Upcoming
            </h3>
            <div className="space-y-5">
              {upcomingEvents.map((event, index) => (
                <div 
                  key={event.title}
                  className="event-card p-6 lg:p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-500 group cursor-pointer hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full mb-3">
                        {event.type}
                      </span>
                      <h4 className="text-lg lg:text-xl font-bold group-hover:text-primary transition-colors duration-300">
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
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a 
              href="https://lu.ma/Superteambrasil" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 text-primary font-semibold hover:gap-3 transition-all duration-300"
            >
              View All Events <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Past Events */}
          <div>
            <h3 className="events-col-title text-2xl font-bold mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Users className="w-5 h-5 text-muted-foreground" />
              </div>
              Past Events
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {pastEvents.map((event, index) => (
                <div 
                  key={event.title}
                  className="past-event p-6 rounded-2xl bg-muted/50 border border-border hover:border-primary/30 transition-all duration-300 group"
                >
                  <h4 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-xs text-accent mb-3">{event.highlight}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{event.date}</span>
                    <span className="text-primary font-medium">{event.attendees.toLocaleString()}+ attendees</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
