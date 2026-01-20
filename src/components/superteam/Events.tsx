import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const upcomingEvents = [
  {
    title: 'Solana Builder Meetup SP',
    date: 'Feb 15, 2026',
    location: 'São Paulo, SP',
    type: 'Meetup',
  },
  {
    title: 'Web3 Hackathon Brasil',
    date: 'Mar 1-3, 2026',
    location: 'Rio de Janeiro, RJ',
    type: 'Hackathon',
  },
  {
    title: 'DeFi Workshop',
    date: 'Mar 20, 2026',
    location: 'Online',
    type: 'Workshop',
  },
];

const pastEvents = [
  {
    title: 'Superteam Summit Brasil',
    date: 'Dec 2025',
    attendees: 200,
  },
  {
    title: 'Solana Hacker House',
    date: 'Nov 2025',
    attendees: 150,
  },
  {
    title: 'NFT Art Exhibition',
    date: 'Oct 2025',
    attendees: 100,
  },
  {
    title: 'Developer Bootcamp',
    date: 'Sep 2025',
    attendees: 80,
  },
];

const Events = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.events-title', 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.events-title',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.event-card', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.event-card',
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo('.past-event', 
        { x: -30, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.past-event',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-6">
        <h2 className="events-title text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-primary">Events</span> & Meetups
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upcoming Events */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Upcoming
            </h3>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div 
                  key={event.title}
                  className="event-card p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer card-hover"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {event.type}
                      </span>
                      <h4 className="text-lg font-bold mt-1 group-hover:text-primary transition-colors">
                        {event.title}
                      </h4>
                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>

            <a 
              href="https://lu.ma/Superteambrasil" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-primary font-semibold hover:underline"
            >
              View All Events <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Past Events */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Past Events</h3>
            <div className="grid grid-cols-2 gap-4">
              {pastEvents.map((event) => (
                <div 
                  key={event.title}
                  className="past-event p-5 rounded-xl bg-muted/50 border border-border"
                >
                  <h4 className="font-semibold text-sm mb-2">{event.title}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{event.date}</p>
                  <p className="text-xs text-primary">{event.attendees}+ attendees</p>
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
